'use server'

import { db } from "@/lib/db";
import { signups, funds, events, prayerRequests, prayerInteractions, personalPrayers, prayerNotes } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod Validation Schemas
const CreateEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  location: z.string().min(3, "Location required"),
  category: z.enum(["food", "labor", "supplies", "all"]),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), "Valid date required"),
  maxVolunteers: z.number().int().positive().max(1000),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

const CreateFundSchema = z.object({
  title: z.string().min(3, "Title required").max(120),
  description: z.string().min(10, "Description required").max(2000),
  goalInDollars: z.number().positive("Goal must be greater than $0"),
});

const DonateSchema = z.object({
  fundId: z.number().int().positive(),
  amountInCents: z.number().int().positive("Donation amount must be greater than 0"),
});

const PrayerRequestSchema = z.object({
  content: z.string().min(5, "Prayer request must be at least 5 characters").max(1000),
});

export async function volunteerForEvent(eventId: number) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "Please sign in to volunteer for this opportunity." };
  }

  const existing = await db.select()
    .from(signups)
    .where(and(eq(signups.userId, userId), eq(signups.eventId, eventId)));

  if (existing.length > 0) {
    return { success: false, message: "You are already registered for this ministry team!" };
  }

  await db.insert(signups).values({ userId, eventId, status: 'confirmed' });
  revalidatePath('/serve');
  revalidatePath('/dashboard');
  return { 
    success: true, 
    message: "You are registered! Thank you for blessing our community. We can't wait to serve alongside you." 
  };
}

export async function donateToFund(fundId: number, amountInCents: number) {
  const parse = DonateSchema.safeParse({ fundId, amountInCents });
  if (!parse.success) {
    return { success: false, message: parse.error.issues[0]?.message || "Invalid donation amount." };
  }

  await db.update(funds)
    .set({ raised: sql`${funds.raised} + ${amountInCents}` })
    .where(eq(funds.id, fundId));
    
  revalidatePath('/fund');
  revalidatePath('/dashboard');
  return { 
    success: true, 
    message: `Thank you for your generous heart! Your gift of $${(amountInCents / 100).toFixed(2)} has been recorded.` 
  };
}

export async function createEvent(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "Unauthorized: Sign in required." };
  }

  const adminUserId = process.env.ADMIN_USER_ID;
  if (adminUserId && userId !== adminUserId) {
    return { success: false, message: "Forbidden: Ministry Leadership access required." };
  }

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    category: formData.get("category") as string,
    date: formData.get("date") as string,
    maxVolunteers: parseInt(formData.get("maxVolunteers") as string) || 0,
    imageUrl: (formData.get("imageUrl") as string) || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
  };

  const parsed = CreateEventSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid input data." };
  }

  await db.insert(events).values({
    title: parsed.data.title,
    description: parsed.data.description,
    location: parsed.data.location,
    category: parsed.data.category,
    date: new Date(parsed.data.date),
    maxVolunteers: parsed.data.maxVolunteers,
    imageUrl: parsed.data.imageUrl,
  });

  revalidatePath('/serve');
  revalidatePath('/admin');
  return { success: true, message: "Service opportunity published successfully!" };
}

export async function createFund(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "Unauthorized: Sign in required." };
  }

  const adminUserId = process.env.ADMIN_USER_ID;
  if (adminUserId && userId !== adminUserId) {
    return { success: false, message: "Forbidden: Ministry Leadership access required." };
  }

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    goalInDollars: parseFloat(formData.get("goal") as string) || 0,
  };

  const parsed = CreateFundSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid fund parameters." };
  }

  const goal = Math.round(parsed.data.goalInDollars * 100);

  await db.insert(funds).values({
    title: parsed.data.title,
    description: parsed.data.description,
    goal,
    raised: 0
  });

  revalidatePath('/fund');
  revalidatePath('/admin');
  return { success: true, message: "Kingdom Fund initiative launched successfully!" };
}

export async function cancelSignup(signupId: number) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  const signup = await db.select().from(signups).where(and(eq(signups.id, signupId), eq(signups.userId, userId)));
  if (signup.length === 0) {
    return { success: false, message: "Signup commitment not found." };
  }

  await db.delete(signups).where(eq(signups.id, signupId));
  revalidatePath('/dashboard');
  revalidatePath('/serve');
  return { success: true, message: "Your registration has been released. Thank you for notifying the team." };
}

export async function submitPrayerRequest(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "Please sign in to share a request on the prayer wall." };
  }

  const content = (formData.get("content") as string)?.trim();
  const parsed = PrayerRequestSchema.safeParse({ content });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Please write your prayer request." };
  }

  const authorName = user.firstName ? `${user.firstName} ${user.lastName?.charAt(0) || ""}.` : "Community Believer";

  await db.insert(prayerRequests).values({
    userId: user.id,
    authorName,
    content: parsed.data.content,
  });

  revalidatePath('/prayer');
  return { success: true, message: "Your prayer request has been shared. Our church family is lifting you up." };
}

export async function togglePrayForRequest(requestId: number) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Please sign in to pray with others." };
  }

  const existing = await db.select()
    .from(prayerInteractions)
    .where(and(eq(prayerInteractions.requestId, requestId), eq(prayerInteractions.userId, userId)));

  if (existing.length > 0) {
    await db.delete(prayerInteractions)
      .where(and(eq(prayerInteractions.requestId, requestId), eq(prayerInteractions.userId, userId)));
    
    await db.update(prayerRequests)
      .set({ prayedCount: sql`${prayerRequests.prayedCount} - 1` })
      .where(eq(prayerRequests.id, requestId));
      
    revalidatePath('/prayer');
    return { prayed: false };
  } else {
    await db.insert(prayerInteractions).values({ requestId, userId });
    
    await db.update(prayerRequests)
      .set({ prayedCount: sql`${prayerRequests.prayedCount} + 1` })
      .where(eq(prayerRequests.id, requestId));

    revalidatePath('/prayer');
    return { prayed: true };
  }
}

/**
 * Anchor a Scripture Promise directly into the user's personal prayer journal
 */
export async function anchorScriptureToJournal(reference: string, verseText: string, heartState: string) {
  const { userId } = await auth();
  const effectiveUserId = userId || "guest_user";

  const [newPrayer] = await db.insert(personalPrayers).values({
    userId: effectiveUserId,
    title: `Promise: ${reference} (${heartState})`,
    category: heartState,
    status: 'Praying',
    sortOrder: 0,
  }).returning();

  await db.insert(prayerNotes).values({
    prayerId: newPrayer.id,
    userId: effectiveUserId,
    content: `"${verseText}" — ${reference}`,
  });

  revalidatePath('/journal');
  return { 
    success: true, 
    message: `Anchored to your Prayer Journal: ${reference}`,
    prayerId: newPrayer.id 
  };
}