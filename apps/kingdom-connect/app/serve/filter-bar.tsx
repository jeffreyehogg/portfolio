"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { useTransition, useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "all", label: "All Needs" },
  { id: "food", label: "Meals & Hospitality" },
  { id: "labor", label: "Hands & Trades" },
  { id: "supplies", label: "Relief & Community" },
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  // Debounced search (300ms)
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }

      startTransition(() => {
        router.replace(`/serve?${params.toString()}`);
      });
    }, 300);
  };

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(window.location.search);
    if (category && category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      router.replace(`/serve?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>
        <input
          type="text"
          placeholder="Search by role, task, or location..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search volunteer opportunities"
          className="block w-full pl-10 pr-4 py-2.5 min-h-[44px] border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-sm text-slate-900"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={`
              flex-1 md:flex-none px-4 py-2 min-h-[40px] text-xs font-bold rounded-lg transition-all active:scale-95 cursor-pointer
              ${
                currentCategory === cat.id
                  ? "bg-white text-indigo-700 shadow-xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
