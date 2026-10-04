"use client";

import React, { useState } from "react";
import { Check, Columns2, Copy, FileCode, ScrollText, Split } from "lucide-react";
import { diffLines, Change } from "diff";
import { tokenizeSql } from "@/lib/sql-highlight";
import type { VerificationReport } from "@/lib/types";

interface DiffViewerProps {
  originalSql: string;
  optimizedSql: string;
  verification?: VerificationReport | null;
  explanation?: string;
  onOpenStoredProc?: () => void;
}

export function DiffViewer({
  originalSql,
  optimizedSql,
  verification,
  explanation,
  onOpenStoredProc,
}: DiffViewerProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"clean" | "split" | "unified">("clean");

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diffResult: Change[] = diffLines(originalSql, optimizedSql);
  const editCounts = verification?.ast_edit_counts || {};
  const tokens = tokenizeSql(optimizedSql);

  const isSyntaxIdentical =
    originalSql.replace(/\s+/g, " ").trim().toLowerCase() ===
    optimizedSql.replace(/\s+/g, " ").trim().toLowerCase();

  return (
    <div className="flex flex-col h-full rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
      {/* Header toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-900/80 border-b border-white/[0.06]">
        {/* View toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950/60 border border-white/[0.06]">
          <button
            onClick={() => setViewMode("clean")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === "clean"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>{isSyntaxIdentical ? "Formatted SQL" : "Optimized SQL"}</span>
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === "split"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Split className="h-3.5 w-3.5" />
            <span>Side-by-Side</span>
          </button>
          <button
            onClick={() => setViewMode("unified")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === "unified"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Columns2 className="h-3.5 w-3.5" />
            <span>Diff</span>
          </button>
          {isSyntaxIdentical && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium ml-1">
              Syntax Optimal
            </span>
          )}
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          {viewMode !== "clean" && (editCounts.insert || editCounts.remove) && (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-1">
              {editCounts.insert ? (
                <span className="text-emerald-400">+{editCounts.insert}</span>
              ) : null}
              {editCounts.remove ? (
                <span className="text-rose-400">-{editCounts.remove}</span>
              ) : null}
            </div>
          )}

          {onOpenStoredProc && (
            <button
              type="button"
              onClick={onOpenStoredProc}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-white/[0.08] transition-all active:scale-[0.98]"
              title="Convert optimized query to stored procedure"
            >
              <ScrollText className="h-3.5 w-3.5 text-indigo-400" />
              <span>
                <span className="hidden sm:inline">Convert to </span>Stored Procedure
              </span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
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

      {/* Explanation Banner (Concise & Elegant) */}
      {explanation && (
        <div className={`px-4 py-2.5 border-b text-xs leading-relaxed flex items-start gap-2 ${
          isSyntaxIdentical
            ? "bg-emerald-500/5 border-emerald-500/10 text-slate-300"
            : "bg-indigo-500/5 border-indigo-500/10 text-slate-300"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
            isSyntaxIdentical ? "bg-emerald-400" : "bg-indigo-400"
          }`} />
          <p>
            <strong className={`font-medium ${isSyntaxIdentical ? "text-emerald-300" : "text-indigo-300"}`}>
              {isSyntaxIdentical ? "Query Syntax Optimal: " : "Why it's faster: "}
            </strong>
            {explanation}
          </p>
        </div>
      )}

      {/* Code Canvas */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-6 bg-slate-950/70">
        {viewMode === "clean" ? (
          <pre className="whitespace-pre-wrap break-words">
            <code>
              {tokens.map((tok, idx) => (
                <span key={idx} className={tok.className}>
                  {tok.text}
                </span>
              ))}
            </code>
          </pre>
        ) : viewMode === "split" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Original */}
            <div className="rounded-xl bg-slate-950/80 border border-white/[0.04] p-3.5">
              <div className="text-[11px] font-semibold text-rose-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Original Query
              </div>
              <pre className="text-slate-400 whitespace-pre-wrap leading-6">
                <code>{originalSql}</code>
              </pre>
            </div>

            {/* Right: Optimized */}
            <div className="rounded-xl bg-slate-950/80 border border-emerald-500/20 p-3.5">
              <div className="text-[11px] font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Optimized Rewrite
              </div>
              <pre className="text-slate-200 whitespace-pre-wrap leading-6">
                <code>{optimizedSql}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-0.5 leading-6">
            {diffResult.map((part, index) => {
              const style = part.added
                ? "bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-400 pl-2"
                : part.removed
                ? "bg-rose-500/10 text-rose-300 border-l-2 border-rose-400 line-through opacity-70 pl-2"
                : "text-slate-400 pl-2.5";

              return (
                <div key={index} className={`${style} whitespace-pre-wrap`}>
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

