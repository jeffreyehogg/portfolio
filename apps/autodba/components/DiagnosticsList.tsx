"use client";

import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Lightbulb,
} from "lucide-react";
import type { Diagnostic, Severity } from "@/lib/types";

interface DiagnosticsListProps {
  diagnostics: Diagnostic[];
  isLoading: boolean;
  onSelectSnippet?: (snippet: string) => void;
}

const SEVERITY_CONFIG: Record<
  Severity,
  {
    icon: React.ElementType;
    badgeClass: string;
    cardBorder: string;
    glow: string;
    title: string;
  }
> = {
  critical: {
    icon: AlertCircle,
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    cardBorder: "border-rose-500/20 hover:border-rose-500/40",
    glow: "bg-rose-500/5",
    title: "Critical Bottleneck",
  },
  warning: {
    icon: AlertTriangle,
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    cardBorder: "border-amber-500/20 hover:border-amber-500/40",
    glow: "bg-amber-500/5",
    title: "Warning / Degraded Seek",
  },
  optimization: {
    icon: Info,
    badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    cardBorder: "border-cyan-500/20 hover:border-cyan-500/40",
    glow: "bg-cyan-500/5",
    title: "Optimization Opportunity",
  },
};

export function DiagnosticsList({
  diagnostics,
  isLoading,
}: DiagnosticsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-900/60 border border-white/[0.08] p-4 animate-pulse"
          >
            <div className="h-4 w-32 bg-slate-800 rounded mb-3" />
            <div className="h-3 w-3/4 bg-slate-800/60 rounded mb-2" />
            <div className="h-10 w-full bg-slate-950/60 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (diagnostics.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30 p-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white mb-1">
          Zero Anti-Patterns Detected
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          The query AST conforms to production SARGability standards with explicit joins and bounded scans.
        </p>
      </div>
    );
  }

  const criticalCount = diagnostics.filter((d) => d.severity === "critical").length;
  const warningCount = diagnostics.filter((d) => d.severity === "warning").length;
  const optCount = diagnostics.filter((d) => d.severity === "optimization").length;

  return (
    <div className="space-y-3">
      {/* Summary Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-1 text-xs">
        {criticalCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {criticalCount} Critical
          </span>
        )}
        {warningCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {warningCount} Warning
          </span>
        )}
        {optCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {optCount} Optimization
          </span>
        )}
      </div>

      {/* Diagnostics Cards */}
      <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
        {diagnostics.map((diag, index) => {
          const cfg = SEVERITY_CONFIG[diag.severity] || SEVERITY_CONFIG.warning;
          const Icon = cfg.icon;

          return (
            <div
              key={`${diag.rule_id}-${index}`}
              className="rounded-xl bg-slate-900/50 border border-white/[0.06] p-3.5 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold uppercase border ${cfg.badgeClass}`}
                  >
                    <Icon className="h-3 w-3" />
                    {diag.severity}
                  </span>
                  <span className="text-xs font-semibold text-white">{diag.title}</span>
                </div>
                {diag.line && (
                  <span className="font-mono text-[10px] text-slate-500">
                    Line {diag.line}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                {diag.message}
              </p>

              {/* Code Snippet */}
              {diag.snippet && (
                <div className="rounded-lg bg-slate-950/80 border border-white/[0.04] p-2 mb-2.5 font-mono text-[11px] text-rose-300 overflow-x-auto">
                  <code>{diag.snippet}</code>
                </div>
              )}

              {/* Suggestion */}
              <div className="flex items-start gap-2 rounded-lg bg-slate-950/40 border border-indigo-500/10 p-2 text-[11px] text-slate-300">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-indigo-300 font-medium">Recommendation: </strong>
                  {diag.suggestion}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
