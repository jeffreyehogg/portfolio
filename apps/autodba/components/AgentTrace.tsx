"use client";

import React from "react";
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { AgentStep, EngineKind, VerificationReport } from "@/lib/types";

interface AgentTraceProps {
  trace: AgentStep[];
  engine: EngineKind;
  model?: string | null;
  verification?: VerificationReport | null;
  totalDurationMs?: number;
}

const STATUS_ICONS = {
  ok: CheckCircle2,
  retry: RefreshCw,
  failed: AlertCircle,
  skipped: Clock,
};

const STATUS_COLORS = {
  ok: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  retry: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  failed: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  skipped: "text-slate-500 bg-slate-800/40 border-slate-700/30",
};

export function AgentTrace({
  trace,
  engine,
  model,
  verification,
  totalDurationMs,
}: AgentTraceProps) {
  return (
    <div className="rounded-xl bg-slate-900/50 border border-white/[0.06] p-4 space-y-3.5">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Workflow className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">
            Execution Lifecycle Trace
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Engine Badge */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[11px] font-medium bg-slate-800 text-slate-300 border border-white/[0.06]">
            {engine === "gemini" ? (
              <>
                <Bot className="h-3 w-3 text-indigo-400" />
                <span>{model || "Gemini Flash"}</span>
              </>
            ) : engine === "preset" ? (
              <>
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>Verified Benchmark</span>
              </>
            ) : (
              <>
                <Cpu className="h-3 w-3 text-cyan-400" />
                <span>Rule Engine</span>
              </>
            )}
          </span>

          {totalDurationMs !== undefined && (
            <span className="font-mono text-[11px] text-slate-500">
              {totalDurationMs.toFixed(0)}ms
            </span>
          )}
        </div>
      </div>

      {/* Verification summary badge */}
      {verification && (
        <div
          className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
            verification.passed
              ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
              : "bg-rose-950/20 border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="font-semibold">
              {verification.passed
                ? "Safety & Syntax Checks Passed"
                : "Verification Blocked Unsafe Rewrite"}
            </span>
          </div>
          <span className="font-mono text-[11px] opacity-80">
            Tables Preserved: {verification.tables_preserved ? "Yes" : "No"} • Statement: {verification.statement_type_preserved ? "Preserved" : "Altered"}
          </span>
        </div>
      )}

      {/* Timeline Steps */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-white/[0.08]">
        {trace.map((step, idx) => {
          const Icon = STATUS_ICONS[step.status] || CheckCircle2;
          const colorClass = STATUS_COLORS[step.status] || STATUS_COLORS.ok;

          return (
            <div key={idx} className="relative flex items-start gap-3">
              {/* Dot icon */}
              <div
                className={`absolute -left-6 mt-0.5 p-1 rounded-full border ${colorClass}`}
              >
                <Icon className="h-3 w-3" />
              </div>

              {/* Step content */}
              <div className="flex-1 bg-slate-950/50 rounded-xl border border-white/[0.04] p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      {step.node.replace("_", " ")}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      (Iter #{step.iteration})
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {step.duration_ms}ms
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
