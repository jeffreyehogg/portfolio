'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
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
  onExplorePlans,
  onOpenTourDrawer,
}: HeroProps) {
  // Spotlight Plan (The Brazos) Elevation State
  const spotlightPlan = FLOOR_PLANS[1] // The Brazos
  const [spotlightElevationId, setSpotlightElevationId] = useState<'A' | 'B' | 'C'>('A')

  const currentSpotlightElevation =
    spotlightPlan.elevations.find((e) => e.id === spotlightElevationId) ||
    spotlightPlan.elevations[0]

  const handleMetroClick = (metroId: string) => {
    onSelectMetro(selectedMetro === metroId ? 'all' : metroId)
    onExplorePlans()
  }

  const handleExploreQuickMoveIns = () => {
    const el = document.getElementById('quick-move-ins')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-slate-800/80">
      {/* Subtle warm ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Calm Headline & Introduction */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300 mb-6"
          >
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>Modern homebuilder in Texas & Arizona</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Crafted for living.{' '}
            <span className="block text-amber-300 font-display font-bold">
              Built for life.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-light"
          >
            Thoughtfully designed floor plans and move-in ready homes across premier master-planned communities.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={onExplorePlans}
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors shadow-sm"
            >
              <span>Explore Floor Plans</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleExploreQuickMoveIns}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:text-white px-5 py-3 text-sm font-medium text-slate-200 transition-colors"
            >
              <span>Move-In Ready Homes</span>
            </button>
          </motion.div>

          {/* Clean Location Selector Pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-2 flex-wrap"
          >
            <span className="text-xs text-slate-400 mr-1">Locations:</span>
            <button
              onClick={() => {
                onSelectMetro('all')
                onExplorePlans()
              }}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                selectedMetro === 'all'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Regions
            </button>
            {METROS.map((metro) => {
              const isSelected = selectedMetro === metro.id
              return (
                <button
                  key={metro.id}
                  onClick={() => handleMetroClick(metro.id)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {metro.name.replace(' Metro', '').replace(' East Valley', '')}
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* Calm Featured Model Card (Clean & Editorial) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 mx-auto max-w-4xl"
        >
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Photo & Elevation Toggles */}
              <div className="md:col-span-7">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpotlightElevation.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={currentSpotlightElevation.imageUrl}
                        alt={`${spotlightPlan.name} - ${currentSpotlightElevation.styleName}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 55vw"
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Clean Elevation Toggle Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-950/85 px-3 py-1.5 backdrop-blur-md border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px] mr-1">Elevation:</span>
                      {spotlightPlan.elevations.map((elevation) => {
                        const isActive = spotlightElevationId === elevation.id
                        return (
                          <button
                            key={elevation.id}
                            onClick={() => setSpotlightElevationId(elevation.id)}
                            className={`rounded-md px-2 py-0.5 text-xs font-medium transition ${
                              isActive
                                ? 'bg-amber-500 text-slate-950 font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {elevation.name}
                          </button>
                        )
                      })}
                    </div>
                    <span className="text-slate-300 text-xs truncate">
                      {currentSpotlightElevation.styleName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Model Info & Actions */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs text-amber-400 font-medium">Featured Plan</span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                    {spotlightPlan.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentSpotlightElevation.description}
                  </p>
                </div>

                {/* Clean Specs Line */}
                <div className="py-3 border-y border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <span>{spotlightPlan.bedrooms} Bedrooms</span>
                  <span className="text-slate-600">•</span>
                  <span>{spotlightPlan.bathrooms} Baths</span>
                  <span className="text-slate-600">•</span>
                  <span>{spotlightPlan.sqft.toLocaleString()} Sq Ft</span>
                  <span className="text-slate-600">•</span>
                  <span>{spotlightPlan.garageBays}-Car</span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="block text-[11px] text-slate-400">Starting from</span>
                    <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                      ${spotlightPlan.basePrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenTourDrawer({ floorPlanId: spotlightPlan.id })}
                    className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Tour</span>
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
