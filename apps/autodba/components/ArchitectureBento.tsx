"use client";

import React from "react";
import {
  Cpu,
  Layers,
  Lock,
  Network,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export function ArchitectureBento() {
  return (
    <div className="w-full space-y-4 pt-6 border-t border-white/[0.08]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-cyan-400" />
          <h3 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
            System Architecture & Applied Agentic Protocols
          </h3>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          Zero-Cost Vercel Serverless Polyglot Runtime
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Card 1: Hero Spotlight Card (8 cols) */}
        <div className="md:col-span-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] p-6 relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
              The AutoDBA Optimization State Machine
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            Cyclic Verification & Self-Correction Feedback Loop
          </h4>
          <p className="text-xs text-slate-400 max-w-xl mb-4 leading-relaxed">
            Rather than blindly accepting LLM SQL hallucinations, AutoDBA enforces a strict AST verification boundary. Every candidate rewrite is validated against the original schema targets using <code className="text-indigo-300 font-mono">sqlglot.diff</code>. If an LLM drops a table or mutates a statement, the verifier computes a targeted critique and triggers a self-correction iteration.
          </p>

          {/* Interactive Flow visualizer */}
          <div className="rounded-xl bg-slate-950/80 border border-white/[0.06] p-4 font-mono text-[11px] text-slate-300">
            <div className="flex flex-wrap items-center gap-2 text-center">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                1. AST Analyze
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                2. Plan Parser
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                3. Deterministic Baseline
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                4. Gemini 2.0 Flash
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
                5. AST Diff Verifier
              </span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300">
                6. DDL Synthesis
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Metric / Proof Card (4 cols) */}
        <div className="md:col-span-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Cost & Compute Efficiency
              </span>
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-4xl font-black text-white tracking-tight mt-2">
              0 <span className="text-emerald-400 text-2xl font-bold">Tokens</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              100% of deterministic AST analysis, index DDL synthesis, and enterprise benchmark presets operate completely offline with zero LLM API cost.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Serverless Cold Start</span>
            <span className="text-emerald-400 font-semibold">&lt; 180ms</span>
          </div>
        </div>

        {/* Card 3: Defense Guardrail Card (4 cols) */}
        <div className="md:col-span-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-rose-400">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                Security & Prompt Defense
              </span>
            </div>
            <h5 className="text-sm font-bold text-white mt-1">
              Statement-Type & Schema Lock
            </h5>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Guards against prompt injection attacks embedded inside untrusted query text. A <code className="text-slate-300 font-mono">SELECT</code> can never be mutated into destructive <code className="text-rose-400 font-mono">DROP</code> or <code className="text-rose-400 font-mono">DELETE</code> statements.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Lock className="h-3.5 w-3.5 text-indigo-400" />
            <span>Zero DB Credentials Ever Requested</span>
          </div>
        </div>

        {/* Card 4: Architecture & Tech Stack (8 cols) */}
        <div className="md:col-span-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-cyan-400">
              <Cpu className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                Polyglot Stack & Monorepo Integration
              </span>
            </div>
            <h5 className="text-sm font-bold text-white mt-1">
              FastAPI ASGI + Next.js 16 App Router on Vercel
            </h5>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Engineered as an independent micro-application within the Turborepo monorepo. Deployed seamlessly to Vercel via Next.js serverless rewrites routing <code className="text-cyan-300 font-mono">/api/py/*</code> to the high-performance Python ASGI backend.
            </p>
          </div>

          {/* Tech Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Python 3.12",
              "FastAPI",
              "Pydantic v2",
              "sqlglot 30.x",
              "Google Gemini Flash",
              "Next.js 16 (App Router)",
              "React 19",
              "Tailwind CSS v4",
              "Model Context Protocol (MCP)",
              "Turborepo",
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-slate-800/60 border border-white/[0.08] text-slate-300 text-[11px] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
