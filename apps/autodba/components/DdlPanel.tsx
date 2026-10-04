"use client";

import React, { useState } from "react";
import { Check, Copy, Database, Layers } from "lucide-react";
import type { IndexRecommendation } from "@/lib/types";

interface DdlPanelProps {
  indexes: IndexRecommendation[];
  isLoading: boolean;
  hasRun?: boolean;
}

export function DdlPanel({ indexes, isLoading, hasRun = true }: DdlPanelProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAll = () => {
    const allDdl = indexes.map((i) => i.ddl).join("\n\n");
    navigator.clipboard.writeText(allDdl);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (ddl: string, idx: number) => {
    navigator.clipboard.writeText(ddl);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-900/60 border border-white/[0.08] p-4 h-32"
          />
        ))}
      </div>
    );
  }

  if (!hasRun && indexes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30 p-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Layers className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white mb-1">
          No Index Recommendations Yet
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Run an optimization to synthesize covering index DDL and partition strategies.
        </p>
      </div>
    );
  }

  if (indexes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30 p-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Database className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white mb-1">
          No Additional Index Recommendations
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          The query does not expose unindexed equality, join, or range filters requiring schema adjustments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header action */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">
            Recommended Indexes ({indexes.length})
          </span>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-white/[0.08] transition-all active:scale-[0.98]"
        >
          {copiedAll ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Copied All</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400" />
              <span>Copy All DDL</span>
            </>
          )}
        </button>
      </div>

      {/* Index list */}
      <div className="space-y-2.5">
        {indexes.map((rec, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-slate-900/50 border border-white/[0.06] p-3.5 space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">
                  Table: <span className="text-indigo-400 font-mono">{rec.table}</span>
                </span>
                <span
                  className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${
                    rec.estimated_impact === "high"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {rec.estimated_impact} Impact
                </span>
              </div>

              {/* Copy Single */}
              <button
                onClick={() => handleCopySingle(rec.ddl, idx)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                {copiedIndex === idx ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>Copy</span>
              </button>
            </div>

            {/* Key and Include Column Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 font-medium">Seek:</span>
              {rec.key_columns.map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono"
                >
                  {c}
                </span>
              ))}

              {rec.include_columns.length > 0 && (
                <>
                  <span className="text-slate-400 font-medium ml-1.5">Include:</span>
                  {rec.include_columns.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 text-slate-400 font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </>
              )}
            </div>

            {/* Rationale */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {rec.rationale}
            </p>

            {/* DDL Code Box */}
            <div className="rounded-lg bg-slate-950/80 border border-white/[0.04] p-2.5 font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>{rec.ddl}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
