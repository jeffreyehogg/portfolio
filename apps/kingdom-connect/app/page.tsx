import Link from "next/link";
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
} from "lucide-react";
import { db } from "@/lib/db";
import { events } from "@/db/schema";
import { desc, gt } from "drizzle-orm";

export default async function Home() {
  // Fetch next 3 upcoming events
  const upcomingEvents = await db
    .select()
    .from(events)
    .where(gt(events.date, new Date())) // Only future events
    .orderBy(desc(events.date)) // Or asc(events.date) to show nearest
    .limit(3);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-slate-950 overflow-hidden text-white border-b border-indigo-950/60">
        {/* Ambient atmospheric radial glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32 z-10">
          <div className="md:w-3/4 lg:w-2/3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-6 backdrop-blur-md shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Unified Faith & Community Platform
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Connect Your Gifts to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
                Kingdom Needs
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light">
              Find where you fit in the body of Christ. Whether it&apos;s cooking a
              meal, building community, funding a mission, or interceding in prayer—your service matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/serve"
                className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Find a Place to Serve
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/journal"
                className="bg-slate-900/80 border border-slate-700/80 text-slate-200 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-slate-800 hover:text-white transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Prayer Journal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Card Unified Platform Feature Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold mb-2">
            Integrated Ministry Suite
          </h2>
          <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Four Core Pillars of Service
          </p>
          <p className="text-sm text-gray-500 mt-2">
            A cohesive serverless platform unifying community volunteering, crowd funding, public prayer, and personal devotion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {/* Card 1: Volunteer Board */}
          <div className="bg-white p-7 rounded-2xl shadow-xs border border-gray-100 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all group flex flex-col justify-between">
            <div>
              <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-100 transition-all text-indigo-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Volunteer Board
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Real-time volunteer needs from local churches and ministries. Filter by skill, category, and availability.
              </p>
            </div>
            <Link
              href="/serve"
              className="text-indigo-600 font-semibold text-sm inline-flex items-center hover:text-indigo-700"
            >
              Browse Needs <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Kingdom Fund */}
          <div className="bg-white p-7 rounded-2xl shadow-xs border border-gray-100 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all group flex flex-col justify-between">
            <div>
              <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-100 transition-all text-emerald-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Kingdom Fund
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Transparent crowdfunding for verified church projects and outreach missions. Real-time progress telemetry.
              </p>
            </div>
            <Link
              href="/fund"
              className="text-emerald-600 font-semibold text-sm inline-flex items-center hover:text-emerald-700"
            >
              View Projects <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Community Prayer Wall */}
          <div className="bg-white p-7 rounded-2xl shadow-xs border border-gray-100 hover:shadow-xl hover:border-rose-200 hover:-translate-y-1 transition-all group flex flex-col justify-between">
            <div>
              <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-rose-100 transition-all text-rose-600">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Prayer Wall
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Post community petitions, lift up requests in intercession, and tap to let believers know you prayed.
              </p>
            </div>
            <Link
              href="/prayer"
              className="text-rose-600 font-semibold text-sm inline-flex items-center hover:text-rose-700"
            >
              Join in Prayer <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 4: Personal Prayer Journal */}
          <div className="bg-white p-7 rounded-2xl shadow-xs border border-gray-100 hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all group flex flex-col justify-between">
            <div>
              <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-100 transition-all text-purple-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Prayer Journal
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Private drag-and-drop journal to prioritize prayer petitions, document reflections, and record answered prayers.
              </p>
            </div>
            <Link
              href="/journal"
              className="text-purple-600 font-semibold text-sm inline-flex items-center hover:text-purple-700"
            >
              Open Journal <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="border-t border-gray-200/80 pt-16">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-mono uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Ministry Needs
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured Opportunities
                </h2>
              </div>
              <Link
                href="/serve"
                className="text-indigo-600 font-semibold text-sm hover:underline hidden sm:inline-flex items-center gap-1"
              >
                View all opportunities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Link
                  href="/serve"
                  key={event.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all group flex flex-col"
                >
                  <div className="h-44 bg-gray-100 relative overflow-hidden">
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold font-mono uppercase tracking-wider bg-slate-950/75 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                        {event.description}
                      </p>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-indigo-500" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
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
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/serve"
                className="text-indigo-600 font-semibold text-sm hover:underline"
              >
                View all opportunities &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
