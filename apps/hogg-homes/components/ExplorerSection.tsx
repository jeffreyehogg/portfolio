'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Building,
  DollarSign,
  Bed,
  Bath,
  ArrowUpDown,
  Sparkles,
  Layers,
} from 'lucide-react'
import { METROS, FLOOR_PLANS, COMMUNITIES } from '../lib/data'
import { FloorPlan } from '../lib/types'
import FloorPlanCard from './FloorPlanCard'

interface ExplorerSectionProps {
  selectedMetro: string
  onSelectMetro: (metroId: string) => void
  searchQuery: string
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
  onClearSearch,
  onOpenSchematic,
  onOpenBrochure,
  onOpenTourDrawer,
  onOpenMortgageModal,
  comparedPlanIds = [],
  onToggleCompare,
  onOpenCompareDrawer,
}: ExplorerSectionProps) {
  // Filter States
  const [maxPrice, setMaxPrice] = useState<number>(600000)
  const [minBedrooms, setMinBedrooms] = useState<number>(0)
  const [minBathrooms, setMinBathrooms] = useState<number>(0)
  const [storiesFilter, setStoriesFilter] = useState<'all' | '1' | '2'>('all')
  const [seriesFilter, setSeriesFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'sqft-desc'>('popular')
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false)

  // Reset filters
  const resetFilters = () => {
    onSelectMetro('all')
    onClearSearch()
    setMaxPrice(600000)
    setMinBedrooms(0)
    setMinBathrooms(0)
    setStoriesFilter('all')
    setSeriesFilter('all')
    setSortBy('popular')
  }

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedMetro !== 'all') count++
    if (searchQuery.trim()) count++
    if (maxPrice < 600000) count++
    if (minBedrooms > 0) count++
    if (minBathrooms > 0) count++
    if (storiesFilter !== 'all') count++
    if (seriesFilter !== 'all') count++
    return count
  }, [selectedMetro, searchQuery, maxPrice, minBedrooms, minBathrooms, storiesFilter, seriesFilter])

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
      if (plan.basePrice > maxPrice) return false

      // Bedrooms Filter
      if (minBedrooms > 0 && plan.bedrooms < minBedrooms) return false

      // Bathrooms Filter
      if (minBathrooms > 0 && plan.bathrooms < minBathrooms) return false

      // Stories Filter
      if (storiesFilter !== 'all' && plan.stories.toString() !== storiesFilter) return false

      // Series Filter
      if (seriesFilter !== 'all' && plan.series !== seriesFilter) return false

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice
      if (sortBy === 'sqft-desc') return b.sqft - a.sqft
      // 'popular'
      return 0
    })
  }, [selectedMetro, searchQuery, maxPrice, minBedrooms, minBathrooms, storiesFilter, seriesFilter, sortBy])

  return (
    <section id="floor-plans" className="relative py-16 scroll-mt-20 bg-gradient-to-b from-slate-950 via-brand-50/[0.01] to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>CUSTOMIZABLE ARCHITECTURAL ELEVATIONS</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Award-Winning Floor Plans
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              From single-story open-concept layouts to multi-generational executive estates. Switch
              between elevations A, B, and C in real-time.
            </p>
          </div>

          {/* Quick Stats & Reset Button */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Showing <span className="font-bold text-amber-400">{filteredPlans.length}</span> of{' '}
              {FLOOR_PLANS.length} Plans
            </span>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-mono text-amber-300 hover:bg-slate-800 transition"
              >
                <RotateCcw className="h-3 w-3" />
                Reset ({activeFiltersCount})
              </button>
            )}

            {comparedPlanIds.length > 0 && onOpenCompareDrawer && (
              <button
                onClick={onOpenCompareDrawer}
                className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-mono font-medium text-amber-300 hover:bg-amber-500/20 transition shadow-sm"
              >
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>Compare ({comparedPlanIds.length}/3)</span>
              </button>
            )}

            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-white"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>

        {/* Faceted Filter Bar */}
        <div
          className={`${
            showFiltersMobile ? 'block' : 'hidden'
          } md:block mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-xl`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Metro Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                <Building className="h-3.5 w-3.5 text-amber-400" />
                Metro Division
              </label>
              <select
                value={selectedMetro}
                onChange={(e) => onSelectMetro(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="all">All Metros (Sunbelt)</option>
                {METROS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.planCount} plans)
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                  Max Base Price
                </label>
                <span className="text-xs font-mono font-bold text-amber-300">
                  ${(maxPrice / 1000).toFixed(0)}k
                </span>
              </div>
              <input
                type="range"
                min={250000}
                max={600000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>$250k</span>
                <span>$425k</span>
                <span>$600k+</span>
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                <Bed className="h-3.5 w-3.5 text-amber-400" />
                Bedrooms
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { label: 'Any', value: 0 },
                  { label: '3+', value: 3 },
                  { label: '4+', value: 4 },
                  { label: '5+', value: 5 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setMinBedrooms(item.value)}
                    className={`rounded-lg py-1.5 text-xs font-mono font-medium transition ${
                      minBedrooms === item.value
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'border border-slate-700 bg-slate-850 text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories Filter */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Stories
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(
                  [
                    { label: 'All', value: 'all' },
                    { label: '1 Story', value: '1' },
                    { label: '2 Story', value: '2' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setStoriesFilter(item.value)}
                    className={`rounded-lg py-1.5 text-xs font-mono font-medium transition ${
                      storiesFilter === item.value
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'border border-slate-700 bg-slate-850 text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                <ArrowUpDown className="h-3.5 w-3.5 text-amber-400" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc' | 'sqft-desc')
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-850 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="sqft-desc">Sq Ft: Largest First</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Applied Filters:
              </span>

              {selectedMetro !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs text-amber-300">
                  Metro: {METROS.find((m) => m.id === selectedMetro)?.name}
                  <button onClick={() => onSelectMetro('all')}>
                    <X className="h-3 w-3 hover:text-white" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs text-amber-300">
                  Search: "{searchQuery}"
                  <button onClick={onClearSearch}>
                    <X className="h-3 w-3 hover:text-white" />
                  </button>
                </span>
              )}

              {maxPrice < 600000 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs text-amber-300">
                  Under ${(maxPrice / 1000).toFixed(0)}k
                  <button onClick={() => setMaxPrice(600000)}>
                    <X className="h-3 w-3 hover:text-white" />
                  </button>
                </span>
              )}

              {minBedrooms > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs text-amber-300">
                  {minBedrooms}+ Beds
                  <button onClick={() => setMinBedrooms(0)}>
                    <X className="h-3 w-3 hover:text-white" />
                  </button>
                </span>
              )}

              {storiesFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs text-amber-300">
                  {storiesFilter === '1' ? 'Single Story' : 'Two Story'}
                  <button onClick={() => setStoriesFilter('all')}>
                    <X className="h-3 w-3 hover:text-white" />
                  </button>
                </span>
              )}
            </div>
          )}
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
          <div className="mt-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center">
            <h3 className="text-lg font-bold text-white">No Floor Plans Match Your Filters</h3>
            <p className="mt-2 text-sm text-slate-400">
              Try adjusting your price range, bedroom criteria, or selected metro market.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
