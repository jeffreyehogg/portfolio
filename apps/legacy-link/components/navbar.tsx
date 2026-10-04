'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 p-[1px] shadow-glow-indigo">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 font-mono text-[11px] font-bold text-cyan-400 transition-colors group-hover:bg-slate-900">
                  LL
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold tracking-tight text-white">
                  Legacy Link
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  • PACS middleware
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-1 md:flex">
              <Link
                href="/#sandbox"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-850 hover:text-white"
              >
                Live sandbox
              </Link>
              <Link
                href="/#estimator"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-850 hover:text-white"
              >
                Risk & ROI
              </Link>
              <Link
                href="/#matrix"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-850 hover:text-white"
              >
                Matrix
              </Link>
              <Link
                href="/#architecture"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-850 hover:text-white"
              >
                Architecture
              </Link>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-400 transition-colors hover:bg-indigo-950/40 hover:text-indigo-300"
                >
                  Console
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Live System Telemetry Badge */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ETL active</span>
            </div>

            {/* Auth Actions */}
            <SignedIn>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
              >
                Projects
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8 ring-2 ring-indigo-500/30',
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-glow-indigo transition-all hover:bg-indigo-500 active:scale-[0.98]">
                  <span>Sign in</span>
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900/80 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-slate-950/95 px-4 pb-5 pt-2 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1.5">
            <Link
              href="/#sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[40px] items-center rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              Live sandbox
            </Link>
            <Link
              href="/#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[40px] items-center rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              Risk & ROI
            </Link>
            <Link
              href="/#matrix"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[40px] items-center rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              Compatibility matrix
            </Link>
            <Link
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[40px] items-center rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              Architecture reference
            </Link>
            <SignedIn>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[40px] items-center rounded-lg bg-indigo-950/40 px-3 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/50"
              >
                Go to projects console →
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  )
}