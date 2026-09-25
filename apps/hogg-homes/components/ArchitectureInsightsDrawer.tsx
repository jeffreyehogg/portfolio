'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Terminal,
  Cpu,
  Activity,
  Database,
} from 'lucide-react'
import { ARCHITECTURE_METRICS } from '../lib/data'

interface ArchitectureInsightsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'cms-vs-rsc' | 'data-model' | 'cwv-telemetry'

export default function ArchitectureInsightsDrawer({
  isOpen,
  onClose,
}: ArchitectureInsightsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('cms-vs-rsc')

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Drawer Window */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl h-full bg-slate-900 border-l border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between z-10"
        >
          <div>
            {/* Top Bar with Terminal macOS dots */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-amber-400" />
                  <span className="font-mono text-xs text-slate-300 font-semibold">
                    apps/hogg-homes/architecture.telemetry
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Title & Author Callout */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-mono font-medium text-amber-300">
                  FULL-STACK SYSTEM ARCHITECTURE
                </span>
                <span className="text-xs font-mono text-slate-400">NEXT.JS 15 + REACT 19</span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                Enterprise Homebuilder Engineering Insights
              </h2>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                A technical breakdown of how Hogg Homes replaces sluggish legacy homebuilder CMS
                monoliths with Next.js 15 Server Components, sub-second relational filtering, and
                type-safe CRM lead ingestion.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex border-b border-slate-800 gap-2">
              {(
                [
                  { id: 'cms-vs-rsc', label: 'Legacy CMS vs RSC', icon: Cpu },
                  { id: 'data-model', label: 'Relational Entity Model', icon: Database },
                  { id: 'cwv-telemetry', label: 'Core Web Vitals & Caching', icon: Activity },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-mono font-medium transition ${
                      isActive
                        ? 'border-amber-400 text-amber-300 bg-slate-850/50'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab 1: CMS vs RSC */}
            {activeTab === 'cms-vs-rsc' && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="text-xs font-mono uppercase text-amber-400 font-bold mb-3">
                    Comparative Benchmarks: Monolithic CMS vs Next.js 15 Edge
                  </h4>
                  <div className="space-y-3">
                    {ARCHITECTURE_METRICS.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-slate-850 bg-slate-900/60 p-3 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between text-slate-300 font-bold mb-1.5">
                          <span>{item.metric}</span>
                          <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                            {item.gain}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
                          <div>
                            <span className="text-rose-400 block">Legacy CMS:</span>
                            <span className="text-slate-400">{item.legacyValue}</span>
                          </div>
                          <div>
                            <span className="text-emerald-300 block">Hogg Homes RSC:</span>
                            <span className="text-slate-200">{item.nextjsValue}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-300 space-y-2">
                  <h5 className="font-mono text-amber-300 font-semibold">Key Architectural Win:</h5>
                  <p>
                    By moving floor plan catalog layouts to React Server Components (RSC), the entire
                    spec sheet, room dimensions, and initial SEO payloads are rendered on the server
                    edge. Client interactivity (elevation switching, price sliders) is isolated to
                    leaf boundary components, keeping client JavaScript hydration below 90KB.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Relational Entity Model */}
            {activeTab === 'data-model' && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <h4 className="text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                    Relational Hierarchy Diagram
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 font-mono">
                    Schema architecture modeling enterprise property taxonomy:
                  </p>

                  <div className="space-y-2 font-mono text-xs">
                    <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
                      <div className="flex items-center justify-between text-amber-300 font-bold">
                        <span>METROS (Division Level)</span>
                        <span>[PK: metroId]</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Houston Metro, DFW, Austin, Phoenix. Coordinates, division leadership, regional promo rates.
                      </p>
                    </div>

                    <div className="flex justify-center text-slate-500">
                      <span>↓ 1-to-Many Relationship</span>
                    </div>

                    <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-3">
                      <div className="flex items-center justify-between text-cyan-300 font-bold">
                        <span>COMMUNITIES (Master-Planned Enclaves)</span>
                        <span>[FK: metroId]</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Riverwood Ranch, Grand Oaks Reserve, Canyon Falls. HOA dues, amenities, tax rate, assigned sales counselors.
                      </p>
                    </div>

                    <div className="flex justify-center text-slate-500">
                      <span>↓ Many-to-Many Relationship</span>
                    </div>

                    <div className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 p-3">
                      <div className="flex items-center justify-between text-indigo-300 font-bold">
                        <span>FLOOR PLANS (Architectural Blueprints)</span>
                        <span>[PK: floorPlanId]</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Elevations A/B/C, CAD schematics, dimensions, Carrier 16-SEER specs, series collections.
                      </p>
                    </div>

                    <div className="flex justify-center text-slate-500">
                      <span>↓ 1-to-Many Realized Inventory</span>
                    </div>

                    <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3">
                      <div className="flex items-center justify-between text-emerald-300 font-bold">
                        <span>QUICK MOVE-IN LOTS (Physical Inventory)</span>
                        <span>[FK: commId, planId]</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Lot 42 Whispering Pines Way. Construction stage (Framing ➔ Drywall ➔ Ready), rate locks, flex cash incentives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: CWV & Caching */}
            {activeTab === 'cwv-telemetry' && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-center">
                    <span className="block text-[10px] font-mono uppercase text-slate-400">LCP Speed</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-400">0.7s</span>
                    <span className="block text-[10px] font-mono text-emerald-300">AVIF Priority</span>
                  </div>

                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-center">
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Layout Shift (CLS)</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-400">0.000</span>
                    <span className="block text-[10px] font-mono text-emerald-300">Zero Jitter</span>
                  </div>

                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-center">
                    <span className="block text-[10px] font-mono uppercase text-slate-400">INP Latency</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-400">18 ms</span>
                    <span className="block text-[10px] font-mono text-emerald-300">Instant Filter</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono space-y-3">
                  <div className="text-amber-400 font-bold uppercase">
                    Edge Cache & Revalidation Strategy
                  </div>
                  <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-[11px] text-slate-300 leading-relaxed">
{`// Edge ISR Stale-While-Revalidate Rule
export const revalidate = 3600 // Cached at edge 1 hour

// Fast Client-side Faceted Filter Engine
// Filter state calculated in memory with zero roundtrips
const filteredPlans = useMemo(() => {
  return FLOOR_PLANS.filter(p => matchQuery(p) && matchPrice(p))
}, [query, price, bedrooms])`}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-8 border-t border-slate-800 pt-4 text-center">
            <p className="text-[11px] font-mono text-slate-400">
              Built as part of the Jeff Hogg Engineering Monorepo • Turborepo + Next.js 15
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
