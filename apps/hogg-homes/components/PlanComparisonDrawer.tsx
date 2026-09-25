'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Layers,
  Bed,
  Bath,
  Car,
  Calendar,
  Trash2,
  Maximize2,
} from 'lucide-react'
import { FloorPlan } from '../lib/types'

interface PlanComparisonDrawerProps {
  isOpen: boolean
  onClose: () => void
  comparedPlans: FloorPlan[]
  onRemovePlan: (planId: string) => void
  onClearAll: () => void
  onOpenTourDrawer: (preselected: { floorPlanId: string }) => void
  onOpenSchematic: (plan: FloorPlan) => void
}

export default function PlanComparisonDrawer({
  isOpen,
  onClose,
  comparedPlans,
  onRemovePlan,
  onClearAll,
  onOpenTourDrawer,
  onOpenSchematic,
}: PlanComparisonDrawerProps) {
  // Elevation selection state per plan
  const [elevationMap, setElevationMap] = useState<{ [planId: string]: 'A' | 'B' | 'C' }>({})

  if (!isOpen) return null

  // Calculate monthly payments: 5.5% 30yr fixed, 20% down
  const getMonthlyPayment = (basePrice: number) => {
    const principal = basePrice * 0.8
    const monthlyRate = 0.055 / 12
    const numPayments = 360
    const monthlyPI =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    const monthlyTaxes = (basePrice * 0.021) / 12
    const monthlyInsurance = 135
    return Math.round(monthlyPI + monthlyTaxes + monthlyInsurance)
  }

  // Base price minimum to calculate monthly deltas
  const minMonthly =
    comparedPlans.length > 0
      ? Math.min(...comparedPlans.map((p) => getMonthlyPayment(p.basePrice)))
      : 0

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl z-10 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-2 text-amber-400">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Floor Plan Comparison
                  </h3>
                  <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-xs font-mono font-medium text-amber-300">
                    {comparedPlans.length} of 3 Plans Selected
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Side-by-side architectural specifications, room geometries, and monthly investment deltas.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {comparedPlans.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white transition"
                >
                  <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                  <span>Clear All</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {comparedPlans.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
                <Layers className="h-8 w-8" />
              </div>
              <h4 className="mt-4 text-lg font-bold text-white">No Floor Plans Pinned Yet</h4>
              <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                Click "Compare" on any floor plan card in the explorer to view detailed side-by-side spec comparisons.
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Explore Floor Plans
              </button>
            </div>
          ) : (
            <div className="mt-6">
              {/* Desktop Comparison Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-${comparedPlans.length} gap-4 sm:gap-6`}>
                {comparedPlans.map((plan) => {
                  const selectedElevationId = elevationMap[plan.id] || 'A'
                  const currentElevation =
                    plan.elevations.find((e) => e.id === selectedElevationId) || plan.elevations[0]
                  const monthly = getMonthlyPayment(plan.basePrice)
                  const monthlyDelta = monthly - minMonthly
                  const pricePerSqFt = Math.round(plan.basePrice / plan.sqft)

                  return (
                    <div
                      key={plan.id}
                      className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 relative"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemovePlan(plan.id)}
                        className="absolute top-6 right-6 z-20 rounded-full bg-slate-900/80 p-1.5 text-slate-400 hover:text-white hover:bg-rose-500/20 transition"
                        title="Remove from comparison"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div>
                        {/* Elevation Media Box */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                          <Image
                            src={currentElevation.imageUrl}
                            alt={`${plan.name} - ${currentElevation.name}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                          {/* Quick Elevation Switcher */}
                          <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between rounded-lg bg-slate-950/90 p-1 backdrop-blur-md border border-slate-800 text-[11px] font-mono">
                            <div className="flex gap-1">
                              {plan.elevations.map((elevation) => (
                                <button
                                  key={elevation.id}
                                  onClick={() =>
                                    setElevationMap((prev) => ({
                                      ...prev,
                                      [plan.id]: elevation.id,
                                    }))
                                  }
                                  className={`px-2 py-0.5 rounded transition ${
                                    selectedElevationId === elevation.id
                                      ? 'bg-amber-500 text-slate-950 font-bold'
                                      : 'text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {elevation.name}
                                </button>
                              ))}
                            </div>
                            <span className="text-amber-400 truncate max-w-[120px]">
                              {currentElevation.styleName}
                            </span>
                          </div>
                        </div>

                        {/* Title & Series */}
                        <div className="mt-4">
                          <span className="text-[10px] font-mono uppercase text-amber-400 block">
                            {plan.series}
                          </span>
                          <h4 className="text-xl font-bold text-white">{plan.name}</h4>
                        </div>

                        {/* Pricing & Delta */}
                        <div className="mt-3 rounded-xl bg-slate-900/90 border border-slate-800 p-3 space-y-1.5 font-mono text-xs">
                          <div className="flex justify-between items-baseline">
                            <span className="text-slate-400">Base Price:</span>
                            <span className="text-lg font-extrabold text-white">
                              ${plan.basePrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-slate-400">Price / Sq Ft:</span>
                            <span className="text-slate-200">${pricePerSqFt}/sqft</span>
                          </div>
                          <div className="flex justify-between items-baseline pt-1 border-t border-slate-800">
                            <span className="text-slate-400">Est. Monthly:</span>
                            <span className="text-emerald-400 font-bold">
                              ${monthly.toLocaleString()}/mo
                            </span>
                          </div>
                          {monthlyDelta > 0 && (
                            <div className="flex justify-between items-baseline text-[11px] text-amber-400">
                              <span>Monthly Delta:</span>
                              <span>+${monthlyDelta.toLocaleString()}/mo</span>
                            </div>
                          )}
                          {monthlyDelta === 0 && comparedPlans.length > 1 && (
                            <div className="text-[10px] text-emerald-400 text-right">
                              ★ Lowest Monthly Option
                            </div>
                          )}
                        </div>

                        {/* Specification Matrix */}
                        <div className="mt-4 space-y-2 text-xs font-mono border-y border-slate-800 py-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400 flex items-center gap-1.5">
                              <Layers className="h-3.5 w-3.5 text-amber-400" />
                              Total Area:
                            </span>
                            <span className="text-white font-bold">{plan.sqft.toLocaleString()} Sq Ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 flex items-center gap-1.5">
                              <Bed className="h-3.5 w-3.5 text-amber-400" />
                              Bedrooms:
                            </span>
                            <span className="text-white font-bold">{plan.bedrooms} Beds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 flex items-center gap-1.5">
                              <Bath className="h-3.5 w-3.5 text-amber-400" />
                              Bathrooms:
                            </span>
                            <span className="text-white font-bold">
                              {plan.bathrooms}{plan.halfBaths ? `.${plan.halfBaths}` : ''} Baths
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Stories:</span>
                            <span className="text-white font-bold">
                              {plan.stories === 1 ? 'Single Story' : 'Two Story'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 flex items-center gap-1.5">
                              <Car className="h-3.5 w-3.5 text-amber-400" />
                              Garage Capacity:
                            </span>
                            <span className="text-white font-bold">{plan.garageBays}-Car</span>
                          </div>
                        </div>

                        {/* Key Room Dimensions */}
                        <div className="mt-4 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                            Key Room Geometries:
                          </span>
                          {plan.rooms.slice(0, 4).map((r, i) => (
                            <div key={i} className="flex justify-between text-xs">
                              <span className="text-slate-300 truncate max-w-[140px]">{r.room}</span>
                              <span className="font-mono text-amber-300 font-semibold">{r.dimensions}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                        <button
                          onClick={() => onOpenSchematic(plan)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
                        >
                          <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                          <span>View CAD Schematic</span>
                        </button>

                        <button
                          onClick={() => {
                            onClose()
                            onOpenTourDrawer({ floorPlanId: plan.id })
                          }}
                          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Tour {plan.name}</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
