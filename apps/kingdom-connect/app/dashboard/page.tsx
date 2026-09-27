import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { signups, events, funds, personalPrayers } from "@/db/schema";
import { eq, desc, sql, and, inArray } from "drizzle-orm";
import { Navbar } from "@/app/components/Navbar";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  HeartHandshake,
  BookOpen,
  Sparkles,
  Heart,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { CancelButton } from "./cancel-button";
import { CalendarButton } from "./calendar-button";
import { ImpactChart } from "./impact-chart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Kingdom Journey | Steward Dashboard",
  description: "View your upcoming ministry service commitments, community stewardship, and personal devotion schedule.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  // Fetch user's signups
  const userSignups = await db
    .select({
      signupId: signups.id,
      status: signups.status,
      event: events,
    })
    .from(signups)
    .leftJoin(events, eq(signups.eventId, events.id))
    .where(eq(signups.userId, effectiveUserId))
    .orderBy(desc(events.date));

  // Calculate Stats
  const totalHours = userSignups.length * 3;

  // Calculate Monthly Data for Chart
  const monthlyDataMap = new Map<string, number>();

  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthKey = d.toLocaleString("default", { month: "short" });
    monthlyDataMap.set(monthKey, 0);
  }

  userSignups.forEach((signup) => {
    if (signup.event) {
      const date = new Date(signup.event.date);
      const monthKey = date.toLocaleString("default", { month: "short" });

      if (monthlyDataMap.has(monthKey)) {
        const current = monthlyDataMap.get(monthKey) || 0;
        monthlyDataMap.set(monthKey, current + 3);
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
  const communityRaised = Number(globalImpact[0]?.totalRaised || 0);

  // Personal Prayer Journal Stats
  const activePrayers = await db
    .select({ count: sql<number>`count(*)` })
    .from(personalPrayers)
    .where(
      and(
        eq(personalPrayers.userId, effectiveUserId),
        inArray(personalPrayers.status, ["Pending", "Praying"])
      )
    );
  const activePrayersCount = Number(activePrayers[0]?.count || 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {!userId && (
          <div className="mb-8 p-5 rounded-3xl bg-indigo-50/90 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-indigo-950 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-indigo-950">
                  Previewing the Steward Dashboard (Guest Mode)
                </p>
                <p className="text-xs text-indigo-800/80 mt-0.5">
                  Showing sample service commitments and community generosity. Sign in to track your personal schedule permanently.
                </p>
              </div>
            </div>
            <Link
              href="/sign-in"
              className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition-all shadow-xs self-start sm:self-auto shrink-0"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            My Kingdom Journey
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Welcome back! Here is your upcoming service schedule, community stewardship, and personal devotions.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Commitments */}
          <div className="bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="relative z-10">
              <h2 className="text-indigo-100 text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Active Commitments
              </h2>
              <p className="text-4xl font-extrabold mt-3 tracking-tight font-mono">
                {userSignups.length}
              </p>
              <p className="text-xs text-indigo-200 mt-1">
                Upcoming outreach dates
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500" />
          </div>

          {/* Card 2: Hours */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 hover:shadow-xl hover:border-indigo-200 card-hover-glow transition-all relative overflow-hidden">
            <h2 className="text-slate-500 text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-600" /> Hours of Service
            </h2>
            <p className="text-4xl font-extrabold mt-3 text-slate-900 font-mono">
              {totalHours}
            </p>
            <p className="text-xs text-slate-500 mt-1">Invested in our community</p>
          </div>

          {/* Card 3: Impact */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 hover:shadow-xl hover:border-emerald-200 card-hover-glow transition-all relative overflow-hidden">
            <h2 className="text-slate-500 text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-600" /> Community Generosity
            </h2>
            <p className="text-4xl font-extrabold mt-3 text-emerald-600 font-mono">
              ${(communityRaised / 100).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Mobilized by Kingdom Fund
            </p>
          </div>

          {/* Card 4: Personal Prayer Journal */}
          <Link
            href="/journal"
            className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 hover:shadow-xl hover:border-purple-200 card-hover-glow transition-all relative overflow-hidden group"
          >
            <h2 className="text-slate-500 text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" /> Prayer Sanctuary
            </h2>
            <p className="text-4xl font-extrabold mt-3 text-slate-900 group-hover:text-purple-600 transition-colors font-mono">
              {activePrayersCount}
            </p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              Active petitions · Open sanctuary{" "}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </p>
          </Link>
        </div>

        {/* Content Grid: Schedule + Chart */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Signups List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">Your Service Schedule</h2>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono">
                {userSignups.length}
              </span>
            </div>

            {userSignups.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Your schedule is clear
                </h3>
                <p className="text-slate-500 mb-6 max-w-sm text-xs sm:text-sm leading-relaxed">
                  Stepping out in faith—even for one Saturday morning—can transform a neighbor&apos;s life and build lasting friendships in Christ.
                </p>
                <Link
                  href="/serve"
                  className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 text-xs"
                >
                  Explore Opportunities to Serve <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userSignups.map(
                  ({ signupId, status, event }) =>
                    event && (
                      <div
                        key={signupId}
                        className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg hover:border-indigo-100 transition-all duration-200 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`px-3 py-0.5 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider ${
                                status === "confirmed"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {status}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
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

                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {event.title}
                          </h3>

                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
                            <span className="flex items-center bg-slate-50 px-2.5 py-1 rounded-lg">
                              <Clock className="w-3.5 h-3.5 mr-2 text-indigo-500" />
                              9:00 AM - 12:00 PM
                            </span>
                            <span className="flex items-center bg-slate-50 px-2.5 py-1 rounded-lg">
                              <MapPin className="w-3.5 h-3.5 mr-2 text-indigo-500" />
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
                          <CalendarButton event={event} />
                          <CancelButton signupId={signupId} />
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>

          {/* Right Column: Chart */}
          <div className="lg:col-span-1">
            <ImpactChart data={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
}
