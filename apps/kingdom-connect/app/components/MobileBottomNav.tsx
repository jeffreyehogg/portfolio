"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, DollarSign, Heart, BookOpen, LayoutDashboard } from "lucide-react";

const mobileNavItems = [
  { name: "Serve", href: "/serve", icon: Users, color: "text-indigo-600", activeBg: "bg-indigo-50" },
  { name: "Fund", href: "/fund", icon: DollarSign, color: "text-emerald-600", activeBg: "bg-emerald-50" },
  { name: "Prayer", href: "/prayer", icon: Heart, color: "text-rose-600", activeBg: "bg-rose-50" },
  { name: "Journal", href: "/journal", icon: BookOpen, color: "text-purple-600", activeBg: "bg-purple-50" },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-indigo-600", activeBg: "bg-indigo-50" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg safe-bottom"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? `${item.color} font-bold scale-105`
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? item.activeBg : ""}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
