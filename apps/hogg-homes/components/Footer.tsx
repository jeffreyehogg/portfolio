'use client'

import Link from 'next/link'
import { Home, ShieldCheck, Terminal, ArrowUpRight, Cpu } from 'lucide-react'

interface FooterProps {
  onOpenArchitectureDrawer?: () => void
}

export default function Footer({ onOpenArchitectureDrawer }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-2.5 transition">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:border-amber-400 transition-colors">
                <Home className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                HOGG<span className="text-amber-400">HOMES</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Crafting master-planned communities and customizable modern residences across Texas
              and the Sunbelt with sub-second property data architecture.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>10-Year Post-Tension Foundation Warranty Included</span>
            </div>
          </div>

          {/* Regional Divisions (Now Clickable Links) */}
          <div>
            <span className="font-mono text-xs uppercase font-bold text-white tracking-wider block mb-3">
              Divisions
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/communities?metro=houston"
                  className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Houston Metro (Angleton, Cleveland)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/communities?metro=dfw"
                  className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Dallas - Fort Worth (Celina, Forney)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/communities?metro=austin"
                  className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Austin - San Marcos (Liberty Hill)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/communities?metro=phoenix"
                  className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Phoenix East Valley (Queen Creek)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Home Collections (Now Clickable Links) */}
          <div>
            <span className="font-mono text-xs uppercase font-bold text-white tracking-wider block mb-3">
              Floor Plan Series
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/floor-plans?series=Heritage%20Collection"
                  className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Heritage Collection (1,480 - 1,640 Sq Ft)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/floor-plans?series=Signature%20Series"
                  className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Signature Series (2,150 - 2,280 Sq Ft)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/floor-plans?series=Pinnacle%20Collection"
                  className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Pinnacle Collection (3,120 - 3,450 Sq Ft)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/quick-move-ins"
                  className="hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 text-emerald-400 font-medium"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Quick Move-In Expedited Homes</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer / System Architecture Links */}
          <div>
            <span className="font-mono text-xs uppercase font-bold text-white tracking-wider block mb-3">
              Engineering
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                {onOpenArchitectureDrawer ? (
                  <button
                    onClick={onOpenArchitectureDrawer}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group transition"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Architecture Insights</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ) : (
                  <Link
                    href="/#insights"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Architecture Insights</span>
                  </Link>
                )}
              </li>
              <li>
                <button
                  onClick={onOpenArchitectureDrawer}
                  className="hover:text-slate-200 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all text-slate-400 text-left"
                >
                  <Cpu className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span>Next.js 16 App Router + React 19</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-[11px]">
                  Turborepo Workspaces Monorepo
                </span>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-[11px]">
                  Edge Property Ingestion Pipeline
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="mt-12 pt-8 border-t border-slate-850 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span className="border border-slate-700 px-2 py-0.5 rounded text-slate-400">
                EQUAL HOUSING OPPORTUNITY
              </span>
              <span>Texas Real Estate License #0894218</span>
            </div>

            <div>
              <span>© {new Date().getFullYear()} Hogg Homes LLC. All rights reserved.</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Disclaimer: Prices, plans, elevations, dimensions, specifications, materials, and
            availability are subject to change without notice or obligation. Square footages are
            approximate and may vary in construction. Estimated payments are for illustrative
            purposes only; financing requires underwriting approval through participating mortgage
            lenders.
          </p>

          <div className="text-center pt-2 text-[11px] font-mono text-slate-400">
            Engineered with high craft by{' '}
            <span className="text-slate-200 font-semibold">Jeff Hogg</span> • Senior Full-Stack
            Developer & Systems Architect
          </div>
        </div>
      </div>
    </footer>
  )
}
