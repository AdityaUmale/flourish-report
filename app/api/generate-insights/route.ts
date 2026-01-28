import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ReportData, AIInsights, StructuredRecommendation, ResourceLink } from '@/lib/types';
import { CORE_RESOURCES } from '@/lib/nirman-resources';

export async function POST(request: NextRequest) {
    try {
        const reportData: ReportData = await request.json();

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { userInfo, contextualFactors, domainResults, overallScore, flourishingDomains, languishingDomains } = reportData;

        // Robust ID normalization to prevent pattern matching errors
        const normalizeId = (id: string) => id.toLowerCase().replace(/\s+/g, '-');

        const domainSummary = domainResults.map(d =>
            `${d.domainName}: ${d.averageScore.toFixed(1)}/6 (${d.isFlourishing ? 'Flourishing' : 'Languishing'})`
        ).join('\n');

        const flourishingList = domainResults.filter(d => d.isFlourishing).map(d => d.domainName);
        const languishingList = domainResults.filter(d => !d.isFlourishing).map(d => d.domainName);

        // Map normalized IDs to scores for pattern checks
        const domainScores: Record<string, number> = {};
        domainResults.forEach(d => {
            domainScores[normalizeId(d.domainId)] = d.averageScore;
        });

        const sortedDomains = [...domainResults].sort((a, b) => a.averageScore - b.averageScore);
        const lowestDomain = sortedDomains[0];
        const secondLowest = sortedDomains[1];
        const highestDomain = sortedDomains[sortedDomains.length - 1];
        const veryLowDomains = domainResults.filter(d => d.averageScore < 3.0);

        // Build life stage context
        let lifeStageContext = '';
        if (contextualFactors.isStudent && !contextualFactors.isEmployed) {
            lifeStageContext = 'FULL-TIME STUDENT - Professional and financial scores should be interpreted with developmental leniency.';
        } else if (contextualFactors.isStudent && contextualFactors.isEmployed) {
            lifeStageContext = 'WORKING STUDENT - Balancing education and work. Acknowledge time constraints.';
        } else if (!contextualFactors.isStudent && contextualFactors.isEmployed) {
            lifeStageContext = 'WORKING PROFESSIONAL - Career and financial domains are relevant benchmarks.';
        } else {
            lifeStageContext = 'TRANSITIONING - Focus on potential and transferable strengths.';
        }

        // Build survival-first context
        let survivalContext = '';
        if (!contextualFactors.basicNeedsMet || contextualFactors.survivalStressLevel === 'survival') {
            survivalContext = 'SURVIVAL-FIRST: User has unmet basic needs. Only recommend FREE, micro-commitment activities.';
        } else if (contextualFactors.survivalStressLevel === 'moderate') {
            survivalContext = 'MODERATE STRESS: Balance encouragement with realistic recommendations.';
        }

        // Inter-domain pattern detection with normalized IDs
        const patterns: string[] = [];

        const psychScore = domainScores['psychological-wellbeing'] || domainScores['psychological-well-being'] || 0;
        const profScore = domainScores['professional-development'] || domainScores['career'] || 0;
        const charScore = domainScores['character-development'] || 0;
        const lifeScore = domainScores['life-skills'] || 0;
        const physScore = domainScores['physical-health'] || 0;
        const socialScore = domainScores['social-relationships'] || 0;
        const contribScore = domainScores['social-contribution'] || 0;

        if (psychScore >= 4 && profScore < 3.5) {
            patterns.push(`Your Psychological Well-being (${psychScore.toFixed(1)}/6) shows resilience that can support Professional Development (${profScore.toFixed(1)}/6).`);
        }

        if ((charScore >= 4 || lifeScore >= 4) && (profScore < 3.5 || contribScore < 3.5)) {
            const strongScore = Math.max(charScore, lifeScore);
            patterns.push(`Your strong Character/Life Skills (${strongScore.toFixed(1)}/6) act as stabilizers for growth in weaker areas.`);
        }

        if (physScore < 3 && psychScore < 3.5) {
            patterns.push(`Physical Health (${physScore.toFixed(1)}/6) and Psychological Well-being (${psychScore.toFixed(1)}/6) may be interconnected.`);
        }

        if (socialScore >= 4 && charScore >= 4) {
            patterns.push(`Strong Social Relationships (${socialScore.toFixed(1)}/6) + Character (${charScore.toFixed(1)}/6) create a powerful growth foundation.`);
        }

        const patternSummary = patterns.length > 0 ? patterns.join(' ') : '';

        const prompt = `You are a compassionate, insightful flourishing coach analyzing a youth's well-being assessment.

## USER IDENTITY & CONTEXT
- Name: ${userInfo.name}
- Age: ${userInfo.age}
- Gender: ${userInfo.gender}
- Life Stage: ${lifeStageContext}
${survivalContext ? `- Note: ${survivalContext}` : ''}

## ASSESSMENT RESULTS
- Overall Score: ${overallScore.toFixed(1)}%
- Flourishing: ${flourishingDomains}/7 domains
- Needs Attention: ${languishingDomains}/7 domains
- Lowest Domain: ${lowestDomain.domainName} (${lowestDomain.averageScore.toFixed(1)}/6)
- Highest Domain: ${highestDomain.domainName} (${highestDomain.averageScore.toFixed(1)}/6)

### Domain Breakdown:
${domainSummary}

### Flourishing Areas: ${flourishingList.join(', ') || 'None'}
### Areas Needing Attention: ${languishingList.join(', ') || 'None'}

${patternSummary ? `### Pattern Observed: ${patternSummary}` : ''}

## CRITICAL INSTRUCTION: CHOICE ARCHITECTURE
For recommendations, you MUST provide "Choice Architecture" - give users 3 distinct, small options to choose from.
This reduces cognitive load and increases likelihood of action.

For very low scores (< 3.0), start with AWARENESS (reading/learning), not action.
For flourishing domains, suggest MAINTENANCE or MENTORING, not improvement.

## OUTPUT FORMAT
Generate valid JSON matching this schema EXACTLY:

{
  "summary": "3-4 sentences: acknowledge ${userInfo.name}'s life stage, celebrate their strength in ${highestDomain.domainName}, and mention one inter-domain connection.",
  "strengths": [
    "Reference ${highestDomain.domainName} as a strength (WITHOUT numeric scores like X/6)",
    "A pattern or combination strength observed from the data"
  ],
  "growthAreas": [
    "Primary: ${lowestDomain.domainName} with contextual framing (if student, add 'This is expected for your stage')",
    "Secondary: ${secondLowest.domainName} with encouraging reframe"
  ],
  "recommendations": [
    {
      "id": 1,
      "category": "${lowestDomain.domainName}",
      "score": ${lowestDomain.averageScore.toFixed(1)},
      "text": "${lowestDomain.averageScore < 3 ? 'Start by exploring this area:' : 'Build momentum in this area:'}",
      "options": ["Specific option A", "Specific option B", "Specific option C"],
      "actionStep": "${lowestDomain.averageScore < 3 ? 'This week, read ONE article about your choice' : 'Try one small action this week'}"
    },
    {
      "id": 2,
      "category": "${secondLowest.domainName}",
      "score": ${secondLowest.averageScore.toFixed(1)},
      "text": "Leverage your strength in ${highestDomain.domainName} to build this area:",
      "options": ["Specific option A", "Specific option B", "Specific option C"],
      "actionStep": "One micro-action connecting your strength to this growth area"
    }
  ],
  "interDomainInsight": "One specific sentence connecting ${highestDomain.domainName} to ${lowestDomain.domainName}. How can the strength help the weakness? Do NOT include numeric scores.",
  "personalNote": "1-2 sentences speaking directly to ${userInfo.name}. Reference their life stage and offer specific hope.",
  "growthTrajectory": "Your ${lowestDomain.domainName} has room to grow significantly in 6 months with focused effort."
}

IMPORTANT: 
- Options must be SPECIFIC and ACTIONABLE (e.g., "Watch a TED talk on resilience", not just "Learn more")
- For students with low Professional Development, suggest internship exploration, skill courses, or networking
- For low Social Contribution, suggest causes: Education, Environment, Elderly Care, or Local Community
- Reference domain names but DO NOT include numeric scores like 'X/6' or 'X.X/6' in your output - use qualitative descriptions instead (e.g., 'strong', 'developing', 'emerging')`;


        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are an empathetic flourishing coach. You respond ONLY in valid JSON format.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500,
            response_format: { type: "json_object" }
        });

        const responseText = completion.choices[0]?.message?.content || '';

        let insights: AIInsights;
        try {
            const parsed = JSON.parse(responseText);

            // Transform structured recommendations to also support string format for backward compatibility
            const structuredRecs: StructuredRecommendation[] = parsed.recommendations || [];
            const stringRecs: string[] = structuredRecs.map((r: StructuredRecommendation) =>
                `${r.text} Options: ${r.options?.join(', ') || 'N/A'}. ${r.actionStep || ''}`
            );

            // Get personalized recommended resources with reasons
            const { getPersonalizedResources } = await import('@/lib/nirman-resources');
            const personalizedResources = getPersonalizedResources(
                domainResults.map(d => ({ domainId: d.domainId, domainName: d.domainName, averageScore: d.averageScore })),
                contextualFactors.isStudent,
                4
            );

            const recommendedResources: ResourceLink[] = personalizedResources.map(r => ({
                title: r.title,
                url: r.url,
                type: r.type,
                reason: r.reason,
                domain: r.domain
            }));

            insights = {
                summary: parsed.summary || '',
                strengths: parsed.strengths || [],
                growthAreas: parsed.growthAreas || [],
                recommendations: stringRecs, // For backward compatibility
                structuredRecommendations: structuredRecs, // New structured format
                recommendedResources, // Recommended resources
                interDomainInsight: parsed.interDomainInsight || '',
                personalNote: parsed.personalNote || '',
                growthTrajectory: parsed.growthTrajectory || ''
            };
        } catch {
            // Fallback if parsing fails
            insights = {
                summary: `Based on your responses, you have an overall flourishing score of ${overallScore.toFixed(1)}%. You're flourishing in ${flourishingDomains} out of 7 life domains.`,
                strengths: flourishingList.slice(0, 2).map(d => `Strong performance in ${d}`),
                growthAreas: languishingList.slice(0, 2).map(d => `Opportunity for growth in ${d}`),
                recommendations: [
                    `Focus on small improvements in ${lowestDomain.domainName}`,
                    `Build on your strength in ${highestDomain.domainName}`,
                ],
                structuredRecommendations: [
                    {
                        id: 1,
                        category: lowestDomain.domainName,
                        score: lowestDomain.averageScore,
                        text: 'Start by exploring this area:',
                        options: ['Read an article', 'Watch a video', 'Talk to a mentor'],
                        actionStep: 'Pick one option and spend 15 minutes on it this week'
                    }
                ],
                interDomainInsight: `Your strength in ${highestDomain.domainName} can support growth in ${lowestDomain.domainName}.`,
                personalNote: `${userInfo.name}, flourishing is a journey. Take it one step at a time.`,
                growthTrajectory: `Your ${lowestDomain.domainName} could improve over the next 6 months.`,
                recommendedResources: CORE_RESOURCES.slice(0, 3).map(r => ({
                    title: r.title,
                    url: r.url,
                    type: r.type,
                    reason: 'A foundational resource to help you understand the flourishing framework.',
                    domain: 'Foundation'
                }))
            };
        }

        return NextResponse.json({ insights, success: true });

    } catch (error) {
        console.error('Error generating insights:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate insights',
                insights: {
                    summary: 'We were unable to generate personalized insights at this time.',
                    strengths: ['Assessment completed successfully'],
                    growthAreas: ['Review your domain scores for areas to focus on'],
                    recommendations: ['Retake the assessment in 6 months to track your progress'],
                    structuredRecommendations: [],
                    interDomainInsight: '',
                    personalNote: 'Thank you for completing the flourishing assessment.',
                    growthTrajectory: ''
                }
            },
            { status: 500 }
        );
    }
}
