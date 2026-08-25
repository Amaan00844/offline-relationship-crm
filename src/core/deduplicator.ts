import { MemberProfile, DuplicateMatchGroup } from '../types';

function calculateStringSimilarity(s1: string, s2: string): number {
  const str1 = (s1 || '').toLowerCase().trim();
  const str2 = (s2 || '').toLowerCase().trim();
  
  if (str1 === str2) return 1.0;
  if (!str1 || !str2) return 0.0;

  // Check substring containment
  if (str1.includes(str2) || str2.includes(str1)) {
    const minLen = Math.min(str1.length, str2.length);
    const maxLen = Math.max(str1.length, str2.length);
    return minLen / maxLen;
  }

  // Bigram token similarity (Dice coefficient)
  const getBigrams = (str: string) => {
    const bigrams = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  };

  const bg1 = getBigrams(str1);
  const bg2 = getBigrams(str2);
  let intersection = 0;

  for (const item of bg1) {
    if (bg2.has(item)) intersection++;
  }

  return (2.0 * intersection) / (bg1.size + bg2.size || 1);
}

function normalizeLinkedInHandle(url?: string): string {
  if (!url) return '';
  return url
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/^linkedin\.com\/in\//, '')
    .replace(/\/$/, '')
    .trim();
}

function normalizePhoneDigits(phone?: string): string {
  if (!phone) return '';
  const digits = phone.replace(/[^\d]/g, '');
  // Take last 10 digits for comparison
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

export function detectDuplicates(members: MemberProfile[]): {
  groups: DuplicateMatchGroup[];
  updatedMembers: MemberProfile[];
} {
  const groups: DuplicateMatchGroup[] = [];
  const processedPairs = new Set<string>();
  const memberMap = new Map<string, MemberProfile>(members.map(m => [m.id, { ...m }]));

  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const a = members[i];
      const b = members[j];
      const pairKey = [a.id, b.id].sort().join('_');

      if (processedPairs.has(pairKey)) continue;

      let matchConfidence = 0;
      const reasons: string[] = [];

      // Check 1: Phone number match
      const phoneA = normalizePhoneDigits(a.phone);
      const phoneB = normalizePhoneDigits(b.phone);
      if (phoneA && phoneB && phoneA === phoneB) {
        matchConfidence = Math.max(matchConfidence, 95);
        reasons.push('Identical contact phone number');
      }

      // Check 2: LinkedIn handle match
      const liA = normalizeLinkedInHandle(a.linkedinUrl);
      const liB = normalizeLinkedInHandle(b.linkedinUrl);
      if (liA && liB && liA === liB) {
        matchConfidence = Math.max(matchConfidence, 96);
        reasons.push('Identical verified LinkedIn profile');
      }

      // Check 3: Name and Company similarity
      const nameSim = calculateStringSimilarity(a.name, b.name);
      const compSim = calculateStringSimilarity(a.company, b.company);

      if (nameSim > 0.8 && compSim > 0.7) {
        const combinedScore = Math.round((nameSim * 0.6 + compSim * 0.4) * 100);
        if (combinedScore > matchConfidence) {
          matchConfidence = combinedScore;
          reasons.push(`High name (${Math.round(nameSim * 100)}%) and company similarity (${Math.round(compSim * 100)}%)`);
        }
      }

      // Check 4: Same person applying with work vs personal email
      const emailUserA = a.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      const emailUserB = b.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      if (nameSim > 0.75 && calculateStringSimilarity(emailUserA, emailUserB) > 0.7) {
        matchConfidence = Math.max(matchConfidence, 90);
        reasons.push('Probable personal vs corporate email re-application');
      }

      if (matchConfidence >= 80) {
        processedPairs.add(pairKey);

        // Pick master record with highest completeness or earliest created
        const master = a.completenessScore >= b.completenessScore ? a : b;
        const duplicate = master.id === a.id ? b : a;

        const groupId = `dup-${a.id.slice(-4)}-${b.id.slice(-4)}`;
        const reasonText = reasons.join('; ');

        groups.push({
          groupId,
          confidence: matchConfidence,
          reason: reasonText,
          records: [a, b],
          recommendedMasterRecordId: master.id
        });

        // Mark duplicate in member map
        const dupRecord = memberMap.get(duplicate.id);
        if (dupRecord) {
          dupRecord.isDuplicate = true;
          dupRecord.duplicateGroupId = groupId;
          dupRecord.duplicateOfId = master.id;
          dupRecord.duplicateReason = reasonText;
          dupRecord.similarityScore = matchConfidence;
        }

        const masterRecord = memberMap.get(master.id);
        if (masterRecord) {
          masterRecord.duplicateGroupId = groupId;
          masterRecord.similarityScore = matchConfidence;
        }
      }
    }
  }

  return {
    groups,
    updatedMembers: Array.from(memberMap.values())
  };
}

export function mergeDuplicateRecords(
  masterRecord: MemberProfile,
  secondaryRecord: MemberProfile,
  fieldOverrides?: Partial<MemberProfile>
): MemberProfile {
  // Synthesize richest fields from both
  const mergedDomains = Array.from(new Set([...(masterRecord.domains || []), ...(secondaryRecord.domains || [])]));
  const mergedAsks = Array.from(new Set([...(masterRecord.asks || []), ...(secondaryRecord.asks || [])]));
  const mergedGives = Array.from(new Set([...(masterRecord.gives || []), ...(secondaryRecord.gives || [])]));

  const merged: MemberProfile = {
    ...masterRecord,
    email: masterRecord.email || secondaryRecord.email,
    phone: masterRecord.phone || secondaryRecord.phone,
    linkedinUrl: masterRecord.linkedinUrl || secondaryRecord.linkedinUrl,
    twitterUrl: masterRecord.twitterUrl || secondaryRecord.twitterUrl,
    avatarUrl: masterRecord.avatarUrl || secondaryRecord.avatarUrl,
    backingOrPedigree: (masterRecord.backingOrPedigree?.length || 0) >= (secondaryRecord.backingOrPedigree?.length || 0)
      ? masterRecord.backingOrPedigree
      : secondaryRecord.backingOrPedigree,
    rawNotes: [masterRecord.rawNotes, secondaryRecord.rawNotes].filter(Boolean).join(' | '),
    domains: mergedDomains,
    asks: mergedAsks,
    gives: mergedGives,
    isDuplicate: false,
    duplicateGroupId: undefined,
    duplicateOfId: undefined,
    duplicateReason: undefined,
    similarityScore: undefined,
    status: 'Cleaned',
    lastUpdated: new Date().toISOString(),
    ...fieldOverrides
  };

  return merged;
}
