import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { events, signups } from "@/db/schema";
import { Calendar, MapPin, ChefHat, Hammer, Heart } from "lucide-react";
import { SignupButton } from "./signup-button";
import { auth } from "@clerk/nextjs/server";
import { eq, and, ilike, or, desc } from "drizzle-orm";
import { FilterBar } from "./filter-bar";

// Props interface for search params
interface ServePageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

export default async function ServePage({ searchParams }: ServePageProps) {
  const { userId } = await auth();

  // Await searchParams (Next.js 15+ requirement, good practice for future)
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";

  // --- Dynamic Filtering Logic ---
  const conditions = [];

  if (category && category !== "all") {
    conditions.push(eq(events.category, category));
  }

  if (query) {
    conditions.push(
      or(
        ilike(events.title, `%${query}%`),
        ilike(events.description, `%${query}%`),
        ilike(events.location, `%${query}%`)
      )
    );
  }

  // Execute Query with filters
  const eventList = await db
    .select()
    .from(events)
    .where(and(...conditions))
    .orderBy(desc(events.date));

  // Fetch user's existing signups
  let userSignupIds: number[] = [];
  if (userId) {
    const userSignups = await db
      .select({ eventId: signups.eventId })
      .from(signups)
      .where(eq(signups.userId, userId));
    userSignupIds = userSignups.map((s) => s.eventId || 0);
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "food":
        return <ChefHat className="h-5 w-5 text-orange-500" />;
      case "labor":
        return <Hammer className="h-5 w-5 text-blue-500" />;
      default:
        return <Heart className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Board</h1>
            <p className="text-gray-600 mt-2">
              Find a place to use your gifts.
            </p>
          </div>
        </div>

        {/* Add the Filter Bar here */}
        <FilterBar />

        {eventList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              No opportunities found matching your criteria.
            </p>
            <a
              href="/serve"
              className="text-indigo-600 font-medium mt-2 inline-block hover:underline"
            >
              Clear filters
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventList.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300 group"
              >
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100" />
                  )}

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1 border border-gray-100">
                    {getCategoryIcon(event.category)}
                    <span className="capitalize">{event.category}</span>
                  </div>
                </div>

                <div className="p-5 grow flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2.5 text-sm text-gray-600 mt-auto">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2.5 text-indigo-500" />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2.5 text-indigo-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50">
                    {userSignupIds.includes(event.id) ? (
                      <button
                        disabled
                        className="w-full bg-green-50 text-green-700 border border-green-200 py-2 rounded-lg font-medium cursor-default flex justify-center items-center gap-2"
                      >
                        <Heart className="h-4 w-4 fill-current" /> Registered
                      </button>
                    ) : (
                      <SignupButton eventId={event.id} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
