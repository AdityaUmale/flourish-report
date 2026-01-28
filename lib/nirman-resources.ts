// NIRMAN Resources Database - Enhanced with Personalized Reasons
// Curated resources from NIRMAN website mapped to the 7 flourishing domains

export interface NirmanResource {
    title: string;
    url: string;
    type: 'article' | 'video' | 'pdf' | 'book' | 'story';
    language: 'english' | 'marathi' | 'both';
    description: string;
    // For matching accuracy
    tags: string[];
    scoreRange: 'very-low' | 'low' | 'medium' | 'high' | 'all'; // <2, 2-3, 3-4.5, >4.5
    forStudents?: boolean;
    forProfessionals?: boolean;
}

export interface RecommendedResource {
    title: string;
    url: string;
    type: 'article' | 'video' | 'pdf' | 'book' | 'story';
    reason: string; // Personalized reason why this resource is recommended
    domain: string;
}

// Core NIRMAN Resources (applicable to all domains - entry points)
const CORE_RESOURCES: NirmanResource[] = [
    {
        title: "What is Youth Flourishing? (यूथ फ्लरिशिंग म्हणजे काय?)",
        url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file3.pdf",
        type: "pdf",
        language: "marathi",
        description: "Understanding the concept of youth flourishing",
        tags: ['foundation', 'introduction', 'flourishing'],
        scoreRange: 'all'
    },
    {
        title: "Finding Your Social Purpose - IDR",
        url: "https://idronline.org/finding-your-social-purpose/",
        type: "article",
        language: "english",
        description: "How to discover your purpose in life",
        tags: ['purpose', 'meaning', 'direction'],
        scoreRange: 'all'
    },
    {
        title: "A Roadmap for the Young - Amrut Bang",
        url: "https://nirman.mkcl.org/doc/downloads/articles/Roadmap.pdf",
        type: "pdf",
        language: "english",
        description: "Practical guidance for youth development",
        tags: ['roadmap', 'planning', 'career'],
        scoreRange: 'all',
        forStudents: true
    },
    {
        title: "Man's Search For Meaning - Viktor Frankl | Book Presentation",
        url: "https://youtu.be/pdo0uyMVlgY?si=pA3tlFzasZaFX0Ln",
        type: "video",
        language: "english",
        description: "Finding meaning in life - book presentation by NIRMAN alumni",
        tags: ['meaning', 'resilience', 'psychology'],
        scoreRange: 'all'
    },
    {
        title: "Why 30 is not the new 20 | Meg Jay",
        url: "https://youtu.be/vhhgI4tSMwc",
        type: "video",
        language: "english",
        description: "Making the most of your formative years",
        tags: ['youth', 'time', 'urgency', 'career'],
        scoreRange: 'all',
        forStudents: true
    }
];

