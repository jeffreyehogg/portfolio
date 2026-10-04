'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Key, CheckCircle, Shield, FlaskConical } from 'lucide-react'
import { GridConfig, GridEntity, TileType } from '../../lib/quests/types'
import { HeroAvatar } from './HeroAvatar'

interface GridCanvasProps {
  gridConfig: GridConfig
  heroPosition: { x: number; y: number }
  heroDirection?: string
  isMoving?: boolean
  isJumping?: boolean
  isCompleted?: boolean
  collectedEntityIds?: string[]
  gateOpen?: boolean
}

const TILE_SIZE = 64

export function GridCanvas({
  gridConfig,
  heroPosition,
  heroDirection = 'east',
  isMoving = false,
  isJumping = false,
  isCompleted = false,
  collectedEntityIds = [],
  gateOpen = false,
}: GridCanvasProps) {
  const { width, height, tiles, goal, entities = [] } = gridConfig

  // Generate grid matrix if tiles array is 1D or undefined
  const gridMatrix: TileType[][] = useMemo(() => {
    if (tiles && tiles.length > 0 && Array.isArray(tiles[0])) {
      return tiles
    }
    // Default matrix
    const matrix: TileType[][] = []
    for (let y = 0; y < height; y++) {
      const row: TileType[] = []
      for (let x = 0; x < width; x++) {
        row.push('path')
      }
      matrix.push(row)
    }
    return matrix
  }, [tiles, width, height])

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-950/90 border border-white/[0.08] p-5 shadow-2xl flex flex-col items-center justify-center select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Canvas Container */}
      <div
        className="relative"
        style={{
          width: width * TILE_SIZE,
          height: height * TILE_SIZE,
        }}
      >
        {/* Render Coordinate Header (X-axis) */}
        <div className="absolute -top-6 left-0 right-0 flex pointer-events-none">
          {Array.from({ length: width }).map((_, x) => (
            <div
              key={`x-axis-${x}`}
              className="text-[10px] font-mono text-slate-500 text-center font-medium"
              style={{ width: TILE_SIZE }}
            >
              x:{x}
            </div>
          ))}
        </div>

        {/* Render Coordinate Side (Y-axis) */}
        <div className="absolute top-0 -left-6 bottom-0 flex flex-col pointer-events-none">
          {Array.from({ length: height }).map((_, y) => (
            <div
              key={`y-axis-${y}`}
              className="text-[10px] font-mono text-slate-500 text-right pr-1 font-medium flex items-center justify-end"
              style={{ height: TILE_SIZE }}
            >
              y:{y}
            </div>
          ))}
        </div>

        {/* Render Grid Tiles */}
        <div
          className="grid gap-1 relative z-0"
          style={{
            gridTemplateColumns: `repeat(${width}, ${TILE_SIZE - 4}px)`,
            gridTemplateRows: `repeat(${height}, ${TILE_SIZE - 4}px)`,
          }}
        >
          {gridMatrix.map((row, y) =>
            row.map((tileType, x) => {
              const isGoalTile = goal.x === x && goal.y === y

              return (
                <div
                  key={`tile-${x}-${y}`}
                  className={`relative rounded-xl border transition-all duration-300 flex items-center justify-center overflow-hidden ${
                    tileType === 'lava'
                      ? 'bg-gradient-to-br from-amber-600/40 via-red-600/50 to-orange-700/60 border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                      : tileType === 'bridge'
                        ? 'bg-amber-950/40 border-amber-800/40'
                        : tileType === 'stone'
                          ? 'bg-slate-800/90 border-slate-700/60'
                          : tileType === 'pedestal'
                            ? 'bg-indigo-950/60 border-indigo-500/50 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                            : 'bg-slate-900/80 border-slate-800/60 hover:border-slate-700/60'
                  }`}
                  style={{ width: TILE_SIZE - 4, height: TILE_SIZE - 4 }}
                >
                  {/* Subtle tile pattern */}
                  {tileType === 'lava' ? (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-sm font-mono text-orange-300/80 animate-pulse font-semibold">
                        LAVA
                      </span>
                      <div className="absolute inset-0 bg-orange-500/10 animate-ping opacity-30 rounded-lg" />
                    </div>
                  ) : tileType === 'bridge' ? (
                    <div className="w-full h-full flex flex-col justify-between py-1 opacity-40">
                      <div className="h-[2px] bg-amber-700/60 w-full" />
                      <div className="h-[2px] bg-amber-700/60 w-full" />
                      <div className="h-[2px] bg-amber-700/60 w-full" />
                    </div>
                  ) : tileType === 'pedestal' ? (
                    <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                      ALTAR
                    </div>
                  ) : null}

                  {/* Goal Indicator if not covered by a chest */}
                  {isGoalTile && !entities.some((e) => e.x === x && e.y === y && e.type === 'chest') && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-emerald-400/80 flex items-center justify-center bg-emerald-500/10">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Render Entities (Gems, Chests, Gates, Potions, Keys) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {entities.map((entity: GridEntity) => {
            const isCollected = collectedEntityIds.includes(entity.id)
            if (isCollected) return null

            const pixelX = entity.x * TILE_SIZE + 6
            const pixelY = entity.y * TILE_SIZE + 6

            return (
              <motion.div
                key={entity.id}
                className="absolute flex items-center justify-center"
                style={{
                  left: pixelX,
                  top: pixelY,
                  width: TILE_SIZE - 12,
                  height: TILE_SIZE - 12,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                {entity.type === 'gem' ? (
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] rotate-45 flex items-center justify-center border border-white/40">
                      <Sparkles className="w-3.5 h-3.5 text-white -rotate-45" />
                    </div>
                  </motion.div>
                ) : entity.type === 'chest' ? (
                  <motion.div
                    className="relative flex flex-col items-center justify-center"
                    animate={isCompleted ? { scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <div
                      className={`w-9 h-8 rounded-lg border flex flex-col items-center justify-center shadow-lg transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-b from-amber-500 to-amber-700 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                          : 'bg-gradient-to-b from-amber-800 to-amber-950 border-amber-700'
                      }`}
                    >
                      <div className="w-full h-1 bg-amber-600/60 mb-0.5" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-300 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-amber-900" />
                      </div>
                    </div>
                    {isCompleted && (
                      <motion.div
                        className="absolute -top-3 text-amber-300"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: -6 }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.div>
                ) : entity.type === 'gate' ? (
                  <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    animate={{ opacity: gateOpen ? 0.2 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg border-2 flex flex-col justify-around p-1.5 transition-all ${
                        gateOpen
                          ? 'border-emerald-500/40 bg-emerald-950/20'
                          : 'border-slate-500 bg-slate-900/90 shadow-[0_0_10px_rgba(100,116,139,0.3)]'
                      }`}
                    >
                      <div className="h-0.5 bg-slate-400 w-full" />
                      <div className="h-0.5 bg-slate-400 w-full" />
                      <div className="h-0.5 bg-slate-400 w-full" />
                    </div>
                  </motion.div>
                ) : entity.type === 'potion' ? (
                  <div className="w-7 h-7 rounded-full bg-purple-600/40 border border-purple-400 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    <FlaskConical className="w-4 h-4 text-purple-300" />
                  </div>
                ) : entity.type === 'key' ? (
                  <div className="w-7 h-7 rounded-full bg-amber-600/40 border border-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                    <Key className="w-4 h-4 text-amber-300" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-700/60 border border-slate-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Animated Hero Avatar */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          animate={{
            x: heroPosition.x * TILE_SIZE + 6,
            y: heroPosition.y * TILE_SIZE + 6,
          }}
          transition={{
            type: 'spring',
            stiffness: isJumping ? 180 : 280,
            damping: isJumping ? 18 : 24,
          }}
          style={{
            width: TILE_SIZE - 12,
            height: TILE_SIZE - 12,
          }}
        >
          <HeroAvatar
            direction={heroDirection}
            isMoving={isMoving}
            isJumping={isJumping}
            isCelebrating={isCompleted}
            size={TILE_SIZE - 12}
          />
        </motion.div>
      </div>

      {/* Grid Legend & Status Bar */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            Hero: ({heroPosition.x}, {heroPosition.y})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            Goal: ({goal.x}, {goal.y})
          </span>
        </div>
        <div className="text-slate-500">
          Facing: <span className="text-slate-300 font-semibold uppercase">{heroDirection}</span>
        </div>
      </div>
    </div>
  )
}
