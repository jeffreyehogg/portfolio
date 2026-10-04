"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Cpu,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function ArchitectureBento() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pt-4 border-t border-white/[0.06]">
      {/* Collapsible Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-indigo-400" />
          <span className="font-medium">How AutoDBA Works: AST Diagnostics & Verification Loop</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-slate-400">
          <span>{isOpen ? "Hide details" : "Show details"}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Architecture Strip */}
      {isOpen && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
          {/* Step 1 */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-[10px] font-bold text-indigo-400">
                1
              </span>
              <span>Deterministic AST Parsing</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Analyzes SQL structure with <code className="text-slate-300">sqlglot</code> to flag non-SARGable functions, Cartesian joins, and unindexed filter predicates with zero LLM tokens.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500/10 text-[10px] font-bold text-cyan-400">
                2
              </span>
              <span>Agentic Rewrite Synthesis</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Transforms queries into index-seekable range predicates, explicit joins, and generates covering <code className="text-slate-300">CREATE INDEX</code> DDL.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                3
              </span>
              <span>AST Diff Verification</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Validates that every candidate rewrite retains identical table targets and statement types, rejecting hallucinations and guarding against prompt injection.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

