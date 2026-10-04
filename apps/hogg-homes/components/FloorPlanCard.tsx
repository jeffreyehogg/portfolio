'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Maximize2, Layers } from 'lucide-react'
import { FloorPlan } from '../lib/types'

interface FloorPlanCardProps {
  floorPlan: FloorPlan
  onOpenSchematic: (plan: FloorPlan) => void
  onOpenBrochure: (plan: FloorPlan) => void
  onOpenTourDrawer: (preselected: { floorPlanId: string; communityId?: string }) => void
  onOpenMortgageModal: (price?: number) => void
  isCompared?: boolean
  onToggleCompare?: (planId: string) => void
}

export default function FloorPlanCard({
  floorPlan,
  onOpenSchematic,
  onOpenTourDrawer,
  isCompared = false,
  onToggleCompare,
}: FloorPlanCardProps) {
  const [activeElevationId, setActiveElevationId] = useState<'A' | 'B' | 'C'>('A')

  const currentElevation =
    floorPlan.elevations.find((e) => e.id === activeElevationId) || floorPlan.elevations[0]

  // Approximate monthly payment (30yr fixed @ 5.5%, 20% down, approx taxes + insurance)
  const principal = floorPlan.basePrice * 0.8
  const monthlyRate = 0.055 / 12
  const numPayments = 360
  const monthlyPI =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  const monthlyTaxes = (floorPlan.basePrice * 0.021) / 12
  const estimatedMonthly = Math.round(monthlyPI + monthlyTaxes + 135)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300">
      {/* Top Media & Elevation Selector */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentElevation.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-full"
          >
            <Image
              src={currentElevation.imageUrl}
              alt={`${floorPlan.name} - ${currentElevation.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Collection Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 text-xs text-slate-300 backdrop-blur-md">
            {floorPlan.series}
          </span>
        </div>

        {/* Pin to Compare Button */}
        {onToggleCompare && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleCompare(floorPlan.id)
            }}
            className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs backdrop-blur-md border transition-all ${
              isCompared
                ? 'bg-amber-500 text-slate-950 font-semibold border-amber-400'
                : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
            title={isCompared ? 'Remove from compare' : 'Compare plan'}
          >
            <Layers className="h-3 w-3" />
            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
          </button>
        )}

        {/* Clean Elevation Selector Bar */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between rounded-xl bg-slate-950/85 px-2.5 py-1 backdrop-blur-md border border-slate-800/80 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-400 mr-1">Elevation:</span>
            {floorPlan.elevations.map((elevation) => {
              const isActive = activeElevationId === elevation.id
              return (
                <button
                  key={elevation.id}
                  onClick={() => setActiveElevationId(elevation.id)}
                  className={`rounded-md px-2 py-0.5 text-xs transition ${
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
          <span className="text-slate-300 text-xs truncate max-w-[150px]">
            {currentElevation.styleName}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-5 justify-between space-y-4">
        <div>
          {/* Title & Price */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
              {floorPlan.name}
            </h3>
            <div className="text-right">
              <span className="text-lg font-bold text-white font-mono">
                ${floorPlan.basePrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Simple Specs Line */}
          <p className="mt-1 text-xs text-slate-300">
            {floorPlan.bedrooms} Beds • {floorPlan.bathrooms}
            {floorPlan.halfBaths ? `.${floorPlan.halfBaths}` : ''} Baths • {floorPlan.sqft.toLocaleString()} Sq Ft • {floorPlan.stories} Story
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Est. ~${estimatedMonthly.toLocaleString()}/mo
          </p>
        </div>

        {/* Clean Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => onOpenSchematic(floorPlan)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/70 hover:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white transition"
          >
            <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
            <span>View Plan</span>
          </button>

          <button
            onClick={() =>
              onOpenTourDrawer({
                floorPlanId: floorPlan.id,
                communityId: floorPlan.availableInCommunities[0],
              })
            }
            className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Tour</span>
          </button>
        </div>
      </div>
    </div>
  )
}
