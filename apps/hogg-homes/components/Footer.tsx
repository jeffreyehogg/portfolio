'use client'

import Link from 'next/link'
import { Home, ShieldCheck } from 'lucide-react'

interface FooterProps {
  onOpenArchitectureDrawer?: () => void
}

export default function Footer({ onOpenArchitectureDrawer }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Home className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                HOGG<span className="text-amber-400">HOMES</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Thoughtfully crafted homes and master-planned communities across Texas and Arizona.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>10-Year Builder Warranty Included</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Explore
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/floor-plans" className="hover:text-amber-400 transition-colors">
                  Floor Plans
                </Link>
              </li>
              <li>
                <Link href="/communities" className="hover:text-amber-400 transition-colors">
                  Communities
                </Link>
              </li>
              <li>
                <Link href="/quick-move-ins" className="hover:text-amber-400 transition-colors">
                  Move-In Ready Homes
                </Link>
              </li>
              <li>
                <Link href="/#regional-map" className="hover:text-amber-400 transition-colors">
                  Where We Build
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions & About */}
          <div>
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Regions
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/communities?metro=houston" className="hover:text-amber-400 transition-colors">
                  Houston Metro
                </Link>
              </li>
              <li>
                <Link href="/communities?metro=dfw" className="hover:text-amber-400 transition-colors">
                  Dallas - Fort Worth
                </Link>
              </li>
              <li>
                <Link href="/communities?metro=austin" className="hover:text-amber-400 transition-colors">
                  Austin - San Marcos
                </Link>
              </li>
              <li>
                <Link href="/communities?metro=phoenix" className="hover:text-amber-400 transition-colors">
                  Phoenix East Valley
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Attribution */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <span className="border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                EQUAL HOUSING OPPORTUNITY
              </span>
              <span>Texas Real Estate License #0894218</span>
            </div>

            <div>
              <span>© {new Date().getFullYear()} Hogg Homes LLC. All rights reserved.</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Prices, plans, dimensions, and availability are subject to change without notice. Square footages are approximate.
          </p>

          <div className="flex flex-wrap items-center justify-between pt-2 text-[11px] text-slate-400">
            <div>
              Engineered with high craft by{' '}
              <span className="text-slate-200 font-medium">Jeff Hogg</span>
            </div>
            {onOpenArchitectureDrawer && (
              <button
                onClick={onOpenArchitectureDrawer}
                className="text-slate-400 hover:text-amber-400 transition-colors text-xs"
              >
                System Architecture Notes
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
