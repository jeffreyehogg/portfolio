'use server'

import { db } from "@/lib/db";
import { signups, funds, events, prayerRequests, prayerInteractions } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function volunteerForEvent(eventId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Must be signed in to volunteer");

  const existing = await db.select()
    .from(signups)
    .where(and(eq(signups.userId, userId), eq(signups.eventId, eventId)));

  if (existing.length > 0) {
    return { success: false, message: "You are already signed up!" };
  }

  await db.insert(signups).values({ userId, eventId, status: 'confirmed' });
  revalidatePath('/serve');
  revalidatePath('/dashboard');
  return { success: true, message: "Successfully signed up!" };
}

export async function donateToFund(fundId: number, amountInCents: number) {
  await db.update(funds)
    .set({ raised: sql`${funds.raised} + ${amountInCents}` })
    .where(eq(funds.id, fundId));
  revalidatePath('/fund');
  return { success: true, message: "Donation received!" };
}

export async function createEvent(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const category = formData.get("category") as string;
  const dateStr = formData.get("date") as string;
  const maxVolunteers = parseInt(formData.get("maxVolunteers") as string);
    const imageUrl = (formData.get("imageUrl") as string) || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800";

  await db.insert(events).values({
    title,
    description,
    location,
    category,
    date: new Date(dateStr),
    maxVolunteers,
    imageUrl,
  });

  revalidatePath('/serve');
  revalidatePath('/admin');
  return { success: true, message: "Event created successfully!" };
}

export async function createFund(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const goal = Math.round(parseFloat(formData.get("goal") as string) * 100);
  await db.insert(funds).values({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    goal,
    raised: 0
  });
  revalidatePath('/fund');
  revalidatePath('/admin');
  return { success: true, message: "Fund created successfully!" };
}

export async function cancelSignup(signupId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const signup = await db.select().from(signups).where(and(eq(signups.id, signupId), eq(signups.userId, userId)));
  if (signup.length === 0) return { success: false, message: "Signup not found" };

  await db.delete(signups).where(eq(signups.id, signupId));
  revalidatePath('/dashboard');
  revalidatePath('/serve');
  return { success: true, message: "Signup cancelled" };
}

export async function submitPrayerRequest(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Must be signed in");

  const content = formData.get("content") as string;
  const authorName = user.firstName ? `${user.firstName} ${user.lastName?.charAt(0)}.` : "Anonymous";

  await db.insert(prayerRequests).values({
    userId: user.id,
    authorName,
    content,
  });

  revalidatePath('/prayer');
  return { success: true, message: "Prayer request posted" };
}

export async function togglePrayForRequest(requestId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Must be signed in");

  // Check if already prayed
  const existing = await db.select()
    .from(prayerInteractions)
    .where(and(eq(prayerInteractions.requestId, requestId), eq(prayerInteractions.userId, userId)));

  if (existing.length > 0) {
    // Unlike (Remove prayer)
    await db.delete(prayerInteractions)
      .where(and(eq(prayerInteractions.requestId, requestId), eq(prayerInteractions.userId, userId)));
    
    await db.update(prayerRequests)
      .set({ prayedCount: sql`${prayerRequests.prayedCount} - 1` })
      .where(eq(prayerRequests.id, requestId));
      
    revalidatePath('/prayer');
    return { prayed: false };
  } else {
    // Like (Add prayer)
    await db.insert(prayerInteractions).values({ requestId, userId });
    
    await db.update(prayerRequests)
      .set({ prayedCount: sql`${prayerRequests.prayedCount} + 1` })
      .where(eq(prayerRequests.id, requestId));

    revalidatePath('/prayer');
    return { prayed: true };
  }
}