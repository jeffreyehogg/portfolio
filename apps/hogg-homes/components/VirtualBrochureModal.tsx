'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Printer, CheckCircle2, ShieldCheck, Home } from 'lucide-react'
import { FloorPlan } from '../lib/types'

interface VirtualBrochureModalProps {
  floorPlan: FloorPlan | null
  onClose: () => void
  onOpenTourDrawer: (preselected: { floorPlanId: string }) => void
}

export default function VirtualBrochureModal({
  floorPlan,
  onClose,
  onOpenTourDrawer,
}: VirtualBrochureModalProps) {
  const [selectedElevationTab, setSelectedElevationTab] = useState<'A' | 'B' | 'C'>('A')

  if (!floorPlan) return null

  const activeElevation =
    floorPlan.elevations.find((e) => e.id === selectedElevationTab) || floorPlan.elevations[0]

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10 text-slate-100"
        >
          {/* Header Controls (Hidden on print) */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 no-print">
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-mono text-amber-300">
                OFFICIAL BUILDER SPEC SHEET
              </span>
              <span className="text-xs font-mono text-slate-400">SERIES: {floorPlan.series}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                <Printer className="h-4 w-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Printable Spec Sheet Content */}
          <div className="mt-6 print:text-black">
            {/* Top Brand Banner */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-6 print:border-black">
              <div>
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-amber-400 print:text-black" />
                  <span className="text-2xl font-extrabold tracking-tight text-white print:text-black">
                    HOGG HOMES
                  </span>
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 print:text-gray-600 mt-1">
                  Texas Residential Homebuilding & Land Development
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 print:text-gray-600">Base Price</span>
                <div className="text-2xl font-extrabold font-mono text-white print:text-black">
                  ${floorPlan.basePrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Plan Title & Specs */}
            <div className="mt-6">
              <h1 className="text-3xl font-extrabold text-white print:text-black">
                {floorPlan.name}
              </h1>
              <p className="mt-1 text-sm text-slate-400 print:text-gray-700">
                {floorPlan.sqft.toLocaleString()} Sq Ft • {floorPlan.bedrooms} Bedrooms •{' '}
                {floorPlan.bathrooms}
                {floorPlan.halfBaths ? `.${floorPlan.halfBaths}` : ''} Bathrooms •{' '}
                {floorPlan.stories === 1 ? 'Single-Story' : 'Two-Story'} • {floorPlan.garageBays}-Car
                Garage
              </p>
            </div>

            {/* Elevation Selector & Hero Photo */}
            <div className="mt-6">
              {/* Elevation Tabs (Hidden on print) */}
              <div className="flex items-center gap-2 mb-3 no-print">
                <span className="text-xs font-mono uppercase text-slate-400 mr-1">Elevations:</span>
                {floorPlan.elevations.map((elevation) => (
                  <button
                    key={elevation.id}
                    onClick={() => setSelectedElevationTab(elevation.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-mono transition ${
                      selectedElevationTab === elevation.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {elevation.name} ({elevation.styleName})
                  </button>
                ))}
              </div>

              {/* Elevation Media Box */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                <Image
                  src={activeElevation.imageUrl}
                  alt={`${floorPlan.name} - ${activeElevation.styleName}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {activeElevation.name}: {activeElevation.styleName}
                  </span>
                  <p className="text-[11px] text-slate-300 max-w-lg mt-0.5">
                    {activeElevation.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Room Dimensions Grid */}
            <div className="mt-8">
              <h3 className="text-base font-bold font-mono uppercase text-amber-400 print:text-black border-b border-slate-800 pb-2">
                Room Dimensions & Layout Specifications
              </h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {floorPlan.rooms.map((room, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 print:border-gray-300"
                  >
                    <div>
                      <span className="text-sm font-semibold text-white print:text-black">
                        {room.room}
                      </span>
                      <div className="text-xs text-slate-400 print:text-gray-600">
                        {room.features.join(' • ')}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 print:text-black">
                      {room.dimensions}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Features Checklist */}
            <div className="mt-8">
              <h3 className="text-base font-bold font-mono uppercase text-amber-400 print:text-black border-b border-slate-800 pb-2">
                Included High-Craft Standards & Energy Efficiency
              </h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 print:text-gray-800">
                {floorPlan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 print:text-black shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 print:text-black shrink-0" />
                  <span>10-Year Post-Tension Engineered Foundation Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 print:text-black shrink-0" />
                  <span>Carrier 16-SEER High Efficiency Dual-Stage HVAC</span>
                </div>
              </div>
            </div>

            {/* Bottom Contact / Tour Callout (Hidden on print) */}
            <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
              <div>
                <h4 className="text-base font-bold text-white">Experience {floorPlan.name} in Person</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Model homes open 7 days a week. Schedule a private walkthrough with a sales counselor.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose()
                  onOpenTourDrawer({ floorPlanId: floorPlan.id })
                }}
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition shrink-0"
              >
                Schedule VIP Walkthrough
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
