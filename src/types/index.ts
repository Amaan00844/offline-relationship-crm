export type ProgramTrack = 'Offline Core' | 'Encore' | 'The Offline Network (TON)' | 'General Applicant';

export type ApplicationStatus = 'Raw' | 'Cleaned' | 'Enriched' | 'Scored' | 'Accepted' | 'Waitlisted' | 'Declined';

export type PersonaClassification = 
  | 'Tier 1 Scaled Founder'
  | 'Hypergrowth Operator (C-Suite/VP)'
  | 'Angel / Super-Operator'
  | 'Emerging High-Velocity Founder'
  | 'Domain Specialist';

export type CompanyStage = 
  | 'Pre-Seed'
  | 'Seed'
  | 'Series A'
  | 'Series B+'
  | 'Public/Exited'
  | 'Bootstrapped'
  | 'Enterprise';

export interface FitScoreBreakdown {
  overall: number; // 0-100
  pedigreeVelocity: number; // 0-100
  communityContribution: number; // 0-100
  networkSynergy: number; // 0-100
  actionRecommendation: 
    | 'Fast-track Accept (Offline)'
    | 'Direct to Encore (Executive)'
    | 'Route to TON'
    | 'Interview Required'
    | 'Polite Decline';
  reasoning: string[];
  suggestedNextStep: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  avatarUrl?: string;
  company: string;
  rawRole: string;
  standardizedRole: string;
  companyStage: CompanyStage;
  location: string;
  programTrack: ProgramTrack;
  status: ApplicationStatus;
  personaClassification: PersonaClassification;
  domains: string[];
  asks: string[];
  gives: string[];
  backingOrPedigree?: string;
  rawNotes?: string;
  completenessScore: number; // 0-100
  missingFields: string[];
  isDuplicate: boolean;
  duplicateGroupId?: string;
  duplicateOfId?: string;
  duplicateReason?: string;
  similarityScore?: number;
  fitScore: FitScoreBreakdown;
  matchmakingHistory?: string[];
  lastUpdated: string;
  createdAt: string;
}

export interface DuplicateMatchGroup {
  groupId: string;
  confidence: number;
  reason: string;
  records: MemberProfile[];
  recommendedMasterRecordId: string;
}

export interface MatchSuggestion {
  id: string;
  memberA: MemberProfile;
  memberB: MemberProfile;
  matchScore: number; // 0-100
  matchThesis: string;
  complementaryPairs: {
    need: string;
    offeredBy: string;
    giverName: string;
    receiverName: string;
  }[];
  sharedDomains: string[];
  suggestedIcebreaker: string;
  draftIntroEmail: {
    subject: string;
    blurbForA: string;
    blurbForB: string;
    fullJointEmail: string;
  };
  status: 'Pending Review' | 'Accepted & Sent' | 'Dismissed';
  createdAt: string;
}

export interface NetworkQueryInsight {
  query: string;
  intent: string;
  summary: string;
  matchedMemberIds: string[];
  suggestedActions: string[];
  recommendedIntros?: { memberAId: string; memberBId: string; reason: string }[];
}

export interface SystemStats {
  totalProfiles: number;
  activeMembers: number;
  pendingReview: number;
  duplicatesDetected: number;
  averageFitScore: number;
  highValueMatchesAvailable: number;
  enrichmentQualityScore: number;
}
