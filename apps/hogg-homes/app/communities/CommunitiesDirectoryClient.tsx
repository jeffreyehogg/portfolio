'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, ArrowRight, ShieldCheck, Waves, Trophy, TreePine, Sparkles } from 'lucide-react'
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Sunbelt Growth Corridors
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
            Master-Planned Communities
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Curated enclaves paired with resort-style amenities, exemplary school districts, and convenient access to premier employment centers.
          </p>
        </div>

        {/* Metro Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSelectedMetro('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition ${
              selectedMetro === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Metros
          </button>
          {METROS.map((metro) => (
            <button
              key={metro.id}
              onClick={() => setSelectedMetro(metro.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition ${
                selectedMetro === metro.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
            className="group rounded-3xl border border-slate-800 bg-slate-900/70 overflow-hidden hover:border-amber-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src={community.heroImage}
                  alt={community.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-slate-950/85 border border-slate-750 px-2.5 py-0.5 text-[11px] font-mono text-amber-300">
                    {community.city}, {community.state}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
                    {community.moveInReadyCount} Move-In Ready
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {community.name}
                  </h3>
                  <span className="text-sm font-mono font-extrabold text-amber-400">
                    {community.priceRange}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                  {community.description}
                </p>

                {/* Specs */}
                <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-2.5 text-[11px] font-mono text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Schools:</span>
                    <span className="text-slate-200">{community.schoolDistrict.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Rate:</span>
                    <span className="text-emerald-400">{community.taxRate}</span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {community.amenities.slice(0, 3).map((a, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-slate-800/80 border border-slate-750 px-2 py-0.5 text-[10px] text-slate-300"
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
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-amber-500/40 transition"
              >
                <span>View Enclave</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                onClick={() => openTourDrawer({ communityId: community.id })}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
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
