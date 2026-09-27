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
              className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 p-[1px] shadow-glow-indigo">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 font-mono text-xs font-black tracking-wider text-cyan-400 transition-colors group-hover:bg-slate-900">
                  LL
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white">
                  Legacy Link
                </span>
                <span className="font-mono text-[10px] tracking-wider text-slate-400">
                  PACS Middleware
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-1 md:flex">
              <Link
                href="/#sandbox"
                className="rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
              >
                Live Sandbox
              </Link>
              <Link
                href="/#estimator"
                className="rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
              >
                Risk & ROI
              </Link>
              <Link
                href="/#matrix"
                className="rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
              >
                Matrix
              </Link>
              <Link
                href="/#architecture"
                className="rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
              >
                Architecture
              </Link>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-indigo-400 transition-colors hover:bg-indigo-950/40 hover:text-indigo-300"
                >
                  Console
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Live System Telemetry Badge */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-mono font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>ETL Active</span>
            </div>

            {/* Auth Actions */}
            <SignedIn>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
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
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:bg-indigo-500 active:scale-[0.98]">
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900/80 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-slate-950/95 px-4 pb-6 pt-3 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/#sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Live PACS Sandbox
            </Link>
            <Link
              href="/#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Risk & ROI Estimator
            </Link>
            <Link
              href="/#matrix"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              PACS Compatibility Matrix
            </Link>
            <Link
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              System Architecture
            </Link>
            <SignedIn>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg bg-indigo-950/40 px-3 py-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-900/50"
              >
                Go to Projects Console →
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  )
}