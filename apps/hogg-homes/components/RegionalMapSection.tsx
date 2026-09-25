'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  Calendar,
  Compass,
} from 'lucide-react'
import { COMMUNITIES } from '../lib/data'
import { TEXAS_SVG_PATH, ARIZONA_SVG_PATH, MAP_PINS, MapPin } from '../lib/mapData'

interface RegionalMapSectionProps {
  onSelectCommunity: (communityId: string) => void
  onOpenTourDrawer: (preselected: { communityId: string }) => void
}

export default function RegionalMapSection({
  onSelectCommunity,
  onOpenTourDrawer,
}: RegionalMapSectionProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [activePinId, setActivePinId] = useState<string>('riverwood-ranch')
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null)

  const activeCommunity =
    COMMUNITIES.find((c) => c.id === activePinId) || COMMUNITIES[0]

  const filteredPins = MAP_PINS.filter((pin) => {
    if (selectedRegion !== 'all' && pin.region !== selectedRegion) return false
    return true
  })

  return (
    <section id="regional-map" className="relative py-20 bg-slate-950/80 border-t border-slate-800/80 scroll-mt-20 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-400">
              <Compass className="h-4 w-4" />
              <span>GEOGRAPHIC EXPANSION & MASTER-PLANNED CORRIDORS</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Sunbelt & Texas Regional Territory
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Strategically developed master-planned communities situated along premier Sunbelt growth corridors—pairing acreage
              privacy with top-rated school districts and tech employer proximity.
            </p>
          </div>

          {/* Regional Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {[
              { label: 'All Regions', value: 'all' },
              { label: 'Houston Metro', value: 'houston' },
              { label: 'Dallas - Fort Worth', value: 'dfw' },
              { label: 'Austin - San Marcos', value: 'austin' },
              { label: 'Phoenix East Valley', value: 'phoenix' },
            ].map((reg) => (
              <button
                key={reg.value}
                onClick={() => setSelectedRegion(reg.value)}
                className={`rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition ${
                  selectedRegion === reg.value
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map Canvas & Community Inspector Split */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive SVG Cartographic Map */}
          <div className="lg:col-span-8 relative rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[460px] flex items-center justify-center">
            {/* Blueprint Grid Background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Vector Map SVG with Authentic Boundaries */}
            <svg
              viewBox="0 0 960 500"
              className="w-full h-auto max-h-[480px] drop-shadow-2xl select-none"
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Arizona State Silhouette Outline */}
              <g transform="translate(60, 55) scale(0.338)">
                <path
                  d={ARIZONA_SVG_PATH}
                  fill="#0c1322"
                  stroke="#334155"
                  strokeWidth="2.5"
                  className="transition-colors duration-500"
                />
              </g>
              <text
                x="170"
                y="190"
                fill="#1e293b"
                fontSize="20"
                fontWeight="bold"
                fontFamily="monospace"
                letterSpacing="6"
                className="select-none pointer-events-none"
              >
                ARIZONA
              </text>

              {/* Texas State Silhouette Outline (Authentic Geography) */}
              <g transform="translate(450, 25) scale(0.391)">
                <path
                  d={TEXAS_SVG_PATH}
                  fill="#0b1120"
                  stroke="#475569"
                  strokeWidth="2.5"
                  className="transition-colors duration-500"
                />
              </g>
              <text
                x="600"
                y="270"
                fill="#1e293b"
                fontSize="38"
                fontWeight="bold"
                fontFamily="monospace"
                letterSpacing="10"
                className="select-none pointer-events-none"
              >
                TEXAS
              </text>

              {/* Gulf of Mexico Waterbody Indicator */}
              <text
                x="760"
                y="450"
                fill="#1e293b"
                fontSize="12"
                fontStyle="italic"
                fontFamily="monospace"
                letterSpacing="3"
                className="select-none pointer-events-none"
              >
                GULF OF MEXICO
              </text>

              {/* Major Highway Corridors */}
              {/* I-10 Trans-Sunbelt Corridor (Phoenix -> El Paso -> San Antonio -> Houston) */}
              <path
                d="M 212 292 Q 240 350 340 330 T 452 223 Q 590 280 731 328 L 839 314"
                fill="none"
                stroke="#d97706"
                strokeWidth="1.75"
                strokeDasharray="4,4"
                opacity="0.6"
              />
              <text x="310" y="315" fill="#92400e" fontSize="9" fontFamily="monospace" letterSpacing="1">
                INTERSTATE 10 EXPANSION CORRIDOR
              </text>

              {/* I-35 Tech Spine (Celina/DFW -> Austin -> San Antonio) */}
              <path
                d="M 788 168 L 788 190 L 750 277 L 731 328"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.75"
                strokeDasharray="4,4"
                opacity="0.6"
              />
              <text x="735" y="240" fill="#0284c7" fontSize="9" fontFamily="monospace" letterSpacing="1">
                I-35
              </text>

              {/* I-45 Metro Spine (DFW -> Houston) */}
              <path
                d="M 788 190 L 839 314"
                fill="none"
                stroke="#059669"
                strokeWidth="1.75"
                strokeDasharray="4,4"
                opacity="0.6"
              />
              <text x="815" y="245" fill="#059669" fontSize="9" fontFamily="monospace" letterSpacing="1">
                I-45
              </text>

              {/* Reference Anchor Cities */}
              <g className="select-none pointer-events-none">
                {/* Phoenix Marker */}
                <circle cx="212" cy="292" r="2.5" fill="#475569" />
                <text x="160" y="278" fill="#475569" fontSize="9" fontFamily="monospace">PHOENIX</text>

                {/* El Paso Marker */}
                <circle cx="452" cy="223" r="2.5" fill="#475569" />
                <text x="408" y="220" fill="#475569" fontSize="9" fontFamily="monospace">EL PASO</text>

                {/* Dallas Marker */}
                <circle cx="788" cy="190" r="2.5" fill="#475569" />
                <text x="800" y="195" fill="#475569" fontSize="9" fontFamily="monospace">DFW</text>

                {/* Austin Marker */}
                <circle cx="750" cy="293" r="2.5" fill="#475569" />
                <text x="702" y="303" fill="#475569" fontSize="9" fontFamily="monospace">AUSTIN</text>

                {/* Houston Marker */}
                <circle cx="839" cy="314" r="2.5" fill="#475569" />
                <text x="850" y="322" fill="#475569" fontSize="9" fontFamily="monospace">HOUSTON</text>
              </g>

              {/* Community Interactive Pins (Anchored without CSS scale jump) */}
              {filteredPins.map((pin: MapPin) => {
                const isActive = activePinId === pin.communityId
                const isHovered = hoveredPinId === pin.communityId

                return (
                  <g
                    key={pin.communityId}
                    transform={`translate(${pin.x}, ${pin.y})`}
                    onClick={() => {
                      setActivePinId(pin.communityId)
                      onSelectCommunity(pin.communityId)
                    }}
                    onMouseEnter={() => setHoveredPinId(pin.communityId)}
                    onMouseLeave={() => setHoveredPinId(null)}
                    className="cursor-pointer"
                  >
                    {/* Outer Glow Halo */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isActive ? 18 : isHovered ? 13 : 8}
                      fill={isActive ? '#f59e0b' : '#38bdf8'}
                      opacity={isActive ? 0.35 : isHovered ? 0.25 : 0.12}
                      className="transition-all duration-300"
                    />

                    {/* Active Pulsing Wave Ring */}
                    {isActive && (
                      <circle
                        cx="0"
                        cy="0"
                        r="16"
                        fill="#f59e0b"
                        opacity="0.3"
                        className="animate-ping"
                      />
                    )}

                    {/* Solid Core Dot (Zero translation on hover) */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isActive ? 7 : isHovered ? 6 : 4.5}
                      fill={isActive ? '#f59e0b' : '#38bdf8'}
                      stroke="#ffffff"
                      strokeWidth={isActive ? 2 : 1.5}
                      className="transition-all duration-200 drop-shadow-md"
                    />

                    {/* Clean Anchored Label Badge */}
                    <g
                      transform={`translate(${pin.badgeOffset.x}, ${pin.badgeOffset.y})`}
                      className="transition-transform duration-200"
                    >
                      <rect
                        x="0"
                        y="0"
                        width={pin.name.length * 7.2 + 20}
                        height="22"
                        rx="6"
                        fill={isActive ? '#0b1120' : '#030712'}
                        stroke={isActive ? '#f59e0b' : isHovered ? '#38bdf8' : '#334155'}
                        strokeWidth={isActive ? '1.5' : '1'}
                        opacity="0.95"
                        className="transition-colors duration-200"
                      />
                      <circle
                        cx="9"
                        cy="11"
                        r="2.5"
                        fill={isActive ? '#f59e0b' : '#38bdf8'}
                      />
                      <text
                        x="16"
                        y="15"
                        fill={isActive ? '#fbbf24' : isHovered ? '#ffffff' : '#cbd5e1'}
                        fontSize="10"
                        fontWeight={isActive ? 'bold' : 'normal'}
                        fontFamily="monospace"
                        className="transition-colors duration-200 select-none"
                      >
                        {pin.name}
                      </text>
                    </g>
                  </g>
                )
              })}
            </svg>

            {/* Bottom Map Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/85 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" />
                  Selected Community
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 inline-block" />
                  Sunbelt Enclave
                </span>
              </div>
              <span className="text-amber-400 hidden sm:inline">Click any pin or badge to inspect details</span>
            </div>
          </div>

          {/* Right Column: Active Community Preview Inspector Card */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCommunity.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 mb-4">
                    <Image
                      src={activeCommunity.heroImage}
                      alt={activeCommunity.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="rounded-full bg-slate-950/85 border border-slate-750 px-2.5 py-0.5 text-[11px] font-mono text-amber-300">
                        {activeCommunity.city}, {activeCommunity.state}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
                        {activeCommunity.moveInReadyCount} Move-In Ready
                      </span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeCommunity.name}</h3>
                      <span className="text-xs font-mono text-slate-400">{activeCommunity.county}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono font-extrabold text-amber-400">
                        {activeCommunity.priceRange}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {activeCommunity.description}
                  </p>

                  {/* Amenities */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Featured Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCommunity.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-slate-800 border border-slate-700/80 px-2 py-0.5 text-[11px] text-slate-300"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* School District & Tax Rate */}
                  <div className="mt-4 rounded-xl bg-slate-950/60 border border-slate-800 p-2.5 text-[11px] font-mono text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Schools:</span>
                      <span className="text-slate-200">{activeCommunity.schoolDistrict}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Advantage:</span>
                      <span className="text-emerald-400">{activeCommunity.taxRate}</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectCommunity(activeCommunity.id)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-850 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
                  >
                    <span>View Plans</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenTourDrawer({ communityId: activeCommunity.id })}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Tour</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
