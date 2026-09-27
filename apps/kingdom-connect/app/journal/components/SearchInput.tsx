"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { useTransition, useState, useEffect, useRef } from "react";

export function SearchInput({ defaultValue = "" }: { defaultValue?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentSearch = defaultValue || searchParams.get("search")?.toString() || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchTerm(searchParams.get("search")?.toString() || "");
  }, [searchParams]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term.trim()) {
        params.set("search", term.trim());
      } else {
        params.delete("search");
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 300);
  };

  return (
    <div className="relative w-full sm:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>
      <input
        type="text"
        placeholder="Search petitions &amp; scriptures..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        aria-label="Search prayers and scripture notes"
        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all shadow-2xs"
      />
    </div>
  );
}
