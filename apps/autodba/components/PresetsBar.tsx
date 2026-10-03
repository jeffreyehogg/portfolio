"use client";

import React from "react";
import { Sparkles, Database } from "lucide-react";
import type { PresetSummary } from "@/lib/types";

interface PresetsBarProps {
  presets: PresetSummary[];
  selectedId: string | null;
  onSelect: (preset: PresetSummary) => void;
  isLoading: boolean;
}

const DIALECT_COLORS: Record<string, string> = {
  tsql: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  postgres: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  mysql: "text-amber-400 bg-amber-500/10 border-amber-500/30",
};

export function PresetsBar({
  presets,
  selectedId,
  onSelect,
  isLoading,
}: PresetsBarProps) {
  if (isLoading && presets.length === 0) {
    return (
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-16 w-64 shrink-0 rounded-2xl bg-slate-900/60 border border-white/[0.08]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
            Enterprise Scenarios (Zero-Cost Pre-Computed AST Benchmarks)
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          1-Click Load • Instant Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((preset) => {
          const isSelected = selectedId === preset.id;
          const dialectBadgeColor =
            DIALECT_COLORS[preset.dialect] || "text-slate-400 bg-slate-500/10 border-slate-500/30";

          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              className={`group text-left relative flex flex-col justify-between p-3.5 rounded-2xl transition-all duration-200 border cursor-pointer active:scale-[0.98] ${
                isSelected
                  ? "bg-slate-800/90 border-indigo-500/50 shadow-lg shadow-indigo-500/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] ring-1 ring-indigo-500/40"
                  : "bg-slate-900/60 hover:bg-slate-850/80 border-white/[0.08] hover:border-white/[0.15] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${dialectBadgeColor}`}
                  >
                    {preset.dialect === "tsql"
                      ? "SQL Server"
                      : preset.dialect === "postgres"
                      ? "PostgreSQL"
                      : "MySQL"}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {preset.headline_metric}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-300 transition-colors">
                  {preset.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-slate-300 font-medium">{preset.domain}</span>
                <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  Load Preset →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