// Domain-specific resources with enhanced metadata
const DOMAIN_RESOURCES: Record<string, NirmanResource[]> = {
    'physical-health': [
        {
            title: "How Alcohol and Tobacco Cause Poverty",
            url: "https://thewire.in/health/how-alcohol-and-tobacco-cause-poverty",
            type: "article",
            language: "english",
            description: "Understanding the health-wealth connection",
            tags: ['addiction', 'health', 'poverty', 'prevention'],
            scoreRange: 'low'
        },
        {
            title: "The Demoralized Mind – John Schumaker",
            url: "https://newint.org/columns/essays/2016/04/01/psycho-spiritual-crisis",
            type: "article",
            language: "english",
            description: "Understanding modern stress and mind-body connection",
            tags: ['stress', 'mental-health', 'modern-life'],
            scoreRange: 'very-low'
        }
    ],

    'psychological-wellbeing': [
        {
            title: "Man's Search For Meaning - Viktor Frankl | Book Presentation",
            url: "https://youtu.be/pdo0uyMVlgY?si=pA3tlFzasZaFX0Ln",
            type: "video",
            language: "english",
            description: "Finding meaning through adversity",
            tags: ['meaning', 'resilience', 'hope', 'suffering'],
            scoreRange: 'very-low'
        },
        {
            title: "The Art of Loving by Erich Fromm | Book Presentation",
            url: "https://youtu.be/68BL092sGG0?si=RNRhDk2Q3_hinbHp",
            type: "video",
            language: "english",
            description: "Understanding love, self-acceptance, and connection",
            tags: ['love', 'self-acceptance', 'relationships'],
            scoreRange: 'low'
        },
        {
            title: "The Demoralized Mind",
            url: "https://newint.org/columns/essays/2016/04/01/psycho-spiritual-crisis",
            type: "article",
            language: "english",
            description: "Understanding modern psychological challenges",
            tags: ['psychology', 'modern-crisis', 'meaning'],
            scoreRange: 'very-low'
        },
        {
            title: "There's more to life than being happy - Emily Esfahani Smith",
            url: "https://ed.ted.com/featured/qH9jeqYn",
            type: "video",
            language: "english",
            description: "The difference between happiness and meaning",
            tags: ['happiness', 'meaning', 'purpose'],
            scoreRange: 'medium'
        },
        {
            title: "Dr. Aarti Gorwadkar - Mental Health Journey",
            url: "https://nirman.mkcl.org/user/pages/mns-docs/Dr_Aarti_Bang.pdf",
            type: "story",
            language: "english",
            description: "Psychiatrist's journey in mental health",
            tags: ['mental-health', 'career', 'inspiration'],
            scoreRange: 'all'
        },
        {
            title: "Youth's Emotional World (युवांचे भावनाविश्व)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file12.pdf",
            type: "pdf",
            language: "marathi",
            description: "Understanding and managing emotions",
            tags: ['emotions', 'self-awareness', 'youth'],
            scoreRange: 'low'
        }
    ],

    'social-relationships': [
        {
            title: "The Art of Loving by Erich Fromm | Book Presentation",
            url: "https://youtu.be/68BL092sGG0?si=RNRhDk2Q3_hinbHp",
            type: "video",
            language: "english",
            description: "The practice of love and deep connection",
            tags: ['love', 'connection', 'relationships'],
            scoreRange: 'low'
        },
        {
            title: "The Little Prince | Book Presentation",
            url: "https://youtu.be/S6VrMCvKnKQ?si=bZkdJSJT8h6wxscc",
            type: "video",
            language: "english",
            description: "Beautiful perspective on relationships and what matters",
            tags: ['friendship', 'meaning', 'connection'],
            scoreRange: 'very-low'
        },
        {
            title: "Some Key Differences between a Happy Life and a Meaningful Life",
            url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2168436",
            type: "article",
            language: "english",
            description: "Research on social connections and meaning",
            tags: ['research', 'meaning', 'relationships'],
            scoreRange: 'medium'
        }
    ],

    'professional-development': [
        {
            title: "Youth and Meaningful Career Search (युवांचा अर्थपूर्ण करिअरचा शोध)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file13.pdf",
            type: "pdf",
            language: "marathi",
            description: "Finding meaningful work aligned with values",
            tags: ['career', 'meaning', 'purpose'],
            scoreRange: 'low',
            forStudents: true
        },
        {
            title: "Lifelong Education - The Economist",
            url: "https://www.economist.com/special-report/2018/02/06/discover-the-global-trends-impacting-your-career",
            type: "article",
            language: "english",
            description: "Global trends impacting your career",
            tags: ['career', 'future', 'skills'],
            scoreRange: 'medium',
            forProfessionals: true
        },
        {
            title: "A Roadmap for the Young",
            url: "https://nirman.mkcl.org/doc/downloads/articles/Roadmap.pdf",
            type: "pdf",
            language: "english",
            description: "Building your career path step by step",
            tags: ['roadmap', 'planning', 'career'],
            scoreRange: 'very-low',
            forStudents: true
        },
        {
            title: "The Future of Employment",
            url: "https://nirman.mkcl.org/doc/downloads/articles/The%20Future%20of%20Employment.pdf",
            type: "pdf",
            language: "english",
            description: "Understanding future job trends",
            tags: ['future', 'jobs', 'automation'],
            scoreRange: 'medium'
        },
        {
            title: "Nai Talim: A Gandhian way of Learning | TEDx",
            url: "https://www.youtube.com/watch?v=W-P9o8biLTA",
            type: "video",
            language: "english",
            description: "Learning by doing - alternative education philosophy",
            tags: ['education', 'gandhi', 'learning'],
            scoreRange: 'all',
            forStudents: true
        },
        {
            title: "Dr. Pratik Surana - Medical Journey",
            url: "https://www.youtube.com/watch?v=7tRkY4EbDoE",
            type: "video",
            language: "english",
            description: "Doctor's professional development story",
            tags: ['career', 'medicine', 'inspiration'],
            scoreRange: 'all'
        },
        {
            title: "Youth: Who Are We? (युवा म्हणजे नेमके कोण?)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file1.pdf",
            type: "pdf",
            language: "marathi",
            description: "Understanding youth identity and potential",
            tags: ['identity', 'youth', 'self-discovery'],
            scoreRange: 'very-low',
            forStudents: true
        }
    ],

    'social-contribution': [
        {
            title: "The Why of Social Sector - Amrut Bang",
            url: "https://nirman.mkcl.org/doc/downloads/articles/Why_of_Social_Sector_Amrut_Bang.pdf",
            type: "pdf",
            language: "english",
            description: "Understanding why social work matters and how to get started",
            tags: ['social-sector', 'purpose', 'meaning'],
            scoreRange: 'very-low'
        },
        {
            title: "Becoming a Social Change Maker - NIRMAN",
            url: "https://nirman.mkcl.org/about/info",
            type: "article",
            language: "english",
            description: "NIRMAN's vision for youth as change makers",
            tags: ['change-maker', 'social-impact', 'youth'],
            scoreRange: 'low'
        },
        {
            title: "Finding Your Social Purpose - IDR",
            url: "https://idronline.org/finding-your-social-purpose/",
            type: "article",
            language: "english",
            description: "First steps to discovering your social purpose",
            tags: ['purpose', 'social', 'discovery'],
            scoreRange: 'very-low'
        },
        {
            title: "Clarity on Social Work (सामाजिक कार्याची स्पष्टता)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file9.pdf",
            type: "pdf",
            language: "marathi",
            description: "Understanding what social contribution really means",
            tags: ['clarity', 'social-work', 'understanding'],
            scoreRange: 'low'
        },
        {
            title: "The Secret to Success Is Giving, Not Taking",
            url: "https://www.scientificamerican.com/article/the-secret-to-success-is-giving-not-taking/",
            type: "article",
            language: "english",
            description: "The science of generosity and its benefits",
            tags: ['giving', 'success', 'generosity'],
            scoreRange: 'medium'
        },
        {
            title: "Famine, Affluence and Morality - Peter Singer",
            url: "https://nirman.mkcl.org/doc/downloads/articles/Famine,%20Affluence%20and%20Morality%20-%20Peter%20Singer.pdf",
            type: "pdf",
            language: "english",
            description: "Ethics of helping others - philosophical perspective",
            tags: ['ethics', 'morality', 'helping'],
            scoreRange: 'high'
        },
        {
            title: "Banker To The Poor - Muhammad Yunus | Book Presentation",
            url: "https://youtu.be/JEwpKoCS_KE?si=MzHzMCt4cvZhTBb3",
            type: "video",
            language: "english",
            description: "Social entrepreneurship inspiration from Nobel laureate",
            tags: ['entrepreneurship', 'poverty', 'microcredit'],
            scoreRange: 'medium'
        },
        {
            title: "Research, for Whom? - IDR",
            url: "https://idronline.org/putting-people-heart-research/",
            type: "article",
            language: "english",
            description: "Making work meaningful by centering people",
            tags: ['research', 'people', 'meaning'],
            scoreRange: 'all'
        }
    ],

    'life-skills': [
        {
            title: "Animal Farm by George Orwell | Book Presentation",
            url: "https://youtu.be/V__kw2Nf4hc?si=LtX9emfrpZXKMYnR",
            type: "video",
            language: "english",
            description: "Developing critical thinking through literature",
            tags: ['critical-thinking', 'politics', 'literature'],
            scoreRange: 'medium'
        },
        {
            title: "Ways of Seeing by John Berger | Book Presentation",
            url: "https://youtu.be/4ATpiNqbddE?si=v2dBE_wlNzD2UQbR",
            type: "video",
            language: "english",
            description: "Developing perspective and worldview",
            tags: ['perspective', 'art', 'seeing'],
            scoreRange: 'medium'
        },
        {
            title: "Youth and Reading - NIRMAN",
            url: "https://nirman.mkcl.org/downloads/youth-and-reading",
            type: "article",
            language: "english",
            description: "Building intellectual self-reliance through reading",
            tags: ['reading', 'learning', 'self-reliance'],
            scoreRange: 'very-low'
        },
        {
            title: "The Great Indian Middle Class | Book Presentation",
            url: "https://youtu.be/glpZwNFrjE0?si=sc4XcmoIH6dKMQep",
            type: "video",
            language: "english",
            description: "Understanding social context and your place in it",
            tags: ['society', 'class', 'india'],
            scoreRange: 'medium'
        },
        {
            title: "On Research and Action - Jean Dreze",
            url: "https://nirman.mkcl.org/doc/downloads/articles/G_On_Research_and_Action.pdf",
            type: "pdf",
            language: "english",
            description: "Combining knowledge with action effectively",
            tags: ['research', 'action', 'effectiveness'],
            scoreRange: 'high'
        },
        {
            title: "Youth's Freedom Mortgaged? (युवकांनी गहाण ठेवलेले स्वातंत्र्य)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file8.pdf",
            type: "pdf",
            language: "marathi",
            description: "Reclaiming autonomy and life-skills",
            tags: ['freedom', 'autonomy', 'skills'],
            scoreRange: 'low'
        }
    ],

    'character-development': [
        {
            title: "What is the Purpose of Your Existence? (आपल्या अस्तित्वाचे प्रयोजन काय?)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file4.pdf",
            type: "pdf",
            language: "marathi",
            description: "Exploring life's deeper meaning and purpose",
            tags: ['purpose', 'existence', 'meaning'],
            scoreRange: 'very-low'
        },
        {
            title: "Youth's Ethical Decision Dilemmas (युवांचा नैतिक निर्णय गोंधळ)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file5.pdf",
            type: "pdf",
            language: "marathi",
            description: "Navigating moral decisions with clarity",
            tags: ['ethics', 'decisions', 'morality'],
            scoreRange: 'low'
        },
        {
            title: "What Would Gandhi Do? - The Lancet",
            url: "https://nirman.mkcl.org/doc/downloads/articles/What-Would-Gandhi-do.pdf",
            type: "pdf",
            language: "english",
            description: "Learning from Gandhian principles of character",
            tags: ['gandhi', 'principles', 'character'],
            scoreRange: 'medium'
        },
        {
            title: "Meeting the Mahatma",
            url: "https://nirman.mkcl.org/doc/downloads/articles/Meeting_the_Mahatma.pdf",
            type: "pdf",
            language: "english",
            description: "A reflective encounter with Gandhi's ideals",
            tags: ['gandhi', 'reflection', 'values'],
            scoreRange: 'very-low'
        },
        {
            title: "1984 by George Orwell | Book Presentation",
            url: "https://youtu.be/2V-tfipbSkY?si=lxHUouXs2gvMzLa2",
            type: "video",
            language: "english",
            description: "Understanding truth, integrity, and resistance",
            tags: ['truth', 'integrity', 'literature'],
            scoreRange: 'medium'
        },
        {
            title: "Dnyaneshwar Arote - Values in Finance",
            url: "https://youtu.be/tiypytpRN48",
            type: "video",
            language: "english",
            description: "Maintaining character in professional life",
            tags: ['values', 'finance', 'integrity'],
            scoreRange: 'all',
            forProfessionals: true
        },
        {
            title: "Nature and Youth's Life Vision (सृष्टी आणि युवांची जीवनदृष्टी)",
            url: "https://nirman.mkcl.org/doc/downloads/loksatta-series/file6.pdf",
            type: "pdf",
            language: "marathi",
            description: "Developing a holistic worldview",
            tags: ['nature', 'worldview', 'vision'],
            scoreRange: 'low'
        }
    ]
};

