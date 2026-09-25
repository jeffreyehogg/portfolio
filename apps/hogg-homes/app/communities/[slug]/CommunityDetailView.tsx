'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Bed,
  Bath,
  Car,
  Layers,
  Sparkles,
  Waves,
  TreePine,
  Fish,
  Trophy,
  Dumbbell,
  Dog,
  Flame,
  Flag,
  Coffee,
  Sun,
  ShieldCheck,
} from 'lucide-react'
import { Community, Metro, FloorPlan, QuickMoveInLot } from '../../../lib/types'
import { usePlatformModals } from '../../../components/PlatformModalContext'

interface CommunityDetailViewProps {
  community: Community
  metro?: Metro
  plans: FloorPlan[]
  lots: QuickMoveInLot[]
}

// Icon helper for amenity cards
function getAmenityIcon(iconName: string) {
  switch (iconName) {
    case 'Waves':
      return <Waves className="h-5 w-5 text-cyan-400" />
    case 'Fish':
      return <Fish className="h-5 w-5 text-cyan-400" />
    case 'TreePine':
      return <TreePine className="h-5 w-5 text-emerald-400" />
    case 'Trophy':
      return <Trophy className="h-5 w-5 text-amber-400" />
    case 'Dumbbell':
      return <Dumbbell className="h-5 w-5 text-amber-400" />
    case 'Dog':
      return <Dog className="h-5 w-5 text-amber-400" />
    case 'Flame':
      return <Flame className="h-5 w-5 text-orange-400" />
    case 'Flag':
      return <Flag className="h-5 w-5 text-emerald-400" />
    case 'Coffee':
      return <Coffee className="h-5 w-5 text-amber-400" />
    case 'Sun':
      return <Sun className="h-5 w-5 text-amber-400" />
    default:
      return <Sparkles className="h-5 w-5 text-amber-400" />
  }
}

export default function CommunityDetailView({
  community,
  metro,
  plans,
  lots,
}: CommunityDetailViewProps) {
  const { openTourDrawer } = usePlatformModals()

  return (
    <div className="space-y-12">
      {/* Community Hero Header */}
      <div className="relative aspect-[21/9] min-h-[360px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
        <Image
          src={community.heroImage}
          alt={community.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-950/85 border border-slate-750 px-3 py-1 text-xs font-mono text-amber-300 backdrop-blur-md">
                {metro?.name || 'Sunbelt Region'}
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-mono text-emerald-300 backdrop-blur-md">
                {community.moveInReadyCount} Move-In Ready Homes
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {community.name}
            </h1>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>
                {community.city}, {community.state} {community.zip} ({community.county})
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-5 py-3 text-right">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">
                Homes Starting From
              </span>
              <span className="text-2xl font-extrabold font-mono text-amber-400">
                ${community.startingPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => openTourDrawer({ communityId: community.id })}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all whitespace-nowrap"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule VIP Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Specifications & Counselor Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Community Specs & Overview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white">About {community.name}</h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {community.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  School District
                </span>
                <span className="text-xs font-mono font-bold text-white mt-1 block">
                  {community.schoolDistrict}
                </span>
              </div>
              <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Tax Advantage
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 mt-1 block">
                  {community.taxRate}
                </span>
              </div>
              <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  HOA Annual Dues
                </span>
                <span className="text-xs font-mono font-bold text-white mt-1 block">
                  {community.hoaDues}
                </span>
              </div>
            </div>
          </div>

          {/* Master-Planned Amenities Grid */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Neighborhood Resort Living
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-white">
                Community Amenities & Recreation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {community.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800">
                      {getAmenityIcon(amenity.icon)}
                    </div>
                    <h4 className="text-sm font-bold text-white">{amenity.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed pl-13">
                    {amenity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sales Counselor Contact Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-2xl shadow-xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block">
              Dedicated Community Counselor
            </span>

            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-slate-700">
                <Image
                  src={community.salesCounselor.avatar}
                  alt={community.salesCounselor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {community.salesCounselor.name}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Senior Community Sales Manager
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs font-mono">
              <a
                href={`tel:${community.salesCounselor.phone}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                <span>{community.salesCounselor.phone}</span>
              </a>
              <a
                href={`mailto:${community.salesCounselor.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition truncate"
              >
                <Mail className="h-4 w-4 text-amber-400" />
                <span>{community.salesCounselor.email}</span>
              </a>
            </div>

            <button
              onClick={() => openTourDrawer({ communityId: community.id })}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-400 transition shadow-md"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment with {community.salesCounselor.name.split(' ')[0]}</span>
            </button>

            <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Model Home Open Daily</span>
              </div>
              <p>Mon - Sat: 10:00 AM - 6:00 PM</p>
              <p>Sun: 12:00 PM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Floor Plans in this Community */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Floor Plan Catalog
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-white">
              Architectural Plans Offered in {community.name}
            </h2>
          </div>
          <Link
            href="/floor-plans"
            className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All Plans</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/floor-plans/${plan.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden hover:border-amber-500/50 hover:bg-slate-900 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-800 bg-slate-900">
                <Image
                  src={plan.elevations[0].imageUrl}
                  alt={plan.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="rounded-full bg-slate-950/85 border border-slate-750 px-2.5 py-0.5 text-[10px] font-mono text-amber-300">
                    {plan.series}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {plan.name}
                    </h3>
                    <span className="text-sm font-mono font-bold text-white">
                      ${plan.basePrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-mono text-slate-400 border-y border-slate-850 py-2">
                    <div>
                      <span className="text-white font-bold block">{plan.sqft.toLocaleString()}</span>
                      <span className="text-[10px]">Sq Ft</span>
                    </div>
                    <div>
                      <span className="text-white font-bold block">{plan.bedrooms} Beds</span>
                      <span className="text-[10px]">Beds</span>
                    </div>
                    <div>
                      <span className="text-white font-bold block">{plan.bathrooms}.{plan.halfBaths}</span>
                      <span className="text-[10px]">Baths</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-amber-400 pt-1">
                  <span>View Elevations & Specs</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Available Move-In Ready Lots in this Community */}
      {lots.length > 0 && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Under Construction & Completed
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-white">
                Available Lots in {community.name}
              </h2>
            </div>
            <Link
              href="/quick-move-ins"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>All Quick Move-Ins</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lots.map((lot) => (
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
                      Lot {lot.lotNumber} • {lot.floorPlanName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-white">
                      ${lot.currentPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                  <span className="text-xs font-mono text-slate-400">
                    Est: {lot.estimatedCompletion}
                  </span>
                  <button
                    onClick={() => openTourDrawer({ communityId: community.id, lotId: lot.id })}
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
