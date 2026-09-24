import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { signups, events, funds } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { Navbar } from "@/app/components/Navbar";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  HeartHandshake,
  Zap,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CancelButton } from "./cancel-button";
import { CalendarButton } from "./calendar-button";
import { ImpactChart } from "./impact-chart"; // New Import

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch user's signups
  const userSignups = await db
    .select({
      signupId: signups.id,
      status: signups.status,
      event: events,
    })
    .from(signups)
    .leftJoin(events, eq(signups.eventId, events.id))
    .where(eq(signups.userId, userId))
    .orderBy(desc(events.date));

  // --- Calculate Stats ---
  const totalHours = userSignups.length * 3;

  // --- NEW: Calculate Monthly Data for Chart ---
  const monthlyDataMap = new Map<string, number>();

  // Initialize last 6 months with 0
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthKey = d.toLocaleString("default", { month: "short" });
    monthlyDataMap.set(monthKey, 0);
  }

  // Fill in real data
  userSignups.forEach((signup) => {
    if (signup.event) {
      const date = new Date(signup.event.date);
      const monthKey = date.toLocaleString("default", { month: "short" });

      // Only count if it's in our 6-month window
      if (monthlyDataMap.has(monthKey)) {
        const current = monthlyDataMap.get(monthKey) || 0;
        monthlyDataMap.set(monthKey, current + 3); // Assume 3 hours/event
      }
    }
  });

  const chartData = Array.from(monthlyDataMap.entries()).map(
    ([month, hours]) => ({
      month,
      hours,
    })
  );

  // Global Impact Stats
  const globalImpact = await db
    .select({ totalRaised: sql<number>`sum(${funds.raised})` })
    .from(funds);
  const communityRaised = globalImpact[0].totalRaised || 0;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here is your upcoming service schedule.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Upcoming Events (Gradient) */}
          <div className="bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="relative z-10">
              <h3 className="text-indigo-100 font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Upcoming Events
              </h3>
              <p className="text-4xl font-extrabold mt-3 tracking-tight">
                {userSignups.length}
              </p>
              <p className="text-sm text-indigo-200 mt-1">
                Scheduled commitments
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-20 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
          </div>

          {/* Card 2: Hours */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
            <h3 className="text-gray-500 font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-500" /> Service Hours
            </h3>
            <p className="text-4xl font-extrabold mt-3 text-gray-900">
              {totalHours}
            </p>
            <p className="text-sm text-gray-400 mt-1">Estimated impact hours</p>
            <div className="absolute right-4 bottom-4 text-gray-50 opacity-20">
              <Zap className="w-16 h-16" />
            </div>
          </div>

          {/* Card 3: Impact */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
            <h3 className="text-gray-500 font-medium flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-emerald-500" /> Community
              Impact
            </h3>
            <p className="text-4xl font-extrabold mt-3 text-emerald-600">
              ${(communityRaised / 100).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Raised by Kingdom Connect
            </p>
          </div>
        </div>

        {/* Content Grid: Chart + List */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Signups List (Takes up 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">Your Schedule</h2>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {userSignups.length}
              </span>
            </div>

            {userSignups.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 flex flex-col items-center text-center hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  No active signups
                </h3>
                <p className="text-gray-500 mb-8 max-w-sm">
                  You haven't signed up for any service opportunities yet.
                </p>
                <Link
                  href="/serve"
                  className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  Browse Opportunities <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userSignups.map(
                  ({ signupId, status, event }) =>
                    event && (
                      <div
                        key={signupId}
                        className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg hover:border-indigo-100 transition-all duration-200 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                                status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {status}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">
                              {new Date(event.date).toLocaleDateString(
                                undefined,
                                {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {event.title}
                          </h3>

                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                              9:00 AM - 12:00 PM
                            </span>
                            <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                              <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <CalendarButton event={event} />
                          <CancelButton signupId={signupId} />
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>

          {/* Right Column: Chart (Takes up 1 col) */}
          <div className="lg:col-span-1">
            <ImpactChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
