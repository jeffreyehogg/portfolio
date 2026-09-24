"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { useTransition } from "react";

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "all";
  const currentSearch = searchParams.get("q") || "";

  // Update URL params
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.replace(`/serve?${params.toString()}`);
    });
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
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search opportunities..."
          defaultValue={currentSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {["all", "food", "labor", "supplies"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`
              px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all
              ${
                currentCategory === cat
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
