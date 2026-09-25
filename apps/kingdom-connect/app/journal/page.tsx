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
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Unauthenticated Demo Mode Banner */}
        {!userId && (
          <div className="mb-8 p-4 rounded-2xl bg-indigo-50/90 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-indigo-950 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-indigo-900">
                  Interactive Demo Mode
                </p>
                <p className="text-xs text-indigo-700/80">
                  Feel free to test adding, dragging to prioritize, and updating prayers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-indigo-600 hidden md:inline">Sync across devices?</span>
              <Link
                href="/sign-in"
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-xl transition-all shadow-xs"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shadow-xs">
                <BookOpen className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                My Prayer Journal
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              Your private sanctuary for prayers, reflections, and answered petitions.
            </p>
          </div>

          <AddPrayerForm />
        </div>

        {/* Navigation Tabs & Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
            <Link
              href="/journal"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all bg-white text-indigo-700 shadow-xs"
            >
              <Clock className="w-3.5 h-3.5" />
              Active Prayers ({prayers.length})
            </Link>
            <Link
              href="/journal/answered"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Answered
            </Link>
          </div>

          <SearchInput defaultValue={search} />
        </div>

        {/* Scripture Quote */}
        <div className="bg-indigo-50/70 border-l-4 border-indigo-500 p-4 rounded-r-2xl mb-8">
          <p className="text-sm italic text-indigo-900 font-serif">
            &quot;Devote yourselves to prayer, being watchful and thankful.&quot;
          </p>
          <p className="text-xs font-bold font-mono text-indigo-600 mt-1 uppercase tracking-wider">
            Colossians 4:2
          </p>
        </div>

        {/* Sortable Prayer List */}
        <PrayerList
          prayers={prayers}
          emptyMessage={
            search
              ? `No active prayers matched "${search}".`
              : "You haven't added any active prayers yet. Click 'Add Prayer' to start your journal!"
          }
        />
      </div>
    </div>
  );
}
