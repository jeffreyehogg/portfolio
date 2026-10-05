import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { personalPrayers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc, ilike } from "drizzle-orm";
import { PrayerList } from "../components/PrayerList";
import { SearchInput } from "../components/SearchInput";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import type { PersonalPrayer, PrayerStatus } from "../types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stones of Remembrance | Answered Prayers",
  description: "A lasting memorial of God's faithfulness and answered petitions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AnsweredPage({
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
    eq(personalPrayers.status, "Answered"),
  ];

  if (searchFilter) {
    conditions.push(ilike(personalPrayers.title, searchFilter));
  }

  const rawPrayers = await db
    .select()
    .from(personalPrayers)
    .where(and(...conditions))
    .orderBy(desc(personalPrayers.createdAt));

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700 shadow-2xs">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Stones of remembrance
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              A lasting memorial of God&apos;s faithfulness and answered petitions.
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Search Bar */}
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto">
            <Link
              href="/journal"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-600 hover:text-slate-900"
            >
              <Clock className="w-3.5 h-3.5" />
              Active prayers
            </Link>
            <Link
              href="/journal/answered"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-emerald-700 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Answered ({prayers.length})
            </Link>
          </div>

          <SearchInput defaultValue={search} />
        </div>

        {/* Scripture Quote */}
        <div className="bg-linear-to-r from-emerald-50/80 to-slate-50 border-l-4 border-emerald-500 p-3.5 rounded-r-2xl mb-6">
          <p className="text-xs sm:text-sm italic text-emerald-950 font-serif">
            &ldquo;I sought the LORD, and He answered me; He delivered me from all my fears.&rdquo;
          </p>
          <p className="text-xs font-semibold text-emerald-600 mt-1">
            Psalm 34:4
          </p>
        </div>

        {/* Prayer List */}
        <PrayerList
          prayers={prayers}
          emptyMessage={
            search
              ? `No answered prayers matched "${search}".`
              : "Your memorial wall is waiting for its first stone. When God answers your prayers—whether with a sudden breakthrough or gentle peace—mark them as answered to build a lasting testimony of His faithfulness."
          }
        />
      </main>
    </div>
  );
}
