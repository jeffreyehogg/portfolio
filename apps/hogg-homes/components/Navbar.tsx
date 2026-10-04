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
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Streamlined Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:border-amber-400/40 transition-colors">
            <Home className="h-4 w-4" />
          </div>
          <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
            HOGG<span className="text-amber-400">HOMES</span>
          </span>
        </Link>

        {/* Clean, Simple Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('floor-plans', '/floor-plans')}
            className={`transition py-1 ${
              pathname?.startsWith('/floor-plans')
                ? 'text-amber-400 font-semibold'
                : 'hover:text-white text-slate-300'
            }`}
          >
            Floor Plans
          </button>
          <button
            onClick={() => handleNavClick('communities', '/communities')}
            className={`transition py-1 ${
              pathname?.startsWith('/communities')
                ? 'text-amber-400 font-semibold'
                : 'hover:text-white text-slate-300'
            }`}
          >
            Communities
          </button>
          <button
            onClick={() => handleNavClick('quick-move-ins', '/quick-move-ins')}
            className={`transition py-1 ${
              pathname === '/quick-move-ins'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-white text-slate-300'
            }`}
          >
            Move-In Ready
          </button>
          <button
            onClick={() => handleNavClick('regional-map')}
            className="hover:text-white text-slate-300 transition py-1"
          >
            Locations
          </button>

          {comparedCount > 0 && (
            <button
              onClick={onOpenCompareDrawer}
              className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition"
            >
              <Layers className="h-3.5 w-3.5 text-amber-400" />
              <span>Compare ({comparedCount})</span>
            </button>
          )}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenTourDrawer()}
            className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-slate-950 transition-colors shadow-sm"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule Tour</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('floor-plans', '/floor-plans')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Floor Plans
          </button>
          <button
            onClick={() => handleNavClick('communities', '/communities')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Communities
          </button>
          <button
            onClick={() => handleNavClick('quick-move-ins', '/quick-move-ins')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Move-In Ready Homes
          </button>
          <button
            onClick={() => handleNavClick('regional-map')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Locations
          </button>
          {comparedCount > 0 && (
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCompareDrawer()
              }}
              className="flex w-full items-center justify-between py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
            >
              <span>Compare Plans</span>
              <span className="rounded-full bg-amber-500 text-slate-950 font-bold px-2 py-0.5 text-xs">
                {comparedCount}
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  )
}
