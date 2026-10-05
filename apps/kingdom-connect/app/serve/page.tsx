import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { events, signups } from "@/db/schema";
import { Calendar, MapPin, ChefHat, Hammer, Heart, Users, Sparkles, Package } from "lucide-react";
import { SignupButton } from "./signup-button";
import { auth } from "@clerk/nextjs/server";
import { eq, and, ilike, or, desc } from "drizzle-orm";
import { FilterBar } from "./filter-bar";
import { SpiritualGiftsModal } from "./matcher/spiritual-gifts-modal";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Board & Volunteer Opportunities",
  description:
    "Find where your gifts fit in the Body of Christ. Discover local outreach, meals ministry, skilled repairs, and community care teams.",
};

interface ServePageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function ServePage({ searchParams }: ServePageProps) {
  const { userId } = await auth();
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";

  // Dynamic filtering logic
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

  const eventList = await db
    .select()
    .from(events)
    .where(and(...conditions))
    .orderBy(desc(events.date));

  // User's existing signups
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
        return <ChefHat className="h-4 w-4 text-amber-500" />;
      case "labor":
        return <Hammer className="h-4 w-4 text-blue-500" />;
      case "supplies":
        return <Package className="h-4 w-4 text-emerald-500" />;
      default:
        return <Heart className="h-4 w-4 text-rose-500" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "food":
        return "Meals & Hospitality";
      case "labor":
        return "Hands & Trades";
      case "supplies":
        return "Relief Logistics";
      default:
        return cat;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-semibold mb-1">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Hands &amp; feet of Jesus</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Serve our city
          </h1>
          <p className="text-slate-600 mt-1 max-w-xl text-sm leading-relaxed">
            Find where your gifts fit. Discover local outreach teams, meals ministry, and skilled repairs.
          </p>

          {/* First-Time Volunteer Progressive Disclosure */}
          <details className="group mt-2.5 text-xs text-slate-500 cursor-pointer">
            <summary className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium select-none">
              <span className="group-open:hidden">First time serving? Show newcomer details ▾</span>
              <span className="hidden group-open:inline">Hide newcomer details ▴</span>
            </summary>
            <div className="mt-2 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-slate-600 max-w-xl leading-relaxed">
              No church membership or prior volunteer experience required. Every team provides on-site orientation, all tools, and a friendly team lead to guide you.
            </div>
          </details>
        </div>

        {/* Interactive Feature: 60-Second Spiritual Gifts Matcher */}
        <SpiritualGiftsModal />

        {/* Filter and Search Bar */}
        <FilterBar />

        {/* Results Grid */}
        {eventList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No opportunities found matching your criteria
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Try adjusting your search terms or view all active volunteer needs across the city.
            </p>
            <Link
              href="/serve"
              className="mt-4 inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
            >
              Reset All Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventList.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-indigo-200 card-hover-glow transition-all duration-300 group"
              >
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-400">
                      <Users className="w-10 h-10 opacity-40" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5 border border-slate-100">
                    {getCategoryIcon(event.category)}
                    <span>{getCategoryLabel(event.category)}</span>
                  </div>
                </div>

                <div className="p-6 grow flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-600 mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2.5 text-indigo-500 shrink-0" />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    {userSignupIds.includes(event.id) ? (
                      <button
                        disabled
                        className="w-full bg-emerald-50 text-emerald-700 border border-emerald-200 py-2.5 rounded-xl font-bold text-xs cursor-default flex justify-center items-center gap-2 shadow-2xs"
                      >
                        <Heart className="h-3.5 w-3.5 fill-current" /> Registered
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
      </main>
    </div>
  );
}
