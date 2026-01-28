import { Domain, Question } from './types';

// Context questions asked before the main questionnaire
export const CONTEXT_QUESTIONS: Question[] = [
    {
        id: 0,
        text: 'In the last 6 months, I have had consistent access to food and basic necessities',
        domainId: 'context',
    },
    {
        id: -1,
        text: 'In the last 6 months, I have had stable housing',
        domainId: 'context',
    },
    {
        id: -2,
        text: 'In the last 6 months, I have felt physically safe in my environment',
        domainId: 'context',
    },
    {
        id: -3,
        text: 'In the last 6 months, I have had access to basic healthcare when needed',
        domainId: 'context',
    },
];

export const DOMAINS: Domain[] = [
    {
        id: 'physical-health',
        name: 'Physical Health',
        description: 'Your physical well-being, exercise habits, nutrition, sleep, and safety behaviors',
        icon: 'Heart',
        color: 'emerald',
        flourishingThreshold: 4, // 4 out of 6 questions
        questions: [
            { id: 1, text: 'I have consciously engaged in exercise and/or sports', domainId: 'physical-health' },
            { id: 2, text: 'I have consciously had healthy food and balanced nutrition', domainId: 'physical-health' },
            { id: 3, text: 'I have had adequate sleep', domainId: 'physical-health' },
            { id: 4, text: 'I have consciously stayed away from harmful substance use', domainId: 'physical-health' },
            { id: 5, text: 'I have consciously stayed away from risky sexual behavior', domainId: 'physical-health' },
            { id: 6, text: 'I have consciously avoided engagement in any sort of violence (domestic, child abuse, sexual abuse, college ragging, street fights, communal violence, etc.)', domainId: 'physical-health' },
        ],
    },
    {
        id: 'psychological-wellbeing',
        name: 'Psychological Well-Being',
        description: 'Your emotional awareness, mental health, life satisfaction, and positive emotions',
        icon: 'Brain',
        color: 'violet',
        flourishingThreshold: 5, // 5 out of 7 questions
        questions: [
            { id: 7, text: 'I have consciously been aware of the emotions I felt from time to time', domainId: 'psychological-wellbeing' },
            { id: 8, text: 'I have authentically expressed my feelings rather than suppressing them', domainId: 'psychological-wellbeing' },
            { id: 9, text: 'I have consciously developed my agency by being responsible for my own life decisions and facing their outcomes', domainId: 'psychological-wellbeing' },
            { id: 10, text: 'I have not succumbed to or not remained stuck with any kind of mental illness', domainId: 'psychological-wellbeing' },
            { id: 11, text: 'I have consciously worked on not being in a stagnant, aimless, and empty state', domainId: 'psychological-wellbeing' },
            { id: 12, text: 'I have frequently experienced various positive emotions (e.g., gratitude, hope, joy, awe, love)', domainId: 'psychological-wellbeing' },
            { id: 13, text: 'I have generally felt satisfied with my life as a whole', domainId: 'psychological-wellbeing' },
        ],
    },
    {
        id: 'social-relationships',
        name: 'Social Relationships',
        description: 'Your connections with family, friends, mentors, partners, and community',
        icon: 'Users',
        color: 'rose',
        flourishingThreshold: 4, // 4 out of 6 questions
        questions: [
            { id: 14, text: 'I have consciously nurtured my relationships with parents, siblings, or close family members', domainId: 'social-relationships' },
            { id: 15, text: 'I have strengthened genuine and close friendships', domainId: 'social-relationships' },
            { id: 16, text: 'I have thought about and explored the kind of life partner I want OR strengthened the bond with the partner I have', domainId: 'social-relationships' },
            { id: 17, text: 'I have sought and/or developed relationships with mentor(s)', domainId: 'social-relationships' },
            { id: 18, text: 'I have been part of a like-minded community with whom I feel a sense of belongingness', domainId: 'social-relationships' },
            { id: 19, text: 'I have built healthy workplace relationships (with colleagues, peers, employer, teachers, or clients)', domainId: 'social-relationships' },
        ],
    },
    {
        id: 'professional-development',
        name: 'Professional Development',
        description: 'Your career growth, skill development, and productive engagement',
        icon: 'Briefcase',
        color: 'amber',
        flourishingThreshold: 4, // 4 out of 6 questions
        questions: [
            { id: 20, text: 'I have consciously worked on understanding possible ways of effective professional contribution', domainId: 'professional-development' },
            { id: 21, text: 'I have been constructively engaged in productive pursuits', domainId: 'professional-development' },
            { id: 22, text: 'I have consciously cultivated professional knowledge, hard skills, and competencies', domainId: 'professional-development' },
            { id: 23, text: 'I have consciously developed 21st-century cognitive skills (critical thinking, logical reasoning, effective articulation, complex problem-solving)', domainId: 'professional-development' },
            { id: 24, text: 'I have consciously imbibed workplace ethics and a healthy work attitude', domainId: 'professional-development' },
            { id: 25, text: 'I have consciously worked on continuous capacity building (self-learning, formal education, courses, workshops, on-the-job training, etc.)', domainId: 'professional-development' },
        ],
    },
    {
        id: 'social-contribution',
        name: 'Social Contribution',
        description: 'Your engagement with social challenges, volunteering, and giving back to society',
        icon: 'HandHeart',
        color: 'sky',
        flourishingThreshold: 2, // 2 out of 4 questions
        questions: [
            { id: 26, text: 'I have consciously developed my understanding of at least one social challenge in our society', domainId: 'social-contribution' },
            { id: 27, text: 'I have developed or sustained sensitivity and empathy towards vulnerable and underprivileged groups in society', domainId: 'social-contribution' },
            { id: 28, text: 'I have engaged in civic involvement, volunteering, and/or financial contribution to social causes', domainId: 'social-contribution' },
            { id: 29, text: 'I have consciously identified or continued working on a long-term mission for my social contribution', domainId: 'social-contribution' },
        ],
    },
    {
        id: 'life-skills',
        name: 'Life Skills',
        description: 'Your practical abilities including financial management, communication, and daily living',
        icon: 'Lightbulb',
        color: 'orange',
        flourishingThreshold: 8, // 8 out of 12 questions
        questions: [
            { id: 30, text: 'I have consciously lived on a daily basis in alignment with my long-term goals', domainId: 'life-skills' },
            { id: 31, text: 'I have exercised independence and autonomy in my life decisions (career, finances, partner, place of residence)', domainId: 'life-skills', contextNote: 'Interpreted differently for students' },
            { id: 32, text: 'I have been proactively involved in managing household responsibilities', domainId: 'life-skills' },
            { id: 33, text: 'I have become or been financially independent and responsible', domainId: 'life-skills', contextNote: 'Interpreted differently for students' },
            { id: 34, text: 'I have consciously followed wise spending and saving habits', domainId: 'life-skills' },
            { id: 35, text: 'I have consciously pursued an environment-friendly and sustainable lifestyle', domainId: 'life-skills' },
            { id: 36, text: 'I have consciously engaged with a diversity of people beyond my usual circle', domainId: 'life-skills' },
            { id: 37, text: 'I have maintained personal hygiene and carried myself in a decent manner', domainId: 'life-skills' },
            { id: 38, text: 'I have followed the commitments I made to others', domainId: 'life-skills' },
            { id: 39, text: 'I have consciously appreciated good things in others and given genuine compliments', domainId: 'life-skills' },
            { id: 40, text: 'I have expressed disagreements in a firm and polite manner', domainId: 'life-skills' },
            { id: 41, text: 'I have consciously provided and sought emotional support as needed by others and myself', domainId: 'life-skills' },
        ],
    },
    {
        id: 'character-development',
        name: 'Character Development',
        description: 'Your values, purpose, hobbies, role models, and personal philosophy',
        icon: 'Sparkles',
        color: 'indigo',
        flourishingThreshold: 6, // 6 out of 9 questions
        questions: [
            { id: 42, text: 'I have consciously worked on ascertaining my values and principles and developing a moral identity', domainId: 'character-development' },
            { id: 43, text: 'I have maintained congruence between my values and my actions', domainId: 'character-development' },
            { id: 44, text: 'I have had a healthy understanding of my sexual identity', domainId: 'character-development' },
            { id: 45, text: 'I have frequently engaged in activities in which I get completely immersed', domainId: 'character-development' },
            { id: 46, text: 'I have consciously identified role models from different walks of life and reflected on their inspiring characteristics', domainId: 'character-development' },
            { id: 47, text: 'I have consciously worked on identifying and enacting my purpose in life', domainId: 'character-development' },
            { id: 48, text: 'I have frequently engaged in hobbies, reading, or artistic pursuits', domainId: 'character-development' },
            { id: 49, text: 'I have frequently experienced elevation by witnessing, watching, or reading about virtuous acts of moral goodness by others', domainId: 'character-development' },
            { id: 50, text: 'I have consciously worked on cultivating my own philosophy of leading life', domainId: 'character-development' },
        ],
    },
];

