'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Calendar, Menu, X, Layers } from 'lucide-react'

interface NavbarProps {
  onOpenTourDrawer: (preselected?: { communityId?: string; floorPlanId?: string; lotId?: string }) => void
  onOpenMortgageModal: () => void
  onOpenCompareDrawer: () => void
  comparedCount: number
  moveInReadyCount: number
}

export default function Navbar({
  onOpenTourDrawer,
  onOpenMortgageModal,
  onOpenCompareDrawer,
  comparedCount,
  moveInReadyCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavClick = (sectionId: string, fallbackPath?: string) => {
    setMobileMenuOpen(false)
    if (pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // Navigate from subpage
    if (fallbackPath) {
      router.push(fallbackPath)
    } else {
      router.push(`/#${sectionId}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Streamlined Brand Logo */}
        <Link href="/" className="group flex items-center gap-3 transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 text-amber-400 shadow-md shadow-amber-500/10 group-hover:border-amber-400 transition-all">
            <Home className="h-5 w-5" />
          </div>
          <span className="font-extrabold tracking-tight text-xl text-white">
            HOGG<span className="text-amber-400">HOMES</span>
          </span>
        </Link>

        {/* Clean, Airy Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('communities', '/communities')}
            className={`transition whitespace-nowrap py-1 ${
              pathname?.startsWith('/communities') ? 'text-amber-400 font-semibold' : 'hover:text-amber-400 text-slate-300'
            }`}
          >
            Communities
          </button>
          <button
            onClick={() => handleNavClick('regional-map')}
            className="hover:text-amber-400 transition whitespace-nowrap py-1"
          >
            Regional Map
          </button>
          <button
            onClick={() => handleNavClick('floor-plans', '/floor-plans')}
            className={`transition whitespace-nowrap py-1 ${
              pathname?.startsWith('/floor-plans') ? 'text-amber-400 font-semibold' : 'hover:text-amber-400 text-slate-300'
            }`}
          >
            Floor Plans
          </button>
          <Link
            href="/quick-move-ins"
            className={`relative transition flex items-center gap-1.5 whitespace-nowrap py-1 ${
              pathname === '/quick-move-ins' ? 'text-emerald-400 font-semibold' : 'hover:text-amber-400 text-slate-300'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Quick Move-In</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.2 text-[11px] font-mono text-emerald-400">
              {moveInReadyCount}
            </span>
          </Link>
          <button
            onClick={onOpenCompareDrawer}
            className={`flex items-center gap-1.5 transition whitespace-nowrap py-1 ${
              comparedCount > 0
                ? 'text-amber-400 font-semibold'
                : 'hover:text-amber-400 text-slate-300'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Compare</span>
            {comparedCount > 0 && (
              <span className="rounded-full bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 text-[10px] font-mono">
                {comparedCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenMortgageModal}
            className="hover:text-amber-400 transition whitespace-nowrap py-1"
          >
            Mortgage Estimator
          </button>
        </nav>

        {/* Spacious Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenTourDrawer()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule VIP Tour</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('communities', '/communities')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Communities
          </button>
          <button
            onClick={() => handleNavClick('regional-map')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Regional Map
          </button>
          <button
            onClick={() => handleNavClick('floor-plans', '/floor-plans')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Floor Plans & Elevations
          </button>
          <Link
            href="/quick-move-ins"
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-full items-center justify-between py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            <span>Quick Move-In Inventory</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-xs font-mono text-emerald-400">
              {moveInReadyCount} Available
            </span>
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenCompareDrawer()
            }}
            className="flex w-full items-center justify-between py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            <span>Compare Pinned Plans</span>
            {comparedCount > 0 && (
              <span className="rounded-full bg-amber-500 text-slate-950 font-bold px-2 py-0.5 text-xs font-mono">
                {comparedCount} Selected
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenMortgageModal()
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Mortgage Calculator
          </button>
        </div>
      )}
    </header>
  )
}
