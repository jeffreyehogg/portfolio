import Link from "next/link";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import {
  ArrowRight,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Heart,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Compass,
} from "lucide-react";
import { db } from "@/lib/db";
import { events, funds } from "@/db/schema";
import { desc, gt, sql } from "drizzle-orm";

export default async function Home() {
  // Fetch upcoming future events
  const upcomingEvents = await db
    .select()
    .from(events)
    .where(gt(events.date, new Date()))
    .orderBy(events.date)
    .limit(3);

  // Fallback to all latest events if none in the future
  const displayEvents =
    upcomingEvents.length > 0
      ? upcomingEvents
      : await db.select().from(events).orderBy(desc(events.date)).limit(3);

  // Community total raised
  const fundTotals = await db
    .select({ total: sql<number>`sum(${funds.raised})` })
    .from(funds);
  const totalRaised = Number(fundTotals[0]?.total || 0);

  // Schema.org Event structured data
  const eventSchemas = displayEvents.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: new Date(event.date).toISOString(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: "Kingdom Connect Community",
      url: "https://kingdom.jeffhogg.com",
    },
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {eventSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchemas) }}
        />
      )}

      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-slate-950 overflow-hidden text-white border-b border-indigo-950/60">
          {/* Ambient atmospheric radial glows */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20 sm:py-28 z-10">
            <div className="md:w-4/5 lg:w-3/4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                One Body · Many Gifts · United in Christ
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                Connect your gifts to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
                  kingdom purpose
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed font-light">
                Join local outreach teams, fund urgent neighborhood initiatives, or lift burdens on the community prayer wall.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <Link
                  href="/serve"
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] w-fit"
                >
                  <span>Find a Place to Serve</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/prayer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 px-5 py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur-md hover:-translate-y-0.5 active:scale-[0.98] w-fit"
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Prayer Wall</span>
                </Link>
              </div>

              {/* Quick Jump Bar */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-6">
                <span className="text-slate-400 font-medium">Quick jump:</span>
                <Link
                  href="/serve"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors active:scale-[0.98]"
                >
                  Hands-on service
                </Link>
                <Link
                  href="/fund"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors active:scale-[0.98]"
                >
                  Kingdom fund
                </Link>
                <Link
                  href="/prayer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors active:scale-[0.98]"
                >
                  Prayer wall
                </Link>
                <Link
                  href="/journal"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors active:scale-[0.98]"
                >
                  Prayer sanctuary
                </Link>
              </div>

              {/* Newcomer Hospitality Assurance */}
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/40 border border-slate-800/80 px-4 py-2.5 rounded-xl backdrop-blur-xs max-w-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <p>
                  <span className="font-medium text-slate-200">First time serving?</span> No experience required. Every team provides on-site orientation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Asymmetric Modern Bento Grid: Four Pillars of Service */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="pillars-heading">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 id="pillars-heading" className="text-xs font-semibold text-indigo-600 mb-2">
              Faith in action
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four ways to love God and neighbor
            </p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Tangible expressions of fellowship, prayer, and hands-on service across our city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
            {/* Bento Card 1: Volunteer Board (Large, 2 cols on md/lg) */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-300 card-hover-glow flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl group-hover:scale-105 group-hover:bg-indigo-100 transition-all">
                    <Users className="h-7 w-7" />
                  </div>
                  <span className="bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Hands-on service
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  Volunteer in our community
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Serve alongside neighbors meeting tangible community needs—from hot meals and supply drives to skilled home repairs.
                </p>

                {/* Sub-feature teaser: 60-second matcher */}
                <Link
                  href="/serve"
                  className="bg-slate-50 hover:bg-indigo-50/50 rounded-2xl p-4 border border-slate-100 mb-6 flex items-center justify-between gap-4 transition-colors group/quiz"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700">
                      Not sure where to start? Take the 60-second gifts matcher.
                    </span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 shrink-0 group-hover/quiz:translate-x-0.5 transition-transform">Start &rarr;</span>
                </Link>
              </div>

              <Link
                href="/serve"
                className="inline-flex items-center justify-between text-indigo-600 hover:text-indigo-700 font-bold text-sm pt-4 border-t border-slate-100"
              >
                <span>Browse service opportunities</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bento Card 2: Kingdom Fund (1 col) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 card-hover-glow flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl group-hover:scale-105 group-hover:bg-emerald-100 transition-all">
                    <DollarSign className="h-7 w-7" />
                  </div>
                  <span className="bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Stewardship
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  The Kingdom Fund
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Practice joyful stewardship. 100% of every dollar directly funds local outreach with verified financial integrity.
                </p>

                {totalRaised > 0 && (
                  <div className="mb-6 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                    <span className="text-xs text-emerald-800 font-medium block">
                      Community generosity
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-700">
                      ${(totalRaised / 100).toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-600 ml-1 font-medium">mobilized</span>
                  </div>
                )}
              </div>

              <Link
                href="/fund"
                className="inline-flex items-center justify-between text-emerald-600 hover:text-emerald-700 font-bold text-sm pt-4 border-t border-slate-100"
              >
                <span>View verified projects</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bento Card 3: Community Prayer Wall (1 col) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 card-hover-glow flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-rose-50 text-rose-600 p-3 rounded-2xl group-hover:scale-105 group-hover:bg-rose-100 transition-all">
                    <Heart className="h-7 w-7" />
                  </div>
                  <span className="bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Prayer wall
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
                  Prayer Wall
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Post petitions, stand in the gap for others with one tap, and celebrate answered breakthroughs together.
                </p>
              </div>

              <Link
                href="/prayer"
                className="inline-flex items-center justify-between text-rose-600 hover:text-rose-700 font-bold text-sm pt-4 border-t border-slate-100"
              >
                <span>Join in prayer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bento Card 4: Personal Prayer Sanctuary (Large, spanning 2 cols or full on mobile) */}
            <div className="md:col-span-3 lg:col-span-4 bg-linear-to-r from-purple-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-purple-500/20 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-medium mb-4">
                  <BookOpen className="w-3.5 h-3.5 text-purple-300" />
                  Private devotion
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  Personal Prayer Sanctuary
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                  Cultivate an unhurried, quiet life with God. Prioritize your daily petitions with intuitive drag-and-drop focus, anchor Scripture promises, and remember God&apos;s faithfulness.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-purple-200">
                  <span className="flex items-center gap-1.5 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-800/60 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Daily focus sorting
                  </span>
                  <span className="flex items-center gap-1.5 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-800/60 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Answered prayer archive
                  </span>
                  <span className="flex items-center gap-1.5 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-800/60 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Interactive demo ready
                  </span>
                </div>
              </div>

              <div className="relative z-10 shrink-0">
                <Link
                  href="/journal"
                  className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98] inline-flex items-center justify-center gap-2 text-sm w-fit"
                >
                  <span>Open your sanctuary</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Upcoming Opportunities */}
          {displayEvents.length > 0 && (
            <div className="border-t border-slate-200/80 pt-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    Verified local outreach
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Featured opportunities to serve
                  </h2>
                </div>
                <Link
                  href="/serve"
                  className="text-indigo-600 font-bold text-sm hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  View all opportunities <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayEvents.map((event) => (
                  <Link
                    href="/serve"
                    key={event.id}
                    className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-200 card-hover-glow flex flex-col group"
                  >
                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-400">
                          <Users className="w-10 h-10 opacity-50" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-xs font-semibold bg-slate-950/80 text-white backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-xs capitalize">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {event.description}
                        </p>
                      </div>

                      <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-2 text-indigo-500" />
                          <span>
                            {new Date(event.date).toLocaleDateString(undefined, {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-indigo-500" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
