import { Navbar } from "@/app/components/Navbar";
import { db } from "@/lib/db";
import { personalPrayers, prayerNotes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { eq, and, desc } from "drizzle-orm";
import Link from "next/link";
import { ArrowLeft, Clock, Flame, CheckCircle2, Tag } from "lucide-react";
import { AddNoteForm } from "../components/AddNoteForm";
import { NoteList } from "../components/NoteList";
import type { PersonalPrayer, PrayerNote, PrayerStatus } from "../types";

export default async function PrayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const prayerId = parseInt(id, 10);
  if (isNaN(prayerId)) {
    notFound();
  }

  // Fetch the prayer belonging to this user
  const rawPrayer = await db
    .select()
    .from(personalPrayers)
    .where(and(eq(personalPrayers.id, prayerId), eq(personalPrayers.userId, userId)))
    .limit(1);

  if (rawPrayer.length === 0) {
    notFound();
  }

  const prayer: PersonalPrayer = {
    id: rawPrayer[0].id,
    userId: rawPrayer[0].userId,
    title: rawPrayer[0].title,
    status: rawPrayer[0].status as PrayerStatus,
    category: rawPrayer[0].category,
    sortOrder: rawPrayer[0].sortOrder,
    createdAt: rawPrayer[0].createdAt,
  };

  // Fetch associated notes
  const rawNotes = await db
    .select()
    .from(prayerNotes)
    .where(and(eq(prayerNotes.prayerId, prayerId), eq(prayerNotes.userId, userId)))
    .orderBy(desc(prayerNotes.createdAt));

  const notes: PrayerNote[] = rawNotes.map((n) => ({
    id: n.id,
    prayerId: n.prayerId,
    userId: n.userId,
    content: n.content,
    createdAt: n.createdAt,
  }));

  const getStatusBadge = (status: PrayerStatus) => {
    switch (status) {
      case "Answered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Answered
          </span>
        );
      case "Praying":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Flame className="w-3.5 h-3.5" /> Praying
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Journal
        </Link>

        {/* Prayer Header Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {getStatusBadge(prayer.status)}
            {prayer.category && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 font-medium">
                <Tag className="w-3 h-3 text-gray-400" />
                {prayer.category}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            {prayer.title}
          </h1>

          <p className="text-xs text-gray-400 mt-3">
            Created on {prayer.createdAt ? new Date(prayer.createdAt).toLocaleDateString(undefined, { dateStyle: "long" }) : "recently"}
          </p>
        </div>

        {/* Scripture Quote */}
        <div className="bg-indigo-50/70 border-l-4 border-indigo-500 p-4 rounded-r-2xl mb-8">
          <p className="text-sm italic text-indigo-900">
            &quot;Write down the revelation and make it plain on tablets so that a herald may run with it.&quot;
          </p>
          <p className="text-xs font-semibold text-indigo-600 mt-1">Habakkuk 2:2</p>
        </div>

        {/* Add Note Form */}
        <div className="mb-8">
          <AddNoteForm prayerId={prayer.id} />
        </div>

        {/* Notes Timeline */}
        <NoteList notes={notes} prayerId={prayer.id} />
      </div>
    </div>
  );
}
