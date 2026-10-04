'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { QUICK_MOVE_IN_LOTS, COMMUNITIES } from '../lib/data'
import { ConstructionStage } from '../lib/types'

interface QuickMoveInShowcaseProps {
  onOpenTourDrawer: (preselected: { lotId: string; communityId: string; floorPlanId: string }) => void
}

export default function QuickMoveInShowcase({ onOpenTourDrawer }: QuickMoveInShowcaseProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ready' | 'construction'>('all')

  const filteredLots = QUICK_MOVE_IN_LOTS.filter((lot) => {
    if (selectedFilter === 'ready') {
      return lot.constructionStage === 'Move-In Ready Today'
    }
    if (selectedFilter === 'construction') {
      return lot.constructionStage !== 'Move-In Ready Today'
    }
    return true
  })

  return (
    <section id="quick-move-ins" className="relative py-16 border-t border-slate-800/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-medium text-amber-400">Move-In Ready</span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
              Homes Ready for You
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Skip the build timeline. Tour homes available for immediate move-in or completing soon.
            </p>
          </div>

          {/* Simple Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            {[
              { label: 'All Homes', value: 'all' as const },
              { label: 'Ready Now', value: 'ready' as const },
              { label: 'Under Construction', value: 'construction' as const },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedFilter === tab.value
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Homes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLots.map((lot) => {
            const isReady = lot.constructionStage === 'Move-In Ready Today'
            const community = COMMUNITIES.find((c) => c.id === lot.communityId)

            return (
              <div
                key={lot.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300"
              >
                {/* Photo & Status */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <Image
                    src={lot.heroImage}
                    alt={`${lot.streetAddress} - ${lot.floorPlanName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Clean Status Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-md ${
                        isReady
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {isReady ? 'Ready Now' : lot.constructionStage}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-5 justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {lot.streetAddress}
                      </h3>
                      <span className="text-lg font-bold text-white font-mono">
                        ${lot.currentPrice.toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {lot.communityName}{community ? ` • ${community.city}, ${community.state}` : ''}
                    </p>

                    <p className="mt-2 text-xs text-slate-300">
                      {lot.bedrooms} Beds • {lot.bathrooms} Baths • {lot.sqft.toLocaleString()} Sq Ft
                    </p>
                  </div>

                  {/* Clean Action Button */}
                  <button
                    onClick={() =>
                      onOpenTourDrawer({
                        lotId: lot.id,
                        communityId: lot.communityId,
                        floorPlanId: lot.floorPlanId,
                      })
                    }
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 transition"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Schedule Tour</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
