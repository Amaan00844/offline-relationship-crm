import { MemberProfile, CompanyStage } from '../types';

export function sanitizePhoneNumber(phone?: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // US format
  if (cleaned.length === 10) {
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.startsWith('+1') && cleaned.length === 12) {
    const digits = cleaned.slice(2);
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  // India format
  if (cleaned.startsWith('+91') && cleaned.length === 13) {
    const digits = cleaned.slice(3);
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  if (cleaned.length === 10 && (cleaned.startsWith('9') || cleaned.startsWith('8') || cleaned.startsWith('7') || cleaned.startsWith('6'))) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone.trim();
}

export function sanitizeUrl(url?: string, platform: 'linkedin' | 'twitter' | 'website' = 'website'): string {
  if (!url || !url.trim()) return '';
  let clean = url.trim();
  
  // Remove tracking parameters
  clean = clean.split('?')[0].split('#')[0];

  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }

  if (platform === 'linkedin' && !clean.includes('linkedin.com')) {
    clean = `https://linkedin.com/in/${clean.replace(/https?:\/\//, '')}`;
  }
  if (platform === 'twitter' && !clean.includes('x.com') && !clean.includes('twitter.com')) {
    clean = `https://x.com/${clean.replace(/https?:\/\//, '').replace('@', '')}`;
  }

  return clean;
}

export function standardizeRoleTitle(rawRole: string): string {
  const r = (rawRole || '').toLowerCase().trim();
  
  if (r.includes('ceo') || r.includes('chief executive') || r.includes('chief hustler') || r.includes('founder / builder') || r.includes('co-founder / ceo')) {
    return 'Founder & CEO';
  }
  if (r.includes('cto') || r.includes('chief ai') || r.includes('chief tech') || r.includes('lead hacker')) {
    return 'Founder & CTO';
  }
  if (r.includes('cpo') || r.includes('head of prod') || r.includes('chief product')) {
    return 'Chief Product Officer';
  }
  if (r.includes('vpe') || r.includes('vp eng') || r.includes('vp of eng') || r.includes('head of eng')) {
    return 'VP of Engineering';
  }
  if (r.includes('growth') || r.includes('acquisition') || r.includes('head of growth')) {
    return 'Head of Growth';
  }
  if (r.includes('angel') || r.includes('managing partner') || r.includes('investor') || r.includes('syndicate')) {
    return 'Angel / Super-Operator';
  }
  if (r.includes('vp') || r.includes('vice president')) {
    return 'Vice President';
  }
  if (r.includes('sales') || r.includes('business development') || r.includes('bd')) {
    return 'Sales / Business Development';
  }
  if (r.includes('founder') || r.includes('co-founder')) {
    return 'Founder & CEO';
  }

  return rawRole.trim() || 'Tech Operator';
}

export function detectCompanyStage(stageStr: string): CompanyStage {
  const s = (stageStr || '').toLowerCase();
  if (s.includes('pre-seed') || s.includes('preseed') || s.includes('idea')) return 'Pre-Seed';
  if (s.includes('seed')) return 'Seed';
  if (s.includes('series a') || s.includes('series-a')) return 'Series A';
  if (s.includes('series b') || s.includes('series c') || s.includes('growth') || s.includes('series b+')) return 'Series B+';
  if (s.includes('bootstrap') || s.includes('self-funded') || s.includes('profitable')) return 'Bootstrapped';
  if (s.includes('public') || s.includes('exit') || s.includes('acquired')) return 'Public/Exited';
  if (s.includes('enterprise') || s.includes('corporate')) return 'Enterprise';
  return 'Seed';
}

export function computeCompleteness(profile: Partial<MemberProfile>): { score: number; missingFields: string[] } {
  const missing: string[] = [];
  let score = 0;
  
  const criticalFields: { key: keyof MemberProfile; label: string; weight: number }[] = [
    { key: 'name', label: 'Full Name', weight: 15 },
    { key: 'email', label: 'Email', weight: 15 },
    { key: 'company', label: 'Company', weight: 15 },
    { key: 'standardizedRole', label: 'Role', weight: 10 },
    { key: 'linkedinUrl', label: 'LinkedIn', weight: 10 },
    { key: 'phone', label: 'Phone', weight: 5 },
    { key: 'asks', label: 'Needs / Asks', weight: 15 },
    { key: 'gives', label: 'Offers / Gives', weight: 15 }
  ];

  for (const field of criticalFields) {
    const val = profile[field.key];
    if (val && Array.isArray(val) ? val.length > 0 : Boolean(val)) {
      score += field.weight;
    } else {
      missing.push(field.label);
    }
  }

  return { score: Math.min(100, score), missingFields: missing };
}

export function cleanAndStructureRecord(raw: Partial<MemberProfile>): MemberProfile {
  const standardizedRole = standardizeRoleTitle(raw.rawRole || raw.standardizedRole || '');
  const companyStage = detectCompanyStage(raw.companyStage || 'Seed');
  const phone = sanitizePhoneNumber(raw.phone);
  const linkedinUrl = sanitizeUrl(raw.linkedinUrl, 'linkedin');
  const twitterUrl = sanitizeUrl(raw.twitterUrl, 'twitter');
  
  const partialCleaned: Partial<MemberProfile> = {
    ...raw,
    phone,
    linkedinUrl,
    twitterUrl,
    standardizedRole,
    companyStage
  };

  const { score, missingFields } = computeCompleteness(partialCleaned);

  return {
    id: raw.id || `mem-${Math.random().toString(36).substring(2, 7)}`,
    name: raw.name?.trim() || 'Anonymous Applicant',
    email: raw.email?.trim().toLowerCase() || '',
    phone,
    linkedinUrl,
    twitterUrl,
    avatarUrl: raw.avatarUrl || `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=150&auto=format&fit=crop&q=80`,
    company: raw.company?.trim() || 'Independent',
    rawRole: raw.rawRole || raw.standardizedRole || 'Founder',
    standardizedRole,
    companyStage,
    location: raw.location?.trim() || 'San Francisco, CA',
    programTrack: raw.programTrack || 'Offline Core',
    status: raw.status || 'Cleaned',
    personaClassification: raw.personaClassification || 'Emerging High-Velocity Founder',
    domains: raw.domains && raw.domains.length > 0 ? raw.domains : ['AI / LLMs', 'B2B SaaS'],
    asks: raw.asks || [],
    gives: raw.gives || [],
    backingOrPedigree: raw.backingOrPedigree || 'Under Review',
    rawNotes: raw.rawNotes || '',
    completenessScore: score,
    missingFields,
    isDuplicate: raw.isDuplicate || false,
    duplicateGroupId: raw.duplicateGroupId,
    duplicateOfId: raw.duplicateOfId,
    duplicateReason: raw.duplicateReason,
    similarityScore: raw.similarityScore,
    fitScore: raw.fitScore || {
      overall: 80,
      pedigreeVelocity: 80,
      communityContribution: 80,
      networkSynergy: 80,
      actionRecommendation: 'Interview Required',
      reasoning: ['Initial raw record cleaned and structured'],
      suggestedNextStep: 'Run AI Fit Scoring'
    },
    matchmakingHistory: raw.matchmakingHistory || [],
    lastUpdated: new Date().toISOString(),
    createdAt: raw.createdAt || new Date().toISOString()
  };
}
