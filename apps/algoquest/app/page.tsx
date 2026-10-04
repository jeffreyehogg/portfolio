'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Lock,
  CheckCircle2,
  Star,
  ArrowRight,
  Flame,
  Code2,
  Compass,
} from 'lucide-react'
import { WORLDS, getLevelById } from '../lib/quests'
import { useGameStore, useGameStoreHydration } from '../lib/store'
import { UserProfileBadge } from '../components/auth/UserProfileBadge'

export default function WorldMapPage() {
  const hasHydrated = useGameStoreHydration()
  const {
    activeLanguage,
    setActiveLanguage,
    unlockedLevels,
    completedLevels,
    totalXp,
    streakDays,
  } = useGameStore()

  // Calculate completed level counts
  const completedCount = Object.keys(completedLevels).length

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-200 overflow-x-hidden">
      {/* Background radial ambient lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 grid-board-pattern opacity-40" />
      </div>

      {/* World Map Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Platform Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-tight">AlgoQuest</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  WASM 3.12
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Interactive Algorithmic Coding Odyssey
              </p>
            </div>
          </div>

          {/* Language Switcher pill */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveLanguage('python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeLanguage === 'python'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🐍</span>
              <span className="hidden sm:inline">Python</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLanguage('typescript')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeLanguage === 'typescript'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚡</span>
              <span className="hidden sm:inline">TypeScript</span>
            </button>
          </div>

          {/* User Profile & Progress */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{hasHydrated ? totalXp : 0} XP</span>
            </div>
            <UserProfileBadge />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 flex flex-col items-center">
        {/* Hero Banner */}
        <div className="w-full text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Algorithmic Learning Map</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Level Select &amp; World Map
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Begin with fundamentals and progress toward visual data structures. Choose a quest node below to jump into the coding studio.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-6">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">Completed</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {hasHydrated ? completedCount : 0}/8 Quests
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">Experience</span>
              <span className="text-base font-bold font-mono text-amber-400">
                {hasHydrated ? totalXp : 0} XP
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">Streak</span>
              <span className="text-base font-bold font-mono text-orange-400 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-orange-400" />
                {hasHydrated ? streakDays : 1}d
              </span>
            </div>
          </div>
        </div>

        {/* Worlds & Levels Roadmap */}
        <div className="w-full space-y-16">
          {WORLDS.map((world, wIdx) => {
            const worldLevels = world.levelIds.map((id) => getLevelById(id)).filter(Boolean)

            return (
              <section key={world.id} className="relative">
                {/* World Title Card */}
                <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] p-6 mb-8 shadow-2xl relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      wIdx === 0
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : wIdx === 1
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-400'
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/[0.06]">
                          World {world.number}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{world.subtitle}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">{world.title}</h2>
                      <p className="text-xs text-slate-300 mt-1 max-w-2xl">{world.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950/60 border border-white/[0.06] text-slate-300 font-semibold">
                        {worldLevels.filter((lvl) => lvl && completedLevels[lvl.id]).length}/
                        {worldLevels.length} Cleared
                      </span>
                    </div>
                  </div>
                </div>

                {/* Level Nodes Road Path */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                  {worldLevels.map((lvl, lIdx) => {
                    if (!lvl) return null

                    const isCompleted = Boolean(completedLevels[lvl.id])
                    const isUnlocked =
                      unlockedLevels.includes(lvl.id) ||
                      lvl.id === 'level-1-first-step' ||
                      isCompleted
                    const completedInfo = completedLevels[lvl.id]
                    const stars = completedInfo?.stars || 0

                    return (
                      <motion.div
                        key={lvl.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * lIdx, type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative"
                      >
                        <div
                          className={`rounded-2xl p-5 border transition-all flex flex-col justify-between h-full ${
                            isCompleted
                              ? 'bg-slate-900/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-400'
                              : isUnlocked
                                ? 'bg-slate-900/90 border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:border-cyan-400'
                                : 'bg-slate-950/60 border-slate-800/80 opacity-70'
                          }`}
                        >
                          <div>
                            {/* Card Top: Level Index & Status Pill */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono font-bold text-slate-400">
                                Level {lvl.number}
                              </span>
                              {isCompleted ? (
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>CLEARED</span>
                                </div>
                              ) : isUnlocked ? (
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                  <span>READY</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700 text-[10px] font-mono font-medium">
                                  <Lock className="w-3 h-3 text-slate-500" />
                                  <span>LOCKED</span>
                                </div>
                              )}
                            </div>

                            {/* Level Title & Concept */}
                            <h3 className="text-base font-bold text-white mb-1">{lvl.title}</h3>
                            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-2">
                              {lvl.concept}
                            </span>
                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                              {lvl.objective}
                            </p>
                          </div>

                          {/* Card Footer: Stars / Reward & Play Button */}
                          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1">
                              {isCompleted ? (
                                <div className="flex items-center gap-0.5">
                                  {[1, 2, 3].map((s) => (
                                    <Star
                                      key={s}
                                      className={`w-3.5 h-3.5 ${
                                        s <= stars
                                          ? 'text-amber-400 fill-amber-400'
                                          : 'text-slate-700'
                                      }`}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />+{lvl.xp} XP
                                </span>
                              )}
                            </div>

                            <Link
                              href={`/play/${lvl.id}`}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                                isCompleted
                                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30'
                                  : isUnlocked
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                              }`}
                            >
                              <span>{isCompleted ? 'Replay' : 'Play'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        {/* Bottom Feature & Monorepo Footer */}
        <footer className="w-full mt-20 pt-8 border-t border-white/[0.08] text-center text-xs font-mono text-slate-500 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Python 3.12 (Pyodide WASM)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              TypeScript Sandboxed V8
            </span>
            <span>•</span>
            <span className="text-indigo-400 font-semibold">100% In-Browser Execution</span>
          </div>
          <p className="text-slate-500">
            Engineered by Jeff Hogg as part of the Multi-Project Turborepo Platform.
          </p>
        </footer>
      </main>
    </div>
  )
}
