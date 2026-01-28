'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, RotateCcw, Mail, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateReportData } from '@/lib/calculations';
import { ReportData, AIInsights, UserInfo, QuestionResponse } from '@/lib/types';
import { PDFDownloadButton } from '@/components/pdf/PDFDownloadButton';

export default function ResultsPage() {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'analyzing' | 'sending' | 'success' | 'error'>('loading');
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [aiInsights, setAIInsights] = useState<AIInsights | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const savedResults = localStorage.getItem('flourish-results');
        if (!savedResults) {
            router.push('/');
            return;
        }

        try {
            const { userInfo, responses } = JSON.parse(savedResults) as {
                userInfo: UserInfo;
                responses: QuestionResponse[]
            };

            const data = generateReportData(userInfo, responses);
            setReportData(data);
            processResults(data);
        } catch {
            router.push('/');
        }
    }, [router]);

    const processResults = async (data: ReportData) => {
        setStatus('analyzing');

        try {
            // 1. Generate AI Insights
            const response = await fetch('/api/generate-insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            let insights: AIInsights | null = null;

            if (result.insights) {
                insights = result.insights;
                setAIInsights(insights);
            }

            // 2. Generate PDF & Send Email
            setStatus('sending');
            await generateAndSendEmail(data, insights);

        } catch (error) {
            console.error('Error processing results:', error);
            setErrorMsg('Something went wrong while processing your report.');
            setStatus('error');
        }
    };

    const generateAndSendEmail = async (data: ReportData, insights: AIInsights | null) => {
        try {
            // Dynamically import PDF components
            const [reactPdf, pdfReportModule] = await Promise.all([
                import('@react-pdf/renderer'),
                import('@/components/pdf/PDFReport')
            ]);

            const { pdf } = reactPdf;
            const PDFReport = pdfReportModule.default;

            // Generate PDF blob on client side
            const blob = await pdf(
                <PDFReport reportData={data} aiInsights={insights || undefined} />
            ).toBlob();

            // Convert blob to base64
            const arrayBuffer = await blob.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');

            // Send to API
            const response = await fetch('/api/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reportData: data,
                    email: data.userInfo.email,
                    pdfBase64: base64,
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus('success');
            } else {
                throw new Error(result.error || 'Failed to send email');
            }
        } catch (error) {
            console.error('Error generating/sending email:', error);
            setErrorMsg('We generated your report but couldn\'t email it. Please try downloading it instead.');
            setStatus('error'); // Or maybe 'partial_success' if we want to show download button? 
            // Actually 'error' state can still show download button.
        }
    };

    const handleRetake = () => {
        localStorage.removeItem('flourish-progress');
        localStorage.removeItem('flourish-results');
        router.push('/');
    };

    // Render Logic
    return (
        <main className="min-h-screen bg-[rgb(15,15,20)] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight mb-2">Flourish</h1>
                    <p className="text-[rgb(var(--color-text-muted))] text-sm">Youth Flourishing Assessment</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-8 text-center"
                >
                    {status === 'loading' && (
                        <div className="py-8">
                            <Loader2 className="w-10 h-10 text-lime-400 animate-spin mx-auto mb-4" />
                            <h2 className="text-lg font-medium mb-2">Loading...</h2>
                        </div>
                    )}

                    {status === 'analyzing' && (
                        <div className="py-8">
                            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto mb-4" />
                            <h2 className="text-lg font-medium mb-2">Analyzing your responses...</h2>
                            <p className="text-sm text-[rgb(var(--color-text-muted))]">
                                Generating personalized insights based on the framework.
                            </p>
                        </div>
                    )}

                    {status === 'sending' && (
                        <div className="py-8">
                            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mx-auto mb-4" />
                            <h2 className="text-lg font-medium mb-2">Finalizing Report...</h2>
                            <p className="text-sm text-[rgb(var(--color-text-muted))]">
                                Generating your PDF and sending it to {reportData?.userInfo.email}...
                            </p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="py-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">Report Sent!</h2>
                            <p className="text-[rgb(var(--color-text-muted))] mb-6">
                                Your personalized Flourishing Report has been sent to <span className="text-[rgb(var(--color-text))] font-medium">{reportData?.userInfo.email}</span>.
                            </p>

                            <div className="bg-[rgb(var(--color-surface-light))] p-4 rounded-lg mb-8 text-left border border-[rgb(var(--color-border))]">
                                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-lime-400" />
                                    Check your inbox
                                </h3>
                                <p className="text-xs text-[rgb(var(--color-text-muted))] mb-2">
                                    The email contains your comprehensive PDF report with:
                                </p>
                                <ul className="space-y-1 text-xs text-[rgb(var(--color-text-muted))] ml-1">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-lime-400" />
                                        Your detailed domain scores
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-lime-400" />
                                        Personalized growth insights
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-lime-400" />
                                        Curated resources for you
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                                {reportData && (
                                    <PDFDownloadButton
                                        reportData={reportData}
                                        aiInsights={aiInsights || undefined}
                                    />
                                )}
                                <button
                                    onClick={handleRetake}
                                    className="btn-secondary w-full justify-center"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Retake Assessment
                                </button>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-4">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Unable to Send Email</h2>
                            <p className="text-[rgb(var(--color-text-muted))] mb-6">
                                {errorMsg || "We encountered an error while sending your report."}
                            </p>

                            <div className="flex flex-col gap-3">
                                {reportData && (
                                    <PDFDownloadButton
                                        reportData={reportData}
                                        aiInsights={aiInsights || undefined}
                                    />
                                )}
                                <button
                                    onClick={handleRetake}
                                    className="btn-secondary w-full justify-center"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                <p className="text-center text-xs text-[rgb(var(--color-text-muted))] mt-8 opacity-50">
                    NIRMAN Youth Flourishing Framework
                </p>
            </div>
        </main>
    );
}
