'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Zap,
  Droplets,
  Ruler,
  CheckCircle2,
  Printer,
  Info,
  Layers,
} from 'lucide-react'
import { FloorPlan } from '../lib/types'

interface FloorPlanSchematicModalProps {
  floorPlan: FloorPlan | null
  onClose: () => void
  onOpenTourDrawer: (preselected: { floorPlanId: string }) => void
}

type LayerType = 'dimensions' | 'electrical' | 'plumbing'

export default function FloorPlanSchematicModal({
  floorPlan,
  onClose,
  onOpenTourDrawer,
}: FloorPlanSchematicModalProps) {
  const [activeLayer, setActiveLayer] = useState<LayerType>('dimensions')
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0)

  if (!floorPlan) return null

  const selectedRoom = floorPlan.rooms[selectedRoomIndex] || floorPlan.rooms[0]

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
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/95 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl my-auto z-10"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-xs font-mono text-amber-300">
                  ARCHITECTURAL CAD SCHEMATIC
                </span>
                <span className="text-xs font-mono text-slate-400">
                  REV 2026.4 • CODE COMPLIANT
                </span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                {floorPlan.name}{' '}
                <span className="text-base font-normal text-slate-400">
                  ({floorPlan.sqft.toLocaleString()} Sq Ft • {floorPlan.stories} Story • {floorPlan.bedrooms} Bed / {floorPlan.bathrooms} Bath)
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-750 transition"
                title="Print or Save CAD Schematic"
              >
                <Printer className="h-4 w-4 text-amber-400" />
                <span>Print Spec</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Interactive Layer Switches */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                Active Overlay:
              </span>

              <button
                onClick={() => setActiveLayer('dimensions')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition ${
                  activeLayer === 'dimensions'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Ruler className="h-3.5 w-3.5" />
                Dimensions & Layout
              </button>

              <button
                onClick={() => setActiveLayer('electrical')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition ${
                  activeLayer === 'electrical'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                Electrical & Smart Home
              </button>

              <button
                onClick={() => setActiveLayer('plumbing')}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition ${
                  activeLayer === 'plumbing'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Droplets className="h-3.5 w-3.5" />
                Plumbing & HVAC
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400">
              {activeLayer === 'dimensions' && 'Showing room boundary geometry & sq footage'}
              {activeLayer === 'electrical' && 'Showing 240V EV outlet, Cat6 hubs & recessed LEDs'}
              {activeLayer === 'plumbing' && 'Showing tankless water loop & 16-SEER dual returns'}
            </div>
          </div>

          {/* Schematic Canvas & Room Detail Split */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Vector Blueprint SVG Canvas */}
            <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 relative overflow-hidden flex items-center justify-center min-h-[380px]">
              {/* Blueprint Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Vector Architectural Plan */}
              <svg
                viewBox="0 0 600 420"
                className="w-full h-auto max-h-[360px] drop-shadow-2xl select-none"
              >
                {/* Exterior Wall Boundary */}
                <rect
                  x="30"
                  y="20"
                  width="540"
                  height="370"
                  rx="6"
                  fill="#0b1120"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="0"
                />

                {/* Primary Suite (Top Left) */}
                <g
                  onClick={() => setSelectedRoomIndex(1)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="40"
                    y="30"
                    width="230"
                    height="170"
                    fill={selectedRoomIndex === 1 ? '#1e293b' : '#0f172a'}
                    stroke={selectedRoomIndex === 1 ? '#f59e0b' : '#334155'}
                    strokeWidth="2"
                    className="transition-colors hover:fill-slate-800"
                  />
                  <text x="55" y="60" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    PRIMARY RETREAT
                  </text>
                  <text x="55" y="80" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                    15' 0" × 17' 4"
                  </text>
                  <rect x="55" y="100" width="80" height="85" fill="#1e293b" stroke="#475569" strokeDasharray="3,3" />
                  <text x="65" y="145" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                    SPA BATH / TUB
                  </text>
                  <rect x="145" y="100" width="110" height="85" fill="#1e293b" stroke="#475569" strokeDasharray="3,3" />
                  <text x="155" y="145" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                    WALK-IN CLOSET
                  </text>
                </g>

                {/* Great Room (Center / Top Right) */}
                <g
                  onClick={() => setSelectedRoomIndex(0)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="280"
                    y="30"
                    width="280"
                    height="190"
                    fill={selectedRoomIndex === 0 ? '#1e293b' : '#0f172a'}
                    stroke={selectedRoomIndex === 0 ? '#f59e0b' : '#334155'}
                    strokeWidth="2"
                    className="transition-colors hover:fill-slate-800"
                  />
                  <text x="295" y="60" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    GRAND GATHERING ROOM
                  </text>
                  <text x="295" y="80" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                    18' 0" × 20' 6" • 10-FT CEILINGS
                  </text>
                  {/* Sliding Glass Door indicator */}
                  <line x1="330" y1="30" x2="490" y2="30" stroke="#f59e0b" strokeWidth="4" />
                  <text x="350" y="24" fill="#fbbf24" fontSize="9" fontFamily="monospace">
                    12' MULTI-SLIDE GLASS
                  </text>
                </g>

                {/* Kitchen & Island (Center Middle) */}
                <g
                  onClick={() => setSelectedRoomIndex(2)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="280"
                    y="225"
                    width="160"
                    height="155"
                    fill={selectedRoomIndex === 2 ? '#1e293b' : '#0f172a'}
                    stroke={selectedRoomIndex === 2 ? '#f59e0b' : '#334155'}
                    strokeWidth="2"
                    className="transition-colors hover:fill-slate-800"
                  />
                  <text x="295" y="250" fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    CHEF'S KITCHEN
                  </text>
                  <text x="295" y="268" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    12' 0" × 14' 6"
                  </text>
                  {/* 8-ft Quartz Island */}
                  <rect x="300" y="285" width="115" height="50" rx="3" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="312" y="315" fill="#f8fafc" fontSize="10" fontFamily="monospace">
                    QUARTZ ISLAND
                  </text>
                </g>

                {/* Covered Patio (Top Center Outward) */}
                <g
                  onClick={() => setSelectedRoomIndex(5)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="445"
                    y="225"
                    width="115"
                    height="85"
                    fill={selectedRoomIndex === 5 ? '#1e293b' : '#0f172a'}
                    stroke={selectedRoomIndex === 5 ? '#f59e0b' : '#334155'}
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    className="transition-colors hover:fill-slate-800"
                  />
                  <text x="455" y="255" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    COVERED PATIO
                  </text>
                  <text x="455" y="272" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    10' × 16'
                  </text>
                </g>

                {/* 2 or 3-Car Garage (Bottom Left) */}
                <g
                  onClick={() => setSelectedRoomIndex(6)}
                  className="cursor-pointer group"
                >
                  <rect
                    x="40"
                    y="210"
                    width="230"
                    height="170"
                    fill={selectedRoomIndex === 6 ? '#1e293b' : '#0f172a'}
                    stroke={selectedRoomIndex === 6 ? '#f59e0b' : '#334155'}
                    strokeWidth="2"
                    className="transition-colors hover:fill-slate-800"
                  />
                  <text x="55" y="240" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    {floorPlan.garageBays}-CAR OVERSIZED GARAGE
                  </text>
                  <text x="55" y="258" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                    20' 0" × 21' 4" • EV READY
                  </text>
                  {/* Car stall representation */}
                  <rect x="55" y="280" width="95" height="85" fill="#1e293b" stroke="#475569" rx="4" />
                  <text x="75" y="325" fill="#64748b" fontSize="10" fontFamily="monospace">
                    STALL 1
                  </text>
                  <rect x="160" y="280" width="95" height="85" fill="#1e293b" stroke="#475569" rx="4" />
                  <text x="180" y="325" fill="#64748b" fontSize="10" fontFamily="monospace">
                    STALL 2
                  </text>
                </g>

                {/* Active Layer Visual Overlays */}
                {activeLayer === 'electrical' && (
                  <g className="animate-fade-in pointer-events-none">
                    {/* EV Charging 240V Outlet */}
                    <circle cx="55" cy="275" r="9" fill="#06b6d4" />
                    <text x="70" y="279" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      ⚡ 240V NEMA 14-50 EV OUTLET
                    </text>

                    {/* Smart Hub */}
                    <circle cx="295" cy="185" r="8" fill="#06b6d4" />
                    <text x="310" y="190" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      📶 CAT6 SMART HUB PANEL
                    </text>

                    {/* Recessed Lighting grid */}
                    <circle cx="340" cy="110" r="4" fill="#fef08a" />
                    <circle cx="440" cy="110" r="4" fill="#fef08a" />
                    <circle cx="340" cy="150" r="4" fill="#fef08a" />
                    <circle cx="440" cy="150" r="4" fill="#fef08a" />
                  </g>
                )}

                {activeLayer === 'plumbing' && (
                  <g className="animate-fade-in pointer-events-none">
                    {/* Tankless Water Heater */}
                    <rect x="45" y="340" width="22" height="32" rx="2" fill="#10b981" />
                    <text x="75" y="360" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      💧 RINNAI TANKLESS HEATER
                    </text>

                    {/* Dual Carrier HVAC Returns */}
                    <circle cx="260" cy="120" r="8" fill="#10b981" />
                    <text x="185" y="105" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      ❄️ 16-SEER HVAC AIR RETURN
                    </text>

                    {/* Outdoor Gas Stub */}
                    <circle cx="500" cy="225" r="7" fill="#10b981" />
                    <text x="460" y="215" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      🔥 GAS GRILL STUB
                    </text>
                  </g>
                )}
              </svg>

              {/* Bottom hint */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span>Click any room on the blueprint to view engineering specs</span>
                <span className="text-amber-400">Scale: 1/4" = 1'-0"</span>
              </div>
            </div>

            {/* Room Inspector & Specifications Drawer */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5" />
                    Room Inspector
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Room {selectedRoomIndex + 1} of {floorPlan.rooms.length}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-white">{selectedRoom.room}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-mono text-amber-300">
                      Dimensions: {selectedRoom.dimensions}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Engineered Features:
                  </span>
                  <ul className="mt-2.5 space-y-2">
                    {selectedRoom.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick selector of rooms */}
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                    Jump to Room:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {floorPlan.rooms.map((rm, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedRoomIndex(idx)}
                        className={`rounded-lg px-2 py-1 text-[11px] font-mono transition ${
                          selectedRoomIndex === idx
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-850 text-slate-400 hover:text-white'
                        }`}
                      >
                        {rm.room}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Schedule Tour CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    onClose()
                    onOpenTourDrawer({ floorPlanId: floorPlan.id })
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  <span>Schedule VIP Tour of This Plan</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
