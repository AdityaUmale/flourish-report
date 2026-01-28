import { DomainResult, QuestionResponse, ReportData, UserInfo, ContextualFactors, ResponseValue } from './types';
import { DOMAINS, CONTEXT_QUESTIONS } from './questionnaire';

/**
 * Calculate results for a single domain
 */
export function calculateDomainResult(
    domainId: string,
    responses: QuestionResponse[]
): DomainResult {
    const domain = DOMAINS.find(d => d.id === domainId);
    if (!domain) {
        throw new Error(`Domain not found: ${domainId}`);
    }

    const domainResponses = responses.filter(r =>
        domain.questions.some(q => q.id === r.questionId)
    );

    const totalQuestions = domain.questions.length;
    const averageScore = domainResponses.length > 0
        ? domainResponses.reduce((sum, r) => sum + r.value, 0) / domainResponses.length
        : 0;

    // Count responses that are "Agree" (5) or "Strongly Agree" (6)
    const agreeCount = domainResponses.filter(r => r.value >= 5).length;
    const isFlourishing = agreeCount >= domain.flourishingThreshold;

    return {
        domainId: domain.id,
        domainName: domain.name,
        averageScore: Math.round(averageScore * 100) / 100,
        totalQuestions,
        agreeCount,
        flourishingThreshold: domain.flourishingThreshold,
        isFlourishing,
        responses: domainResponses,
    };
}

/**
 * Calculate contextual factors from context question responses
 */
export function calculateContextualFactors(
    responses: QuestionResponse[],
    userInfo: UserInfo
): ContextualFactors {
    const contextResponses = responses.filter(r =>
        CONTEXT_QUESTIONS.some(q => q.id === r.questionId)
    );

    // Calculate average of context questions (basic needs)
    const avgContextScore = contextResponses.length > 0
        ? contextResponses.reduce((sum, r) => sum + r.value, 0) / contextResponses.length
        : 6; // Default to stable if no context questions

    // Determine survival stress level
    let survivalStressLevel: 'stable' | 'moderate' | 'survival';
    if (avgContextScore >= 4.5) {
        survivalStressLevel = 'stable';
    } else if (avgContextScore >= 3) {
        survivalStressLevel = 'moderate';
    } else {
        survivalStressLevel = 'survival';
    }

    return {
        isStudent: userInfo.isStudent,
        isEmployed: userInfo.isEmployed,
        isBusinessOwner: userInfo.isBusinessOwner,
        isUnemployed: userInfo.isUnemployed,
        basicNeedsMet: avgContextScore >= 4,
        survivalStressLevel,
    };
}

/**
 * Calculate overall flourishing score as a percentage
 */
export function calculateOverallScore(domainResults: DomainResult[]): number {
    if (domainResults.length === 0) return 0;

    // Average of all domain averages, converted to percentage
    const totalAverage = domainResults.reduce((sum, d) => sum + d.averageScore, 0) / domainResults.length;
    // Convert 1-6 scale to 0-100 percentage
    const percentage = ((totalAverage - 1) / 5) * 100;
    return Math.round(percentage * 100) / 100;
}

/**
 * Generate complete report data from responses
 */
export function generateReportData(
    userInfo: UserInfo,
    responses: QuestionResponse[]
): ReportData {
    const domainResults = DOMAINS.map(domain =>
        calculateDomainResult(domain.id, responses)
    );

    const contextualFactors = calculateContextualFactors(responses, userInfo);
    const overallScore = calculateOverallScore(domainResults);
    const flourishingDomains = domainResults.filter(d => d.isFlourishing).length;
    const languishingDomains = domainResults.filter(d => !d.isFlourishing).length;

    return {
        userInfo,
        contextualFactors,
        domainResults,
        overallScore,
        flourishingDomains,
        languishingDomains,
        generatedAt: new Date(),
    };
}

/**
 * Get response label for display
 */
export function getResponseLabel(value: ResponseValue): string {
    const labels: Record<ResponseValue, string> = {
        1: 'Strongly Disagree',
        2: 'Disagree',
        3: 'Somewhat Disagree',
        4: 'Somewhat Agree',
        5: 'Agree',
        6: 'Strongly Agree',
    };
    return labels[value];
}

/**
 * Get color class based on score (1-6)
 */
export function getScoreColor(score: number): string {
    if (score >= 5) return 'text-emerald-500';
    if (score >= 4) return 'text-amber-500';
    if (score >= 3) return 'text-orange-500';
    return 'text-red-500';
}

/**
 * Get background color class based on flourishing status
 */
export function getFlourishingBgColor(isFlourishing: boolean): string {
    return isFlourishing ? 'bg-emerald-500/10' : 'bg-amber-500/10';
}

/**
 * Format score for display (e.g., 4.5 -> "4.5/6")
 */
export function formatScore(score: number): string {
    return `${score.toFixed(1)}/6`;
}

/**
 * Format percentage for display
 */
export function formatPercentage(percentage: number): string {
    return `${percentage.toFixed(1)}%`;
}
