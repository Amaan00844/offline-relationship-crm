import { MemberProfile, MatchSuggestion } from '../types';

interface ComplementaryMatch {
  need: string;
  offeredBy: string;
  giverName: string;
  receiverName: string;
}

function calculateComplementarity(
  memberA: MemberProfile,
  memberB: MemberProfile
): {
  score: number;
  thesis: string;
  pairs: ComplementaryMatch[];
  sharedDomains: string[];
} {
  const pairs: ComplementaryMatch[] = [];
  const sharedDomains = memberA.domains.filter(d => memberB.domains.includes(d));

  let score = 50;

  // Check Member A's asks against Member B's gives
  for (const ask of memberA.asks) {
    const askLower = ask.toLowerCase();
    for (const give of memberB.gives) {
      const giveLower = give.toLowerCase();

      // Check keywords
      if (
        (askLower.includes('soc2') && (giveLower.includes('soc2') || giveLower.includes('security'))) ||
        (askLower.includes('series a') && (giveLower.includes('angel') || giveLower.includes('venture') || giveLower.includes('invest'))) ||
        (askLower.includes('gtm') && (giveLower.includes('gtm') || giveLower.includes('sales') || giveLower.includes('revenue') || giveLower.includes('arr'))) ||
        (askLower.includes('pricing') && (giveLower.includes('pricing') || giveLower.includes('billing') || giveLower.includes('growth'))) ||
        (askLower.includes('hiring') && (giveLower.includes('talent') || giveLower.includes('pipeline') || giveLower.includes('engineers'))) ||
        (askLower.includes('speech') && giveLower.includes('speech')) ||
        (askLower.includes('advisory') && (giveLower.includes('advisor') || giveLower.includes('board') || giveLower.includes('mentoring'))) ||
        (askLower.includes('us enterprise') && (giveLower.includes('fortune 500') || giveLower.includes('enterprise')))
      ) {
        pairs.push({
          need: ask,
          offeredBy: give,
          giverName: memberB.name,
          receiverName: memberA.name
        });
        score += 20;
      }
    }
  }

  // Check Member B's asks against Member A's gives
  for (const ask of memberB.asks) {
    const askLower = ask.toLowerCase();
    for (const give of memberA.gives) {
      const giveLower = give.toLowerCase();

      if (
        (askLower.includes('advisory') && (giveLower.includes('angel') || giveLower.includes('founder') || giveLower.includes('advisor'))) ||
        (askLower.includes('agent') && (giveLower.includes('agent') || giveLower.includes('open-source') || giveLower.includes('orchestration'))) ||
        (askLower.includes('fintech') && (giveLower.includes('fintech') || giveLower.includes('reconcile') || giveLower.includes('arr'))) ||
        (askLower.includes('offshore') && (giveLower.includes('india') || giveLower.includes('engineers'))) ||
        (askLower.includes('cio') && giveLower.includes('infra'))
      ) {
        pairs.push({
          need: ask,
          offeredBy: give,
          giverName: memberA.name,
          receiverName: memberB.name
        });
        score += 20;
      }
    }
  }

  // Shared domain bonus
  if (sharedDomains.length > 0) {
    score += sharedDomains.length * 6;
  }

  // Operator + Founder synergy bonus
  const isA_Founder = memberA.personaClassification.includes('Founder');
  const isB_Operator = memberB.personaClassification.includes('Operator');
  const isA_Operator = memberA.personaClassification.includes('Operator');
  const isB_Founder = memberB.personaClassification.includes('Founder');

  if ((isA_Founder && isB_Operator) || (isA_Operator && isB_Founder)) {
    score += 10;
  }

  score = Math.min(98, Math.max(50, score));

  // Synthesize Thesis
  let thesis = '';
  if (pairs.length > 0) {
    thesis = `High mutual reciprocity: ${memberA.name.split(' ')[0]} seeks "${pairs[0].need.slice(0, 45)}...", directly matched by ${memberB.name.split(' ')[0]}'s superpower in "${pairs[0].offeredBy.slice(0, 45)}...". Shared domain focus in ${sharedDomains.slice(0, 2).join(' and ') || 'technology'}.`;
  } else {
    thesis = `Strategic peer connection: Both founders are operating in high-growth ${sharedDomains.join(' & ') || 'software'} markets with complementary scaling stages.`;
  }

  return { score, thesis, pairs, sharedDomains };
}

export function generateMatchSuggestions(members: MemberProfile[]): MatchSuggestion[] {
  const suggestions: MatchSuggestion[] = [];
  const activeMembers = members.filter(m => !m.isDuplicate && m.status !== 'Declined');

  for (let i = 0; i < activeMembers.length; i++) {
    for (let j = i + 1; j < activeMembers.length; j++) {
      const a = activeMembers[i];
      const b = activeMembers[j];

      // Avoid matching service provider Chad Miller
      if (a.fitScore.overall < 50 || b.fitScore.overall < 50) continue;

      const { score, thesis, pairs, sharedDomains } = calculateComplementarity(a, b);

      if (score >= 70 || pairs.length > 0) {
        const id = `match-${a.id.slice(-3)}-${b.id.slice(-3)}`;
        const firstNameA = a.name.split(' ')[0];
        const firstNameB = b.name.split(' ')[0];

        const match: MatchSuggestion = {
          id,
          memberA: a,
          memberB: b,
          matchScore: score,
          matchThesis: thesis,
          complementaryPairs: pairs,
          sharedDomains,
          suggestedIcebreaker: `Ask ${firstNameB} about their framework for ${b.gives[0] || 'scaling'}, while sharing your recent learnings on ${a.domains[0] || 'building'}.`,
          draftIntroEmail: {
            subject: `Offline Intro: ${a.name} (${a.company}) <> ${b.name} (${b.company})`,
            blurbForA: `Hey ${firstNameA}, I'd love to connect you with ${b.name} (${b.standardizedRole} at ${b.company}). ${firstNameB} ${b.gives[0] ? `can be a huge sounding board for ${b.gives[0].toLowerCase()}` : 'has relevant domain scaling experience'}. Mind if I make the intro?`,
            blurbForB: `Hey ${firstNameB}, would love to introduce you to ${a.name} (${a.standardizedRole} at ${a.company}). ${firstNameA} is building fast in ${a.domains.join('/')} and ${a.asks[0] ? `navigating ${a.asks[0].toLowerCase()}` : 'would value your insight'}. Open to a quick chat?`,
            fullJointEmail: `Hey ${firstNameA} and ${firstNameB},\n\nConnecting you two as promised through Offline!\n\n${a.name} is leading ${a.company} (${a.companyStage}) — currently focused on ${a.asks[0] || 'rapid scaling'}.\n\n${b.name} is ${b.standardizedRole} at ${b.company} — bringing deep expertise in ${b.gives[0] || 'operational scaling'}.\n\nThere is great alignment here around ${sharedDomains.join(' & ') || 'your shared verticals'}. I'll step back and let you two coordinate!\n\nBest,\nFounder's Office @ Offline`
          },
          status: 'Pending Review',
          createdAt: new Date().toISOString()
        };

        suggestions.push(match);
      }
    }
  }

  // Sort by match score descending
  return suggestions.sort((x, y) => y.matchScore - x.matchScore);
}