// NIRMAN Stories - Inspirational journeys for motivation
const NIRMAN_STORIES: NirmanResource[] = [
    {
        title: "Dr. Vikram Sahane - From MBBS to Public Health Leadership",
        url: "https://nirman.mkcl.org/user/pages/mns-docs/Vikram-Sahane.pdf",
        type: "story",
        language: "english",
        description: "MBBS to Public Health Consultant at Tata Trusts",
        tags: ['health', 'leadership', 'transformation'],
        scoreRange: 'all'
    },
    {
        title: "Dr. Prathamesh Hemnani - Mental Health Advocate",
        url: "https://nirman.mkcl.org/user/pages/mns-docs/Prathamesh_Hemnani.pdf",
        type: "story",
        language: "english",
        description: "Young psychiatrist's journey",
        tags: ['mental-health', 'medicine', 'youth'],
        scoreRange: 'all'
    },
    {
        title: "Jayprad Desai - Artist to Filmmaker",
        url: "https://nirman.mkcl.org/user/pages/mns-docs/Jayprad_Desai.pdf",
        type: "story",
        language: "english",
        description: "NYU graduate filmmaker's creative journey",
        tags: ['creativity', 'film', 'arts'],
        scoreRange: 'all'
    },
    {
        title: "Sayali Tamane - Engineer to Educationist",
        url: "https://nirman.mkcl.org/user/pages/mns-docs/Sayali_Tamane.pdf",
        type: "story",
        language: "english",
        description: "Engineer who found purpose in education",
        tags: ['education', 'career-change', 'purpose'],
        scoreRange: 'all',
        forStudents: true
    },
    {
        title: "Pranjal Koranne - IIT to NIRMAN Fellow",
        url: "https://www.youtube.com/watch?v=zNXbFQL4KTg",
        type: "video",
        language: "english",
        description: "IIT Madras graduate's journey to social work",
        tags: ['iit', 'social-work', 'transformation'],
        scoreRange: 'all',
        forStudents: true
    },
    {
        title: "Sharad Ashtekar - Books as a Mission",
        url: "https://nirman.mkcl.org/user/pages/mns-docs/Sharad_Ashtekar.pdf",
        type: "story",
        language: "english",
        description: "Building a publishing house with purpose",
        tags: ['books', 'entrepreneurship', 'culture'],
        scoreRange: 'all'
    }
];

