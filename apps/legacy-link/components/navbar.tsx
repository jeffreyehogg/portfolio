'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px]">
                <div className="h-full w-full bg-slate-950 rounded-[7px] flex items-center justify-center font-mono text-[10px] font-bold text-cyan-400">
                  LL
                </div>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                Legacy Link
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <Link
                href="/#sandbox"
                className="rounded-lg px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Converter
              </Link>
              <Link
                href="/#architecture"
                className="rounded-lg px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                How it works
              </Link>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="rounded-lg px-2.5 py-1 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 transition-colors font-medium"
                >
                  Projects console
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
              >
                Projects
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-7 w-7 ring-2 ring-indigo-500/30',
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-indigo-500 active:scale-[0.98]">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 hover:text-white sm:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-slate-950/95 px-4 py-3 backdrop-blur-2xl sm:hidden flex flex-col gap-2 text-xs">
          <Link
            href="/#sandbox"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-slate-200"
          >
            Converter
          </Link>
          <Link
            href="/#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-slate-200"
          >
            How it works
          </Link>
          <SignedIn>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-indigo-300 font-medium"
            >
              Projects console →
            </Link>
          </SignedIn>
        </div>
      )}
    </nav>
  )
}