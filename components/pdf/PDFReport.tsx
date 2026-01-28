'use client';

import { Document, Page, Text, View, StyleSheet, Svg, Rect, Circle, Line, G, Link } from '@react-pdf/renderer';
import { ReportData, AIInsights } from '@/lib/types';
import { DOMAINS } from '@/lib/questionnaire';

// Premium color palette matched to Web UI
const COLORS = {
    // Core branding
    primary: '#b5e635', // Lime-400
    primaryLight: '#d4f279',
    primaryDark: '#84cc16',

    // Chart colors
    radarStroke: '#6366f1', // Indigo-500
    radarGrid: '#333333',   // Dark Grey for grid lines (matching faint look)
    radarText: '#8c8c9b',
    radarAxis: '#5c5c6b',

    // Backgrounds - rich dark theme
    background: '#0a0a0a',
    surface: '#141414',
    surfaceLight: '#1e1e1e',
    surfaceAccent: '#252525',

    // Borders and dividers
    border: '#2a2a2a',
    borderLight: '#333333',

    // Typography
    text: '#ffffff',
    textSecondary: '#e0e0e0',
    textMuted: '#888888',
    textSubtle: '#555555',

    // Status colors
    flourishing: '#b5e635',
    flourishingBg: '#1a2a0a',
    moderate: '#fbbf24',
    moderateBg: '#2a2510',
    languishing: '#f87171',
    languishingBg: '#2a1515',

    // Accent colors
    blue: '#60a5fa',
    blueBg: '#0a1a2a',
    purple: '#a78bfa',
    purpleBg: '#1a0a2a',
};

// Domain specific colors matched to Web UI
const DOMAIN_COLORS: Record<string, string> = {
    'physical-health': '#b5e635',
    'psychological-wellbeing': '#84cc16',
    'social-relationships': '#a3e635',
    'professional-development': '#65a30d',
    'social-contribution': '#bef264',
    'life-skills': '#a3e635',
    'character-development': '#84cc16',
};

