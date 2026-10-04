'use client'

import React, { useState } from 'react'
import { CheckCircle2, XCircle, Terminal, AlertCircle, Clock, ShieldCheck } from 'lucide-react'
import { TestCaseResult, ErrorDetails } from '../../lib/engine/types'

interface OutputConsoleProps {
  testResults: TestCaseResult[]
  stdoutLogs: string[]
  error?: string
  errorDetails?: ErrorDetails
  executionTimeMs?: number
  allTestsPassed?: boolean
  hasRun?: boolean
}

export function OutputConsole({
  testResults = [],
  stdoutLogs = [],
  error,
  errorDetails,
  executionTimeMs = 0,
  allTestsPassed = false,
  hasRun = false,
}: OutputConsoleProps) {
  const [activeTab, setActiveTab] = useState<'tests' | 'terminal'>('tests')

  const totalTests = testResults.length
  const passedCount = testResults.filter((t) => t.passed).length

  return (
    <div className="flex flex-col h-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/70 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'tests'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Test Cases</span>
            {hasRun && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  allTestsPassed
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {passedCount}/{totalTests}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
            {stdoutLogs.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300">
                {stdoutLogs.length}
              </span>
            )}
          </button>
        </div>

        {hasRun && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{executionTimeMs}ms</span>
          </div>
        )}
      </div>

      {/* Main Console Body */}
      <div className="flex-1 overflow-auto p-4 bg-slate-950/60 font-mono text-xs">
        {/* Error Callout Banner */}
        {error && (
          <div className="mb-4 rounded-xl bg-rose-950/40 border border-rose-500/40 p-3 text-rose-200">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-rose-300">
                  {errorDetails?.type || 'Execution Error'}
                  {errorDetails?.line ? ` (Line ${errorDetails.line})` : ''}
                </div>
                <div className="text-rose-200/90 mt-1 whitespace-pre-wrap">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Test Cases */}
        {activeTab === 'tests' && (
          <div className="space-y-2">
            {!hasRun ? (
              <div className="py-8 text-center text-slate-500 italic">
                Click &quot;▶ Run Code&quot; (or press ⌘↵) to execute your code and run assertions.
              </div>
            ) : testResults.length === 0 ? (
              <div className="py-4 text-center text-slate-400">No test assertions declared.</div>
            ) : (
              testResults.map((tc, idx) => (
                <div
                  key={tc.id || idx}
                  className={`p-3 rounded-xl border transition-all ${
                    tc.passed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {tc.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      )}
                      <span className="font-semibold text-white">
                        {tc.name || `Test Case #${idx + 1}`}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tc.passed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {tc.passed ? 'PASSED' : 'NEEDS ADJUSTMENT'}
                    </span>
                  </div>

                  {!tc.passed && (
                    <div className="mt-2.5 pt-2 border-t border-white/[0.06] text-[11px] grid grid-cols-2 gap-2 text-slate-300">
                      {tc.expected !== undefined && (
                        <div>
                          <span className="text-slate-500 block">Expected:</span>
                          <span className="font-semibold text-emerald-300">
                            {JSON.stringify(tc.expected)}
                          </span>
                        </div>
                      )}
                      {tc.actual !== undefined && (
                        <div>
                          <span className="text-slate-500 block">Actual:</span>
                          <span className="font-semibold text-rose-300">
                            {JSON.stringify(tc.actual)}
                          </span>
                        </div>
                      )}
                      {tc.error && (
                        <div className="col-span-2 text-rose-300/90 italic">{tc.error}</div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Terminal Output */}
        {activeTab === 'terminal' && (
          <div className="space-y-1">
            {stdoutLogs.length === 0 ? (
              <div className="py-8 text-center text-slate-500 italic">
                No output printed. Use print(...) in Python or console.log(...) in TypeScript.
              </div>
            ) : (
              stdoutLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-emerald-500 select-none">&gt;</span>
                  <span className="whitespace-pre-wrap">{log}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
