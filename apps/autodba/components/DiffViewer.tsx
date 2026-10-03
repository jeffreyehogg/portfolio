"use client";

import React, { useState } from "react";
import { Check, Columns2, Copy, FileText, Split } from "lucide-react";
import { diffLines, Change } from "diff";
import type { VerificationReport } from "@/lib/types";

interface DiffViewerProps {
  originalSql: string;
  optimizedSql: string;
  verification?: VerificationReport | null;
  explanation?: string;
}

export function DiffViewer({
  originalSql,
  optimizedSql,
  verification,
  explanation,
}: DiffViewerProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "unified">("split");

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diffResult: Change[] = diffLines(originalSql, optimizedSql);

  const editCounts = verification?.ast_edit_counts || {};
  const hasEdits = Object.keys(editCounts).length > 0;

  return (
    <div className="rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden">
      {/* Header toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
            AST Query Rewrite Diff
          </span>
          {/* Edit counts chips */}
          {hasEdits && (
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              {editCounts.insert ? (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  +{editCounts.insert} Inserts
                </span>
              ) : null}
              {editCounts.remove ? (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                  -{editCounts.remove} Removals
                </span>
              ) : null}
              {editCounts.update ? (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                  ~{editCounts.update} Updates
                </span>
              ) : null}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950/60 border border-white/[0.06]">
            <button
              onClick={() => setViewMode("split")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "split"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Side-by-side view"
            >
              <Split className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode("unified")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "unified"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Unified view"
            >
              <Columns2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy SQL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Explanation Banner (if available) */}
      {explanation && (
        <div className="px-4 py-3 bg-indigo-950/30 border-b border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
          <strong className="text-indigo-400 font-semibold">Architectural Rationale: </strong>
          {explanation}
        </div>
      )}

      {/* Code Canvas */}
      <div className="font-mono text-xs overflow-x-auto max-h-[500px]">
        {viewMode === "split" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {/* Left: Original */}
            <div className="p-4 bg-slate-950/60">
              <div className="text-[10px] uppercase font-bold text-rose-400 mb-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Original Query (Anti-Patterns)
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap leading-6">
                <code>{originalSql}</code>
              </pre>
            </div>

            {/* Right: Optimized */}
            <div className="p-4 bg-slate-950/30">
              <div className="text-[10px] uppercase font-bold text-emerald-400 mb-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Optimized Rewrite (SARGable)
              </div>
              <pre className="text-slate-100 whitespace-pre-wrap leading-6">
                <code>{optimizedSql}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-950/60 leading-6 space-y-0.5">
            {diffResult.map((part, index) => {
              const bg = part.added
                ? "bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500 pl-2"
                : part.removed
                ? "bg-rose-500/15 text-rose-300 border-l-2 border-rose-500 line-through opacity-80 pl-2"
                : "text-slate-300 pl-2.5";

              return (
                <div key={index} className={`${bg} whitespace-pre-wrap font-mono`}>
                  {part.value}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
