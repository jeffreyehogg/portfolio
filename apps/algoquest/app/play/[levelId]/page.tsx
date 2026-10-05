'use client'

import React, { useState, useEffect, useMemo, useRef, useCallback, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Compass, BookOpen, Lightbulb, Zap } from 'lucide-react'
import {
  getLevelById,
  getNextLevelId,
  WORLDS,
  Language,
} from '../../../lib/quests'
import { useGameStore } from '../../../lib/store'
import { executionRunner } from '../../../lib/engine'
import { StepEvent, TestCaseResult, ErrorDetails } from '../../../lib/engine/types'
import { GridCanvas } from '../../../components/game/GridCanvas'
import { Visualizer } from '../../../components/game/Visualizer'
import { CodeTerminal } from '../../../components/editor/CodeTerminal'
import { OutputConsole } from '../../../components/editor/OutputConsole'
import { RunControls } from '../../../components/editor/RunControls'
import { LevelNavBar } from '../../../components/hud/LevelNavBar'
import { HintModal } from '../../../components/hud/HintModal'
import { VictoryModal } from '../../../components/hud/VictoryModal'

interface PlayPageProps {
  params: Promise<{ levelId: string }>
}

export default function PlayLevelPage({ params }: PlayPageProps) {
  const { levelId } = use(params)
  const router = useRouter()

  const level = useMemo(() => getLevelById(levelId), [levelId])
  const world = useMemo(
    () => (level ? WORLDS.find((w) => w.id === level.worldId) : undefined),
    [level]
  )
  const nextLevelId = useMemo(() => (level ? getNextLevelId(level.id) : null), [level])

  // Zustand Store
  const {
    activeLanguage,
    setActiveLanguage,
    saveDraft,
    getDraft,
    completeLevel,
    unlockLevel,
  } = useGameStore()

  // Code state
  const [code, setCode] = useState<string>('')
  const [isRunning, setIsRunning] = useState<boolean>(false)

  // Modals state
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false)
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false)

  // Simulation & Game State
  const [heroPos, setHeroPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [heroDirection, setHeroDirection] = useState<string>('east')
  const [isHeroMoving, setIsHeroMoving] = useState<boolean>(false)
  const [isHeroJumping, setIsHeroJumping] = useState<boolean>(false)
  const [isLevelSolved, setIsLevelSolved] = useState<boolean>(false)
  const [gateOpen, setGateOpen] = useState<boolean>(false)
  const [collectedEntities, setCollectedEntities] = useState<string[]>([])

  // Visualizer live state
  const [liveStack, setLiveStack] = useState<string[]>([])
  const [livePointers, setLivePointers] = useState<{ left: number; right: number }>({
    left: 0,
    right: 6,
  })
  const [liveArray, setLiveArray] = useState<string[]>(['potion', 'shield', 'key'])
  const [accessedIndex, setAccessedIndex] = useState<number | null>(null)

  // Step playback state
  const [recordedSteps, setRecordedSteps] = useState<StepEvent[]>([])
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0)
  const [isPlayingSteps, setIsPlayingSteps] = useState<boolean>(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1)
  const playbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Execution results
  const [testResults, setTestResults] = useState<TestCaseResult[]>([])
  const [stdoutLogs, setStdoutLogs] = useState<string[]>([])
  const [executionError, setExecutionError] = useState<string | undefined>()
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | undefined>()
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(0)
  const [hasRun, setHasRun] = useState<boolean>(false)

  // Reset game board positions
  const resetGameBoard = useCallback(() => {
    if (!level) return
    setHeroPos({ ...level.gridConfig.heroStart })
    setHeroDirection(level.gridConfig.heroDirection)
    setIsHeroMoving(false)
    setIsHeroJumping(false)
    setIsLevelSolved(false)
    setGateOpen(false)
    setCollectedEntities([])
    setRecordedSteps([])
    setCurrentStepIdx(0)
    setIsPlayingSteps(false)
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current)

    // Reset visualizer
    if (level.visualizerConfig) {
      setLiveStack(level.visualizerConfig.initialStack ? [...level.visualizerConfig.initialStack] : [])
      setLivePointers(
        level.visualizerConfig.initialPointers
          ? { ...level.visualizerConfig.initialPointers }
          : { left: 0, right: 6 }
      )
      setLiveArray(
        level.visualizerConfig.initialArray
          ? [...level.visualizerConfig.initialArray]
          : ['potion', 'shield', 'key']
      )
      setAccessedIndex(null)
    }
  }, [level])

  // Initialize Code Draft when level or language changes
  useEffect(() => {
    if (!level) return

    const saved = getDraft(level.id, activeLanguage)
    if (saved && saved.trim().length > 0) {
      setCode(saved)
    } else {
      setCode(level.starterCode[activeLanguage])
    }

    // Reset game board to level initial position
    resetGameBoard()
  }, [level, activeLanguage, getDraft, resetGameBoard])

  // Pre-warm Web Workers
  useEffect(() => {
    executionRunner.preload('python')
    executionRunner.preload('typescript')
  }, [])

  // Auto-save code draft on change
  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    if (level) {
      saveDraft(level.id, activeLanguage, newCode)
    }
  }

  // Reset to original starter code
  const handleResetCode = () => {
    if (!level) return
    const starter = level.starterCode[activeLanguage]
    setCode(starter)
    saveDraft(level.id, activeLanguage, starter)
    resetGameBoard()
  }

  // Language switch handler
  const handleLanguageChange = (lang: Language) => {
    setActiveLanguage(lang)
  }

  // Execute Code in Web Worker
  const handleRunCode = async () => {
    if (!level || isRunning) return

    setIsRunning(true)
    setHasRun(true)
    setStdoutLogs([])
    setExecutionError(undefined)
    setErrorDetails(undefined)
    resetGameBoard()

    // Transform user code with level test wrapper
    const preparedCode = level.prepareCode(code, activeLanguage)

    try {
      const result = await executionRunner.execute(
        {
          requestId: `${level.id}-${Date.now()}`,
          language: activeLanguage,
          code: preparedCode,
          testCases: level.testCases,
          initialState: {
            position: { ...level.gridConfig.heroStart },
            direction: level.gridConfig.heroDirection,
            goal: { ...level.gridConfig.goal },
          },
          timeoutMs: 4000,
        },
        {
          onStdout: (text) => setStdoutLogs((prev) => [...prev, text]),
        }
      )

      setIsRunning(false)
      setTestResults(result.testResults)
      setExecutionTimeMs(result.executionTimeMs)
      setStdoutLogs(result.output)

      if (!result.success || result.error) {
        setExecutionError(result.error)
        setErrorDetails(result.errorDetails)
      } else {
        // Record steps for playback
        setRecordedSteps(result.steps)
        if (result.steps.length > 0) {
          playStepSequence(result.steps, result.allTestsPassed)
        } else if (result.allTestsPassed) {
          handleVictory()
        }
      }
    } catch (err) {
      setIsRunning(false)
      setExecutionError(err instanceof Error ? err.message : String(err))
    }
  }

  // Animate recorded steps tile-by-tile
  const playStepSequence = (steps: StepEvent[], testsPassed: boolean) => {
    if (steps.length === 0) return

    let currentIdx = 0
    setIsPlayingSteps(true)
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current)

    const interval = Math.max(150, 400 / playbackSpeed)

    playbackTimerRef.current = setInterval(() => {
      if (currentIdx >= steps.length) {
        if (playbackTimerRef.current) clearInterval(playbackTimerRef.current)
        setIsPlayingSteps(false)
        setIsHeroMoving(false)
        setIsHeroJumping(false)

        if (testsPassed) {
          handleVictory()
        }
        return
      }

      const step = steps[currentIdx]
      applyStepEvent(step)
      setCurrentStepIdx(currentIdx + 1)
      currentIdx++
    }, interval)
  }

  // Apply single step event to visual board
  const applyStepEvent = (step: StepEvent) => {
    if (step.type === 'step') {
      setIsHeroMoving(true)
      setIsHeroJumping(false)
      if (step.data?.position) {
        setHeroPos({ x: step.data.position.x, y: step.data.position.y })
      }
      if (step.data?.direction) {
        setHeroDirection(step.data.direction)
      }
    } else if (step.type === 'jump') {
      setIsHeroMoving(false)
      setIsHeroJumping(true)
      if (step.data?.position) {
        setHeroPos({ x: step.data.position.x, y: step.data.position.y })
      }
    } else if (step.type === 'collect') {
      const pos = step.data?.position || heroPos
      // Find entity at current hero position and mark its ID collected so it pops on the board
      const entity = level?.gridConfig.entities?.find(
        (e) => e.x === pos.x && e.y === pos.y
      )
      if (entity) {
        setCollectedEntities((prev) => (prev.includes(entity.id) ? prev : [...prev, entity.id]))
      } else if (step.data?.item) {
        setCollectedEntities((prev) => [...prev, String(step.data?.item)])
      }
    } else if (step.type === 'turn') {
      if (step.data?.direction) {
        setHeroDirection(step.data.direction)
      }
    }

    // Auto-open gate when hero reaches or crosses gate at (2, 0)
    if (level?.id === 'level-2-the-gatekeeper') {
      setGateOpen(true)
    }

    // Animate Visualizers for Level 7 / Level 8
    if (level?.id === 'level-7-the-stone-pedestal') {
      // Stack progression simulation
      setLiveStack((prev) => {
        if (prev.length < 3) return [...prev, 'stone']
        return prev.slice(0, 2)
      })
    } else if (level?.id === 'level-8-the-dual-bridges') {
      // Two-pointer progression simulation
      setLivePointers((prev) => {
        if (prev.left < prev.right) {
          return { left: prev.left + 1, right: prev.right - 1 }
        }
        return prev
      })
    } else if (level?.id === 'level-6-the-inventory-bag') {
      setAccessedIndex((prev) => (prev === null ? 0 : 2))
    }
  }

  // Level Clear Celebration
  const handleVictory = () => {
    if (!level) return
    setIsLevelSolved(true)
    setGateOpen(true)
    completeLevel(level.id, 3, level.xp, code)

    if (nextLevelId) {
      unlockLevel(nextLevelId)
    }

    setTimeout(() => {
      setIsVictoryOpen(true)
    }, 600)
  }

  // Next level navigation
  const handleProceedNextLevel = () => {
    setIsVictoryOpen(false)
    if (nextLevelId) {
      router.push(`/play/${nextLevelId}`)
    } else {
      router.push('/')
    }
  }

  if (!level) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Compass className="w-16 h-16 text-indigo-400 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold text-white mb-2">Level Not Found</h1>
        <p className="text-sm text-slate-400 mb-6">
          The quest coordinates for &quot;{levelId}&quot; could not be located on the World Map.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-sm font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          Return to World Map
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Navigation Bar */}
      <LevelNavBar
        level={level}
        world={world}
        onOpenHint={() => setIsHintOpen(true)}
        language={activeLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Split Game Studio Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 max-w-[1600px] w-full mx-auto overflow-hidden">
        {/* Left Column: Mission Briefing + 2D Game Board + Visualizer (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-0 lg:pr-1">
          {/* Mission Briefing Card */}
          <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {level.concept}
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                Reward: +{level.xp} XP
              </span>
            </div>
            <h1 className="text-lg font-bold text-white mb-1.5">{level.title}</h1>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{level.objective}</p>

            <div className="bg-slate-950/60 rounded-xl p-3 border border-white/[0.04]">
              <div className="text-[11px] font-mono text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Instructions:</span>
              </div>
              <ul className="space-y-1">
                {level.instructions.map((inst, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-cyan-400 select-none">•</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Built-in Hero Actions / Commands */}
            {level.availableActions && level.availableActions.length > 0 && (
              <div className="mt-3 bg-slate-950/60 rounded-xl p-3 border border-white/[0.04]">
                <div className="text-[11px] font-mono text-slate-400 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Available Actions / Commands:</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {level.availableActions.map((action) => (
                    <div
                      key={action.name}
                      className="flex items-baseline gap-2 text-xs"
                    >
                      <code className="text-emerald-300 font-mono font-bold bg-emerald-950/50 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[11px]">
                        {action.signature}
                      </code>
                      <span className="text-slate-300 text-xs">— {action.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Hint & Shortcut Footer */}
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsHintOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors active:scale-[0.98]"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Need a hint? (Free · 3 tiers)</span>
              </button>
              <span className="text-[11px] font-mono text-slate-500">Run code: ⌘↵</span>
            </div>
          </div>

          {/* 2D Animated Tile Grid Canvas */}
          <div className="flex-1 flex flex-col">
            <GridCanvas
              gridConfig={level.gridConfig}
              heroPosition={heroPos}
              heroDirection={heroDirection}
              isMoving={isHeroMoving}
              isJumping={isHeroJumping}
              isCompleted={isLevelSolved}
              collectedEntityIds={collectedEntities}
              gateOpen={gateOpen}
            />

            {/* Step-by-Step Playback Controls */}
            {recordedSteps.length > 0 && (
              <RunControls
                currentStep={currentStepIdx}
                totalSteps={recordedSteps.length}
                isPlaying={isPlayingSteps}
                playbackSpeed={playbackSpeed}
                onTogglePlay={() => {
                  if (isPlayingSteps) {
                    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current)
                    setIsPlayingSteps(false)
                  } else {
                    playStepSequence(recordedSteps, testResults.every((t) => t.passed))
                  }
                }}
                onStepForward={() => {
                  if (currentStepIdx < recordedSteps.length) {
                    applyStepEvent(recordedSteps[currentStepIdx])
                    setCurrentStepIdx((prev) => prev + 1)
                  }
                }}
                onStepBackward={() => {
                  if (currentStepIdx > 0) {
                    resetGameBoard()
                    for (let i = 0; i < currentStepIdx - 1; i++) {
                      applyStepEvent(recordedSteps[i])
                    }
                    setCurrentStepIdx((prev) => prev - 1)
                  }
                }}
                onResetSteps={() => {
                  resetGameBoard()
                }}
                onChangeSpeed={(s) => setPlaybackSpeed(s)}
              />
            )}

            {/* Dynamic Data Structure Visualizer */}
            {level.visualizerConfig && (
              <Visualizer
                config={level.visualizerConfig}
                liveStack={liveStack}
                livePointers={livePointers}
                liveArray={liveArray}
                accessedIndex={accessedIndex}
              />
            )}
          </div>
        </div>

        {/* Right Column: Code Terminal & Output Console (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 h-full min-h-[580px]">
          {/* Top Half: CodeMirror 6 Editor */}
          <div className="flex-1 min-h-[320px]">
            <CodeTerminal
              code={code}
              onChange={handleCodeChange}
              language={activeLanguage}
              onLanguageChange={handleLanguageChange}
              onReset={handleResetCode}
              onRun={handleRunCode}
              isRunning={isRunning}
            />
          </div>

          {/* Bottom Half: Test Assertions & Output Console */}
          <div className="h-64 min-h-[220px]">
            <OutputConsole
              testResults={testResults}
              stdoutLogs={stdoutLogs}
              error={executionError}
              errorDetails={errorDetails}
              executionTimeMs={executionTimeMs}
              allTestsPassed={testResults.length > 0 && testResults.every((t) => t.passed)}
              hasRun={hasRun}
            />
          </div>
        </div>
      </main>

      {/* 3-Tier Progressive Hint Modal */}
      <HintModal
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
        hints={level.hints}
        levelId={level.id}
        language={activeLanguage}
      />

      {/* Level Clear Celebration Modal */}
      <VictoryModal
        isOpen={isVictoryOpen}
        level={level}
        stars={3}
        xpAwarded={level.xp}
        nextLevelId={nextLevelId}
        onReplay={() => {
          setIsVictoryOpen(false)
          resetGameBoard()
        }}
        onNextLevel={handleProceedNextLevel}
        onClose={() => setIsVictoryOpen(false)}
      />
    </div>
  )
}
