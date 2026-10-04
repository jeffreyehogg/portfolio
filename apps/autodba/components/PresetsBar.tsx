"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import type { PresetSummary } from "@/lib/types";

interface PresetsBarProps {
  presets: PresetSummary[];
  selectedId: string | null;
  onSelect: (preset: PresetSummary) => void;
  isLoading: boolean;
}

const DIALECT_LABELS: Record<string, string> = {
  tsql: "T-SQL",
  postgres: "PostgreSQL",
  mysql: "MySQL",
};

export function PresetsBar({
  presets,
  selectedId,
  onSelect,
  isLoading,
}: PresetsBarProps) {
  if (isLoading && presets.length === 0) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none animate-pulse">
        <div className="h-7 w-20 rounded-lg bg-slate-900/60" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-7 w-32 rounded-lg bg-slate-900/60" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
      <div className="flex items-center gap-1.5 text-slate-400 font-medium shrink-0 mr-1">
        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
        <span>Try an example:</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {presets.map((preset) => {
          const isSelected = selectedId === preset.id;
          const dialectLabel = DIALECT_LABELS[preset.dialect] || preset.dialect;

          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                isSelected
                  ? "bg-indigo-600/15 text-indigo-200 border border-indigo-500/40 shadow-sm shadow-indigo-500/10"
                  : "bg-slate-900/50 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-white/[0.06]"
              }`}
              title={preset.description}
            >
              <span>{preset.domain}</span>
              <span
                className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${
                  isSelected
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {dialectLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

