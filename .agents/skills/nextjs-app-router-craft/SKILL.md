---
name: nextjs-app-router-craft
description: >-
  Best practices, architecture patterns, and conventions for Next.js 15/16 App Router, React 19,
  Server Components (RSC), Server Actions, Clerk authentication, and Drizzle/Neon database workflows.
  Trigger when building, refactoring, or debugging Next.js routes, server actions, data-fetching layers,
  or form mutations across apps in this monorepo.
---

# Next.js App Router & Full-Stack Craft Skill

This skill standardizes patterns across Next.js 15/16 applications (`apps/portfolio`, `apps/kingdom-connect`, `apps/legacy-link`).

---

## 1. Server vs. Client Component Boundaries

Next.js App Router defaults to **React Server Components (RSC)**. Maintain this boundary strictly:

1. **RSC by Default**:
   - Keep page layouts, static views, and direct database queries in Server Components.
   - Do NOT mark a component with `'use client'` just to fetch data.
2. **Push Client Components to the Leaves**:
   - Isolate `'use client'` only to components that need:
     - React state (`useState`, `useReducer`)
     - Lifecycle/browser APIs (`useEffect`, `window`, `localStorage`)
     - Event listeners (`onClick`, `onChange` without Server Actions)
     - Interactive animations (`framer-motion`, `@dnd-kit`)
3. **Pass Server-Fetched Data Down as Props**:
   - Fetch data in the Server Component and pass plain serializable JSON objects to the Client component.

---

## 2. Server Actions & Mutations

Server Actions (`'use server'`) should handle all state mutations and database operations.

### Standard Server Action Signature
Always validate inputs and return a standardized result object:

```typescript
'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/lib/db'

const InputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, 'Title is required').max(200),
})

export type ActionResult<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

export async function createItemAction(formData: FormData): Promise<ActionResult> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const rawData = Object.fromEntries(formData.entries())
    const validated = InputSchema.parse(rawData)

    // Execute Drizzle ORM mutation
    const [inserted] = await db.insert(...).values(...).returning()

    revalidatePath('/dashboard')
    return { success: true, data: inserted }
  } catch (err: any) {
    console.error('Server action failure:', err)
    return { success: false, error: err.message || 'Operation failed' }
  }
}
```

### Optimistic UI Updates
For responsive user interactions (like drag-and-drop or status toggles):
- Use React 19's `useOptimistic` hook paired with `useTransition`.
- Apply local state immediately, then invoke the Server Action in the background. Roll back on failure.

---

## 3. Database Workflows (Neon + Drizzle ORM)

1. **Neon Serverless Pooler**:
   - Use `@neondatabase/serverless` for connection pooling.
   - Guard against missing connection strings:
     ```typescript
     if (!process.env.DATABASE_URL) {
       throw new Error('DATABASE_URL is not set')
     }
     ```
2. **Schema Conventions**:
   - Store foreign keys to Clerk user IDs as `varchar('user_id', { length: 255 }).notNull()`.
   - Index user ID columns and foreign keys for high query performance.
   - Use timestamps with timezone defaults: `timestamp('created_at').defaultNow().notNull()`.

---

## 4. Known Next.js Gotchas & Anti-Patterns

### ⚠️ Never Import Images Relatively from `public/` in Client Components
- **Anti-pattern**: `import heroImg from '../../public/images/hero.png'` inside a `'use client'` component.
- **Why**: Webpack's image loader can cause chunk module ID mismatches during HMR (`TypeError: __webpack_modules__[moduleId] is not a function`).
- **Fix**: Use standard string paths: `<Image src="/images/hero.png" width={500} height={300} alt="..." />`.

### ⚠️ Turborepo Environment Variable Scrubbing
- Next.js static page generation will fail during build if required environment variables are missing.
- Whenever an app requires an environment variable at build time, declare it in the root `turbo.json` under `tasks.build.env`.
