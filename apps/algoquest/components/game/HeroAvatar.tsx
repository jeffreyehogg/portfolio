'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HeroAvatarProps {
  direction?: 'north' | 'south' | 'east' | 'west' | string
  isMoving?: boolean
  isJumping?: boolean
  isCelebrating?: boolean
  size?: number
}

export function HeroAvatar({
  direction = 'east',
  isMoving = false,
  isJumping = false,
  isCelebrating = false,
  size = 48,
}: HeroAvatarProps) {
  // Compute horizontal facing flip if facing west
  const isFacingWest = direction === 'west' || direction === 'left'

  return (
    <motion.div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      animate={
        isCelebrating
          ? {
              y: [0, -16, 0, -12, 0],
              scale: [1, 1.15, 1, 1.1, 1],
              rotate: [0, -10, 10, -5, 0],
            }
          : isJumping
            ? {
                y: [0, -22, 0],
                scale: [1, 1.12, 0.95, 1],
              }
            : isMoving
              ? {
                  y: [0, -4, 0],
                  scaleY: [1, 0.96, 1],
                }
              : {
                  y: [0, -2, 0],
                }
      }
      transition={
        isCelebrating
          ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
          : isJumping
            ? { duration: 0.45, ease: 'easeInOut' }
            : isMoving
              ? { duration: 0.25, repeat: Infinity, ease: 'linear' }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      {/* Ground drop shadow */}
      <motion.div
        className="absolute bottom-1 w-3/4 h-2 bg-black/40 rounded-full blur-[2px]"
        animate={{
          scale: isJumping ? 0.6 : isMoving ? 0.9 : 1,
          opacity: isJumping ? 0.3 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* SVG Character Avatar */}
      <svg
        width={size * 0.9}
        height={size * 0.9}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-200 ${isFacingWest ? '-scale-x-100' : 'scale-x-100'}`}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="heroCloak" x1="16" y1="20" x2="48" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="heroArmor" x1="24" y1="20" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="crystalStaff" x1="48" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#0891b2" />
          </linearGradient>
          <filter id="runeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floating Rune Cape */}
        <path
          d="M20 28C16 34 14 48 16 54C20 56 26 55 30 52C28 44 26 34 26 28Z"
          fill="url(#heroCloak)"
          opacity="0.9"
        />

        {/* Hero Torso / Robe */}
        <path
          d="M22 28C22 24 42 24 42 28C44 38 43 48 40 54C32 57 26 56 24 54C21 48 21 38 22 28Z"
          fill="url(#heroArmor)"
        />

        {/* Belt & Buckle */}
        <rect x="23" y="40" width="18" height="4" rx="1" fill="#1e293b" />
        <rect x="30" y="39.5" width="4" height="5" rx="1" fill="#f59e0b" />

        {/* Head / Hood */}
        <path
          d="M22 22C22 13 42 13 42 22C42 28 40 32 32 32C24 32 22 28 22 22Z"
          fill="#0369a1"
        />

        {/* Glowing Face / Visor Shadow */}
        <ellipse cx="32" cy="23" rx="7" ry="4.5" fill="#0b1329" />

        {/* Glowing Cyan Eyes */}
        <circle cx="29.5" cy="22.5" r="1.6" fill="#38bdf8" filter="url(#runeGlow)" />
        <circle cx="34.5" cy="22.5" r="1.6" fill="#38bdf8" filter="url(#runeGlow)" />
        <circle cx="29.8" cy="22.2" r="0.6" fill="#ffffff" />
        <circle cx="34.8" cy="22.2" r="0.6" fill="#ffffff" />

        {/* Golden Circlet / Headband Gem */}
        <circle cx="32" cy="15" r="2" fill="#fbbf24" filter="url(#runeGlow)" />

        {/* Crystal Staff / Wand */}
        <path d="M47 18L49 52" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Glowing floating crystal tip */}
        <polygon
          points="47,10 52,15 47,20 42,15"
          fill="url(#crystalStaff)"
          filter="url(#runeGlow)"
        />
        <circle cx="47" cy="15" r="1.2" fill="#ffffff" />

        {/* Small sparkling mana particle on celebration */}
        {isCelebrating && (
          <g>
            <circle cx="16" cy="14" r="2" fill="#fbbf24" filter="url(#runeGlow)" />
            <circle cx="48" cy="30" r="1.5" fill="#38bdf8" filter="url(#runeGlow)" />
          </g>
        )}
      </svg>
    </motion.div>
  )
}
