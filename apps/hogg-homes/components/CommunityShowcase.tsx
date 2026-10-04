'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { COMMUNITIES } from '../lib/data'

interface CommunityShowcaseProps {
  onSelectCommunityPlans: (communityId: string) => void
  onOpenTourDrawer: (preselected: { communityId: string }) => void
}

export default function CommunityShowcase({
  onSelectCommunityPlans,
  onOpenTourDrawer,
}: CommunityShowcaseProps) {
  return (
    <section id="communities" className="relative py-16 border-t border-slate-800/80 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-medium text-amber-400">Communities</span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
            Featured Neighborhoods
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Thoughtfully planned communities featuring scenic acreage, resort amenities, and top school districts.
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMUNITIES.slice(0, 3).map((community) => (
            <div
              key={community.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300"
            >
              <div>
                {/* Media */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <Image
                    src={community.heroImage}
                    alt={community.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="rounded-full bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 text-xs text-amber-300 backdrop-blur-md">
                      {community.city}, {community.state}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                    <span className="text-base font-bold text-white font-mono">
                      {community.priceRange}
                    </span>
                    <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-xs">
                      {community.moveInReadyCount} Ready Now
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {community.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {community.description}
                  </p>

                  {/* Amenities highlights */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {community.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-slate-850 border border-slate-750 px-2.5 py-1 text-[11px] text-slate-300"
                      >
                        {amenity.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={`/communities/${community.slug}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-750 bg-slate-850 hover:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white transition"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <button
                  onClick={() => onOpenTourDrawer({ communityId: community.id })}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Tour</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Communities Link */}
        <div className="mt-10 text-center">
          <Link
            href="/communities"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition"
          >
            <span>View All Communities</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
