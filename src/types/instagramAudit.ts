export type AccountType =
  | 'Product Brand'
  | 'Service Business'
  | 'SaaS / Startup'
  | 'E-commerce'
  | 'Restaurant / Café / Food Brand'
  | 'Local Business'
  | 'Personal Brand'
  | 'Content Creator'
  | 'Coach / Educator'
  | 'Artist / Creative'
  | 'Account type could not be confidently determined'
  | 'Other';

export type PrimaryOffering =
  | 'Physical products'
  | 'Services'
  | 'Digital products'
  | 'Software/SaaS'
  | 'Food/beverages'
  | 'Local services'
  | 'Content/Attention';

export type BusinessCategory =
  | 'Restaurant/F&B'
  | 'E-commerce'
  | 'SaaS'
  | 'Creator'
  | 'Personal Brand'
  | 'Local Business'
  | 'Startup'
  | 'Service Business'
  | 'Product Brand'
  | 'Coach/Educator'
  | 'Artist/Creative'
  | 'Other';

export interface VerifiedInstagramData {
  requestedUsername: string;
  verifiedUsername: string;
  accountName: string;
  bio: string | null;
  website: string | null;
  category: string | null;
  media: string[];
  captions: string[];
  highlights: string[];
  metrics: {
    followers?: string | null;
    following?: string | null;
    postsCount?: string | null;
  };
}

export interface VerifiedAccountInfo {
  username: string;
  handle: string;
  fullName: string;
  profileUrl: string;
  avatarUrl?: string;
  followers?: string | null;
  following?: string | null;
  postsCount?: string | null;
  bio?: string | null;
  externalUrl?: string | null;
  isVerifiedBadge?: boolean;
  businessCategory: BusinessCategory;
  accountType?: AccountType;
  primaryOffering?: PrimaryOffering;
  categoryWeightingNote: string;
  classificationEvidence?: string[];
  verifiedDataPoints?: string[];
}

export interface FrameScoreBreakdown {
  profileIdentity: number;
  contentStrategy: number;
  reelPerformance: number;
  engagement: number;
  consistency: number;
  brandPresentation: number;
  overallScore: number;
  scoreStatus: 'MARKET LEADER' | 'STRONG BASELINE' | 'NEEDS HOOK ARCHITECTURE' | 'CRITICAL BOTTLENECK';
}

export interface CompactProfileMetric {
  label: string;
  score: number;
  insight: string;
}

export type BioVulnerabilityType =
  | 'VAGUE_POSITIONING'
  | 'TOO_LONG'
  | 'CONFUSING'
  | 'WEAK_CTA'
  | 'GENERIC_LANGUAGE'
  | 'TOO_CASUAL'
  | 'MISSING_VALUE_PROP'
  | 'MISSING_TRUST_SIGNAL'
  | 'NONE';

export interface ProfileCustomerViewAnalysis {
  metrics: CompactProfileMetric[];
  genericAiWordingDetected: boolean;
  genericWordingNote?: string;
  bioVulnerabilityType?: BioVulnerabilityType;
  bioVulnerabilityDetail?: string;
  visualConsistencyScore?: number;
  visualConsistencyNote?: string;
}

export interface ReelAnalysisData {
  hasVerifiedReelMetrics: boolean;
  reelsAnalyzed?: number;
  averageViews?: string;
  medianViews?: string;
  highestPerformingReel?: string;
  recentPerformance?: string;
  reelConsistency?: string;
  reelPerformanceScore: number;
  contentToOfferAlignment?: 'STRONG' | 'PARTIAL' | 'DISCONNECTED';
  alignmentNote?: string;
}

export type VulnerabilityPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface GrowthOpportunity {
  priority: number;
  priorityLevel?: VulnerabilityPriority;
  category: string;
  title: string;
  diagnosis: string;
  observation?: string;
  opportunity?: string;
  whyItMatters?: string;
  explanation?: string;
}

export interface PracticalNextStep {
  stepNumber: number;
  action: string;
  detail: string;
  timeframe?: string;
}

export interface StructuredDiagnosticReport {
  accountVerified: VerifiedAccountInfo;
  frameScore: FrameScoreBreakdown;
  whatsWorking: string[];
  growthOpportunities: GrowthOpportunity[];
  noIssuesDetected?: boolean;
  profileAnalysis: ProfileCustomerViewAnalysis;
  reelAnalysis?: ReelAnalysisData;
  hasVerifiedReelMetrics: boolean;
  nextSteps: PracticalNextStep[];
  helpHeadline: string;
  helpSentence: string;
  rawVerifiedData?: VerifiedInstagramData;
}
