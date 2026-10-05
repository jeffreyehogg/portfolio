import { Navbar } from "@/app/components/Navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EventForm } from "./event-form";
import { FundForm } from "./fund-form";
import { db } from "@/lib/db";
import { events, funds } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Calendar, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ministry Leadership Portal",
  description: "Equipping the saints for the work of ministry.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const { userId } = await auth();

  // Basic protection: Must be logged in
  if (!userId) {
    redirect("/");
  }

  // Admin access gate
  if (process.env.ADMIN_USER_ID && userId !== process.env.ADMIN_USER_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Access Restricted</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            This area is reserved for verified Ministry Directors and Church Administrators.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Fetch recent events to show the list
  const recentEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .limit(5);

  // Fetch active funds
  const activeFunds = await db
    .select()
    .from(funds)
    .orderBy(desc(funds.id))
    .limit(5);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Administrative oversight
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Ministry Leadership Portal
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            &ldquo;To equip the saints for the work of ministry, for building up the body of Christ.&rdquo;{" "}
            <span className="font-serif italic text-indigo-900 font-semibold">— Ephesians 4:12</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Creation Tools */}
          <div className="space-y-8">
            <EventForm />
            <FundForm />
          </div>

          {/* Right Column: Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Events List */}
            <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
                <h2 className="font-bold text-slate-900 text-sm">
                  Recent Published Opportunities
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {recentEvents.map((event) => (
                  <div key={event.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {event.title}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span className="mx-2">·</span>
                        <span className="text-slate-400">{event.location}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 capitalize">
                      {event.category}
                    </span>
                  </div>
                ))}
                {recentEvents.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    No active service opportunities found.
                  </div>
                )}
              </div>
            </div>

            {/* Funds List */}
            <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
                <h2 className="font-bold text-slate-900 text-sm">Active Kingdom Funds</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {activeFunds.map((fund) => {
                  const pct = Math.min(100, Math.round(((fund.raised || 0) / fund.goal) * 100));

                  return (
                    <div key={fund.id} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900">
                          {fund.title}
                        </div>
                        <div
                          className="w-full bg-slate-100 rounded-full h-2 mt-2 max-w-xs overflow-hidden"
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Funding progress for ${fund.title}`}
                        >
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold font-mono text-emerald-700">
                          ${((fund.raised || 0) / 100).toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          of ${(fund.goal / 100).toLocaleString()} ({pct}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
                {activeFunds.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    No active Kingdom funds found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
