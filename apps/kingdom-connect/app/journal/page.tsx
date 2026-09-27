import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { personalPrayers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, asc, ilike, inArray } from "drizzle-orm";
import { AddPrayerForm } from "./components/AddPrayerForm";
import { PrayerList } from "./components/PrayerList";
import { SearchInput } from "./components/SearchInput";
import Link from "next/link";
import { BookOpen, CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { PersonalPrayer, PrayerStatus } from "./types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Prayer Sanctuary | Personal Devotions",
  description: "A private digital sanctuary for personal prayer petitions, scripture reflections, and answered prayers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  const { search } = await searchParams;
  const searchFilter = search ? `%${search}%` : undefined;

  const conditions = [
    eq(personalPrayers.userId, effectiveUserId),
    inArray(personalPrayers.status, ["Pending", "Praying"]),
  ];

  if (searchFilter) {
    conditions.push(ilike(personalPrayers.title, searchFilter));
  }

  const rawPrayers = await db
    .select()
    .from(personalPrayers)
    .where(and(...conditions))
    .orderBy(asc(personalPrayers.sortOrder));

  const prayers: PersonalPrayer[] = rawPrayers.map((p) => ({
    id: p.id,
    userId: p.userId,
    title: p.title,
    status: p.status as PrayerStatus,
    category: p.category,
    sortOrder: p.sortOrder,
    createdAt: p.createdAt,
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Unauthenticated Demo Mode Banner */}
        {!userId && (
          <div className="mb-8 p-5 rounded-3xl bg-purple-50/90 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-purple-950 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-purple-600 text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-purple-950">
                  Your Personal Prayer Sanctuary (Interactive Demo)
                </p>
                <p className="text-xs text-purple-800/80 mt-0.5">
                  Feel free to add petitions, drag to prioritize daily focus, and anchor scripture. Sign in to save across devices.
                </p>
              </div>
            </div>
            <Link
              href="/sign-in"
              className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0 self-start sm:self-auto"
            >
              Sign In to Save
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="p-2 rounded-2xl bg-purple-100 text-purple-700 shadow-2xs">
                <BookOpen className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Prayer Sanctuary
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Your private sanctuary for prayers, reflections, and answered petitions.
            </p>
          </div>

          <AddPrayerForm />
        </div>

        {/* Navigation Tabs & Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <Link
              href="/journal"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all bg-white text-purple-700 shadow-xs"
            >
              <Clock className="w-3.5 h-3.5" />
              Active Prayers ({prayers.length})
            </Link>
            <Link
              href="/journal/answered"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all text-slate-600 hover:text-slate-900"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Answered Memorials
            </Link>
          </div>

          <SearchInput defaultValue={search} />
        </div>

        {/* Scripture Anchor Quote */}
        <div className="bg-linear-to-r from-purple-50/80 to-indigo-50/50 border-l-4 border-purple-500 p-4 rounded-r-2xl mb-8">
          <p className="text-xs sm:text-sm italic text-purple-950 font-serif">
            &ldquo;Devote yourselves to prayer, being watchful and thankful.&rdquo;
          </p>
          <p className="text-xs font-bold font-mono text-purple-600 mt-1 uppercase tracking-wider">
            Colossians 4:2
          </p>
        </div>

        {/* Sortable Prayer List */}
        <PrayerList
          prayers={prayers}
          emptyMessage={
            search
              ? `No active prayers matched "${search}".`
              : "Your sanctuary is waiting for its first prayer. Click 'Add Prayer' to commit a petition to God!"
          }
        />
      </main>
    </div>
  );
}
