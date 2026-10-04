'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { COMMUNITIES, METROS } from '../../lib/data'
import { usePlatformModals } from '../../components/PlatformModalContext'

export default function CommunitiesDirectoryClient() {
  const [selectedMetro, setSelectedMetro] = useState<string>('all')
  const { openTourDrawer } = usePlatformModals()

  const filteredCommunities = COMMUNITIES.filter((c) => {
    if (selectedMetro === 'all') return true
    return c.metroId === selectedMetro
  })

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-medium text-amber-400">Neighborhoods</span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
            Our Communities
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-xl">
            Explore thoughtfully designed master-planned neighborhoods across Texas and Arizona.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedMetro('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              selectedMetro === 'all'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            All Regions
          </button>
          {METROS.map((metro) => (
            <button
              key={metro.id}
              onClick={() => setSelectedMetro(metro.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                selectedMetro === metro.id
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {metro.name.replace(' Metro', '').replace(' East Valley', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="group rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src={community.heroImage}
                  alt={community.name}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 text-xs text-amber-300 backdrop-blur-md">
                    {community.city}, {community.state}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs text-emerald-300">
                    {community.moveInReadyCount} Ready Now
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {community.name}
                  </h3>
                  <span className="text-sm font-bold text-white font-mono">
                    {community.priceRange}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {community.description}
                </p>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {community.amenities.slice(0, 3).map((a, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-slate-850 border border-slate-750 px-2 py-0.5 text-[11px] text-slate-300"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="p-6 pt-0 grid grid-cols-2 gap-2">
              <Link
                href={`/communities/${community.slug}`}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-750 bg-slate-850 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white transition"
              >
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                onClick={() => openTourDrawer({ communityId: community.id })}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Tour</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
