"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Serve", href: "/serve" },
  { name: "Kingdom Fund", href: "/fund" },
  { name: "Prayer Wall", href: "/prayer" },
  { name: "Prayer Journal", href: "/journal" },
  { name: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-indigo-100/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-700 group-hover:scale-105 transition-all shadow-xs">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-indigo-950 tracking-tight">
              Kingdom<span className="text-indigo-600">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2 items-center" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50/80 font-bold"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="ml-4 pl-4 border-l border-gray-200">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-xs hover:shadow-md transform hover:-translate-y-0.5">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 md:hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          <div className="p-2 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50/90 font-bold"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-100 p-3 bg-gray-50 rounded-b-2xl">
            <SignedIn>
              <div className="flex items-center gap-3 px-2 py-1">
                <UserButton />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  My Profile
                </span>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-bold shadow-xs transition-all">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
