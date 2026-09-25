"use client";

import Link from "next/link";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Keep 'relative' so the dropdown can anchor to this container
    <nav className="relative bg-white border-b border-indigo-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-indigo-900 tracking-tight">
              Kingdom Connect
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          {/* CHANGED BACK TO 'md:flex': Shows on laptop screens (768px+) */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/serve"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Serve
            </Link>
            <Link
              href="/fund"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Kingdom Fund
            </Link>
            <Link
              href="/prayer"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Prayer Wall
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Dashboard
            </Link>

            <div className="ml-4">
              <SignedIn>
                <UserButton  />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          {/* CHANGED BACK TO 'md:hidden': Hides on laptop screens (768px+) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN - COMPACT CARD STYLE */}
      {/* 1. right-4: Anchors to the right side (under the hamburger button) */}
      {/* 2. w-64: Fixed width (no longer full screen) */}
      {/* 3. rounded-xl: Rounded corners for a card look */}
      {isOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 md:hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 space-y-1">
            <Link
              href="/serve"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Find Opportunities
            </Link>
            <Link
              href="/fund"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Kingdom Fund
            </Link>
            <Link
              href="/prayer"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Prayer Wall
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </div>

          <div className="border-t border-gray-100 p-2 bg-gray-50 rounded-b-xl">
            <SignedIn>
              <div className="flex items-center gap-3 px-3 py-2">
                <UserButton  />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account
                </span>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-bold shadow-sm transition-all">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