// Reason templates for personalized recommendations
const REASON_TEMPLATES = {
    veryLow: [
        "Your {domain} needs attention. This resource provides a gentle starting point.",
        "Start with understanding before action in {domain}. This will help build awareness.",
        "This resource is perfect for beginning your {domain} journey."
    ],
    low: [
        "This resource offers practical next steps to build momentum in {domain}.",
        "Your {domain} shows room for growth. This will help you move toward flourishing.",
        "This resource addresses the specific challenges at your current {domain} level."
    ],
    medium: [
        "You're progressing in {domain}. This resource will help you break through to flourishing.",
        "You're on the cusp in {domain}. This resource contains strategies for the final push.",
        "This will help strengthen your growing {domain} abilities."
    ],
    pattern: [
        "Your strength in {highDomain} can help develop {lowDomain}. This resource shows how.",
        "This connects your strong {highDomain} to your growing {lowDomain}.",
    ],
    student: [
        "As a student, this resource is especially relevant for building {domain} early in your journey.",
        "Perfect for students: addresses {domain} challenges specific to your life stage."
    ],
    professional: [
        "As a working professional, this resource applies to your current career context.",
        "Relevant for professionals seeking to grow {domain} while managing work demands."
    ]
};

// Helper function to get score range
function getScoreRange(score: number): 'very-low' | 'low' | 'medium' | 'high' {
    if (score < 2) return 'very-low';
    if (score < 3) return 'low';
    if (score < 4.5) return 'medium';
    return 'high';
}

