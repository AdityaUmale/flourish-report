'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { ReportData, AIInsights } from '@/lib/types';

interface PDFDownloadButtonProps {
    reportData: ReportData;
    aiInsights?: AIInsights;
}

export function PDFDownloadButton({ reportData, aiInsights }: PDFDownloadButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [PDFComponents, setPDFComponents] = useState<{
        PDFDownloadLink: React.ComponentType<any>;
        PDFReport: React.ComponentType<any>;
    } | null>(null);

    const fileName = `flourish-report-${reportData.userInfo.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

    // Dynamically load PDF components on client side only
    useEffect(() => {
        const loadPDFComponents = async () => {
            try {
                const [reactPdf, pdfReport] = await Promise.all([
                    import('@react-pdf/renderer'),
                    import('./PDFReport')
                ]);

                setPDFComponents({
                    PDFDownloadLink: reactPdf.PDFDownloadLink,
                    PDFReport: pdfReport.default
                });
                setIsReady(true);
            } catch (error) {
                console.error('Failed to load PDF components:', error);
            }
        };

        loadPDFComponents();
    }, []);

    // Show loading state while PDF library loads
    if (!isReady || !PDFComponents) {
        return (
            <button className="btn-primary py-2 px-4 flex items-center gap-2 opacity-70" disabled>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading PDF...
            </button>
        );
    }

    const { PDFDownloadLink, PDFReport } = PDFComponents;

    return (
        <PDFDownloadLink
            document={<PDFReport reportData={reportData} aiInsights={aiInsights} />}
            fileName={fileName}
            onClick={() => setIsGenerating(true)}
        >
            {({ loading }: { loading: boolean }) => (
                <button
                    className="btn-primary py-2 px-4 flex items-center gap-2"
                    disabled={loading || isGenerating}
                >
                    {loading || isGenerating ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4" />
                            Download PDF
                        </>
                    )}
                </button>
            )}
        </PDFDownloadLink>
    );
}