// Enhanced questions for emotional health (especially for boys)
export const EMOTIONAL_HEALTH_QUESTIONS: Question[] = [
    {
        id: 51,
        text: 'I have at least one close friend with whom I can express difficult emotions',
        domainId: 'emotional-health-enhanced',
        genderSpecific: 'male',
    },
    {
        id: 52,
        text: 'I have allowed myself to feel sad or cry when I needed to',
        domainId: 'emotional-health-enhanced',
        genderSpecific: 'male',
    },
    {
        id: 53,
        text: 'I have sought help when feeling overwhelmed without feeling ashamed',
        domainId: 'emotional-health-enhanced',
    },
    {
        id: 54,
        text: 'I have someone I can be completely honest with about my fears',
        domainId: 'emotional-health-enhanced',
    },
];

// Skill monetization question
export const SKILL_MONETIZATION_QUESTION: Question = {
    id: 55,
    text: 'Someone has paid me (or offered to pay me) for a skill or service I can provide, other than academic tutoring or my primary job (e.g., photography, design, music, crafts, content creation)',
    domainId: 'skill-monetization',
};

// Get all questions in order
export function getAllQuestions(): Question[] {
    const mainQuestions = DOMAINS.flatMap(domain => domain.questions);
    return [...CONTEXT_QUESTIONS, ...mainQuestions, ...EMOTIONAL_HEALTH_QUESTIONS, SKILL_MONETIZATION_QUESTION];
}

// Get questions by domain
export function getQuestionsByDomain(domainId: string): Question[] {
    const domain = DOMAINS.find(d => d.id === domainId);
    return domain?.questions || [];
}

// Total question count (excluding context)
export const TOTAL_MAIN_QUESTIONS = DOMAINS.reduce((sum, d) => sum + d.questions.length, 0) + EMOTIONAL_HEALTH_QUESTIONS.length + 1;
