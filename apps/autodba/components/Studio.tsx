"use client";

import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Code2,
  FileDiff,
  Layers,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import {
  analyzeQuery,
  formatQuery,
  getHealth,
  getPresetDetail,
  getPresets,
  getQuota,
  optimizeQuery,
} from "@/lib/api";
import type {
  AnalysisReport,
  Dialect,
  HealthResponse,
  OptimizationResult,
  PresetSummary,
  QuotaInfo,
} from "@/lib/types";
import { AgentTrace } from "./AgentTrace";
import { ArchitectureBento } from "./ArchitectureBento";
import { ByokModal } from "./ByokModal";
import { DdlPanel } from "./DdlPanel";
import { DiagnosticsList } from "./DiagnosticsList";
import { DiffViewer } from "./DiffViewer";
import { Header } from "./Header";
import { McpModal } from "./McpModal";
import { PlanTelemetry } from "./PlanTelemetry";
import { PresetsBar } from "./PresetsBar";
import { SqlEditor } from "./SqlEditor";

export function Studio() {
  const [sql, setSql] = useState("");
  const [dialect, setDialect] = useState<Dialect>("tsql");
  const [plan, setPlan] = useState("");
  const [presets, setPresets] = useState<PresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [quota, setQuota] = useState<QuotaInfo | null>(null);
  const [byokKey, setByokKey] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("autodba_byok_key") || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [engineMode, setEngineMode] = useState<"auto" | "deterministic">("auto");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  // Active result tab
  const [activeTab, setActiveTab] = useState<
    "diff" | "diagnostics" | "telemetry" | "ddl" | "trace"
  >("diff");

  // Output containers
  const [analysisReport, setAnalysisReport] = useState<AnalysisReport | null>(null);
  const [optResult, setOptResult] = useState<OptimizationResult | null>(null);

  // Modals
  const [isMcpOpen, setIsMcpOpen] = useState(false);
  const [isByokOpen, setIsByokOpen] = useState(false);

  // Initial load
  useEffect(() => {
    // 1. Fetch health & quota
    getHealth()
      .then(setHealth)
      .catch((e) => console.warn("Failed to reach health endpoint:", e));

    getQuota()
      .then(setQuota)
      .catch(() => {});

    // 2. Load Presets (without auto-selecting so the editor starts clean and empty)
    getPresets()
      .then((res) => {
        setPresets(res.presets);
      })
      .catch((e) => {
        setErrorMessage(`Could not load enterprise presets: ${e.message}`);
      });
  }, []);

  // Clear workspace and reset state
  const handleClear = () => {
    setSql("");
    setPlan("");
    setSelectedPresetId(null);
    setOptResult(null);
    setAnalysisReport(null);
    setErrorMessage(null);
    setIsStale(false);
  };

  // Update BYOK key
  const handleSaveByok = (key: string) => {
    setByokKey(key);
    try {
      sessionStorage.setItem("autodba_byok_key", key);
    } catch {}
    getQuota(key).then(setQuota).catch(() => {});
  };

  const handleClearByok = () => {
    setByokKey("");
    try {
      sessionStorage.removeItem("autodba_byok_key");
    } catch {}
    getQuota().then(setQuota).catch(() => {});
  };

  // Change SQL handler marks results as stale
  const handleSqlChange = (newSql: string) => {
    setSql(newSql);
    setIsStale(true);
  };

  // Format SQL Handler
  const handleFormat = async () => {
    if (!sql.trim()) return;
    setIsFormatting(true);
    try {
      const formatted = await formatQuery({ sql, dialect });
      if (formatted && formatted.trim()) {
        setSql(formatted);
      }
    } catch (e: any) {
      console.warn("Formatting failed:", e);
    } finally {
      setIsFormatting(false);
    }
  };

  // Select Preset handler
  const handleSelectPreset = async (preset: PresetSummary) => {
    setSelectedPresetId(preset.id);
    setErrorMessage(null);
    try {
      const detail = await getPresetDetail(preset.id);
      setSql(detail.sql);
      setDialect(detail.dialect);
      setPlan(detail.plan || "");
      setOptResult(detail.result);
      setAnalysisReport(detail.result.before);
      setIsStale(false);
      setActiveTab("diff");
    } catch (e: any) {
      setErrorMessage(`Error loading preset: ${e.message}`);
    }
  };

  // Analyze Handler (Deterministic AST)
  const handleAnalyze = async () => {
    if (!sql.trim()) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const res = await analyzeQuery({ sql, dialect, plan });
      setAnalysisReport(res.report);
      setIsStale(false);
      setActiveTab("diagnostics");
    } catch (e: any) {
      setErrorMessage(e.message || "Analysis request failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Optimize Handler (Cyclic Loop)
  const handleOptimize = async () => {
    if (!sql.trim()) return;
    setIsOptimizing(true);
    setErrorMessage(null);
    try {
      const res = await optimizeQuery(
        { sql, dialect, plan, mode: engineMode },
        byokKey || undefined
      );
      setOptResult(res);
      setAnalysisReport(res.before);
      if (res.quota) setQuota(res.quota);
      setIsStale(false);
      setActiveTab("diff");
    } catch (e: any) {
      setErrorMessage(e.message || "Optimization request failed.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const currentDiagnostics =
    optResult?.before?.diagnostics || analysisReport?.diagnostics || [];
  const currentIndexes =
    optResult?.ddl_recommendations || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header
        health={health}
        onOpenMcp={() => setIsMcpOpen(true)}
        onOpenByok={() => setIsByokOpen(true)}
        hasByokKey={Boolean(byokKey)}
      />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="p-1 rounded-lg hover:bg-rose-900/50 text-rose-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Enterprise Presets Strip */}
        <PresetsBar
          presets={presets}
          selectedId={selectedPresetId}
          onSelect={handleSelectPreset}
          isLoading={presets.length === 0}
        />

        {/* Split Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: SQL Editor (5/12 cols) */}
          <div className="lg:col-span-5 h-[660px]">
            <SqlEditor
              sql={sql}
              onChangeSql={handleSqlChange}
              dialect={dialect}
              onChangeDialect={setDialect}
              plan={plan}
              onChangePlan={setPlan}
              onClear={handleClear}
              onFormat={handleFormat}
              isFormatting={isFormatting}
              onAnalyze={handleAnalyze}
              onOptimize={handleOptimize}
              isAnalyzing={isAnalyzing}
              isOptimizing={isOptimizing}
              engineMode={engineMode}
              onChangeEngineMode={setEngineMode}
            />
          </div>

          {/* Right Column: Diagnostic & Rewrite Telemetry Workspace (7/12 cols) */}
          <div className="lg:col-span-7 flex flex-col h-[660px] rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
            {/* Executive Outcome Ribbon (if results exist) */}
            {optResult && (
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-indigo-500/5 border-b border-white/[0.06] text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    ~{optResult.estimated_improvement_pct}% Estimated Reduction
                  </span>
                  {optResult.antipatterns_fixed.length > 0 ? (
                    <span className="text-slate-400 hidden sm:inline">
                      • {optResult.antipatterns_fixed.length} issue{optResult.antipatterns_fixed.length > 1 ? "s" : ""} resolved
                    </span>
                  ) : optResult.ddl_recommendations.length > 0 ? (
                    <span className="text-slate-400 hidden sm:inline">
                      • Syntax optimal; workload reduction from index
                    </span>
                  ) : (
                    <span className="text-slate-400 hidden sm:inline">
                      • Query syntax is already optimal
                    </span>
                  )}
                </div>
                {isStale && (
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Query modified
                  </span>
                )}
              </div>
            )}

            {/* Results Navigation Bar */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/80 border-b border-white/[0.06]">
              {/* Tab navigation */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("diff")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === "diff"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <FileDiff className="h-3.5 w-3.5" />
                  <span>Rewrite</span>
                </button>

                <button
                  onClick={() => setActiveTab("diagnostics")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === "diagnostics"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Issues</span>
                  {currentDiagnostics.length > 0 && (
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-300">
                      {currentDiagnostics.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("ddl")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === "ddl"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Indexes</span>
                  {currentIndexes.length > 0 && (
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-800/80 text-emerald-400 font-bold">
                      {currentIndexes.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("telemetry")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === "telemetry"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Metrics</span>
                </button>

                <button
                  onClick={() => setActiveTab("trace")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === "trace"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Workflow className="h-3.5 w-3.5" />
                  <span>Trace</span>
                </button>
              </div>
            </div>

            {/* Results Content Area */}
            <div className="flex-1 p-3.5 overflow-y-auto">
              {activeTab === "diff" && (
                optResult ? (
                  <DiffViewer
                    originalSql={optResult.original_sql}
                    optimizedSql={optResult.optimized_sql}
                    verification={optResult.verification}
                    explanation={optResult.explanation}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                    <Sparkles className="w-10 h-10 text-indigo-400/50 mb-3" />
                    <h4 className="text-sm font-bold text-white mb-1">
                      Ready for Optimization
                    </h4>
                    <p className="text-xs max-w-sm mb-4">
                      {sql.trim()
                        ? "Click Optimize Query to run the AST analysis, cyclic LLM rewrite loop, and index synthesis."
                        : "Paste or type a SQL query in the editor, or pick one of the example queries above to get started."}
                    </p>
                    {sql.trim() && (
                      <button
                        onClick={handleOptimize}
                        className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-all active:scale-[0.98]"
                      >
                        Run Optimization →
                      </button>
                    )}
                  </div>
                )
              )}

              {activeTab === "diagnostics" && (
                <DiagnosticsList
                  diagnostics={currentDiagnostics}
                  isLoading={isAnalyzing}
                  hasRun={Boolean(optResult || analysisReport)}
                />
              )}

              {activeTab === "telemetry" && (
                <PlanTelemetry
                  costModel={optResult?.cost_model}
                  improvementPct={optResult?.estimated_improvement_pct || 0}
                  planSummary={optResult?.plan}
                  isLoading={isOptimizing}
                />
              )}

              {activeTab === "ddl" && (
                <DdlPanel
                  indexes={currentIndexes}
                  isLoading={isOptimizing}
                  hasRun={Boolean(optResult || analysisReport)}
                />
              )}

              {activeTab === "trace" && (
                optResult ? (
                  <AgentTrace
                    trace={optResult.trace}
                    engine={optResult.engine}
                    model={optResult.model}
                    verification={optResult.verification}
                    totalDurationMs={optResult.duration_ms}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                    No active agent trace. Run an optimization to inspect execution lifecycle steps.
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* System Architecture Bento Grid */}
        <ArchitectureBento />
      </main>

      {/* Modals */}
      <McpModal isOpen={isMcpOpen} onClose={() => setIsMcpOpen(false)} />
      <ByokModal
        isOpen={isByokOpen}
        onClose={() => setIsByokOpen(false)}
        byokKey={byokKey}
        onSaveKey={handleSaveByok}
        onClearKey={handleClearByok}
        quota={quota}
      />
    </div>
  );
}