// Generate personalized reason for a resource
function generateReason(
    resource: NirmanResource,
    domainName: string,
    score: number,
    context?: { isStudent?: boolean; highDomain?: string; highScore?: number }
): string {
    const scoreRange = getScoreRange(score);
    let templates: string[];

    // Select appropriate template based on context
    if (context?.highDomain && resource.tags.some(t => t.includes('leverage') || t.includes('connection'))) {
        templates = REASON_TEMPLATES.pattern;
    } else if (context?.isStudent && resource.forStudents) {
        templates = REASON_TEMPLATES.student;
    } else if (!context?.isStudent && resource.forProfessionals) {
        templates = REASON_TEMPLATES.professional;
    } else if (scoreRange === 'very-low') {
        templates = REASON_TEMPLATES.veryLow;
    } else if (scoreRange === 'low') {
        templates = REASON_TEMPLATES.low;
    } else {
        templates = REASON_TEMPLATES.medium;
    }

    // Pick a random template and fill in values
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template
        .replace('{domain}', domainName)
        .replace('{score}', score.toFixed(1))
        .replace('{highDomain}', context?.highDomain || '')
        .replace('{highScore}', context?.highScore?.toFixed(1) || '')
        .replace('{lowDomain}', domainName)
        .replace('{lowScore}', score.toFixed(1));
}

