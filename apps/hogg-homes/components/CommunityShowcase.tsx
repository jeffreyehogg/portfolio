'use client'

import Image from 'next/image'
import {
  GraduationCap,
  Calendar,
  Phone,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
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
    <section id="communities" className="relative py-20 bg-gradient-to-b from-brand-50/[0.025] to-transparent border-t border-brand-500/15 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>MASTER-PLANNED RESIDENTIAL ENCLAVES</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured Communities
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Thoughtfully selected acreage settings, resort-style water parks, and championship school
              districts across Texas and the Sunbelt.
            </p>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COMMUNITIES.map((community) => (
            <div
              key={community.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md hover:border-brand-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1.5 hover:scale-[1.005] transition-all duration-300 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-t before:from-brand-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:pointer-events-none before:transition-opacity before:duration-500"
            >
              {/* Media */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src={community.heroImage}
                  alt={community.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Metro & Price Range Pills */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="rounded-full bg-slate-950/85 border border-slate-700 px-2.5 py-0.5 text-xs font-mono text-amber-300 backdrop-blur-md">
                    {community.city}, {community.state}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                  <span className="text-xl font-bold font-mono text-white">
                    {community.priceRange}
                  </span>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-mono text-emerald-300">
                    {community.moveInReadyCount} Move-In Ready
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 font-display transition">
                    {community.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {community.description}
                  </p>

                  {/* Amenities List */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                      Community Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {community.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 text-xs text-slate-300"
                        >
                          {amenity.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* School District & Tax Advantage */}
                  <div className="mt-4 space-y-1.5 text-xs font-mono text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                    <div className="flex items-center gap-2 text-slate-300">
                      <GraduationCap className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>{community.schoolDistrict}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span>HOA: {community.hoaDues}</span>
                      <span className="text-emerald-400">Tax Rate: {community.taxRate}</span>
                    </div>
                  </div>

                  {/* Counselor Contact Info */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden border border-amber-500/40">
                        <Image
                          src={community.salesCounselor.avatar}
                          alt={community.salesCounselor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">
                          {community.salesCounselor.name}
                        </span>
                        <span className="text-[11px] text-slate-400">Community Sales Counselor</span>
                      </div>
                    </div>
                    <a
                      href={`tel:${community.salesCounselor.phone}`}
                      className="text-amber-400 font-mono hover:text-amber-300 flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectCommunityPlans(community.id)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-200 hover:border-amber-500/40 hover:text-white transition"
                  >
                    <span>View Plans</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenTourDrawer({ communityId: community.id })}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Tour</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
