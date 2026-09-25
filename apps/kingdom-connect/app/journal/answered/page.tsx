import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { personalPrayers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc, ilike } from "drizzle-orm";
import { PrayerList } from "../components/PrayerList";
import { SearchInput } from "../components/SearchInput";
import Link from "next/link";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";
import type { PersonalPrayer, PrayerStatus } from "../types";

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
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Answered Prayers
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              A stone of remembrance for God&apos;s faithfulness and answered petitions.
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
            <Link
              href="/journal"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all text-gray-600 hover:text-gray-900"
            >
              <Clock className="w-3.5 h-3.5" />
              Active Prayers
            </Link>
            <Link
              href="/journal/answered"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all bg-white text-emerald-700 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Answered ({prayers.length})
            </Link>
          </div>

          <SearchInput defaultValue={search} />
        </div>

        {/* Scripture Quote */}
        <div className="bg-emerald-50/70 border-l-4 border-emerald-500 p-4 rounded-r-2xl mb-8">
          <p className="text-sm italic text-emerald-950 font-serif">
            &quot;I sought the LORD, and He answered me; He delivered me from all my fears.&quot;
          </p>
          <p className="text-xs font-bold font-mono text-emerald-600 mt-1 uppercase tracking-wider">
            Psalm 34:4
          </p>
        </div>

        {/* Prayer List */}
        <PrayerList
          prayers={prayers}
          emptyMessage={
            search
              ? `No answered prayers matched "${search}".`
              : "No prayers marked as answered yet. As God moves, move your prayers here to celebrate!"
          }
        />
      </div>
    </div>
  );
}
