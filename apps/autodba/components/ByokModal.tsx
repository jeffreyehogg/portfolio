"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Key, ShieldCheck, Trash2, X } from "lucide-react";
import type { QuotaInfo } from "@/lib/types";

interface ByokModalProps {
  isOpen: boolean;
  onClose: () => void;
  byokKey: string;
  onSaveKey: (key: string) => void;
  onClearKey: () => void;
  quota?: QuotaInfo | null;
}

export function ByokModal({
  isOpen,
  onClose,
  byokKey,
  onSaveKey,
  onClearKey,
  quota,
}: ByokModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [inputVal, setInputVal] = useState(byokKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [prevKey, setPrevKey] = useState(byokKey);
  if (byokKey !== prevKey) {
    setPrevKey(byokKey);
    setInputVal(byokKey);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputVal.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputVal("");
    onClearKey();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto rounded-2xl bg-slate-950/90 text-slate-100 border border-white/[0.1] shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-md p-0 max-w-md w-full focus:outline-none"
    >
      <form onSubmit={handleSave} className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Bring Your Own Key (BYOK)
              </h3>
              <p className="text-xs text-slate-400">
                Unlock high-frequency agentic query rewrites.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quota Telemetry Callout */}
        <div className="rounded-xl bg-slate-900 border border-white/[0.06] p-3 text-xs space-y-1">
          <div className="flex justify-between font-mono">
            <span className="text-slate-400">Tier:</span>
            <span className="text-white font-semibold">
              {quota?.byok ? "BYOK Key Active (High Quota)" : "Free Serverless Community Tier"}
            </span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="text-slate-400">Daily Optimizations:</span>
            <span className="text-emerald-400 font-bold">
              {quota?.remaining ?? "—"} / {quota?.limit ?? 5} remaining
            </span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            *Rule-based analysis and all enterprise examples are always 100% free with unlimited runs.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-300 font-medium">
            Google AI Studio API Key:
          </label>
          <input
            type="password"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Security reassurance */}
        <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Your API key is stored exclusively in your browser’s <code className="text-slate-300">sessionStorage</code>. It is transmitted securely over HTTPS via the <code className="text-slate-300">X-Gemini-Key</code> header and is never logged or persisted.
          </span>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2">
          {byokKey ? (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove Key</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-white/[0.08] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
