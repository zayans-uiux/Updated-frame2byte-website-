export type BusinessCategory =
  | 'Restaurant/F&B'
  | 'E-commerce'
  | 'SaaS'
  | 'Creator'
  | 'Personal Brand'
  | 'Local Business'
  | 'Startup'
  | 'Other';

export interface VerifiedAccountInfo {
  username: string;
  handle: string;
  fullName: string;
  profileUrl: string;
  avatarUrl?: string;
  followers?: string | null;
  following?: string | null;
  postsCount?: string | null;
  bio?: string;
  externalUrl?: string | null;
  isVerifiedBadge?: boolean;
  businessCategory: BusinessCategory;
  categoryWeightingNote: string;
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

export interface ProfileCustomerViewAnalysis {
  metrics: CompactProfileMetric[];
  genericAiWordingDetected: boolean;
  genericWordingNote?: string;
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
}

export interface GrowthOpportunity {
  priority: 1 | 2 | 3;
  title: string;
  explanation: string;
  tag?: string;
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
  profileAnalysis: ProfileCustomerViewAnalysis;
  reelAnalysis?: ReelAnalysisData;
  hasVerifiedReelMetrics: boolean;
  nextSteps: PracticalNextStep[];
  helpHeadline: string;
  helpSentence: string;
}
