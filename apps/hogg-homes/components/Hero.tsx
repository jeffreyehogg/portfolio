'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  X,
  Layers,
  Bed,
  Bath,
  Car,
  ChevronRight,
} from 'lucide-react'
import { METROS, FLOOR_PLANS } from '../lib/data'

interface HeroProps {
  selectedMetro: string
  onSelectMetro: (metroId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onExplorePlans: () => void
  onOpenTourDrawer: (preselected?: { floorPlanId?: string; communityId?: string }) => void
}

export default function Hero({
  selectedMetro,
  onSelectMetro,
  searchQuery,
  onSearchChange,
  onExplorePlans,
  onOpenTourDrawer,
}: HeroProps) {
  // Spotlight Plan (The Brazos) Elevation State
  const spotlightPlan = FLOOR_PLANS[1] // The Brazos (Signature Series)
  const [spotlightElevationId, setSpotlightElevationId] = useState<'A' | 'B' | 'C'>('A')

  const currentSpotlightElevation =
    spotlightPlan.elevations.find((e) => e.id === spotlightElevationId) ||
    spotlightPlan.elevations[0]

  // Quick Search Suggestions
  const quickSearchTags = [
    { label: 'Riverwood Ranch', query: 'Riverwood Ranch' },
    { label: 'The Brazos (4-Bed)', query: 'The Brazos' },
    { label: 'Celina (DFW)', query: 'Celina' },
    { label: 'Under $350k', query: '350' },
    { label: 'Move-In Ready', query: 'Ready' },
  ]

  const handleQuickTagClick = (query: string) => {
    onSearchChange(query)
    onExplorePlans()
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32 border-b border-slate-800/60">
      {/* Ambient Radial Lighting from high-craft-ui skill */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-amber-500/12 via-amber-600/6 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -top-24 right-10 w-[550px] h-[550px] bg-indigo-500/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle blueprint grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Telemetry / Award Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-medium text-amber-300 backdrop-blur-md shadow-inner shadow-amber-500/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>2026 ARCHITECTURAL EXCELLENCE AWARD</span>
            <span className="text-amber-500">•</span>
            <span className="text-slate-300">SUNBELT RESIDENTIAL HOMEBUILDER</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-center"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Crafted for Living.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
              Built for Life.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Enterprise property architecture meets meticulous residential craftsmanship. Discover
            curated master-planned communities, customizable elevation floor plans, and move-in ready
            homes across Texas and the Sunbelt.
          </p>
        </motion.div>

        {/* Unified High-Craft Search & Discovery Console */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 mx-auto max-w-3xl"
        >
          {/* Sleek Metro Filter Pill Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 flex-wrap">
            <button
              onClick={() => onSelectMetro('all')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-mono transition-all ${
                selectedMetro === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80'
              }`}
            >
              All Sunbelt
              <span className="ml-1.5 text-[11px] opacity-70">26 Ready</span>
            </button>
            {METROS.map((metro) => {
              const isSelected = selectedMetro === metro.id
              return (
                <button
                  key={metro.id}
                  onClick={() => onSelectMetro(isSelected ? 'all' : metro.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80'
                  }`}
                >
                  {metro.name.replace(' Metro', '').replace(' East Valley', '')}
                  <span className="ml-1.5 text-[11px] opacity-70">
                    ${(metro.startingPrice / 1000).toFixed(0)}k+
                  </span>
                </button>
              )
            })}
          </div>

          {/* Spacious Command Search Bar */}
          <div className="relative rounded-2xl bg-gradient-to-r from-amber-500/30 via-slate-700/50 to-amber-500/20 p-[1.5px] shadow-2xl shadow-amber-500/5">
            <div className="flex items-center rounded-[15px] bg-slate-900/95 backdrop-blur-2xl px-4 py-2 sm:py-2.5 gap-3">
              <Search className="h-5 w-5 text-amber-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search communities, floor plans, or cities (e.g. Riverwood, Brazos)..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none py-1.5"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
                  title="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={onExplorePlans}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0"
              >
                <span>Explore Plans</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Subtle Quick Suggestions Ghost Line */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-1 text-xs">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              Popular:
            </span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => handleQuickTagClick(tag.query)}
                className="text-slate-400 hover:text-amber-300 transition-colors font-medium px-1.5 py-0.5 rounded hover:bg-slate-850/60 text-xs"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Minimalist Architectural Proofline */}
          <div className="mt-10 pt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">4</span>
              <span>Sunbelt Metros</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">14</span>
              <span>Communities</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">48</span>
              <span>Floor Plans</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-bold text-sm text-emerald-400">26</span>
              <span>Move-In Ready</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400/80" />
              <span>10-Yr Warranty</span>
            </div>
          </div>
        </motion.div>

        {/* BREATHTAKING ARCHITECTURAL ELEVATION SPOTLIGHT SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 mx-auto max-w-5xl"
        >
          <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl overflow-hidden group">
            {/* Ambient diffuse warm glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Interactive Elevation Viewer */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpotlightElevation.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative h-full w-full overflow-hidden"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.05] }}
                        transition={{
                          duration: 20,
                          ease: 'linear',
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={currentSpotlightElevation.imageUrl}
                          alt={`${spotlightPlan.name} - ${currentSpotlightElevation.styleName}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Elevation Switcher Pills directly on photo */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between rounded-xl bg-slate-950/85 p-1.5 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center gap-1">
                      {spotlightPlan.elevations.map((elevation) => {
                        const isActive = spotlightElevationId === elevation.id
                        return (
                          <button
                            key={elevation.id}
                            onClick={() => setSpotlightElevationId(elevation.id)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-mono font-semibold transition ${
                              isActive
                                ? 'bg-amber-500 text-slate-950 shadow-md'
                                : 'text-slate-400 hover:text-white hover:bg-slate-850'
                            }`}
                          >
                            {elevation.name}
                          </button>
                        )
                      })}
                    </div>
                    <span className="text-xs font-display italic text-brand-100 tracking-wide truncate max-w-[200px]">
                      {currentSpotlightElevation.styleName}
                    </span>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="rounded-full bg-slate-950/85 border border-slate-700/80 px-3 py-1 text-[11px] font-mono text-amber-300 backdrop-blur-md">
                      FEATURED ARCHITECTURAL SPOTLIGHT
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Model Specs & Quick Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                      {spotlightPlan.series}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs font-mono text-slate-400">
                      Top-Selling Family Model
                    </span>
                  </div>

                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {spotlightPlan.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {currentSpotlightElevation.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-4 gap-2 border-y border-slate-800/80 py-3 text-center">
                  <div>
                    <div className="flex items-center justify-center text-slate-400 mb-0.5">
                      <Layers className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <span className="block text-xs font-mono font-bold text-white">
                      {spotlightPlan.sqft.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Sq Ft</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-slate-400 mb-0.5">
                      <Bed className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <span className="block text-xs font-mono font-bold text-white">
                      {spotlightPlan.bedrooms} Beds
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Bedrooms</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-slate-400 mb-0.5">
                      <Bath className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <span className="block text-xs font-mono font-bold text-white">
                      {spotlightPlan.bathrooms}.{spotlightPlan.halfBaths}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Baths</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-slate-400 mb-0.5">
                      <Car className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <span className="block text-xs font-mono font-bold text-white">
                      {spotlightPlan.garageBays}-Car
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Garage</span>
                  </div>
                </div>

                {/* Pricing & Monthly estimate */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      Starting Base Price
                    </span>
                    <div className="text-2xl font-extrabold font-mono text-white">
                      ${spotlightPlan.basePrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      Est. Monthly (4.99% Rate)
                    </span>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      ~$2,180/mo
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={onExplorePlans}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-850 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
                  >
                    <span>View All Plans</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onOpenTourDrawer({ floorPlanId: spotlightPlan.id })}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Tour The Brazos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
