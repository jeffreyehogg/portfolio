'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Bed, Bath, Car, Maximize2, Layers, Download, Calendar, ChevronRight, Calculator } from 'lucide-react'
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
  onOpenBrochure,
  onOpenTourDrawer,
  onOpenMortgageModal,
  isCompared = false,
  onToggleCompare,
}: FloorPlanCardProps) {
  const [activeElevationId, setActiveElevationId] = useState<'A' | 'B' | 'C'>('A')

  const currentElevation =
    floorPlan.elevations.find((e) => e.id === activeElevationId) || floorPlan.elevations[0]

  // Calculate estimated monthly payment: 30yr fixed @ 5.5%, 20% down, approx taxes 2.1% + insurance
  const principal = floorPlan.basePrice * 0.8
  const monthlyRate = 0.055 / 12
  const numPayments = 360
  const monthlyPI =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  const monthlyTaxes = (floorPlan.basePrice * 0.021) / 12
  const monthlyInsurance = 135
  const estimatedMonthly = Math.round(monthlyPI + monthlyTaxes + monthlyInsurance)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 shadow-lg shadow-slate-950/50 backdrop-blur-sm transition-all duration-500 ease-out hover:border-brand-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 hover:scale-[1.01] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-brand-500/10 before:via-amber-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:pointer-events-none before:transition-opacity before:duration-500">
      {/* Top Media & Elevation Switcher */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentElevation.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative h-full w-full"
          >
            <Image
              src={currentElevation.imageUrl}
              alt={`${floorPlan.name} - ${currentElevation.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Series Badge & Popular Tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="rounded-full bg-slate-950/80 border border-slate-700/80 px-2.5 py-1 text-[11px] font-mono text-amber-300 backdrop-blur-md">
            {floorPlan.series}
          </span>
          {floorPlan.popularTag && (
            <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-[11px] font-mono font-medium text-amber-200 backdrop-blur-md">
              {floorPlan.popularTag}
            </span>
          )}
        </div>

        {/* Pin to Compare Button */}
        {onToggleCompare && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleCompare(floorPlan.id)
            }}
            className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono backdrop-blur-md border transition-all ${
              isCompared
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg'
                : 'bg-slate-950/85 text-slate-300 border-slate-700/80 hover:text-white hover:border-amber-500/50'
            }`}
            title={isCompared ? 'Remove from comparison' : 'Pin to compare side-by-side'}
          >
            <Layers className="h-3 w-3" />
            <span>{isCompared ? 'Pinned' : 'Compare'}</span>
          </button>
        )}

        {/* Quick Elevation Toggle Pill */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between rounded-xl bg-slate-950/85 p-1.5 backdrop-blur-lg border border-slate-800/80">
          <div className="flex items-center gap-1">
            {floorPlan.elevations.map((elevation) => {
              const isActive = activeElevationId === elevation.id
              return (
                <button
                  key={elevation.id}
                  onClick={() => setActiveElevationId(elevation.id)}
                  className={`relative rounded-lg px-2.5 py-1 text-xs font-mono font-semibold transition ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {elevation.name}
                </button>
              )
            })}
          </div>

          <span className="text-xs font-display italic text-brand-100 tracking-wide truncate max-w-[170px] sm:max-w-[200px]">
            {currentElevation.styleName}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title & Base Price */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 font-display transition">
              {floorPlan.name}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
              {currentElevation.description}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono uppercase text-slate-400">Base Price</span>
            <div className="text-xl font-extrabold font-mono text-white">
              ${floorPlan.basePrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Monthly Estimate pill */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-800/50 border border-slate-700/50 px-3 py-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Calculator className="h-3.5 w-3.5 text-amber-400" />
            <span>Est. Monthly:</span>
            <span className="font-mono font-bold text-amber-300">
              ${estimatedMonthly.toLocaleString()}/mo
            </span>
          </div>
          <button
            onClick={() => onOpenMortgageModal(floorPlan.basePrice)}
            className="text-[11px] font-mono text-slate-400 underline decoration-slate-600 hover:text-amber-300 transition"
          >
            Customize
          </button>
        </div>

        {/* Key Specification Matrix */}
        <div className="mt-5 grid grid-cols-4 gap-2 border-y border-slate-800/80 py-3 text-center">
          <div>
            <div className="flex items-center justify-center text-slate-400 mb-0.5">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono font-bold text-white">
              {floorPlan.sqft.toLocaleString()}
            </span>
            <span className="block text-[10px] font-mono uppercase text-slate-400">Sq Ft</span>
          </div>

          <div>
            <div className="flex items-center justify-center text-slate-400 mb-0.5">
              <Bed className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono font-bold text-white">
              {floorPlan.bedrooms} Beds
            </span>
            <span className="block text-[10px] font-mono uppercase text-slate-400">
              {floorPlan.stories === 1 ? '1 Story' : '2 Stories'}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-center text-slate-400 mb-0.5">
              <Bath className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono font-bold text-white">
              {floorPlan.bathrooms}
              {floorPlan.halfBaths ? `.${floorPlan.halfBaths}` : ''} Baths
            </span>
            <span className="block text-[10px] font-mono uppercase text-slate-400">Baths</span>
          </div>

          <div>
            <div className="flex items-center justify-center text-slate-400 mb-0.5">
              <Car className="h-4 w-4" />
            </div>
            <span className="text-xs font-mono font-bold text-white">
              {floorPlan.garageBays}-Car
            </span>
            <span className="block text-[10px] font-mono uppercase text-slate-400">Garage</span>
          </div>
        </div>

        {/* Highlight features */}
        <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
          {floorPlan.features.slice(0, 2).map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenSchematic(floorPlan)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-200 hover:border-amber-500/40 hover:text-amber-300 hover:bg-slate-800 transition"
          >
            <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
            <span>Interactive Plan</span>
          </button>

          <button
            onClick={() => onOpenBrochure(floorPlan)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-200 hover:border-amber-500/40 hover:text-amber-300 hover:bg-slate-800 transition"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Brochure</span>
          </button>
        </div>

        {/* Primary CTA */}
        <button
          onClick={() =>
            onOpenTourDrawer({
              floorPlanId: floorPlan.id,
              communityId: floorPlan.availableInCommunities[0],
            })
          }
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500/90 to-amber-600 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Tour {floorPlan.name}</span>
          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}
