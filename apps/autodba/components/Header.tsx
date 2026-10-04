"use client";

import React from "react";
import {
  Database,
  ExternalLink,
  Key,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { HealthResponse } from "@/lib/types";

interface HeaderProps {
  health: HealthResponse | null;
  onOpenMcp: () => void;
  onOpenByok: () => void;
  hasByokKey: boolean;
}

export function Header({
  health,
  onOpenMcp,
  onOpenByok,
  hasByokKey,
}: HeaderProps) {
  const isHealthy = health?.status === "ok";
  const llmReady = health?.llm_configured || hasByokKey;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Database className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-white">
              AutoDBA
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">/</span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              SQL Optimizer
            </span>
          </div>
        </div>

        {/* Engine status & actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Subtle status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-slate-900/50 border border-white/[0.06] px-2.5 py-1 text-xs">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isHealthy
                  ? llmReady
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-indigo-400"
                  : "bg-rose-400"
              }`}
            />
            <span className="font-mono text-[11px] text-slate-400">
              {llmReady ? "AI Active" : "Fast AST"}
            </span>
          </div>

          {/* BYOK Button */}
          <button
            onClick={onOpenByok}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all active:scale-[0.98] ${
              hasByokKey
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-slate-900/60 text-slate-300 border border-white/[0.06] hover:bg-slate-800 hover:text-white"
            }`}
            title="Configure API Key"
          >
            <Key className="h-3 w-3" />
            <span>{hasByokKey ? "Key Active" : "API Key"}</span>
          </button>

          {/* MCP Server Button */}
          <button
            onClick={onOpenMcp}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900/60 border border-white/[0.06] px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all active:scale-[0.98]"
            title="Model Context Protocol Server for Claude / Cursor"
          >
            <Terminal className="h-3 w-3 text-cyan-400" />
            <span>MCP</span>
          </button>

          <div className="h-4 w-px bg-white/[0.08] mx-0.5" />

          {/* GitHub Link */}
          <a
            href="https://github.com/jeffreyehogg/portfolio/tree/main/apps/autodba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/80 transition-all active:scale-[0.98]"
            aria-label="GitHub Repository"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* Portfolio link */}
          <a
            href="https://jeffhogg.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-900/80 transition-all active:scale-[0.98]"
          >
            <span>Portfolio</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
