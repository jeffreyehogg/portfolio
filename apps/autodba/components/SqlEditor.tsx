"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Code2,
  FileCode,
  FileText,
  Play,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import { tokenizeSql } from "@/lib/sql-highlight";
import type { Dialect } from "@/lib/types";

interface SqlEditorProps {
  sql: string;
  onChangeSql: (val: string) => void;
  dialect: Dialect;
  onChangeDialect: (val: Dialect) => void;
  plan: string;
  onChangePlan: (val: string) => void;
  onAnalyze: () => void;
  onOptimize: () => void;
  isAnalyzing: boolean;
  isOptimizing: boolean;
  engineMode: "auto" | "deterministic";
  onChangeEngineMode: (mode: "auto" | "deterministic") => void;
}

export function SqlEditor({
  sql,
  onChangeSql,
  dialect,
  onChangeDialect,
  plan,
  onChangePlan,
  onAnalyze,
  onOptimize,
  isAnalyzing,
  isOptimizing,
  engineMode,
  onChangeEngineMode,
}: SqlEditorProps) {
  const [activeTab, setActiveTab] = useState<"sql" | "plan">("sql");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightPreRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea, pre, and line numbers
  const handleScroll = () => {
    if (textareaRef.current && highlightPreRef.current && lineNumbersRef.current) {
      highlightPreRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightPreRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Keyboard shortcut: Tab inserts spaces, Cmd/Ctrl+Enter triggers optimize
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onOptimize();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const nextSql = sql.substring(0, start) + "  " + sql.substring(end);
      onChangeSql(nextSql);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = String(event.target?.result || "");
      if (file.name.endsWith(".sqlplan") || file.name.endsWith(".json") || content.includes("<ShowPlanXML") || content.includes('"Plan"')) {
        onChangePlan(content);
        setActiveTab("plan");
      } else {
        onChangeSql(content);
        setActiveTab("sql");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const lineCount = (activeTab === "sql" ? sql : plan).split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  const tokens = tokenizeSql(sql);
  const charCount = (activeTab === "sql" ? sql : plan).length;
  const charLimit = activeTab === "sql" ? 20000 : 500000;

  return (
    <div className="flex flex-col h-full rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden">
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-900/80 border-b border-white/[0.06]">
        {/* Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950/60 border border-white/[0.06]">
          <button
            onClick={() => setActiveTab("sql")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === "sql"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Query</span>
          </button>
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all active:scale-[0.98] ${
              activeTab === "plan"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Plan</span>
            {plan.trim().length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            )}
          </button>
        </div>

        {/* Dialect selector & File Upload */}
        <div className="flex items-center gap-2">
          {activeTab === "sql" && (
            <select
              value={dialect}
              onChange={(e) => onChangeDialect(e.target.value as Dialect)}
              className="bg-slate-950/80 border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs font-medium text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            >
              <option value="tsql">SQL Server (T-SQL)</option>
              <option value="postgres">PostgreSQL</option>
              <option value="mysql">MySQL</option>
            </select>
          )}

          {/* Upload button */}
          <label className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-white/[0.06] cursor-pointer transition-all active:scale-[0.98]" title="Upload .sql, .sqlplan, or JSON file">
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload</span>
            <input
              type="file"
              accept=".sql,.sqlplan,.xml,.json,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 min-h-[380px] bg-slate-950/80 font-mono text-xs flex overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="select-none py-4 px-2.5 text-right text-slate-600 bg-slate-950/90 border-r border-white/[0.04] overflow-hidden"
          style={{ width: "42px" }}
        >
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Canvas */}
        <div className="relative flex-1 h-full overflow-hidden">
          {activeTab === "sql" ? (
            <>
              {/* Highlighted rendering behind textarea */}
              <pre
                ref={highlightPreRef}
                aria-hidden="true"
                className="absolute inset-0 p-4 font-mono text-xs leading-6 pointer-events-none overflow-hidden whitespace-pre-wrap break-words"
              >
                {tokens.map((tok, idx) => (
                  <span key={idx} className={tok.className}>
                    {tok.text}
                  </span>
                ))}
              </pre>

              {/* Transparent textarea for native cursor and editing */}
              <textarea
                ref={textareaRef}
                value={sql}
                onChange={(e) => onChangeSql(e.target.value)}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                placeholder="-- Paste or write your SQL query here..."
                className="absolute inset-0 w-full h-full p-4 font-mono text-xs leading-6 bg-transparent text-transparent caret-white resize-none focus:outline-none overflow-auto whitespace-pre-wrap break-words"
              />
            </>
          ) : (
            <textarea
              value={plan}
              onChange={(e) => onChangePlan(e.target.value)}
              spellCheck={false}
              placeholder="<!-- Paste XML ShowPlan (.sqlplan) or PostgreSQL / MySQL EXPLAIN JSON here (optional) -->"
              className="w-full h-full p-4 font-mono text-xs leading-6 bg-transparent text-slate-200 caret-white resize-none focus:outline-none overflow-auto"
            />
          )}
        </div>
      </div>

      {/* Editor Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2.5 bg-slate-900/80 border-t border-white/[0.06]">
        {/* Character count & shortcuts hint */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="hidden sm:inline">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-white/[0.08] text-slate-400">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-white/[0.08] text-slate-400">Enter</kbd>
          </span>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <button
            onClick={() => onChangeEngineMode(engineMode === "auto" ? "deterministic" : "auto")}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-[11px] text-slate-400 hover:text-slate-200 border border-white/[0.06] transition-all"
            title="Toggle between AI Agent and Fast AST"
          >
            <span>{engineMode === "auto" ? "AI Mode" : "Fast AST"}</span>
          </button>

          {/* Analyze Button */}
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing || isOptimizing || !sql.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-white/[0.08] transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isAnalyzing ? (
              <div className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Code2 className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span>Analyze</span>
          </button>

          {/* Optimize CTA Button */}
          <button
            onClick={onOptimize}
            disabled={isAnalyzing || isOptimizing || !sql.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isOptimizing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Optimizing...</span>
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>Optimize Query</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