const styles = StyleSheet.create({
    // ========== COVER PAGE ==========
    coverPage: {
        padding: 0,
        backgroundColor: COLORS.background,
    },
    coverContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
    },
    coverDecoration: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: COLORS.primary,
    },
    coverBadge: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    coverBadgeText: {
        fontSize: 10,
        color: COLORS.primary,
        letterSpacing: 3,
        fontFamily: 'Helvetica-Bold',
    },
    coverTitle: {
        fontSize: 42,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
        marginBottom: 6,
        textAlign: 'center',
        letterSpacing: 1,
    },
    coverSubtitle: {
        fontSize: 14,
        color: COLORS.textMuted,
        marginBottom: 50,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    coverScoreCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 4,
        borderColor: COLORS.primary,
    },
    coverScoreValue: {
        fontSize: 48,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.primary,
    },
    coverScoreLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
        marginTop: -5,
    },
    coverName: {
        fontSize: 22,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
        marginTop: 30,
        letterSpacing: 0.5,
    },
    coverDate: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 8,
    },
    coverFooter: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 9,
        color: COLORS.textSubtle,
    },
    coverBottomDecoration: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: COLORS.primary,
    },

    // ========== STANDARD PAGES ==========
    page: {
        padding: 35,
        paddingTop: 30,
        backgroundColor: COLORS.background,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: COLORS.text,
    },
    pageTopBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    logo: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.primary,
        letterSpacing: 1,
    },
    pageNum: {
        fontSize: 9,
        color: COLORS.textSubtle,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },

    // ========== TYPOGRAPHY ==========
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
        marginBottom: 12,
        marginTop: 6,
        letterSpacing: 0.3,
    },
    sectionSubtitle: {
        fontSize: 10,
        color: COLORS.textMuted,
        marginBottom: 16,
        marginTop: -8,
    },
    paragraph: {
        fontSize: 9,
        color: COLORS.textMuted,
        lineHeight: 1.6,
        marginBottom: 8,
    },

    // ========== SCORE CARD ==========
    scoreCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    scoreValue: {
        fontSize: 38,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.primary,
    },
    scoreLabel: {
        fontSize: 10,
        color: COLORS.textMuted,
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    statBox: {
        alignItems: 'center',
        marginHorizontal: 28,
    },
    statValue: {
        fontSize: 22,
        fontFamily: 'Helvetica-Bold',
    },
    statLabel: {
        fontSize: 8,
        color: COLORS.textMuted,
        marginTop: 3,
        letterSpacing: 0.3,
    },

    // ========== DOMAIN BARS ==========
    domainRow: {
        marginBottom: 8,
    },
    domainHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    domainName: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
    },
    domainScore: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
    },
    barContainer: {
        height: 8,
        backgroundColor: COLORS.surfaceAccent,
        borderRadius: 4,
        overflow: 'hidden',
    },
    barFill: {
        height: 8,
        borderRadius: 4,
    },

    // ========== CHARTS ==========
    chartContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chartTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.textMuted,
        marginBottom: 10,
        letterSpacing: 0.3,
    },

    // ========== ENHANCED INSIGHT CARDS ==========
    insightCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 10,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    insightCardAccent: {
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    insightTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
        marginBottom: 10,
        letterSpacing: 0.2,
    },
    insightItem: {
        fontSize: 9,
        color: COLORS.textMuted,
        marginBottom: 6,
        lineHeight: 1.5,
        paddingLeft: 0,
    },
    insightBullet: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: COLORS.primary,
        marginRight: 8,
        marginTop: 5,
    },

    // Enhanced colored variants with more spacing
    strengthCard: {
        borderLeftColor: COLORS.flourishing,
        backgroundColor: COLORS.flourishingBg,
        padding: 18,
    },
    growthCard: {
        borderLeftColor: COLORS.moderate,
        backgroundColor: COLORS.moderateBg,
        padding: 18,
    },
    recCard: {
        borderLeftColor: COLORS.blue,
        backgroundColor: COLORS.blueBg,
        padding: 18,
    },
    resourceCard: {
        borderLeftColor: COLORS.purple,
        backgroundColor: COLORS.purpleBg,
        padding: 18,
    },

    // New styles for better insight formatting
    insightSection: {
        marginBottom: 10,
    },
    insightItemWithIcon: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    insightTextBlock: {
        flex: 1,
        fontSize: 9,
        color: COLORS.textMuted,
        lineHeight: 1.5,
    },
    recommendationBlock: {
        marginBottom: 14,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    recommendationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    recommendationNumber: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    recommendationNumberText: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.background,
    },
    recommendationTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
        flex: 1,
    },
    recommendationScore: {
        fontSize: 9,
        color: COLORS.blue,
        fontFamily: 'Helvetica-Bold',
    },
    recommendationText: {
        fontSize: 9,
        color: COLORS.textMuted,
        lineHeight: 1.5,
        marginLeft: 30,
        marginBottom: 6,
    },
    recommendationOptions: {
        fontSize: 8,
        color: COLORS.textSecondary,
        marginLeft: 30,
        marginBottom: 4,
        fontStyle: 'italic',
    },
    recommendationAction: {
        fontSize: 9,
        color: COLORS.primary,
        marginLeft: 30,
        fontFamily: 'Helvetica-Bold',
    },

    // ========== QUESTION RATINGS ==========
    questionDomain: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
        marginBottom: 8,
        marginTop: 12,
        paddingBottom: 6,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: COLORS.surface,
        marginBottom: 3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    questionText: {
        fontSize: 8,
        color: COLORS.textMuted,
        flex: 1,
        marginRight: 10,
        lineHeight: 1.4,
    },
    ratingNumber: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.text,
        width: 24,
        textAlign: 'right',
        marginLeft: 6,
    },

    // ========== FOOTER ==========
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 35,
        right: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    footerText: {
        fontSize: 7,
        color: COLORS.textSubtle,
    },
    footerBrand: {
        fontSize: 8,
        color: COLORS.primary,
        fontFamily: 'Helvetica-Bold',
    },

    // ========== TWO COLUMN LAYOUT ==========
    twoColumn: {
        flexDirection: 'row',
        gap: 14,
    },
    column: {
        flex: 1,
    },
});

interface PDFReportProps {
    reportData: ReportData;
    aiInsights?: AIInsights;
}

