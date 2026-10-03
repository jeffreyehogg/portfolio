import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://autodba.jeffhogg.com"),
  title: {
    default: "AutoDBA — Agentic SQL Diagnostics & Query Optimization",
    template: "%s | AutoDBA",
  },
  description:
    "Autonomous SQL query profiler, AST antipattern analyzer, and zero-downtime index synthesis platform running on modern Python 3.12, sqlglot, and Google Gemini Flash.",
  keywords: [
    "AutoDBA",
    "SQL Optimization",
    "Database Tuning",
    "SQL Server",
    "PostgreSQL",
    "MySQL",
    "sqlglot",
    "Agentic AI",
    "Query Profiler",
  ],
  authors: [{ name: "Jeff Hogg", url: "https://jeffhogg.com" }],
  creator: "Jeff Hogg",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://autodba.jeffhogg.com",
    title: "AutoDBA — Agentic SQL Diagnostics & Query Optimization",
    description:
      "Autonomous SQL query profiler, AST antipattern analyzer, and zero-downtime index synthesis platform.",
    siteName: "AutoDBA",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoDBA — Agentic SQL Diagnostics & Query Optimization",
    description:
      "Autonomous SQL query profiler, AST antipattern analyzer, and zero-downtime index synthesis platform.",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Ambient atmospheric diffusers */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] animate-subtle-pulse" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px]" />
          <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[180px]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
