'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  MapPin,
  Calendar,
  ChevronRight,
  TrendingDown,
  Hammer,
} from 'lucide-react'
import { QUICK_MOVE_IN_LOTS } from '../lib/data'
import { ConstructionStage } from '../lib/types'

interface QuickMoveInShowcaseProps {
  onOpenTourDrawer: (preselected: { lotId: string; communityId: string; floorPlanId: string }) => void
}

export default function QuickMoveInShowcase({ onOpenTourDrawer }: QuickMoveInShowcaseProps) {
  const [selectedStage, setSelectedStage] = useState<'all' | ConstructionStage>('all')
  const [activePhotoLotId, setActivePhotoLotId] = useState<{ [lotId: string]: number }>({})

  const filteredLots = QUICK_MOVE_IN_LOTS.filter((lot) => {
    if (selectedStage !== 'all' && lot.constructionStage !== selectedStage) return false
    return true
  })

  const getStageBadgeColor = (stage: ConstructionStage) => {
    switch (stage) {
      case 'Move-In Ready Today':
        return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
      case 'Drywall':
        return 'bg-amber-500/15 border-amber-500/40 text-amber-300'
      case 'Framing':
        return 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
      default:
        return 'bg-slate-800 text-slate-300'
    }
  }

  return (
    <section id="quick-move-ins" className="relative py-20 bg-gradient-to-b from-brand-50/[0.025] via-slate-950/90 to-brand-50/[0.015] border-t border-brand-500/15 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>EXPEDITED CLOSING HOMES</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Quick Move-In Homes
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Skip the build timeline. Explore specific designer homes currently under construction
              or available for immediate 14-day delivery with exclusive builder rate locks.
            </p>
          </div>

          {/* Construction Stage Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {(
              [
                { label: 'All Inventory', value: 'all' },
                { label: 'Move-In Ready Today', value: 'Move-In Ready Today' },
                { label: 'Drywall (30-60 Days)', value: 'Drywall' },
                { label: 'Framing (90 Days)', value: 'Framing' },
              ] as const
            ).map((stage) => (
              <button
                key={stage.value}
                onClick={() => setSelectedStage(stage.value)}
                className={`rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition ${
                  selectedStage === stage.value
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lots Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredLots.map((lot) => {
            const currentImgIndex = activePhotoLotId[lot.id] || 0
            const images = [lot.heroImage, ...(lot.interiorImages || [])]
            const activeImage = images[currentImgIndex] || lot.heroImage

            return (
              <div
                key={lot.id}
                className="group relative flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md hover:border-brand-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1 hover:scale-[1.005] transition-all duration-300 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-t before:from-brand-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:pointer-events-none before:transition-opacity before:duration-500"
              >
                {/* Image Section */}
                <div className="relative sm:w-5/12 aspect-[4/3] sm:aspect-auto overflow-hidden bg-slate-950">
                  <Image
                    src={activeImage}
                    alt={`${lot.streetAddress} - ${lot.floorPlanName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent sm:hidden" />

                  {/* Stage Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-semibold backdrop-blur-md ${getStageBadgeColor(
                        lot.constructionStage
                      )}`}
                    >
                      <Hammer className="h-3 w-3" />
                      {lot.constructionStage}
                    </span>
                  </div>

                  {/* Gallery Dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setActivePhotoLotId((prev) => ({
                              ...prev,
                              [lot.id]: idx,
                            }))
                          }
                          className={`h-1.5 rounded-full transition-all ${
                            currentImgIndex === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-slate-400/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                  <div>
                    {/* Community & Address */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-amber-400 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {lot.communityName}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{lot.lotNumber}</span>
                    </div>

                    <h3 className="mt-1 text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 font-display transition">
                      {lot.streetAddress}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Plan: {lot.floorPlanName} (Elevation {lot.elevation})
                    </p>

                    {/* Price Breakdown */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold font-mono text-white">
                        ${lot.currentPrice.toLocaleString()}
                      </span>
                      {lot.savingsAmount > 0 && (
                        <>
                          <span className="text-sm font-mono text-slate-500 line-through">
                            ${lot.originalPrice.toLocaleString()}
                          </span>
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-mono font-medium text-emerald-400">
                            <TrendingDown className="h-3 w-3" />
                            Save ${lot.savingsAmount.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Rate Incentive Banner */}
                    <div className="mt-3 rounded-xl bg-amber-500/10 border border-amber-500/25 p-2.5 text-xs text-amber-200">
                      <span className="font-semibold block">{lot.incentive}</span>
                    </div>

                    {/* Specs Pills */}
                    <div className="mt-4 flex items-center gap-3 text-xs font-mono text-slate-300 border-y border-slate-800/80 py-2.5">
                      <span>{lot.sqft.toLocaleString()} Sq Ft</span>
                      <span>•</span>
                      <span>{lot.bedrooms} Beds</span>
                      <span>•</span>
                      <span>{lot.bathrooms} Baths</span>
                      <span>•</span>
                      <span>{lot.garageBays}-Car</span>
                    </div>

                    {/* Construction Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Construction Progress</span>
                        <span className="text-white font-bold">
                          {lot.constructionProgressPercent}% ({lot.estimatedCompletion})
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${lot.constructionProgressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() =>
                        onOpenTourDrawer({
                          lotId: lot.id,
                          communityId: lot.communityId,
                          floorPlanId: lot.floorPlanId,
                        })
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Tour This Home ({lot.lotNumber})</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
