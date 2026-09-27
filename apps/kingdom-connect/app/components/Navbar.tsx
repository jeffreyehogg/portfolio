"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Heart, Menu, X, Users, DollarSign, BookOpen, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Serve", href: "/serve", icon: Users, accent: "hover:text-indigo-600" },
  { name: "Kingdom Fund", href: "/fund", icon: DollarSign, accent: "hover:text-emerald-600" },
  { name: "Prayer Wall", href: "/prayer", icon: Heart, accent: "hover:text-rose-600" },
  { name: "Prayer Journal", href: "/journal", icon: BookOpen, accent: "hover:text-purple-600" },
  { name: "My Journey", href: "/dashboard", icon: LayoutDashboard, accent: "hover:text-indigo-600" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-700 group-hover:scale-105 transition-all shadow-xs">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                Kingdom<span className="text-indigo-600">Connect</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
                Faith in Action
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-1.5 items-center" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50/90 font-bold shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <link.icon className="w-4 h-4 opacity-75" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="ml-3 pl-3 border-l border-slate-200">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-xs hover:shadow-md transform hover:-translate-y-0.5 active:scale-95">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </nav>

          {/* Mobile Menu Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Backdrop Scrim */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end" id="mobile-drawer">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                    <Heart className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-base text-slate-900">
                    Kingdom<span className="text-indigo-600">Connect</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="py-6 space-y-1.5">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50 font-bold"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5 text-indigo-500" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-bold shadow-xs transition-all">
                    Sign In / Register
                  </button>
                </SignInButton>
              </SignedOut>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[11px] text-slate-500 italic">
                  &quot;One Body · Many Gifts · United in Christ&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
