"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Download, FileCode, ScrollText, X } from "lucide-react";
import { tokenizeSql } from "@/lib/sql-highlight";
import { generateStoredProcedure, inferProcedureName } from "@/lib/sp-generator";
import type { Dialect } from "@/lib/types";

interface StoredProcModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalSql: string;
  optimizedSql?: string;
  initialSource?: "optimized" | "original";
  dialect: Dialect;
}

export function StoredProcModal({
  isOpen,
  onClose,
  originalSql,
  optimizedSql,
  initialSource = "optimized",
  dialect,
}: StoredProcModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  // Source selection (Optimized vs Original)
  const hasOptimized = Boolean(optimizedSql && optimizedSql.trim());
  const [selectedSource, setSelectedSource] = useState<"optimized" | "original" | null>(null);
  const source =
    selectedSource ?? (hasOptimized && initialSource === "optimized" ? "optimized" : "original");

  // Selected SQL string
  const activeSql = (source === "optimized" && hasOptimized ? optimizedSql : originalSql) || "";

  // Database settings with localStorage persistence
  const [databaseName, setDatabaseName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("autodba_last_db") || "AppDB";
    }
    return "AppDB";
  });

  const [schemaName, setSchemaName] = useState(() => (dialect === "postgres" ? "public" : "dbo"));
  const [customProcedureName, setCustomProcedureName] = useState<string | null>(null);
  const procedureName = customProcedureName ?? inferProcedureName(activeSql, "sp_GetData");

  // Option toggles
  const [includeBatches, setIncludeBatches] = useState(true);
  const [includeAnsiSettings, setIncludeAnsiSettings] = useState(true);
  const [includeErrorHandling, setIncludeErrorHandling] = useState(true);
  const [includeNoCount, setIncludeNoCount] = useState(true);

  // Modal open/close sync
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedSource(null);
    setCustomProcedureName(null);
    onClose();
  };

  // Save database name to localStorage
  const handleDatabaseChange = (val: string) => {
    setDatabaseName(val);
    try {
      localStorage.setItem("autodba_last_db", val);
    } catch {}
  };

  // Generate procedure script
  const generatedScript = useMemo(() => {
    return generateStoredProcedure({
      sql: activeSql,
      dialect,
      databaseName: databaseName.trim() || "AppDB",
      schemaName: schemaName.trim() || (dialect === "postgres" ? "public" : "dbo"),
      procedureName: procedureName.trim() || "sp_GetData",
      includeBatches,
      includeAnsiSettings,
      includeErrorHandling,
      includeNoCount,
      author: "AutoDBA",
    });
  }, [
    activeSql,
    dialect,
    databaseName,
    schemaName,
    procedureName,
    includeBatches,
    includeAnsiSettings,
    includeErrorHandling,
    includeNoCount,
  ]);

  const tokens = useMemo(() => tokenizeSql(generatedScript), [generatedScript]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedScript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${procedureName.trim() || "sp_GetData"}.sql`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="m-auto rounded-2xl bg-slate-950/95 text-slate-100 border border-white/[0.1] shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-md p-0 max-w-3xl w-full focus:outline-none"
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <ScrollText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Generate Stored Procedure
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-normal border border-white/[0.06]">
                  {dialect === "tsql" ? "T-SQL (SQL Server)" : dialect === "postgres" ? "PostgreSQL" : "MySQL"}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Wrap your query into an enterprise-standard, production-ready stored procedure.
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Source Toggle (if optimization has been run) */}
        {hasOptimized && (
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-900/90 border border-white/[0.06]">
            <span className="text-xs text-slate-400 font-medium pl-1">Source Query:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedSource("optimized")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  source === "optimized"
                    ? "bg-indigo-600 text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>Optimized SQL (Recommended)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSource("original")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  source === "original"
                    ? "bg-slate-800 text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>Original SQL</span>
              </button>
            </div>
          </div>
        )}

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {dialect === "tsql" && (
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Database Name
              </label>
              <input
                type="text"
                value={databaseName}
                onChange={(e) => handleDatabaseChange(e.target.value)}
                placeholder="AppDB"
                className="w-full bg-slate-900/90 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Schema
            </label>
            <input
              type="text"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              placeholder={dialect === "postgres" ? "public" : "dbo"}
              className="w-full bg-slate-900/90 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Procedure Name
            </label>
            <input
              type="text"
              value={procedureName}
              onChange={(e) => setCustomProcedureName(e.target.value)}
              placeholder="sp_GetData"
              className="w-full bg-slate-900/90 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        {/* Options Toggles (T-SQL specific DBA settings) */}
        {dialect === "tsql" && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-slate-300">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeBatches}
                onChange={(e) => setIncludeBatches(e.target.checked)}
                className="rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-[11px]">USE [{databaseName || "AppDB"}] & GO</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAnsiSettings}
                onChange={(e) => setIncludeAnsiSettings(e.target.checked)}
                className="rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-[11px]">ANSI_NULLS & QUOTED_IDENTIFIER</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeErrorHandling}
                onChange={(e) => setIncludeErrorHandling(e.target.checked)}
                className="rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-[11px]">TRY...CATCH with THROW</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNoCount}
                onChange={(e) => setIncludeNoCount(e.target.checked)}
                className="rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-[11px]">SET NOCOUNT & XACT_ABORT ON</span>
            </label>
          </div>
        )}

        {/* Script Preview Box */}
        <div className="relative rounded-xl bg-slate-900/90 border border-white/[0.08] p-3.5 font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-indigo-400" />
              <span>{procedureName || "sp_GetData"}.sql</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-white/[0.08] transition-all active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition-all active:scale-[0.98]"
              >
                <Download className="h-3 w-3" />
                <span>Download .sql</span>
              </button>
            </div>
          </div>

          <pre className="text-slate-200 max-h-[340px] overflow-auto whitespace-pre leading-5 pr-2">
            <code>
              {tokens.map((tok, idx) => (
                <span key={idx} className={tok.className}>
                  {tok.text}
                </span>
              ))}
            </code>
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <span>
            {dialect === "tsql" ? "CREATE OR ALTER PROCEDURE (SQL Server 2016 SP1+)" : "Idempotent Procedure Template"}
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-sans text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </dialog>
  );
}
