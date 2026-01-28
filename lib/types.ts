// Types for the Youth Flourishing Report App

export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

export type ResponseValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface UserInfo {
  name: string;
  email: string;
  age: number;
  gender: Gender;
  location: string;
  isStudent: boolean;
  isEmployed: boolean;
}

export interface Question {
  id: number;
  text: string;
  domainId: string;
  // Optional: some questions have specific interpretation notes
  genderSpecific?: 'male' | 'female';
  contextNote?: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  questions: Question[];
  flourishingThreshold: number; // Minimum "agree/strongly agree" responses needed
}

export interface QuestionResponse {
  questionId: number;
  value: ResponseValue;
}

export interface DomainResult {
  domainId: string;
  domainName: string;
  averageScore: number;
  totalQuestions: number;
  agreeCount: number; // Count of responses >= 5 (Agree or Strongly Agree)
  flourishingThreshold: number;
  isFlourishing: boolean;
  responses: QuestionResponse[];
}

export interface ContextualFactors {
  isStudent: boolean;
  isEmployed: boolean;
  basicNeedsMet: boolean; // Derived from context questions
  survivalStressLevel: 'stable' | 'moderate' | 'survival';
}

export interface ReportData {
  userInfo: UserInfo;
  contextualFactors: ContextualFactors;
  domainResults: DomainResult[];
  overallScore: number; // Percentage 0-100
  flourishingDomains: number;
  languishingDomains: number;
  generatedAt: Date;
  aiInsights?: AIInsights;
}

// Structured recommendation with choice architecture
export interface StructuredRecommendation {
  id: number;
  category: string;
  score?: number;
  text: string;
  options: string[];
  actionStep: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: 'article' | 'video' | 'pdf' | 'book' | 'story';
  reason?: string; // Personalized reason why this is recommended
  domain?: string; // Which domain this addresses
}

export interface AIInsights {
  summary: string;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[]; // Backward compatibility (text format)
  structuredRecommendations?: StructuredRecommendation[]; // New structured format
  recommendedResources?: ResourceLink[]; // Recommended resources
  interDomainInsight?: string;
  personalNote: string;
  growthTrajectory?: string;
}

// Response labels for display
export const RESPONSE_LABELS: Record<ResponseValue, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Somewhat Disagree',
  4: 'Somewhat Agree',
  5: 'Agree',
  6: 'Strongly Agree',
};
