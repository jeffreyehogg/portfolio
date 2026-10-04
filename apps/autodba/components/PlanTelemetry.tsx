"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  Database,
  Gauge,
  Info,
  Server,
  Zap,
} from "lucide-react";
import type { CostEstimate, PlanSummary } from "@/lib/types";

interface PlanTelemetryProps {
  costModel?: CostEstimate | null;
  improvementPct: number;
  planSummary?: PlanSummary | null;
  isLoading: boolean;
}

export function PlanTelemetry({
  costModel,
  improvementPct,
  planSummary,
  isLoading,
}: PlanTelemetryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 rounded-2xl bg-slate-900/60 border border-white/[0.08]" />
        <div className="h-48 rounded-2xl bg-slate-900/60 border border-white/[0.08]" />
      </div>
    );
  }

  const beforeReads = costModel?.logical_reads_before || 120000;
  const afterReads = costModel?.logical_reads_after || 8400;
  const beforeCost = costModel?.before_cost || 184.6;
  const afterCost = costModel?.after_cost || 12.8;

  // Arc gauge calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * Math.min(improvementPct, 95)) / 100;

  return (
    <div className="space-y-4">
      {/* Metrics Spotlight Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
        {/* Gauge card */}
        <div className="sm:col-span-5 rounded-xl bg-slate-900/50 border border-white/[0.06] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              Estimated Workload Reduction
            </span>
          </div>

          <div className="flex items-center gap-4 my-2">
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="text-slate-800"
                  strokeWidth="7"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="text-emerald-400 transition-all duration-1000 ease-out"
                  strokeWidth="7"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={
                    (2 * Math.PI * 34) - ((2 * Math.PI * 34) * Math.min(improvementPct, 95)) / 100
                  }
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-white tracking-tight">
                  {improvementPct}%
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-medium text-slate-200">
                Lower I/O Demand
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Replaces table scans with index seeks and optimizes join filters.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-white/[0.04]">
            Static AST cost model estimation
          </div>
        </div>

        {/* Logical Reads & Cost card */}
        <div className="sm:col-span-7 rounded-xl bg-slate-900/50 border border-white/[0.06] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-cyan-400" />
                Logical Page Reads
              </span>
              <span className="text-xs text-emerald-400 font-semibold">
                -{improvementPct}%
              </span>
            </div>

            {/* Read comparison bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Baseline</span>
                  <span className="text-rose-400 font-medium">
                    {beforeReads.toLocaleString()} reads
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500/80 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Optimized</span>
                  <span className="text-emerald-400 font-medium">
                    {afterReads.toLocaleString()} reads
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(5, 100 - improvementPct)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400">
            <span>RAM saved:</span>
            <span className="text-emerald-300 font-medium font-mono">
              {( (beforeReads - afterReads) * 8 / 1024 ).toFixed(1)} MB / query
            </span>
          </div>
        </div>
      </div>

      {/* Execution Plan Operator Breakdown (if available) */}
      {planSummary && planSummary.operators.length > 0 && (
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-indigo-400" />
              <h5 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
                Plan Operator Hotspots ({planSummary.format})
              </h5>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Total Subtree Cost: {planSummary.total_cost ?? "N/A"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 text-[10px] uppercase">
                  <th className="py-2 px-3">Physical Operator</th>
                  <th className="py-2 px-3">Target Object</th>
                  <th className="py-2 px-3 text-right">Est. Rows</th>
                  <th className="py-2 px-3 text-right">Cost %</th>
                  <th className="py-2 px-3">Bottlenecks & Warnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {planSummary.operators.map((op, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      op.is_bottleneck ? "bg-rose-500/[0.04]" : ""
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-1.5">
                      {op.is_bottleneck && (
                        <AlertTriangle className="h-3 w-3 text-rose-400 shrink-0" />
                      )}
                      <span>{op.op}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {op.object || "—"}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-300">
                      {op.estimated_rows ? op.estimated_rows.toLocaleString() : "—"}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`font-semibold ${
                          op.cost_pct >= 25 ? "text-rose-400" : "text-slate-300"
                        }`}
                      >
                        {op.cost_pct}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[11px]">
                      {op.warnings.length > 0 ? (
                        <span className="text-amber-400">
                          {op.warnings.join("; ")}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
