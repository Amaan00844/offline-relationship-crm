import { MemberProfile } from '../types';

export const INITIAL_MEMBERS: MemberProfile[] = [
  // 1. Scaled Founder (Tier 1)
  {
    id: 'mem-001',
    name: 'Aarav Singhania',
    email: 'aarav@synapsecloud.io',
    phone: '+1 (415) 890-2144',
    linkedinUrl: 'https://linkedin.com/in/aaravsinghania',
    twitterUrl: 'https://x.com/aarav_synapse',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'Synapse Cloud',
    rawRole: 'Co-founder & CEO',
    standardizedRole: 'Founder & CEO',
    companyStage: 'Series B+',
    location: 'San Francisco, CA',
    programTrack: 'Offline Core',
    status: 'Accepted',
    personaClassification: 'Tier 1 Scaled Founder',
    domains: ['Cloud Infra', 'AI / LLMs', 'Enterprise B2B', 'DevOps'],
    asks: [
      'Introductions to Fortune 500 CIOs evaluating self-hosted LLM runtime',
      'Hiring VP of Product Marketing with devtool experience'
    ],
    gives: [
      'Deep expertise scaling to $12M ARR in developer infrastructure',
      '$50k angel checks for early infra & AI agent founders',
      'Warm intros to Lightspeed and Benchmark partners'
    ],
    backingOrPedigree: 'Y Combinator (W21), Benchmark & Lightspeed ($24M Total Raised)',
    rawNotes: 'Met at SF Founder Dinner. Incredible technical founder. Scaling fast.',
    completenessScore: 98,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 96,
      pedigreeVelocity: 98,
      communityContribution: 95,
      networkSynergy: 95,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: [
        'Exceptional founder velocity: Series B backed by Benchmark with $12M ARR',
        'High community contribution potential: Offers $50k angel checks and enterprise playbooks',
        'Strong network synergy with Offline Core developer infrastructure founders'
      ],
      suggestedNextStep: 'Active Member — Pair with Series A founders needing GTM advice'
    },
    lastUpdated: '2026-08-20T14:30:00Z',
    createdAt: '2026-01-15T09:00:00Z'
  },

  // 2. Hypergrowth Operator (Encore Track)
  {
    id: 'mem-002',
    name: 'Elena Rostova',
    email: 'elena.rostova@datadrive.com',
    phone: '+1 650 443 8921',
    linkedinUrl: 'https://linkedin.com/in/elenarostova',
    twitterUrl: 'https://x.com/erostova_tech',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    company: 'DataDrive (Ex-Stripe)',
    rawRole: 'VP of Product / Head of Core Platform',
    standardizedRole: 'VP of Product',
    companyStage: 'Series B+',
    location: 'New York, NY',
    programTrack: 'Encore',
    status: 'Accepted',
    personaClassification: 'Hypergrowth Operator (C-Suite/VP)',
    domains: ['Fintech', 'Product Strategy', 'Payments', 'Platform Scale'],
    asks: [
      'Looking to join advisory boards for early Fintech and AI infrastructure startups',
      'Connect with founders building novel agentic payment rails'
    ],
    gives: [
      'Scaled Stripe Billing from $10M to $150M ARR',
      'Product-led growth pricing model teardowns and audit',
      'Mentoring senior operators transitioning to CPO roles'
    ],
    backingOrPedigree: 'Ex-Stripe VP Product (6 yrs), Stanford CS',
    rawNotes: 'Anchor executive for Encore NYC cohort.',
    completenessScore: 95,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 94,
      pedigreeVelocity: 92,
      communityContribution: 96,
      networkSynergy: 94,
      actionRecommendation: 'Direct to Encore (Executive)',
      reasoning: [
        'Proven Tier-1 operator pedigree with 6 years scaling Stripe core products',
        'Exceptional give profile: willing to offer pricing model teardowns & CPO mentorship',
        'Ideal anchor member for Encore executive peer group'
      ],
      suggestedNextStep: 'Active Encore Member — Connect with founders designing pricing tiers'
    },
    lastUpdated: '2026-08-21T11:20:00Z',
    createdAt: '2026-02-10T10:00:00Z'
  },

  // 3. AI Agent Founder (Applicant - Needs Fit Review)
  {
    id: 'mem-003',
    name: 'Vikramaditya "Vik" Rao',
    email: 'vik@agentcraft.ai',
    phone: '4155550182',
    linkedinUrl: 'https://linkedin.com/in/vikramrao-agentcraft',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    company: 'AgentCraft AI',
    rawRole: 'Founder / Builder in Chief',
    standardizedRole: 'Founder & CEO',
    companyStage: 'Seed',
    location: 'Bengaluru, India / San Francisco, CA',
    programTrack: 'Offline Core',
    status: 'Scored',
    personaClassification: 'Emerging High-Velocity Founder',
    domains: ['AI / LLMs', 'Developer Tools', 'Autonomous Agents', 'Open Source'],
    asks: [
      'Tactical advice on US enterprise SOC2 Type II compliance & procurement',
      'Connecting with Series A lead investors who understand developer adoption',
      'Advice on transitioning from OSS to paid enterprise tier'
    ],
    gives: [
      'Top 5% open-source agent framework (14k GitHub Stars)',
      'Hands-on architecture reviews for low-latency LLM multi-agent orchestration',
      'Hiring pipeline of top-tier AI researchers in India'
    ],
    backingOrPedigree: 'Backed by Peak XV & angels ($2.8M Seed), IIT Madras CS Gold Medalist',
    rawNotes: 'Incredible Github traction. 14k stars in 4 months. Needs US GTM acceleration.',
    completenessScore: 92,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 89,
      pedigreeVelocity: 91,
      communityContribution: 88,
      networkSynergy: 89,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: [
        'Breakout open-source traction (14k stars) with strong venture backing',
        'Clear, high-value technical give in LLM agent orchestration',
        'Direct synergy with founders and operators who have conquered US enterprise GTM'
      ],
      suggestedNextStep: 'Approve Membership — Immediate match with SOC2 and Enterprise GTM mentors'
    },
    lastUpdated: '2026-08-24T16:00:00Z',
    createdAt: '2026-08-22T08:30:00Z'
  },

  // 4. Duplicate Profile A: Sarah Jenkins (Work Email)
  {
    id: 'mem-004',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@hyperionbio.com',
    phone: '+1 415-992-0193',
    linkedinUrl: 'https://linkedin.com/in/sarahjenkins-bio',
    twitterUrl: 'https://x.com/sjenk_ai',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    company: 'Hyperion Bio',
    rawRole: 'Co-founder & Chief Executive',
    standardizedRole: 'Founder & CEO',
    companyStage: 'Series A',
    location: 'Boston, MA',
    programTrack: 'Offline Core',
    status: 'Scored',
    personaClassification: 'Tier 1 Scaled Founder',
    domains: ['HealthTech AI', 'BioTech', 'Computational Biology', 'AI / LLMs'],
    asks: [
      'Recruiting VP of Engineering experienced with HIPAA-compliant data pipelines',
      'Introductions to US healthcare systems for pilot deployments'
    ],
    gives: [
      'Expertise in foundational models for proteomics and molecular design',
      'Angel checks ($25k-$50k) for frontier tech and deep tech founders',
      'Pitch deck and storytelling coaching for technical founders'
    ],
    backingOrPedigree: 'Khosla Ventures ($14M Series A), Ex-MIT Postdoc, Forbes 30u30',
    rawNotes: 'Applied via web referral from Aarav Singhania.',
    completenessScore: 96,
    missingFields: [],
    isDuplicate: true,
    duplicateGroupId: 'dup-grp-01',
    duplicateOfId: 'mem-005',
    duplicateReason: 'Duplicate applicant: Same person submitted two forms (personal & work email)',
    similarityScore: 94,
    fitScore: {
      overall: 93,
      pedigreeVelocity: 95,
      communityContribution: 91,
      networkSynergy: 92,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: [
        'Top-tier pedigree: Khosla-backed Series A with prestigious academic background',
        'Strong deep-tech representation with active angel check give profile',
        'Requires merging with personal email application before sending invite'
      ],
      suggestedNextStep: 'Merge with duplicate record #mem-005 and issue Offline Core membership'
    },
    lastUpdated: '2026-08-23T10:00:00Z',
    createdAt: '2026-08-20T11:00:00Z'
  },

  // 5. Duplicate Profile B: Sarah Jenkins (Personal Email & slight typo)
  {
    id: 'mem-005',
    name: 'Sarah J. Jenkins',
    email: 'sarah.jenkins.mit@gmail.com',
    phone: '415-992-0193',
    linkedinUrl: 'https://linkedin.com/in/sarahjenkins-bio',
    company: 'Hyperion Bio AI',
    rawRole: 'CEO & Founder',
    standardizedRole: 'Founder & CEO',
    companyStage: 'Series A',
    location: 'Boston / Cambridge, MA',
    programTrack: 'Offline Core',
    status: 'Raw',
    personaClassification: 'Tier 1 Scaled Founder',
    domains: ['BioTech', 'AI / LLMs'],
    asks: ['Hiring VP Eng'],
    gives: ['Angel investor, deep tech advisory'],
    backingOrPedigree: 'Khosla Ventures, MIT',
    rawNotes: 'Resubmitted form from mobile phone.',
    completenessScore: 68,
    missingFields: ['twitterUrl', 'detailed gives/asks'],
    isDuplicate: true,
    duplicateGroupId: 'dup-grp-01',
    duplicateOfId: 'mem-004',
    duplicateReason: 'Exact match on phone and LinkedIn, identical company and name variation',
    similarityScore: 94,
    fitScore: {
      overall: 90,
      pedigreeVelocity: 94,
      communityContribution: 86,
      networkSynergy: 90,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: ['Identified as duplicate of mem-004. High fit score preserved.'],
      suggestedNextStep: 'Merge into master record mem-004'
    },
    lastUpdated: '2026-08-24T09:15:00Z',
    createdAt: '2026-08-24T09:10:00Z'
  },

  // 6. Senior Engineering Executive (Encore Target)
  {
    id: 'mem-006',
    name: 'David K. Hoffman',
    email: 'david.hoffman@nexusscale.co',
    phone: '+1 (206) 555-8391',
    linkedinUrl: 'https://linkedin.com/in/davidhoffman-eng',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    company: 'Nexus Scale (Ex-Uber, Ex-AWS)',
    rawRole: 'VP Engineering / Infrastructure Lead',
    standardizedRole: 'VP of Engineering',
    companyStage: 'Series B+',
    location: 'Seattle, WA',
    programTrack: 'Encore',
    status: 'Accepted',
    personaClassification: 'Hypergrowth Operator (C-Suite/VP)',
    domains: ['Cloud Infra', 'Distributed Systems', 'Security', 'Engineering Leadership'],
    asks: [
      'Looking for opportunities to mentor first-time technical founders on scaling team from 10 to 80',
      'Exploring early angel investments in developer infrastructure'
    ],
    gives: [
      'Built and led 120+ person distributed engineering orgs at Uber and AWS',
      'Complete playbook for SOC2 Type II, ISO 27001, and enterprise security reviews',
      'Technical advisory for zero-downtime database migrations and multi-region infra'
    ],
    backingOrPedigree: 'Ex-Uber Director of Eng, Ex-AWS Principal Engineer, Carnegie Mellon MS CS',
    rawNotes: 'Willing to host technical infrastructure masterclasses for Offline founders.',
    completenessScore: 98,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 95,
      pedigreeVelocity: 94,
      communityContribution: 97,
      networkSynergy: 93,
      actionRecommendation: 'Direct to Encore (Executive)',
      reasoning: [
        'Top-tier engineering leadership background from Uber & AWS',
        'Direct answer to one of the most common founder asks: SOC2 compliance and engineering scale',
        'Generous give orientation with masterclass readiness'
      ],
      suggestedNextStep: 'Active Encore Member — Pair with Vik Rao (AgentCraft) and Aarav Singhania'
    },
    lastUpdated: '2026-08-22T14:00:00Z',
    createdAt: '2026-03-01T12:00:00Z'
  },

  // 7. High-Energy Growth Operator (The Offline Network / TON)
  {
    id: 'mem-007',
    name: 'Pooja Iyer',
    email: 'pooja@growthloop.agency',
    phone: '+91 98450 11982',
    linkedinUrl: 'https://linkedin.com/in/poojaiyer-growth',
    twitterUrl: 'https://x.com/pooja_growth',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    company: 'GrowthLoop Labs (Ex-Swiggy, Ex-Razorpay)',
    rawRole: 'Head of Growth & Acquisition',
    standardizedRole: 'Head of Growth',
    companyStage: 'Series A',
    location: 'Bengaluru, India',
    programTrack: 'The Offline Network (TON)',
    status: 'Scored',
    personaClassification: 'Hypergrowth Operator (C-Suite/VP)',
    domains: ['Growth & Marketing', 'Fintech', 'Consumer Tech', 'B2B SaaS'],
    asks: [
      'Seeking intros to US B2B SaaS founders looking to build offshore GTM and growth engineering pods in India',
      'Learning advanced AI-driven outbound automation stacks'
    ],
    gives: [
      'Scaled Razorpay SME acquisition from 5k to 100k merchants',
      'Comprehensive performance marketing and inbound attribution audits',
      'Introductions to top 1% growth and performance marketing talent in SEA'
    ],
    backingOrPedigree: 'Ex-Razorpay Growth Lead, IIM Bangalore MBA',
    rawNotes: 'High-energy operator, great networker in the Bengaluru ecosystem.',
    completenessScore: 92,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 87,
      pedigreeVelocity: 85,
      communityContribution: 90,
      networkSynergy: 86,
      actionRecommendation: 'Route to TON',
      reasoning: [
        'Impressive operational track record at India marquee unicorns (Razorpay/Swiggy)',
        'Extremely actionable growth give for early and growth stage founders',
        'Strong culture match for The Offline Network regional events'
      ],
      suggestedNextStep: 'Admit to TON — Connect with founders looking for growth experimentation playbooks'
    },
    lastUpdated: '2026-08-24T14:20:00Z',
    createdAt: '2026-08-21T07:45:00Z'
  },

  // 8. Incomplete Record (Needs AI Auto-Enrichment)
  {
    id: 'mem-008',
    name: 'Marcus Sterling',
    email: 'marcus@argus-security.dev',
    phone: '',
    linkedinUrl: 'https://linkedin.com/in/marcussterling-sec',
    company: 'Argus Security',
    rawRole: 'VPE / Co-Founder',
    standardizedRole: 'VP of Engineering',
    companyStage: 'Seed',
    location: 'London, UK',
    programTrack: 'Offline Core',
    status: 'Raw',
    personaClassification: 'Emerging High-Velocity Founder',
    domains: ['Security', 'DevTools'],
    asks: [], // Missing! Needs enrichment
    gives: [], // Missing! Needs enrichment
    backingOrPedigree: 'Accel London Seed, Ex-Palantir',
    rawNotes: 'Brief application from website: "Hey, looking to connect with founders building in enterprise security."',
    completenessScore: 45,
    missingFields: ['phone', 'asks', 'gives', 'twitterUrl'],
    isDuplicate: false,
    fitScore: {
      overall: 78,
      pedigreeVelocity: 86,
      communityContribution: 65,
      networkSynergy: 82,
      actionRecommendation: 'Interview Required',
      reasoning: [
        'Strong pedigree signal (Accel backed, Ex-Palantir)',
        'Missing critical Give/Ask details for accurate relationship routing',
        'Profile requires automated web enrichment before final admission decision'
      ],
      suggestedNextStep: 'Trigger AI Auto-Enrichment to parse LinkedIn & company website'
    },
    lastUpdated: '2026-08-25T08:00:00Z',
    createdAt: '2026-08-25T07:30:00Z'
  },

  // 9. Angel / Super-Operator Profile
  {
    id: 'mem-009',
    name: 'Nisha Sundaram',
    email: 'nisha@capitolventures.xyz',
    phone: '+1 415 672 9011',
    linkedinUrl: 'https://linkedin.com/in/nishasundaram-invest',
    twitterUrl: 'https://x.com/nisha_capitol',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'Capitol Ventures & Angel Syndicate',
    rawRole: 'Managing Partner & Angel Operator',
    standardizedRole: 'Angel / Super-Operator',
    companyStage: 'Public/Exited',
    location: 'San Francisco, CA',
    programTrack: 'Offline Core',
    status: 'Accepted',
    personaClassification: 'Angel / Super-Operator',
    domains: ['Fintech', 'B2B SaaS', 'AI / LLMs', 'Venture Capital'],
    asks: [
      'Early access to pre-seed and seed stage AI infrastructure and B2B SaaS founders',
      'Connecting with senior tech operators looking to syndicate angel checks'
    ],
    gives: [
      'Writes $50k-$100k angel checks (deployed $2M+ across 30+ startups)',
      'Board-level governance advice and US institutional Series A pitch prep',
      'High-bandwidth network across Silicon Valley Tier-1 venture funds'
    ],
    backingOrPedigree: 'Exited founder (Acquired by Cisco $85M), 32 active angel investments',
    rawNotes: 'Key community benefactor. Highly rated for warm investor intros.',
    completenessScore: 100,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 97,
      pedigreeVelocity: 96,
      communityContribution: 98,
      networkSynergy: 97,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: [
        'Exceptional community value catalyst: high-conviction angel checks and institutional VC bridges',
        'Proven founder exit track record (Cisco acquisition)',
        'Extremely active super-connector persona'
      ],
      suggestedNextStep: 'Active Member — Immediate pairing with seed-stage founders preparing Series A'
    },
    lastUpdated: '2026-08-20T10:00:00Z',
    createdAt: '2026-01-10T14:00:00Z'
  },

  // 10. Low-fit / Service Provider Applicant (To test automated filtering/rejection)
  {
    id: 'mem-010',
    name: 'Chadwick "Chad" Miller',
    email: 'chad@bluestone-outsourcing.biz',
    phone: '+1 312 990 1234',
    linkedinUrl: 'https://linkedin.com/in/chadwickmiller-sales',
    company: 'BlueStone Dev Staffing Agency',
    rawRole: 'Business Development Director',
    standardizedRole: 'Sales / Business Development',
    companyStage: 'Enterprise',
    location: 'Chicago, IL',
    programTrack: 'General Applicant',
    status: 'Scored',
    personaClassification: 'Domain Specialist',
    domains: ['Sales & BD', 'IT Services', 'Staffing'],
    asks: [
      'Sell offshore software development hours to venture-backed startups',
      'Find founders looking to outsource their MVP'
    ],
    gives: [
      'Discounts on hourly dev contracts for seed stage founders'
    ],
    backingOrPedigree: 'Agency sales rep, no founder or top-tier tech operator experience',
    rawNotes: 'Agency sales pitch disguised as community application.',
    completenessScore: 88,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 38,
      pedigreeVelocity: 25,
      communityContribution: 20,
      networkSynergy: 30,
      actionRecommendation: 'Polite Decline',
      reasoning: [
        'Commercial vendor profile violating the peer-to-peer founder/operator ethos',
        'Gives are purely promotional sales pitches rather than peer mentorship or capital',
        'Low network synergy: likely to generate unsolicited sales outreach to members'
      ],
      suggestedNextStep: 'Send automated polite rejection email with standard waitlist language'
    },
    lastUpdated: '2026-08-24T18:00:00Z',
    createdAt: '2026-08-24T17:40:00Z'
  },

  // 11. Duplicate Profile C: Arjun Mehta (Personal email vs corporate)
  {
    id: 'mem-011',
    name: 'Arjun Mehta',
    email: 'arjun@layerzero-ai.com',
    phone: '+91 99887 66554',
    linkedinUrl: 'https://linkedin.com/in/arjunmehta-lz',
    twitterUrl: 'https://x.com/arjun_lz',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    company: 'LayerZero Voice AI',
    rawRole: 'Co-founder & Chief AI Officer',
    standardizedRole: 'Founder & CTO',
    companyStage: 'Seed',
    location: 'Bengaluru, India',
    programTrack: 'Offline Core',
    status: 'Enriched',
    personaClassification: 'Emerging High-Velocity Founder',
    domains: ['AI / LLMs', 'Voice AI', 'Enterprise B2B', 'Speech Tech'],
    asks: [
      'Advice on enterprise SLA contracts and latency optimization for real-time streaming voice',
      'Introductions to US design partners in healthcare and insurance contact centers'
    ],
    gives: [
      'Fine-tuning SOTA speech models with sub-200ms glass-to-glass latency',
      'Introductions to top generative AI engineers across India',
      '$20k angel checks in frontier multimodal tech'
    ],
    backingOrPedigree: 'Lightspeed India & Nexus VP ($3.5M Seed), Ex-Google Brain Resident',
    rawNotes: 'Exceptional voice model demo. High founder empathy.',
    completenessScore: 96,
    missingFields: [],
    isDuplicate: true,
    duplicateGroupId: 'dup-grp-02',
    duplicateOfId: 'mem-012',
    duplicateReason: 'Duplicate applicant with personal Gmail submission',
    similarityScore: 92,
    fitScore: {
      overall: 91,
      pedigreeVelocity: 93,
      communityContribution: 89,
      networkSynergy: 92,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: [
        'Ex-Google Brain researcher with breakthrough real-time voice latency',
        'Backed by Tier-1 VCs (Lightspeed & Nexus)',
        'Requires merging duplicate profile before finalizing onboarding'
      ],
      suggestedNextStep: 'Merge with mem-012 and issue Offline Core welcome packet'
    },
    lastUpdated: '2026-08-23T15:00:00Z',
    createdAt: '2026-08-20T14:10:00Z'
  },

  // 12. Duplicate Profile D: Arjun Mehta (Gmail version with missing fields)
  {
    id: 'mem-012',
    name: 'Arjun M.',
    email: 'arjunmehta.ai@gmail.com',
    phone: '9988766554',
    linkedinUrl: 'https://linkedin.com/in/arjunmehta-lz',
    company: 'LayerZero Voice',
    rawRole: 'CTO',
    standardizedRole: 'Founder & CTO',
    companyStage: 'Seed',
    location: 'Bangalore',
    programTrack: 'Offline Core',
    status: 'Raw',
    personaClassification: 'Emerging High-Velocity Founder',
    domains: ['Voice AI', 'AI'],
    asks: ['Enterprise customers'],
    gives: ['Voice tech advice'],
    backingOrPedigree: 'Lightspeed',
    rawNotes: 'Short mobile form.',
    completenessScore: 60,
    missingFields: ['avatarUrl', 'detailed gives/asks', 'twitterUrl'],
    isDuplicate: true,
    duplicateGroupId: 'dup-grp-02',
    duplicateOfId: 'mem-011',
    duplicateReason: 'Matches LinkedIn, partial name match, identical phone number',
    similarityScore: 92,
    fitScore: {
      overall: 88,
      pedigreeVelocity: 91,
      communityContribution: 82,
      networkSynergy: 89,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: ['Identified as duplicate of mem-011.'],
      suggestedNextStep: 'Merge into master record mem-011'
    },
    lastUpdated: '2026-08-24T12:00:00Z',
    createdAt: '2026-08-24T11:50:00Z'
  },

  // 13. Fintech Bootstrapped Founder (High Pedigree & Contribution)
  {
    id: 'mem-013',
    name: 'Devika Sharma',
    email: 'devika@reconcilehq.com',
    phone: '+1 415 882 1099',
    linkedinUrl: 'https://linkedin.com/in/devikasharma-fin',
    twitterUrl: 'https://x.com/devika_fin',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    company: 'ReconcileHQ',
    rawRole: 'CEO and Co-founder',
    standardizedRole: 'Founder & CEO',
    companyStage: 'Bootstrapped',
    location: 'San Francisco, CA',
    programTrack: 'Offline Core',
    status: 'Accepted',
    personaClassification: 'Tier 1 Scaled Founder',
    domains: ['Fintech', 'B2B SaaS', 'Accounting Automation', 'Enterprise'],
    asks: [
      'Exploring whether to raise institutional Series A or continue profitable bootstrapping',
      'Hiring Head of Enterprise Sales with experience closing 6-figure ACV deals'
    ],
    gives: [
      'Bootstrapped from $0 to $3.8M ARR with 85% gross margins and 14-person team',
      'Masterclass on hyper-efficient inbound marketing & organic SEO acquisition',
      'Direct introductions to CFOs and finance leaders in mid-market tech companies'
    ],
    backingOrPedigree: 'Self-funded, $3.8M ARR profitable, Ex-McKinsey',
    rawNotes: 'Unbelievably sharp operator. Super high signal bootstrap story.',
    completenessScore: 98,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 95,
      pedigreeVelocity: 94,
      communityContribution: 96,
      networkSynergy: 95,
      actionRecommendation: 'Fast-track Accept (Offline)',
      reasoning: [
        'Exceptional business fundamentals ($3.8M profitable ARR with tiny lean team)',
        'Rare, highly valuable give profile on capital efficiency and inbound customer acquisition',
        'Strong peer dynamic for both venture-backed and bootstrapped founders'
      ],
      suggestedNextStep: 'Active Member — Host founder salon on Capital-Efficient Scaling'
    },
    lastUpdated: '2026-08-21T18:00:00Z',
    createdAt: '2026-02-15T09:30:00Z'
  },

  // 14. Senior CPO from Scaleup (Encore Candidate)
  {
    id: 'mem-014',
    name: 'Julian Vance',
    email: 'julian@vanceadvisory.com',
    phone: '+44 20 7946 0912',
    linkedinUrl: 'https://linkedin.com/in/julianvance-cpo',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    company: 'Ex-Revolut, Ex-Wise',
    rawRole: 'Former Chief Product Officer / Board Advisor',
    standardizedRole: 'Chief Product Officer',
    companyStage: 'Public/Exited',
    location: 'London, UK',
    programTrack: 'Encore',
    status: 'Scored',
    personaClassification: 'Hypergrowth Operator (C-Suite/VP)',
    domains: ['Fintech', 'Product Strategy', 'International Expansion', 'Consumer Tech'],
    asks: [
      'Looking for 2 early-stage AI/Fintech startups to take on as a retained board advisor',
      'Connecting with European founders scaling into the US market'
    ],
    gives: [
      'Scaled Revolut product org from 40 to 450 people during hypergrowth',
      'Deep expertise in FCA / regulatory licensing and multi-currency banking rails',
      'Angel checks (£25k-£50k) through personal family office'
    ],
    backingOrPedigree: 'Ex-Revolut CPO, Ex-Wise Product Director, Cambridge Math',
    rawNotes: 'Anchor for Encore London expansion. Stellar reputation.',
    completenessScore: 96,
    missingFields: [],
    isDuplicate: false,
    fitScore: {
      overall: 96,
      pedigreeVelocity: 95,
      communityContribution: 97,
      networkSynergy: 95,
      actionRecommendation: 'Direct to Encore (Executive)',
      reasoning: [
        'Marquee European tech operator (scaled Revolut and Wise)',
        'Enormous mentorship and advisory value for scaling Fintech founders',
        'Active angel investor with global regulatory expertise'
      ],
      suggestedNextStep: 'Admit to Encore — Match with Devika Sharma and Elena Rostova'
    },
    lastUpdated: '2026-08-25T09:00:00Z',
    createdAt: '2026-08-24T16:00:00Z'
  },

  // 15. Incomplete Profile 2 (Needs AI Auto-Enrichment)
  {
    id: 'mem-015',
    name: 'Tara Chen',
    email: 'tara@omnisearch.ai',
    linkedinUrl: 'https://linkedin.com/in/tarachen-search',
    company: 'OmniSearch AI',
    rawRole: 'Chief Hustler & CEO',
    standardizedRole: 'Founder & CEO',
    companyStage: 'Pre-Seed',
    location: 'San Francisco, CA',
    programTrack: 'Offline Core',
    status: 'Raw',
    personaClassification: 'Emerging High-Velocity Founder',
    domains: ['AI / LLMs', 'Enterprise Search'],
    asks: [],
    gives: [],
    backingOrPedigree: 'YC S24, Stanford AI Lab',
    rawNotes: 'Quick note: "Stanford PhD dropout building enterprise neuro-symbolic search."',
    completenessScore: 50,
    missingFields: ['phone', 'asks', 'gives', 'twitterUrl'],
    isDuplicate: false,
    fitScore: {
      overall: 82,
      pedigreeVelocity: 88,
      communityContribution: 72,
      networkSynergy: 84,
      actionRecommendation: 'Interview Required',
      reasoning: [
        'Strong pedigree markers (YC S24 + Stanford AI Lab)',
        'Needs AI enrichment to extract concrete asks and gives for matchmaking'
      ],
      suggestedNextStep: 'Auto-enrich profile and schedule 15-min Founder interview'
    },
    lastUpdated: '2026-08-25T09:30:00Z',
    createdAt: '2026-08-25T09:10:00Z'
  }
];
