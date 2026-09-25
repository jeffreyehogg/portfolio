'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Layers,
  Bed,
  Bath,
  Car,
  Calendar,
  Trash2,
  Maximize2,
  Plus,
  ArrowRight,
} from 'lucide-react'
import { FLOOR_PLANS } from '../../lib/data'
import { FloorPlan } from '../../lib/types'
import { usePlatformModals } from '../../components/PlatformModalContext'

export default function CompareClientView() {
  const {
    comparedPlanIds,
    toggleComparePlan,
    openTourDrawer,
    openSchematic,
  } = usePlatformModals()

  const [elevationMap, setElevationMap] = useState<{ [planId: string]: 'A' | 'B' | 'C' }>({})

  // Default to first 2 plans if nothing pinned yet
  const activePlanIds = comparedPlanIds.length > 0 ? comparedPlanIds : ['the-brazos', 'the-san-jacinto']
  const comparedPlans = FLOOR_PLANS.filter((p) => activePlanIds.includes(p.id))

  const getMonthlyPayment = (basePrice: number) => {
    const principal = basePrice * 0.8
    const monthlyRate = 0.0499 / 12
    const numPayments = 360
    const monthlyPI =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    const monthlyTaxes = (basePrice * 0.0214) / 12
    const monthlyInsurance = 135
    return Math.round(monthlyPI + monthlyTaxes + monthlyInsurance)
  }

  const minMonthly =
    comparedPlans.length > 0
      ? Math.min(...comparedPlans.map((p) => getMonthlyPayment(p.basePrice)))
      : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Comparative Architecture
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            Floor Plan Side-by-Side Comparison
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Evaluate architectural specs, elevation aesthetics, spatial geometries, and estimated monthly payments side-by-side.
          </p>
        </div>

        {/* Quick Add Plan Dropdown */}
        {comparedPlans.length < 3 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Add plan to compare:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  toggleComparePlan(e.target.value)
                  e.target.value = ''
                }
              }}
              defaultValue=""
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
            >
              <option value="" disabled>
                Select floor plan...
              </option>
              {FLOOR_PLANS.filter((p) => !activePlanIds.includes(p.id)).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sqft.toLocaleString()} Sq Ft)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Side-by-Side Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparedPlans.map((plan) => {
          const selectedElevId = elevationMap[plan.id] || 'A'
          const currentElev =
            plan.elevations.find((e) => e.id === selectedElevId) || plan.elevations[0]
          const monthlyEst = getMonthlyPayment(plan.basePrice)
          const delta = monthlyEst - minMonthly

          return (
            <div
              key={plan.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6"
            >
              {/* Top Image & Elevation Switcher */}
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                  <Image
                    src={currentElev.imageUrl}
                    alt={`${plan.name} - ${currentElev.name}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="rounded-full bg-slate-950/85 border border-slate-750 px-2.5 py-0.5 text-[10px] font-mono text-amber-300">
                      {plan.series}
                    </span>
                  </div>
                  {comparedPlans.length > 1 && (
                    <button
                      onClick={() => toggleComparePlan(plan.id)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition"
                      title="Remove from comparison"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Elevation Tabs */}
                <div className="flex items-center justify-between rounded-xl bg-slate-950/80 p-1 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-1">
                    {plan.elevations.map((el) => (
                      <button
                        key={el.id}
                        onClick={() =>
                          setElevationMap((prev) => ({ ...prev, [plan.id]: el.id }))
                        }
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                          selectedElevId === el.id
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {el.name}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-amber-400 truncate pr-2">
                    {currentElev.styleName}
                  </span>
                </div>

                {/* Plan Header */}
                <div>
                  <Link
                    href={`/floor-plans/${plan.slug}`}
                    className="text-2xl font-extrabold text-white hover:text-amber-300 transition"
                  >
                    {plan.name}
                  </Link>

                  <div className="mt-3 flex items-baseline justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Base Price
                      </span>
                      <span className="text-2xl font-extrabold font-mono text-white">
                        ${plan.basePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Est. Monthly
                      </span>
                      <span className="text-base font-bold font-mono text-emerald-400">
                        ~${monthlyEst.toLocaleString()}/mo
                      </span>
                      {delta > 0 && (
                        <span className="text-[10px] font-mono text-amber-400 block">
                          (+${delta}/mo delta)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Specs Matrix */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono py-2 border-b border-slate-800">
                  <div>
                    <span className="text-white font-bold block">{plan.sqft.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400">Sq Ft</span>
                  </div>
                  <div>
                    <span className="text-white font-bold block">{plan.bedrooms} Beds</span>
                    <span className="text-[10px] text-slate-400">Beds</span>
                  </div>
                  <div>
                    <span className="text-white font-bold block">{plan.bathrooms}.{plan.halfBaths}</span>
                    <span className="text-[10px] text-slate-400">Baths</span>
                  </div>
                  <div>
                    <span className="text-white font-bold block">{plan.garageBays}-Car</span>
                    <span className="text-[10px] text-slate-400">Garage</span>
                  </div>
                </div>

                {/* Room Geometries */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    Key Room Dimensions:
                  </span>
                  <div className="space-y-1.5 text-xs font-mono">
                    {plan.rooms.slice(0, 4).map((r, i) => (
                      <div
                        key={i}
                        className="flex justify-between rounded-lg bg-slate-950/60 border border-slate-800/80 px-2.5 py-1.5"
                      >
                        <span className="text-slate-300">{r.room}</span>
                        <span className="text-amber-400 font-bold">{r.dimensions}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                <button
                  onClick={() => openTourDrawer({ floorPlanId: plan.id })}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Tour {plan.name}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openSchematic(plan)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>CAD Vector</span>
                  </button>

                  <Link
                    href={`/floor-plans/${plan.slug}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
                  >
                    <span>Full Specs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
