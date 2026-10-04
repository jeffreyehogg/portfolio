'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, ArrowRight, ArrowDown, Database, Cpu } from 'lucide-react'
import { VisualizerConfig } from '../../lib/quests/types'

interface VisualizerProps {
  config?: VisualizerConfig
  liveStack?: string[]
  livePointers?: { left: number; right: number }
  liveArray?: string[]
  accessedIndex?: number | null
}

export function Visualizer({
  config,
  liveStack = [],
  livePointers = { left: 0, right: 6 },
  liveArray = ['potion', 'shield', 'key'],
  accessedIndex = null,
}: VisualizerProps) {
  if (!config) return null

  const { type, initialStack = [] } = config
  const stackItems = liveStack.length > 0 ? liveStack : initialStack

  return (
    <div className="w-full rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] p-4 mt-3 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          {type === 'stack' ? (
            <Layers className="w-4 h-4 text-indigo-400" />
          ) : type === 'pointers' ? (
            <Cpu className="w-4 h-4 text-cyan-400" />
          ) : (
            <Database className="w-4 h-4 text-amber-400" />
          )}
          <span className="text-xs font-semibold text-white tracking-wide uppercase font-mono">
            {type === 'stack'
              ? 'Memory Stack Tower (LIFO)'
              : type === 'pointers'
                ? 'Two-Pointer Memory Array'
                : '0-Indexed Array Memory'}
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
          Live Telemetry
        </span>
      </div>

      {/* Mode 1: Stack Tower (Level 7) */}
      {type === 'stack' && (
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-48 min-h-[140px] border-b-4 border-l-2 border-r-2 border-indigo-500/50 rounded-b-xl bg-slate-950/50 p-2 flex flex-col-reverse items-center gap-1.5 shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]">
            <AnimatePresence>
              {stackItems.length === 0 ? (
                <div className="text-xs font-mono text-slate-500 py-6 text-center italic">
                  [Stack is empty]
                </div>
              ) : (
                stackItems.map((item, index) => {
                  const isTop = index === stackItems.length - 1
                  return (
                    <motion.div
                      key={`stack-${index}-${item}`}
                      initial={{ scale: 0.8, y: -20, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.8, y: -20, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className="relative w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border border-indigo-500/40 text-center font-mono text-xs font-medium text-indigo-200 shadow-md flex items-center justify-between"
                    >
                      <span className="text-[10px] text-indigo-400 font-mono">[{index}]</span>
                      <span className="font-semibold text-white">{item}</span>
                      {isTop ? (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold animate-pulse">
                          TOP
                        </span>
                      ) : (
                        <span className="w-6" />
                      )}
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>
          <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center gap-3">
            <span>Size: {stackItems.length}</span>
            <span>•</span>
            <span className="text-indigo-400">Push: stack.append()</span>
            <span>•</span>
            <span className="text-amber-400">Pop: stack.pop()</span>
          </div>
        </div>
      )}

      {/* Mode 2: Two Pointers Array (Level 8) */}
      {type === 'pointers' && (
        <div className="flex flex-col items-center py-2">
          {/* Pointers Row */}
          <div className="flex items-center justify-center gap-2 mb-1">
            {Array.from({ length: 7 }).map((_, idx) => {
              const isLeft = livePointers.left === idx
              const isRight = livePointers.right === idx

              return (
                <div key={`ptr-top-${idx}`} className="w-10 h-7 flex flex-col items-center justify-end">
                  {isLeft && (
                    <motion.div
                      layoutId="left-pointer"
                      className="flex flex-col items-center"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    >
                      <span className="text-[9px] font-mono font-bold text-cyan-400">L</span>
                      <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                    </motion.div>
                  )}
                  {isRight && !isLeft && (
                    <motion.div
                      layoutId="right-pointer"
                      className="flex flex-col items-center"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    >
                      <span className="text-[9px] font-mono font-bold text-purple-400">R</span>
                      <ArrowDown className="w-3.5 h-3.5 text-purple-400" />
                    </motion.div>
                  )}
                  {isLeft && isRight && (
                    <motion.div className="flex flex-col items-center animate-bounce">
                      <span className="text-[9px] font-mono font-bold text-emerald-400">MATCH</span>
                      <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Array Cells */}
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 7 }).map((_, idx) => {
              const isLeft = livePointers.left === idx
              const isRight = livePointers.right === idx
              const isCenter = idx === 3

              return (
                <div
                  key={`cell-${idx}`}
                  className={`w-10 h-10 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    isLeft && isRight
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                      : isLeft
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                        : isRight
                          ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                          : isCenter
                            ? 'bg-slate-800/80 border-slate-600'
                            : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-white">{idx}</span>
                  <span className="text-[8px] font-mono text-slate-500">[{idx}]</span>
                </div>
              )
            })}
          </div>

          <div className="mt-3 text-[11px] font-mono text-slate-400 flex items-center gap-4">
            <span className="text-cyan-400 font-semibold">left = {livePointers.left}</span>
            <ArrowRight className="w-3 h-3 text-slate-600" />
            <span className="text-purple-400 font-semibold">right = {livePointers.right}</span>
            {livePointers.left >= livePointers.right && (
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Balanced at Center!
              </span>
            )}
          </div>
        </div>
      )}

      {/* Mode 3: 0-Indexed Array Memory (Level 6) */}
      {type === 'array' && (
        <div className="flex flex-col items-center py-2">
          <div className="flex items-center justify-center gap-3">
            {liveArray.map((item, idx) => {
              const isAccessed = accessedIndex === idx

              return (
                <motion.div
                  key={`item-${idx}-${item}`}
                  animate={isAccessed ? { scale: [1, 1.08, 1], borderColor: '#38bdf8' } : {}}
                  className={`w-24 h-16 rounded-xl border flex flex-col items-center justify-center p-2 transition-all ${
                    isAccessed
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_14px_rgba(56,189,248,0.5)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-400 font-medium">
                    items[{idx}]
                  </span>
                  <span className="text-xs font-mono font-bold text-white mt-1">&quot;{item}&quot;</span>
                </motion.div>
              )
            })}
          </div>
          <div className="mt-2 text-[11px] font-mono text-slate-400">
            0-based indexing: First element is at index <span className="text-cyan-400 font-bold">0</span>, third is at <span className="text-cyan-400 font-bold">2</span>
          </div>
        </div>
      )}
    </div>
  )
}
