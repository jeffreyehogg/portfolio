'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { METROS, COMMUNITIES } from '../lib/data'

interface RegionalMapSectionProps {
  onSelectCommunity: (communityId: string) => void
  onOpenTourDrawer: (preselected: { communityId: string }) => void
}

export default function RegionalMapSection({
  onSelectCommunity,
}: RegionalMapSectionProps) {
  return (
    <section id="regional-map" className="relative py-16 border-t border-slate-800/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-medium text-amber-400">Locations</span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
            Where We Build
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Explore our master-planned communities in premier growth corridors across Texas and Arizona.
          </p>
        </div>

        {/* 4 Regional Metro Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METROS.map((metro) => {
            const metroCommunities = COMMUNITIES.filter((c) => c.metroId === metro.id)

            return (
              <div
                key={metro.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300"
              >
                <div>
                  {/* Photo */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950">
                    <Image
                      src={metro.heroImage}
                      alt={metro.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 text-xs font-medium text-amber-300 backdrop-blur-md">
                        {metro.state}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                      <span className="text-xs text-slate-300">
                        {metroCommunities.length} {metroCommunities.length === 1 ? 'Community' : 'Communities'}
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        From ${(metro.startingPrice / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {metro.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {metro.description}
                    </p>

                    {/* Communities list */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] text-slate-400 block">Neighborhoods:</span>
                      {metroCommunities.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => onSelectCommunity(c.id)}
                          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 transition-colors text-left w-full truncate"
                        >
                          <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
                          <span className="truncate">{c.name} ({c.city})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/communities?metro=${metro.id}`}
                    className="flex items-center justify-between w-full rounded-xl border border-slate-750 bg-slate-850 hover:bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition"
                  >
                    <span>View {metro.name.replace(' Metro', '')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
