import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flourish - Youth Flourishing Report",
  description: "Discover your flourishing potential across 7 life domains. Take the comprehensive questionnaire and receive personalized insights powered by AI.",
  keywords: ["flourishing", "well-being", "mental health", "youth", "self-assessment", "personal growth"],
  authors: [{ name: "Flourish" }],
  openGraph: {
    title: "Flourish - Youth Flourishing Report",
    description: "Discover your flourishing potential across 7 life domains",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
