'use client'

import { useState, useMemo } from 'react'
import { Search, RotateCcw, X, SlidersHorizontal } from 'lucide-react'
import { METROS, FLOOR_PLANS, COMMUNITIES } from '../lib/data'
import { FloorPlan } from '../lib/types'
import FloorPlanCard from './FloorPlanCard'

interface ExplorerSectionProps {
  selectedMetro: string
  onSelectMetro: (metroId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  onOpenSchematic: (plan: FloorPlan) => void
  onOpenBrochure: (plan: FloorPlan) => void
  onOpenTourDrawer: (preselected: { floorPlanId: string; communityId?: string }) => void
  onOpenMortgageModal: (price?: number) => void
  comparedPlanIds?: string[]
  onToggleCompare?: (planId: string) => void
  onOpenCompareDrawer?: () => void
}

export default function ExplorerSection({
  selectedMetro,
  onSelectMetro,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onOpenSchematic,
  onOpenBrochure,
  onOpenTourDrawer,
  onOpenMortgageModal,
  comparedPlanIds = [],
  onToggleCompare,
}: ExplorerSectionProps) {
  // Filter States
  const [maxPrice, setMaxPrice] = useState<number>(0) // 0 means any
  const [minBedrooms, setMinBedrooms] = useState<number>(0)
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'sqft-desc'>('popular')
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false)

  // Reset filters
  const resetFilters = () => {
    onSelectMetro('all')
    onClearSearch()
    setMaxPrice(0)
    setMinBedrooms(0)
    setSortBy('popular')
  }

  const hasActiveFilters =
    selectedMetro !== 'all' ||
    searchQuery.trim().length > 0 ||
    maxPrice > 0 ||
    minBedrooms > 0

  // Filtered & Sorted Floor Plans
  const filteredPlans = useMemo(() => {
    return FLOOR_PLANS.filter((plan) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesPlan =
          plan.name.toLowerCase().includes(query) ||
          plan.series.toLowerCase().includes(query) ||
          plan.features.some((f) => f.toLowerCase().includes(query))

        const matchesCommunity = plan.availableInCommunities.some((commId) => {
          const comm = COMMUNITIES.find((c) => c.id === commId)
          return (
            comm?.name.toLowerCase().includes(query) ||
            comm?.city.toLowerCase().includes(query) ||
            comm?.state.toLowerCase().includes(query)
          )
        })

        if (!matchesPlan && !matchesCommunity) return false
      }

      // Metro Filter
      if (selectedMetro !== 'all') {
        const availableInMetro = plan.availableInCommunities.some((commId) => {
          const comm = COMMUNITIES.find((c) => c.id === commId)
          return comm?.metroId === selectedMetro
        })
        if (!availableInMetro) return false
      }

      // Price Filter
      if (maxPrice > 0 && plan.basePrice > maxPrice) return false

      // Bedrooms Filter
      if (minBedrooms > 0 && plan.bedrooms < minBedrooms) return false

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice
      if (sortBy === 'sqft-desc') return b.sqft - a.sqft
      return 0
    })
  }, [selectedMetro, searchQuery, maxPrice, minBedrooms, sortBy])

  return (
    <section id="floor-plans" className="relative py-16 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-medium text-amber-400">Floor Plans</span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">
            Find Your Ideal Home
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Explore single-story and two-story designs, with multiple exterior elevations to match your style.
          </p>
        </div>

        {/* Clean, Simple Filter Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
          {/* Top Row: Search & Quick Region Pills */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Metro Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                onClick={() => onSelectMetro('all')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedMetro === 'all'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-750'
                }`}
              >
                All Regions
              </button>
              {METROS.map((metro) => (
                <button
                  key={metro.id}
                  onClick={() => onSelectMetro(metro.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedMetro === metro.id
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-750'
                  }`}
                >
                  {metro.name.replace(' Metro', '').replace(' East Valley', '')}
                </button>
              ))}
            </div>

            {/* Compact Search Bar */}
            <div className="relative min-w-[240px] lg:max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search plans or cities..."
                className="w-full rounded-xl border border-slate-750 bg-slate-850 pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Controls: Bedrooms, Price, Sort, Count */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Bedroom Selector */}
              <div className="flex items-center gap-1">
                <span className="text-slate-400 mr-1">Beds:</span>
                {[
                  { label: 'Any', value: 0 },
                  { label: '3+', value: 3 },
                  { label: '4+', value: 4 },
                  { label: '5+', value: 5 },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setMinBedrooms(b.value)}
                    className={`rounded-lg px-2.5 py-1 text-xs transition ${
                      minBedrooms === b.value
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'bg-slate-850 border border-slate-750 text-slate-300 hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Price Filter Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Max Price:</span>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="rounded-lg border border-slate-750 bg-slate-850 px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value={0}>Any Price</option>
                  <option value={350000}>Under $350k</option>
                  <option value={400000}>Under $400k</option>
                  <option value={500000}>Under $500k</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-slate-750 bg-slate-850 px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="popular">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="sqft-desc">Size: Largest First</option>
                </select>
              </div>
            </div>

            {/* Results Count & Reset Button */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">
                <strong className="text-white font-medium">{filteredPlans.length}</strong> plans found
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-amber-400 hover:text-amber-300 transition text-xs"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Floor Plans Grid */}
        {filteredPlans.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <FloorPlanCard
                key={plan.id}
                floorPlan={plan}
                onOpenSchematic={onOpenSchematic}
                onOpenBrochure={onOpenBrochure}
                onOpenTourDrawer={onOpenTourDrawer}
                onOpenMortgageModal={onOpenMortgageModal}
                isCompared={comparedPlanIds.includes(plan.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
            <h3 className="text-base font-semibold text-white">No floor plans match your filters</h3>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your price range, bedroom criteria, or selected region.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
