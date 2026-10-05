'use client'

import React, { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { StreamLanguage } from '@codemirror/language'
import { ruby } from '@codemirror/legacy-modes/mode/ruby'
import { lua } from '@codemirror/legacy-modes/mode/lua'
import { RotateCcw, Play, Code2 } from 'lucide-react'
import { Language } from '../../lib/quests/types'

interface CodeTerminalProps {
  code: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
  language: Language
  // eslint-disable-next-line no-unused-vars
  onLanguageChange: (lang: Language) => void
  onReset: () => void
  onRun: () => void
  isRunning?: boolean
}

const LANGUAGES: Array<{
  id: Language
  name: string
  icon: string
  activeClass: string
}> = [
  { id: 'python', name: 'Python', icon: '🐍', activeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm' },
  { id: 'javascript', name: 'JavaScript', icon: '💛', activeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm' },
  { id: 'typescript', name: 'TypeScript', icon: '⚡', activeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm' },
  { id: 'ruby', name: 'Ruby', icon: '💎', activeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm' },
  { id: 'lua', name: 'Lua', icon: '🌙', activeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm' },
]

export function CodeTerminal({
  code,
  onChange,
  language,
  onLanguageChange,
  onReset,
  onRun,
  isRunning = false,
}: CodeTerminalProps) {
  // Select language extension
  const extensions = useMemo(() => {
    switch (language) {
      case 'python':
        return [python()]
      case 'javascript':
        return [javascript({ typescript: false })]
      case 'typescript':
        return [javascript({ typescript: true })]
      case 'ruby':
        return [StreamLanguage.define(ruby)]
      case 'lua':
        return [StreamLanguage.define(lua)]
      default:
        return [python()]
    }
  }, [language])

  // Handle Cmd/Ctrl + Enter keybinding
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      if (!isRunning) {
        onRun()
      }
    }
  }

  const activeLangObj = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0]

  return (
    <div
      className="flex flex-col h-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-950/70 border-b border-white/[0.06]">
        {/* Language Switcher Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-900 border border-white/[0.06] overflow-x-auto max-w-full">
          {LANGUAGES.map((l) => {
            const isSelected = language === l.id
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => onLanguageChange(l.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  isSelected
                    ? l.activeClass
                    : 'text-slate-400 hover:text-white border-transparent hover:bg-white/[0.04]'
                }`}
              >
                <span>{l.icon}</span>
                <span>{l.name}</span>
              </button>
            )
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onReset}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1 active:scale-[0.98] border border-white/[0.06]"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onRun}
            disabled={isRunning}
            className={`px-3.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
              isRunning
                ? 'bg-emerald-600/50 text-emerald-200 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            <kbd className="hidden sm:inline-block ml-1 text-[10px] text-emerald-200/70 bg-emerald-800/60 px-1 py-0.2 rounded font-sans">
              ⌘↵
            </kbd>
          </button>
        </div>
      </div>

      {/* CodeMirror Workspace */}
      <div className="relative flex-1 overflow-auto bg-slate-950/80 font-mono text-sm">
        <CodeMirror
          value={code}
          height="100%"
          minHeight="240px"
          theme="dark"
          extensions={extensions}
          onChange={onChange}
          className="h-full text-[13px] font-mono leading-relaxed [&_.cm-editor]:bg-transparent [&_.cm-editor]:h-full [&_.cm-scroller]:font-mono [&_.cm-gutters]:bg-slate-950/90 [&_.cm-gutters]:border-r [&_.cm-gutters]:border-white/[0.06] [&_.cm-gutters]:text-slate-600"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>

      {/* Editor Footer Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/90 border-t border-white/[0.06] text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Interactive In-Browser Runner</span>
        </div>
        <div>
          Language: <span className="text-slate-300 font-semibold">{activeLangObj.name}</span>
        </div>
      </div>
    </div>
  )
}
