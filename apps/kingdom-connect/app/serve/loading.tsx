import { Navbar } from "@/app/components/Navbar";
import { EventsGridSkeleton } from "@/app/components/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-lg w-64 animate-pulse" />
          </div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between h-[72px]">
          <div className="w-full md:max-w-md h-9 bg-gray-50 rounded-lg animate-pulse border border-gray-100" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-16 bg-gray-100 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <EventsGridSkeleton />
      </div>
    </div>
  );
}
