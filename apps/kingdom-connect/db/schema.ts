import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

// --- Users Table ---
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique().notNull(),
  fullName: text('full_name'),
  skills: text('skills'),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Events ---
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  date: timestamp('date').notNull(),
  location: text('location').notNull(),
  category: text('category').notNull(),
  maxVolunteers: integer('max_volunteers').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Signups ---
export const signups = pgTable('signups', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  eventId: integer('event_id').references(() => events.id),
  status: text('status').default('confirmed'),
  signedUpAt: timestamp('signed_up_at').defaultNow(),
});

// --- Kingdom Funds ---
export const funds = pgTable('funds', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  goal: integer('goal').notNull(),
  raised: integer('raised').default(0),
});

// --- Prayer Requests ---
export const prayerRequests = pgTable('prayer_requests', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  authorName: text('author_name').notNull(),
  content: text('content').notNull(),
  prayedCount: integer('prayed_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Prayer Interactions (Who prayed for what) ---
export const prayerInteractions = pgTable('prayer_interactions', {
  id: serial('id').primaryKey(),
  requestId: integer('request_id').references(() => prayerRequests.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), 
  prayedAt: timestamp('prayed_at').defaultNow(),
});