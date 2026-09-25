'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bed,
  Bath,
  Car,
  Layers,
  Calendar,
  Calculator,
  FileText,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { FloorPlan, Community, QuickMoveInLot } from '../../../lib/types'
import { usePlatformModals } from '../../../components/PlatformModalContext'

interface FloorPlanDetailViewProps {
  plan: FloorPlan
  communitiesBuilding: Community[]
  readyLots: QuickMoveInLot[]
}

export default function FloorPlanDetailView({
  plan,
  communitiesBuilding,
  readyLots,
}: FloorPlanDetailViewProps) {
  const [selectedElevationId, setSelectedElevationId] = useState<'A' | 'B' | 'C'>('A')

  const {
    openTourDrawer,
    openMortgageModal,
    openSchematic,
    openBrochure,
    toggleComparePlan,
    isPlanCompared,
  } = usePlatformModals()

  const activeElevation =
    plan.elevations.find((e) => e.id === selectedElevationId) || plan.elevations[0]

  const isCompared = isPlanCompared(plan.id)

  // Estimated monthly payment (30-year fixed, 4.99% promo rate, 20% down, Texas taxes)
  const principal = plan.basePrice * 0.8
  const monthlyRate = 0.0499 / 12
  const numPayments = 360
  const monthlyPI =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  const monthlyTaxes = (plan.basePrice * 0.0214) / 12
  const monthlyInsurance = 135
  const estTotalMonthly = Math.round(monthlyPI + monthlyTaxes + monthlyInsurance)

  return (
    <div className="space-y-12">
      {/* Top Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Elevation Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeElevation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative h-full w-full"
              >
                <Image
                  src={activeElevation.imageUrl}
                  alt={`${plan.name} - ${activeElevation.styleName}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="rounded-full bg-slate-950/85 border border-slate-750 px-3.5 py-1 text-xs font-mono text-amber-300 backdrop-blur-md">
                {plan.series}
              </span>
              {plan.popularTag && (
                <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-mono text-amber-300 backdrop-blur-md">
                  ★ {plan.popularTag}
                </span>
              )}
            </div>

            {/* Bottom Elevation Switcher Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-950/90 p-2 backdrop-blur-md border border-slate-800">
              <div className="flex items-center gap-1.5">
                {plan.elevations.map((elevation) => {
                  const isActive = selectedElevationId === elevation.id
                  return (
                    <button
                      key={elevation.id}
                      onClick={() => setSelectedElevationId(elevation.id)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-mono font-semibold transition ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-850'
                      }`}
                    >
                      {elevation.name}: {elevation.styleName}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Elevation Description Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
              Exterior Architectural Style: {activeElevation.styleName}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {activeElevation.description}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing, Specs & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Architectural Spec Sheet
                </span>
                <button
                  onClick={() => toggleComparePlan(plan.id)}
                  className={`rounded-full px-3 py-1 text-xs font-mono transition ${
                    isCompared
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-amber-500/50'
                  }`}
                >
                  {isCompared ? '✓ Pinned to Compare' : '+ Pin to Compare'}
                </button>
              </div>

              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                {plan.name}
              </h1>

              {/* Price Callout */}
              <div className="mt-4 flex items-baseline justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Starting Base Price
                  </span>
                  <span className="text-3xl font-extrabold font-mono text-white">
                    ${plan.basePrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Est. Payment (4.99% Rate)
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    ~${estTotalMonthly.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-4 gap-2 text-center py-2 border-b border-slate-800/80">
              <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <Layers className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-sm font-mono font-bold text-white">
                  {plan.sqft.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono uppercase text-slate-400">Sq Ft</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <Bed className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-sm font-mono font-bold text-white">
                  {plan.bedrooms} Beds
                </span>
                <span className="text-[10px] font-mono uppercase text-slate-400">Bedrooms</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <Bath className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-sm font-mono font-bold text-white">
                  {plan.bathrooms}.{plan.halfBaths}
                </span>
                <span className="text-[10px] font-mono uppercase text-slate-400">Baths</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <Car className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                <span className="block text-sm font-mono font-bold text-white">
                  {plan.garageBays}-Car
                </span>
                <span className="text-[10px] font-mono uppercase text-slate-400">Garage</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => openTourDrawer({ floorPlanId: plan.id })}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule VIP Model Tour</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openSchematic(plan)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
                >
                  <Layers className="h-3.5 w-3.5 text-amber-400" />
                  <span>CAD Schematic</span>
                </button>

                <button
                  onClick={() => openMortgageModal(plan.basePrice)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
                >
                  <Calculator className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Mortgage Calc</span>
                </button>
              </div>

              <button
                onClick={() => openBrochure(plan)}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs font-mono text-slate-400 hover:text-white transition"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Download Printable Virtual Brochure</span>
              </button>
            </div>

            {/* Key Standard Features */}
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Included High-Craft Standards:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Room Dimensions & Geometry Matrix */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Spatial Architecture
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-white">
              Room Dimensions & Features Matrix
            </h2>
          </div>
          <button
            onClick={() => openSchematic(plan)}
            className="flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300"
          >
            <span>Launch Interactive Blueprint</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plan.rooms.map((room, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-baseline justify-between border-b border-slate-850 pb-2">
                <span className="text-sm font-bold text-white">{room.room}</span>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  {room.dimensions}
                </span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400 font-light">
                {room.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-amber-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Communities Building This Floor Plan */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Locations & Neighborhoods
          </span>
          <h2 className="mt-1 text-2xl font-extrabold text-white">
            Communities Building {plan.name}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Available across master-planned enclaves with distinct neighborhood amenities and lot sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communitiesBuilding.map((comm) => (
            <Link
              key={comm.id}
              href={`/communities/${comm.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-4 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all flex flex-col sm:flex-row gap-4 items-center"
            >
              <div className="relative aspect-[16/10] w-full sm:w-44 shrink-0 rounded-xl overflow-hidden border border-slate-800">
                <Image
                  src={comm.heroImage}
                  alt={comm.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
                  <MapPin className="h-3 w-3" />
                  <span>{comm.city}, {comm.state}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {comm.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {comm.description}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-emerald-400">
                    {comm.moveInReadyCount} Move-In Ready
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                    <span>Explore Community</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Available Quick Move-In Lots of this Plan */}
      {readyLots.length > 0 && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Immediate Delivery
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-white">
                Move-In Ready Homes of {plan.name}
              </h2>
            </div>
            <Link
              href="/quick-move-ins"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All Inventory</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readyLots.map((lot) => (
              <div
                key={lot.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400">
                      {lot.constructionStage.toUpperCase()}
                    </span>
                    <h4 className="mt-2 text-base font-bold text-white">{lot.streetAddress}</h4>
                    <span className="text-xs font-mono text-slate-400">
                      Lot {lot.lotNumber} • Estimated Delivery: {lot.estimatedCompletion}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-white">
                      ${lot.currentPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                  <div className="text-[11px] font-mono text-amber-400">
                    4.99% Rate Lock Applied
                  </div>
                  <button
                    onClick={() => openTourDrawer({ floorPlanId: plan.id, lotId: lot.id })}
                    className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Schedule Tour</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