// Enhanced heatmap with better visuals
function RatingHeatmap({ rating }: { rating: number }) {
    const blocks = 6;
    const blockWidth = 12;
    const blockHeight = 10;
    const gap = 2;

    const getColor = (index: number) => {
        if (index >= rating) return COLORS.surfaceAccent;
        if (rating >= 5) return COLORS.flourishing;
        if (rating >= 3) return COLORS.moderate;
        return COLORS.languishing;
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
            <Svg width={blocks * (blockWidth + gap)} height={blockHeight}>
                {Array.from({ length: blocks }).map((_, i) => (
                    <Rect
                        key={i}
                        x={i * (blockWidth + gap)}
                        y={0}
                        width={blockWidth}
                        height={blockHeight}
                        rx={3}
                        fill={getColor(i)}
                    />
                ))}
            </Svg>
            <Text style={[styles.ratingNumber, { color: rating >= 5 ? COLORS.flourishing : rating >= 3 ? COLORS.moderate : COLORS.languishing }]}>
                {rating}/6
            </Text>
        </View>
    );
}

// Premium radar chart with labels (Exact copy of Web UI)
function RadarChartVisual({ data }: { data: { domain: string; score: number }[] }) {
    const size = 220;
    const cx = size / 2;
    const cy = size / 2 + 10;
    const maxRadius = 60;
    const n = data.length;

    const getPoint = (index: number, value: number, r: number = maxRadius) => {
        const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
        const radius = (value / 6) * r;
        return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
    };

    // Polygonal Grid (Heptagons) - matching Web UI
    const gridLevels = [2, 4, 6];
    const gridLines = gridLevels.flatMap((level) => {
        const points = data.map((_, i) => getPoint(i, level));
        return points.map((point, i) => {
            const nextPoint = points[(i + 1) % points.length];
            return (
                <Line
                    key={`grid-${level}-${i}`}
                    x1={point.x}
                    y1={point.y}
                    x2={nextPoint.x}
                    y2={nextPoint.y}
                    stroke={COLORS.radarGrid}
                    strokeWidth={0.5}
                />
            );
        });
    });

    // Axis lines
    const axisLines = data.map((_, i) => {
        const point = getPoint(i, 6);
        return <Line key={`axis-${i}`} x1={cx} y1={cy} x2={point.x} y2={point.y} stroke={COLORS.radarGrid} strokeWidth={0.5} />;
    });

    // Single Radius Axis Ticks (2, 4, 6)
    const tickLabels = gridLevels.map((level) => {
        const point = getPoint(0, level); // Top axis
        return (
            <Text
                key={`tick-${level}`}
                style={{
                    position: 'absolute',
                    left: cx + 2,
                    top: point.y,
                    fontSize: 5,
                    color: COLORS.textMuted,
                    fontFamily: 'Helvetica'
                }}
            >
                {level}
            </Text>
        );
    });

    // Data points
    const dataPoints = data.map((d, i) => getPoint(i, d.score));

    // Outline
    const outlineLines = dataPoints.map((point, i) => {
        const nextPoint = dataPoints[(i + 1) % dataPoints.length];
        return (
            <Line
                key={`outline-${i}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke={COLORS.radarStroke}
                strokeWidth={2}
            />
        );
    });

    // Short Labels Mapping
    const shortLabels: Record<string, string> = {
        'Physical Health': 'Physical',
        'Psychological Well-being': 'Psych',
        'Social Relationships': 'Relations',
        'Professional Development': 'Career',
        'Social Contribution': 'Contrib',
        'Life Skills': 'Skills',
        'Character Development': 'Character'
    };

    // Labels
    const labels = data.map((d, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const labelRadius = maxRadius + 12;
        const x = cx + labelRadius * Math.cos(angle);
        const y = cy + labelRadius * Math.sin(angle);

        let textAlign: 'center' | 'left' | 'right' = 'center';
        if (Math.abs(angle + Math.PI / 2) < 0.1) textAlign = 'center';
        else if (Math.abs(angle - Math.PI / 2) < 0.1) textAlign = 'center';
        else if (x > cx) textAlign = 'left';
        else textAlign = 'right';

        const name = shortLabels[d.domain] || d.domain;

        return (
            <Text
                key={i}
                style={{
                    position: 'absolute',
                    left: x - 20,
                    top: y - 4,
                    width: 40,
                    fontSize: 7,
                    color: COLORS.radarText,
                    textAlign: textAlign as any,
                    fontFamily: 'Helvetica'
                }}
            >
                {name}
            </Text>
        );
    });

    return (
        <View style={{ width: size, height: size, position: 'relative' }}>
            <Svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
                {gridLines}
                {axisLines}
                {outlineLines}
                {dataPoints.map((point, i) => (
                    <G key={i}>
                        <Circle cx={point.x} cy={point.y} r={2} fill={COLORS.radarStroke} />
                    </G>
                ))}
            </Svg>
            {tickLabels}
            {labels}
        </View>
    );
}

// Score badge component
function ScoreBadge({ label, value, color }: { label: string; value: string | number; color: string }) {
    return (
        <View style={styles.statBox}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

export default function PDFReport({ reportData, aiInsights }: PDFReportProps) {
    const { userInfo, domainResults, overallScore, flourishingDomains, languishingDomains, generatedAt } = reportData;
    const dateStr = new Date(generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const radarData = domainResults.map(d => ({ domain: d.domainName, score: d.averageScore }));
    const sortedDomains = [...domainResults].sort((a, b) => a.averageScore - b.averageScore);
    const lowestDomain = sortedDomains[0];
    const highestDomain = sortedDomains[sortedDomains.length - 1];
    const flourishingList = domainResults.filter(d => d.isFlourishing).map(d => d.domainName);
    const languishingList = domainResults.filter(d => !d.isFlourishing).map(d => d.domainName);

    const getQuestionsWithResponses = () => {
        return DOMAINS.map(domain => {
            const domainResult = domainResults.find(d => d.domainId === domain.id);
            return {
                domain: domain.name,
                questions: domain.questions.map(q => {
                    const response = domainResult?.responses.find(r => r.questionId === q.id);
                    return { text: q.text, rating: response?.value || 0 };
                }),
            };
        });
    };

    return (
        <Document>
            {/* ========== COVER PAGE ========== */}
            <Page size="A4" style={styles.coverPage}>
                <View style={styles.coverDecoration} />
                <View style={styles.coverContent}>
                    <View style={styles.coverBadge}>
                        <Text style={styles.coverBadgeText}>FLOURISH</Text>
                    </View>

                    <Text style={styles.coverTitle}>Youth Flourishing</Text>
                    <Text style={styles.coverSubtitle}>Personal Assessment Report</Text>

                    <View style={styles.coverScoreCircle}>
                        <Text style={styles.coverScoreValue}>{Math.round(overallScore)}</Text>
                        <Text style={styles.coverScoreLabel}>SCORE</Text>
                    </View>

                    <Text style={styles.coverName}>{userInfo.name}</Text>
                    <Text style={styles.coverDate}>{dateStr}</Text>
                </View>
                <Text style={styles.coverFooter}>Youth Flourishing Framework • 7 Life Domains • 35 Questions</Text>
                <View style={styles.coverBottomDecoration} />
            </Page>

            {/* ========== PAGE 1: OVERVIEW ========== */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageTopBar} />
                <View style={styles.header}>
                    <Text style={styles.logo}>Flourish</Text>
                    <Text style={styles.pageNum}>Page 1</Text>
                </View>

                <Text style={styles.sectionTitle}>Your Flourishing Overview</Text>
                <Text style={styles.sectionSubtitle}>A snapshot of your well-being across 7 life domains</Text>

                <View style={styles.twoColumn}>
                    {/* Left Column: Score Card */}
                    <View style={styles.column}>
                        <View style={[styles.scoreCard, { marginBottom: 20 }]}>
                            <Text style={styles.scoreValue}>{overallScore.toFixed(1)}%</Text>
                            <Text style={styles.scoreLabel}>OVERALL FLOURISHING SCORE</Text>
                            <View style={styles.statsRow}>
                                <ScoreBadge label="FLOURISHING" value={flourishingDomains} color={COLORS.flourishing} />
                                <ScoreBadge label="DEVELOPING" value={languishingDomains} color={COLORS.moderate} />
                            </View>
                        </View>

                        {/* Domain Bars */}
                        <View style={styles.chartContainer}>
                            <Text style={styles.chartTitle}>DOMAIN BREAKDOWN</Text>
                            {domainResults.map(d => (
                                <View key={d.domainId} style={styles.domainRow}>
                                    <View style={styles.domainHeader}>
                                        <Text style={styles.domainName}>{d.domainName}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[styles.domainScore, { color: d.isFlourishing ? COLORS.flourishing : COLORS.moderate }]}>
                                                {d.averageScore.toFixed(1)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.barContainer}>
                                        <View style={[styles.barFill, {
                                            width: `${(d.averageScore / 6) * 100}%`,
                                            backgroundColor: DOMAIN_COLORS[d.domainId] || COLORS.radarStroke
                                        }]} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Right Column: Radar Chart */}
                    <View style={styles.column}>
                        <View style={styles.chartContainer}>
                            <Text style={styles.chartTitle}>DOMAIN OVERVIEW</Text>
                            <View style={{ alignItems: 'center' }}>
                                <RadarChartVisual data={radarData} />
                            </View>
                        </View>

                        {/* Quick Stats */}
                        <View style={[styles.insightCard, styles.insightCardAccent, { marginTop: 20, padding: 16 }]}>
                            <Text style={styles.insightTitle}>Key Highlights</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                                <View style={styles.insightBullet} />
                                <Text style={styles.insightItem}>Strongest: {highestDomain.domainName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                                <View style={[styles.insightBullet, { backgroundColor: COLORS.moderate }]} />
                                <Text style={styles.insightItem}>Growth Area: {lowestDomain.domainName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                                <Text style={styles.insightItem}>
                                    {flourishingDomains >= 5 ? 'Thriving across most domains!' :
                                        flourishingDomains >= 3 ? 'Good foundation, room to grow' :
                                            'Focused development recommended'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Generated on {dateStr}</Text>
                    <Text style={styles.footerBrand}>Flourishing Framework</Text>
                </View>
            </Page>

            {/* ========== PAGE 2: PERSONALIZED INSIGHTS (ENHANCED) ========== */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageTopBar} />
                <View style={styles.header}>
                    <Text style={styles.logo}>Flourish</Text>
                    <Text style={styles.pageNum}>Page 2</Text>
                </View>

                <Text style={styles.sectionTitle}>Personalized Insights</Text>
                <Text style={styles.sectionSubtitle}>AI-powered analysis tailored to your unique profile</Text>

                {/* Summary - Enhanced with better spacing */}
                <View style={[styles.insightCard, { padding: 18, marginBottom: 16 }]}>
                    <Text style={[styles.paragraph, { lineHeight: 1.7, fontSize: 9.5 }]}>
                        {aiInsights?.summary || `Based on your responses, ${userInfo.name}, you have an overall flourishing score of ${overallScore.toFixed(1)}%. You are flourishing in ${flourishingDomains} out of 7 life domains. Your strongest area is ${highestDomain.domainName}, while ${lowestDomain.domainName} shows the most room for growth.`}
                    </Text>
                </View>

                {/* Two Column: Strengths & Growth Areas */}
                <View style={styles.twoColumn}>
                    {/* Strengths - Enhanced */}
                    <View style={styles.column}>
                        <View style={[styles.insightCard, styles.insightCardAccent, styles.strengthCard]}>
                            <Text style={[styles.insightTitle, { color: COLORS.flourishing, marginBottom: 12 }]}>Your Strengths</Text>
                            {aiInsights?.strengths ? (
                                aiInsights.strengths.map((s, i) => (
                                    <View key={i} style={styles.insightItemWithIcon}>
                                        <View style={[styles.insightBullet, { backgroundColor: COLORS.flourishing }]} />
                                        <Text style={[styles.insightTextBlock, { color: COLORS.textSecondary }]}>{s}</Text>
                                    </View>
                                ))
                            ) : (
                                flourishingList.slice(0, 3).map((d, i) => (
                                    <View key={i} style={styles.insightItemWithIcon}>
                                        <View style={[styles.insightBullet, { backgroundColor: COLORS.flourishing }]} />
                                        <Text style={[styles.insightTextBlock, { color: COLORS.textSecondary }]}>Strong foundation in {d}</Text>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>

                    {/* Growth Areas - Enhanced */}
                    <View style={styles.column}>
                        <View style={[styles.insightCard, styles.insightCardAccent, styles.growthCard]}>
                            <Text style={[styles.insightTitle, { color: COLORS.moderate, marginBottom: 12 }]}>Growth Areas</Text>
                            {aiInsights?.growthAreas ? (
                                aiInsights.growthAreas.map((a, i) => (
                                    <View key={i} style={styles.insightItemWithIcon}>
                                        <View style={[styles.insightBullet, { backgroundColor: COLORS.moderate }]} />
                                        <Text style={[styles.insightTextBlock, { color: COLORS.textSecondary }]}>{a}</Text>
                                    </View>
                                ))
                            ) : (
                                languishingList.slice(0, 2).map((d, i) => (
                                    <View key={i} style={styles.insightItemWithIcon}>
                                        <View style={[styles.insightBullet, { backgroundColor: COLORS.moderate }]} />
                                        <Text style={[styles.insightTextBlock, { color: COLORS.textSecondary }]}>Opportunity to develop {d}</Text>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>
                </View>

                {/* Recommendations - SIGNIFICANTLY ENHANCED */}
                <View style={[styles.insightCard, styles.insightCardAccent, styles.recCard, { paddingTop: 20, paddingBottom: 20 }]}>
                    <Text style={[styles.insightTitle, { color: COLORS.blue, marginBottom: 14 }]}>Personalized Recommendations</Text>

                    {aiInsights?.structuredRecommendations && aiInsights.structuredRecommendations.length > 0 ? (
                        aiInsights.structuredRecommendations.slice(0, 2).map((rec, index) => {
                            const isLast = index === aiInsights.structuredRecommendations!.slice(0, 2).length - 1;
                            return (
                                <View key={rec.id} style={[styles.recommendationBlock, isLast ? { borderBottomWidth: 0 } : {}]}>
                                    {/* Header with number and title */}
                                    <View style={styles.recommendationHeader}>
                                        <View style={styles.recommendationNumber}>
                                            <Text style={styles.recommendationNumberText}>{rec.id}</Text>
                                        </View>
                                        <Text style={styles.recommendationTitle}>{rec.category}</Text>
                                    </View>

                                    {/* Main recommendation text */}
                                    <Text style={[styles.recommendationText, { marginBottom: 8 }]}>{rec.text}</Text>

                                    {/* Options */}
                                    {rec.options && rec.options.length > 0 && (
                                        <Text style={styles.recommendationOptions}>
                                            Try: {rec.options.join(' • ')}
                                        </Text>
                                    )}

                                    {/* Action step */}
                                    <Text style={styles.recommendationAction}>→ {rec.actionStep}</Text>
                                </View>
                            );
                        })
                    ) : aiInsights?.recommendations ? (
                        aiInsights.recommendations.slice(0, 3).map((r, i) => (
                            <View key={i} style={styles.insightItemWithIcon}>
                                <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                                <Text style={styles.insightTextBlock}>{r}</Text>
                            </View>
                        ))
                    ) : (
                        <>
                            <View style={styles.insightItemWithIcon}>
                                <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                                <Text style={styles.insightTextBlock}>Focus on small, consistent improvements in {lowestDomain.domainName}</Text>
                            </View>
                            <View style={styles.insightItemWithIcon}>
                                <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                                <Text style={styles.insightTextBlock}>Leverage your strength in {highestDomain.domainName} to support other areas</Text>
                            </View>
                            <View style={styles.insightItemWithIcon}>
                                <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                                <Text style={styles.insightTextBlock}>Connect with mentors or peers in your growth areas</Text>
                            </View>
                        </>
                    )}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Generated on {dateStr}</Text>
                    <Text style={styles.footerBrand}>NIRMAN Flourishing Framework</Text>
                </View>
            </Page>

            {/* ========== PAGE 3: MORE INSIGHTS ========== */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageTopBar} />
                <View style={styles.header}>
                    <Text style={styles.logo}>Flourish</Text>
                    <Text style={styles.pageNum}>Page 3</Text>
                </View>

                <Text style={styles.sectionTitle}>Deep Insights & Resources</Text>
                <Text style={styles.sectionSubtitle}>Additional guidance for your flourishing journey</Text>

                {/* Pattern Insight - Enhanced */}
                {aiInsights?.interDomainInsight && (
                    <View style={[styles.insightCard, styles.insightCardAccent, { padding: 18, marginBottom: 16 }]}>
                        <Text style={[styles.insightTitle, { color: COLORS.primary, marginBottom: 10 }]}>Pattern Insight</Text>
                        <Text style={[styles.paragraph, { lineHeight: 1.6 }]}>{aiInsights.interDomainInsight}</Text>
                    </View>
                )}

                {/* Resources - Matching Website UI */}
                {aiInsights?.recommendedResources && aiInsights.recommendedResources.length > 0 && (
                    <View style={[styles.insightCard, { padding: 16, marginBottom: 16 }]}>
                        <Text style={[styles.insightTitle, { color: COLORS.primary, marginBottom: 12 }]}>Resources For You</Text>
                        {aiInsights.recommendedResources.slice(0, 5).map((r, i) => (
                            <Link key={i} src={r.url} style={{ textDecoration: 'none' }}>
                                <View style={{
                                    padding: 10,
                                    marginBottom: 8,
                                    backgroundColor: COLORS.surface,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: COLORS.border
                                }}>
                                    {/* Title Row with Domain Badge */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                                        <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: COLORS.primary, marginRight: 6 }}>
                                            {r.title}
                                        </Text>
                                        {r.domain && (
                                            <Text style={{
                                                fontSize: 7,
                                                color: COLORS.primary,
                                                backgroundColor: '#1a2a0a',
                                                paddingHorizontal: 4,
                                                paddingVertical: 2,
                                                borderRadius: 3
                                            }}>
                                                {r.domain}
                                            </Text>
                                        )}
                                    </View>

                                    {/* Reason */}
                                    {r.reason && (
                                        <Text style={{ fontSize: 8, color: COLORS.textMuted, lineHeight: 1.4, marginBottom: 4 }}>
                                            {r.reason}
                                        </Text>
                                    )}

                                    {/* URL - Clickable indicator */}
                                    <Text style={{ fontSize: 7, color: COLORS.blue, marginTop: 2 }}>
                                        Click to view resource
                                    </Text>
                                </View>
                            </Link>
                        ))}
                    </View>
                )}

                {/* Personal Note - Enhanced */}
                <View style={[styles.insightCard, { backgroundColor: COLORS.surfaceLight, borderLeftWidth: 4, borderLeftColor: COLORS.primary, padding: 20 }]}>
                    <Text style={{ fontSize: 11, fontStyle: 'italic', color: COLORS.textSecondary, lineHeight: 1.7, textAlign: 'center' }}>
                        "{aiInsights?.personalNote || `${userInfo.name}, flourishing is a journey, not a destination. Your strengths in ${highestDomain.domainName} show great potential. Take it one step at a time.`}"
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Generated on {dateStr}</Text>
                    <Text style={styles.footerBrand}>NIRMAN Flourishing Framework</Text>
                </View>
            </Page>

            {/* ========== PAGE 4: DETAILED RATINGS - FIRST HALF ========== */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageTopBar} />
                <View style={styles.header}>
                    <Text style={styles.logo}>Flourish</Text>
                    <Text style={styles.pageNum}>Page 4</Text>
                </View>

                <Text style={styles.sectionTitle}>Detailed Question Ratings</Text>
                <Text style={styles.sectionSubtitle}>Visual breakdown of your responses by domain (Domains 1-4)</Text>

                {getQuestionsWithResponses().slice(0, 4).map((section) => (
                    <View key={section.domain} wrap={false}>
                        <Text style={styles.questionDomain}>{section.domain}</Text>
                        {section.questions.map((q, i) => (
                            <View key={i} style={styles.questionRow}>
                                <Text style={styles.questionText}>{q.text}</Text>
                                <RatingHeatmap rating={q.rating} />
                            </View>
                        ))}
                    </View>
                ))}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Green (5-6) = Strong • Yellow (3-4) = Growing • Red (1-2) = Focus Area</Text>
                    <Text style={styles.footerBrand}>NIRMAN Flourishing Framework</Text>
                </View>
            </Page>

            {/* ========== PAGE 5: DETAILED RATINGS - SECOND HALF ========== */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageTopBar} />
                <View style={styles.header}>
                    <Text style={styles.logo}>Flourish</Text>
                    <Text style={styles.pageNum}>Page 5</Text>
                </View>

                <Text style={styles.sectionTitle}>Detailed Question Ratings</Text>
                <Text style={styles.sectionSubtitle}>Visual breakdown of your responses by domain (Domains 5-7)</Text>

                {getQuestionsWithResponses().slice(4).map((section) => (
                    <View key={section.domain} wrap={false}>
                        <Text style={styles.questionDomain}>{section.domain}</Text>
                        {section.questions.map((q, i) => (
                            <View key={i} style={styles.questionRow}>
                                <Text style={styles.questionText}>{q.text}</Text>
                                <RatingHeatmap rating={q.rating} />
                            </View>
                        ))}
                    </View>
                ))}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Green (5-6) = Strong • Yellow (3-4) = Growing • Red (1-2) = Focus Area</Text>
                    <Text style={styles.footerBrand}>NIRMAN Flourishing Framework</Text>
                </View>
            </Page>

            {/* ========== FINAL PAGE: PATH FORWARD ========== */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageTopBar} />
                <View style={styles.header}>
                    <Text style={styles.logo}>Flourish</Text>
                    <Text style={styles.pageNum}>Final</Text>
                </View>

                <Text style={styles.sectionTitle}>Your Path Forward</Text>
                <Text style={styles.sectionSubtitle}>Actionable next steps for continued growth</Text>

                {/* Growth Trajectory */}
                <View style={[styles.insightCard, styles.insightCardAccent, { padding: 18 }]}>
                    <Text style={styles.insightTitle}>Growth Trajectory</Text>
                    <Text style={[styles.paragraph, { lineHeight: 1.6 }]}>
                        {aiInsights?.growthTrajectory || `Your ${lowestDomain.domainName} could improve from ${lowestDomain.averageScore.toFixed(1)} to ${Math.min(6, lowestDomain.averageScore + 1.5).toFixed(1)} with focused effort over 6 months.`}
                    </Text>
                </View>

                {/* Next Steps */}
                <View style={[styles.insightCard, styles.insightCardAccent, styles.recCard, { paddingTop: 18, paddingBottom: 18 }]}>
                    <Text style={[styles.insightTitle, { color: COLORS.blue, marginBottom: 12 }]}>Immediate Next Steps</Text>
                    <View style={styles.insightItemWithIcon}>
                        <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                        <Text style={styles.insightTextBlock}>Review your lowest-scoring domain: {lowestDomain.domainName}</Text>
                    </View>
                    <View style={styles.insightItemWithIcon}>
                        <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                        <Text style={styles.insightTextBlock}>Choose ONE small action from the recommendations</Text>
                    </View>
                    <View style={styles.insightItemWithIcon}>
                        <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                        <Text style={styles.insightTextBlock}>Set a reminder to retake this assessment in 6 months</Text>
                    </View>
                    <View style={styles.insightItemWithIcon}>
                        <View style={[styles.insightBullet, { backgroundColor: COLORS.blue }]} />
                        <Text style={styles.insightTextBlock}>Share your strengths with someone you trust</Text>
                    </View>
                </View>

                {/* About the Framework - Enhanced */}
                <View style={[styles.insightCard, { backgroundColor: COLORS.flourishingBg, borderLeftWidth: 4, borderLeftColor: COLORS.flourishing, padding: 20 }]}>
                    <Text style={[styles.insightTitle, { color: COLORS.flourishing, marginBottom: 12 }]}>About the Framework</Text>

                    <Text style={[styles.paragraph, { lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }]}>
                        "Absence of mental or physical illness does not automatically mean presence of good health. There are myriad possibilities of growing on the positive side of the axis."
                    </Text>

                    <Text style={[styles.paragraph, { lineHeight: 1.6, marginBottom: 10 }]}>
                        This report is based on the <Text style={{ fontFamily: 'Helvetica-Bold' }}>NIRMAN Youth Flourishing Framework</Text>, a comprehensive model developed to help young people move beyond just 'surviving' to truly 'thriving'.
                    </Text>

                    <Text style={[styles.paragraph, { lineHeight: 1.6 }]}>
                        It assesses 50 parameters across 7 key domains of life. Your results provide a roadmap for your personal growth journey.
                    </Text>
                </View>

                <View style={{ marginTop: 16, alignItems: 'center' }}>
                    <Link src="https://nirman.mkcl.org" style={{ textDecoration: 'none' }}>
                        <Text style={{ fontSize: 10, color: COLORS.primary, fontFamily: 'Helvetica-Bold' }}>
                            Visit nirman.mkcl.org to learn more →
                        </Text>
                    </Link>
                </View>

                {/* Closing Quote */}
                <View style={{ marginTop: 24, padding: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, fontStyle: 'italic', color: COLORS.textMuted, textAlign: 'center', lineHeight: 1.7 }}>
                        "Flourishing is not a destination, it's a way of traveling."
                    </Text>
                    <Text style={{ fontSize: 9, color: COLORS.textSubtle, marginTop: 12 }}>
                        — The NIRMAN Philosophy
                    </Text>
                </View>

                {/* Thank You */}
                <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontFamily: 'Helvetica-Bold', color: COLORS.primary }}>
                        Thank you, {userInfo.name}!
                    </Text>
                    <Text style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 8 }}>
                        Your journey to flourishing starts now.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerBrand}>Report Generated: {dateStr}</Text>
                </View>
            </Page>
        </Document>
    );
}