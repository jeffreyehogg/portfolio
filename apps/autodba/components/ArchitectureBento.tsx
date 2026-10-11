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
          <span className="font-medium">How AutoDBA Works: Fast, Private, and Production-Safe</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-slate-400">
          <span>{isOpen ? "Hide architecture details" : "Why AutoDBA is safe for production (click to show)"}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Architecture Strip */}
      {isOpen && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-200">
          {/* Card 1 */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                1
              </span>
              <span>100% Private (No DB Access)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Analyzes SQL offline via syntax trees. It never asks for database passwords, so your real customer data is never accessed or exposed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-[10px] font-bold text-indigo-400">
                2
              </span>
              <span>Turns Scans into Index Seeks</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Rewrites slow filters (like <code className="text-slate-300">YEAR(date) = 2026</code>) into clean ranges so the database uses existing indexes instead of checking millions of rows.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500/10 text-[10px] font-bold text-cyan-400">
                3
              </span>
              <span>Zero-Downtime Indexes</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generates non-blocking <code className="text-slate-300">CREATE INDEX</code> scripts (<code className="text-slate-300">ONLINE = ON</code> / <code className="text-slate-300">CONCURRENTLY</code>) that build safely without freezing live web apps.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-500/10 text-[10px] font-bold text-violet-400">
                4
              </span>
              <span>Guaranteed Query Accuracy</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Verifies that every rewrite keeps identical tables, columns, and logic, rejecting AI hallucinations before anything is displayed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

