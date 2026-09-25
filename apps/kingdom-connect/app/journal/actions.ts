'use server';

import { db } from "@/lib/db";
import { personalPrayers, prayerNotes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { PrayerStatus } from "./types";

export async function addPrayer(title: string, category: string | null) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  if (!title || !title.trim()) {
    return { error: "Title is required." };
  }

  try {
    const maxOrderPrayer = await db
      .select({ sortOrder: personalPrayers.sortOrder })
      .from(personalPrayers)
      .where(eq(personalPrayers.userId, effectiveUserId))
      .orderBy(desc(personalPrayers.sortOrder))
      .limit(1);

    const newSortOrder = (maxOrderPrayer[0]?.sortOrder ?? 0) + 1;

    await db.insert(personalPrayers).values({
      title: title.trim(),
      category: category?.trim() || null,
      status: "Pending",
      userId: effectiveUserId,
      sortOrder: newSortOrder,
    });

    revalidatePath("/journal");
    return { success: true };
  } catch (err: any) {
    console.error("Error adding prayer:", err);
    return { error: err.message || "Failed to add prayer." };
  }
}

export async function updatePrayerOrder(orderedIds: number[]) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  try {
    await Promise.all(
      orderedIds.map((id, index) =>
        db
          .update(personalPrayers)
          .set({ sortOrder: index + 1 })
          .where(and(eq(personalPrayers.id, id), eq(personalPrayers.userId, effectiveUserId)))
      )
    );

    revalidatePath("/journal");
    revalidatePath("/journal/answered");
    return { success: true };
  } catch (err: any) {
    console.error("Error updating prayer order:", err);
    return { error: err.message || "Failed to update order." };
  }
}

export async function updatePrayerStatus(id: number, status: PrayerStatus) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  try {
    await db
      .update(personalPrayers)
      .set({ status })
      .where(and(eq(personalPrayers.id, id), eq(personalPrayers.userId, effectiveUserId)));

    revalidatePath("/journal");
    revalidatePath("/journal/answered");
    revalidatePath(`/journal/${id}`);
    return { success: true };
  } catch (err: any) {
    console.error("Error updating prayer status:", err);
    return { error: err.message || "Failed to update status." };
  }
}

export async function updatePrayer(
  id: number,
  title: string,
  category: string | null
) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  if (!title || !title.trim()) {
    return { error: "Title is required." };
  }

  try {
    await db
      .update(personalPrayers)
      .set({
        title: title.trim(),
        category: category?.trim() || null,
      })
      .where(and(eq(personalPrayers.id, id), eq(personalPrayers.userId, effectiveUserId)));

    revalidatePath("/journal");
    revalidatePath("/journal/answered");
    revalidatePath(`/journal/${id}`);
    return { success: true };
  } catch (err: any) {
    console.error("Error updating prayer:", err);
    return { error: err.message || "Failed to update prayer." };
  }
}

export async function deletePrayer(id: number) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  try {
    await db
      .delete(personalPrayers)
      .where(and(eq(personalPrayers.id, id), eq(personalPrayers.userId, effectiveUserId)));

    revalidatePath("/journal");
    revalidatePath("/journal/answered");
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting prayer:", err);
    return { error: err.message || "Failed to delete prayer." };
  }
}

export async function addNote(prayerId: number, content: string) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  if (!content || !content.trim()) {
    return { error: "Note content cannot be empty." };
  }

  try {
    // Verify prayer ownership
    const prayer = await db
      .select({ id: personalPrayers.id })
      .from(personalPrayers)
      .where(and(eq(personalPrayers.id, prayerId), eq(personalPrayers.userId, effectiveUserId)))
      .limit(1);

    if (prayer.length === 0) {
      return { error: "Prayer not found." };
    }

    await db.insert(prayerNotes).values({
      prayerId,
      userId: effectiveUserId,
      content: content.trim(),
    });

    revalidatePath(`/journal/${prayerId}`);
    return { success: true };
  } catch (err: any) {
    console.error("Error adding note:", err);
    return { error: err.message || "Failed to add note." };
  }
}

export async function updateNote(noteId: number, content: string) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  if (!content || !content.trim()) {
    return { error: "Note content cannot be empty." };
  }

  try {
    await db
      .update(prayerNotes)
      .set({ content: content.trim() })
      .where(and(eq(prayerNotes.id, noteId), eq(prayerNotes.userId, effectiveUserId)));

    return { success: true };
  } catch (err: any) {
    console.error("Error updating note:", err);
    return { error: err.message || "Failed to update note." };
  }
}

export async function deleteNote(noteId: number, prayerId: number) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  try {
    await db
      .delete(prayerNotes)
      .where(and(eq(prayerNotes.id, noteId), eq(prayerNotes.userId, effectiveUserId)));

    revalidatePath(`/journal/${prayerId}`);
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting note:", err);
    return { error: err.message || "Failed to delete note." };
  }
}
