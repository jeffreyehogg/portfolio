import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { personalPrayers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq, and, asc, ilike, inArray } from "drizzle-orm";
import { AddPrayerForm } from "./components/AddPrayerForm";
import { PrayerList } from "./components/PrayerList";
import { SearchInput } from "./components/SearchInput";
import Link from "next/link";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";
import type { PersonalPrayer, PrayerStatus } from "./types";

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { search } = await searchParams;
  const searchFilter = search ? `%${search}%` : undefined;

  const conditions = [
    eq(personalPrayers.userId, userId),
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
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                <BookOpen className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
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
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-indigo-700 shadow-xs"
            >
              <Clock className="w-3.5 h-3.5" />
              Active Prayers
            </Link>
            <Link
              href="/journal/answered"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Answered
            </Link>
          </div>

          <SearchInput defaultValue={search} />
        </div>

        {/* Scripture Quote */}
        <div className="bg-indigo-50/70 border-l-4 border-indigo-500 p-4 rounded-r-2xl mb-8">
          <p className="text-sm italic text-indigo-900">
            &quot;Devote yourselves to prayer, being watchful and thankful.&quot;
          </p>
          <p className="text-xs font-semibold text-indigo-600 mt-1">Colossians 4:2</p>
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