// Main function: Get personalized resources for a user
export function getPersonalizedResources(
    domainResults: Array<{ domainId: string; domainName: string; averageScore: number }>,
    isStudent: boolean = false,
    limit: number = 5
): RecommendedResource[] {
    const normalizeId = (id: string) => id.toLowerCase().replace(/\s+/g, '-');

    // Sort domains by score
    const sortedDomains = [...domainResults].sort((a, b) => a.averageScore - b.averageScore);
    const lowestDomain = sortedDomains[0];
    const secondLowest = sortedDomains[1];
    const thirdLowest = sortedDomains[2];
    const highestDomain = sortedDomains[sortedDomains.length - 1];

    // Get all domains that need attention (below flourishing threshold, roughly < 4.5)
    const developingDomains = sortedDomains.filter(d => d.averageScore < 4.5);

    const recommendations: RecommendedResource[] = [];

    // 1. Get resources for LOWEST domain (most important)
    const lowestId = normalizeId(lowestDomain.domainId);
    const lowestResources = DOMAIN_RESOURCES[lowestId] || [];
    const lowestScoreRange = getScoreRange(lowestDomain.averageScore);

    // Filter resources by score range - with fallback to any resource
    let matchingLowest = lowestResources.filter(r =>
        r.scoreRange === lowestScoreRange || r.scoreRange === 'all'
    ).filter(r =>
        (isStudent ? r.forStudents !== false : r.forProfessionals !== false)
    );
    // Fallback: if no score-matched resources, use any resource from that domain
    if (matchingLowest.length === 0 && lowestResources.length > 0) {
        matchingLowest = lowestResources.filter(r =>
            (isStudent ? r.forStudents !== false : r.forProfessionals !== false)
        );
    }
    if (matchingLowest.length === 0) matchingLowest = lowestResources;

    // Take best matching resource for lowest domain
    if (matchingLowest.length > 0) {
        const best = matchingLowest[0];
        recommendations.push({
            title: best.title,
            url: best.url,
            type: best.type,
            reason: generateReason(best, lowestDomain.domainName, lowestDomain.averageScore, { isStudent }),
            domain: lowestDomain.domainName
        });
    }

    // 2. Get resource for SECOND LOWEST domain
    const secondId = normalizeId(secondLowest.domainId);
    const secondResources = DOMAIN_RESOURCES[secondId] || [];
    const secondScoreRange = getScoreRange(secondLowest.averageScore);

    let matchingSecond = secondResources.filter(r =>
        r.scoreRange === secondScoreRange || r.scoreRange === 'all'
    ).filter(r =>
        (isStudent ? r.forStudents !== false : r.forProfessionals !== false)
    );
    // Fallback: if no score-matched resources, use any resource from that domain
    if (matchingSecond.length === 0 && secondResources.length > 0) {
        matchingSecond = secondResources.filter(r =>
            (isStudent ? r.forStudents !== false : r.forProfessionals !== false)
        );
    }
    if (matchingSecond.length === 0) matchingSecond = secondResources;

    if (matchingSecond.length > 0) {
        const best = matchingSecond[0];
        recommendations.push({
            title: best.title,
            url: best.url,
            type: best.type,
            reason: generateReason(best, secondLowest.domainName, secondLowest.averageScore, {
                isStudent,
                highDomain: highestDomain.domainName,
                highScore: highestDomain.averageScore
            }),
            domain: secondLowest.domainName
        });
    }

    // 3. Get resource for THIRD LOWEST domain (always include for lowest 3)
    if (thirdLowest) {
        const thirdId = normalizeId(thirdLowest.domainId);
        const thirdResources = DOMAIN_RESOURCES[thirdId] || [];
        const thirdScoreRange = getScoreRange(thirdLowest.averageScore);

        let matchingThird = thirdResources.filter(r =>
            r.scoreRange === thirdScoreRange || r.scoreRange === 'all'
        ).filter(r =>
            (isStudent ? r.forStudents !== false : r.forProfessionals !== false)
        );
        // Fallback: if no score-matched resources, use any resource from that domain
        if (matchingThird.length === 0 && thirdResources.length > 0) {
            matchingThird = thirdResources.filter(r =>
                (isStudent ? r.forStudents !== false : r.forProfessionals !== false)
            );
        }
        if (matchingThird.length === 0) matchingThird = thirdResources;

        if (matchingThird.length > 0) {
            const best = matchingThird[0];
            recommendations.push({
                title: best.title,
                url: best.url,
                type: best.type,
                reason: generateReason(best, thirdLowest.domainName, thirdLowest.averageScore, { isStudent }),
                domain: thirdLowest.domainName
            });
        }
    }

    // 4. Add a CORE resource if low scores are very low (< 2.5)
    if (lowestDomain.averageScore < 2.5) {
        const coreResource = CORE_RESOURCES.find(r => isStudent ? r.forStudents : true) || CORE_RESOURCES[0];
        recommendations.push({
            title: coreResource.title,
            url: coreResource.url,
            type: coreResource.type,
            reason: `With several domains needing attention, this foundational resource will help you understand the flourishing framework.`,
            domain: 'Foundation'
        });
    }

    // 5. Add an INSPIRATIONAL STORY
    const relevantStories = NIRMAN_STORIES.filter(s => isStudent ? s.forStudents !== false : true);
    const story = relevantStories[Math.floor(Math.random() * relevantStories.length)];

    recommendations.push({
        title: story.title,
        url: story.url,
        type: story.type,
        reason: `Inspirational journey from a NIRMAN alumni who overcame similar challenges. See what's possible!`,
        domain: 'Inspiration'
    });

    // Remove duplicates and limit
    const uniqueRecs = recommendations.filter((r, index, self) =>
        index === self.findIndex(t => t.url === r.url)
    );

    return uniqueRecs.slice(0, limit);
}

// Legacy function for backward compatibility
export function getResourcesForDomain(domainId: string, score: number, limit: number = 3): NirmanResource[] {
    const normalizedId = domainId.toLowerCase().replace(/\s+/g, '-');
    const domainResources = DOMAIN_RESOURCES[normalizedId] || [];
    const scoreRange = getScoreRange(score);

    const matching = domainResources.filter(r =>
        r.scoreRange === scoreRange || r.scoreRange === 'all'
    );

    if (matching.length >= limit) {
        return matching.slice(0, limit);
    }

    // Fall back to all domain resources
    return domainResources.slice(0, limit);
}

export function getInspirationalStory(): NirmanResource {
    const randomIndex = Math.floor(Math.random() * NIRMAN_STORIES.length);
    return NIRMAN_STORIES[randomIndex];
}

export { CORE_RESOURCES, NIRMAN_STORIES };
