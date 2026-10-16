import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

const GUEST_COOKIE_NAME = "kc_guest_id";
const GUEST_ID_REGEX = /^guest_[0-9a-f-]{36}$/;

/**
 * Returns true if the provided ID is an ephemeral or persistent guest ID.
 */
export function isGuestUser(userId: string): boolean {
  return userId.startsWith("guest_");
}

/**
 * Resolves the authenticated Clerk userId or a scoped visitor guest ID.
 * In Server Actions / mutations, set `createIfMissing: true` to mint and persist a guest cookie.
 * In read-only RSC rendering passes, `createIfMissing: false` avoids cookie mutation and
 * returns 'guest_uninitialized' if no guest cookie has been established yet.
 */
export async function getEffectiveUserId({
  createIfMissing = false,
}: {
  createIfMissing?: boolean;
} = {}): Promise<string> {
  const { userId } = await auth();
  if (userId) {
    return userId;
  }

  const cookieStore = await cookies();
  const existing = cookieStore.get(GUEST_COOKIE_NAME)?.value;
  if (existing && GUEST_ID_REGEX.test(existing)) {
    return existing;
  }

  if (createIfMissing) {
    const newId = `guest_${crypto.randomUUID()}`;
    try {
      cookieStore.set(GUEST_COOKIE_NAME, newId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    } catch {
      // Defensive fallback in case called during an RSC render where cookies cannot be written
    }
    return newId;
  }

  return "guest_uninitialized";
}
