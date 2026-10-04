'use client'

import React from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
} from 'lucide-react'

interface RunControlsProps {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  playbackSpeed: number
  onTogglePlay: () => void
  onStepForward: () => void
  onStepBackward: () => void
  onResetSteps: () => void
  // eslint-disable-next-line no-unused-vars
  onChangeSpeed: (speed: number) => void
}

export function RunControls({
  currentStep,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onResetSteps,
  onChangeSpeed,
}: RunControlsProps) {
  if (totalSteps <= 0) return null

  const speeds = [1, 2, 4]

  const nextSpeed = () => {
    const currentIndex = speeds.indexOf(playbackSpeed)
    const nextIdx = (currentIndex + 1) % speeds.length
    onChangeSpeed(speeds[nextIdx])
  }

  return (
    <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-xl mt-3 select-none">
      {/* Playback Scrubbing Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onResetSteps}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-[0.98]"
          title="Reset to step 0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onStepBackward}
          disabled={currentStep <= 0}
          className={`p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-[0.98] ${
            currentStep <= 0 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          title="Step Backward"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(99,102,241,0.4)] flex items-center gap-1.5 active:scale-[0.98]"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onStepForward}
          disabled={currentStep >= totalSteps}
          className={`p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-[0.98] ${
            currentStep >= totalSteps ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          title="Step Forward"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Step Counter Indicator */}
      <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
        <span>
          Step <strong className="text-white">{currentStep}</strong> / {totalSteps}
        </span>
      </div>

      {/* Speed multiplier toggle */}
      <button
        type="button"
        onClick={nextSpeed}
        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs font-medium transition-all flex items-center gap-1 border border-white/[0.06] active:scale-[0.98]"
        title="Cycle animation speed"
      >
        <FastForward className="w-3 h-3 text-indigo-400" />
        <span>{playbackSpeed}x</span>
      </button>
    </div>
  )
}
