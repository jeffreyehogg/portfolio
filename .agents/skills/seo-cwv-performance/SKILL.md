---
name: seo-cwv-performance
description: >-
  Technical guidelines and checklists for optimizing Core Web Vitals (LCP, CLS, INP), metadata,
  OpenGraph social sharing, JSON-LD structured data schemas, and search engine indexing across Next.js and web apps.
  Trigger when auditing page performance, generating or improving SEO metadata, adding structured data,
  configuring social sharing cards, or optimizing asset delivery and font loading.
---

# Core Web Vitals, Performance & SEO Skill

This skill defines the technical standards for maximizing search visibility, social sharing engagement, and achieving sub-second load times across web applications.

---

## 1. Core Web Vitals (CWV) Optimization

Target metrics for production applications:
- **LCP (Largest Contentful Paint)**: $\le 2.5\text{s}$ (Good)
- **CLS (Cumulative Layout Shift)**: $\le 0.1$ (Good)
- **INP (Interaction to Next Paint)**: $\le 200\text{ms}$ (Good)

### Largest Contentful Paint (LCP) Strategies
1. **Hero Image Preloading**:
   - Mark the primary above-the-fold image with `priority`:
     ```tsx
     <Image
       src="/images/headshots/me.jpg"
       alt="Jeff Hogg"
       fill
       priority
       sizes="(max-width: 768px) 100vw, 256px"
       className="object-cover"
     />
     ```
2. **Font Optimization with `next/font`**:
   - Never import external fonts via `<link>` or `@import` in CSS.
   - Use `next/font/google` with subset definitions and `display: 'swap'`:
     ```tsx
     import { Inter, JetBrains_Mono } from 'next/font/google'

     const inter = Inter({
       subsets: ['latin'],
       display: 'swap',
       variable: '--font-inter',
     })
     ```
3. **Defer Non-Critical Third-Party Scripts**:
   - Use `next/script` with `strategy="lazyOnload"` or `strategy="afterInteractive"` for analytics, tags, or reCAPTCHA to prevent blocking the initial paint.

### Cumulative Layout Shift (CLS) Elimination
1. **Always Reserve Space for Media**:
   - Every `<Image>` must either have explicit `width` and `height`, or use `fill` within a parent container with an explicit aspect ratio (e.g. `aspect-[16/10]` or fixed `w-64 h-64`).
2. **Prevent Dynamic Height Shifts**:
   - For components that load dynamically (e.g., testimonials, carousels, filtered lists), reserve the minimum height using CSS: `min-h-[300px]`.
3. **Font Layout Shift Zeroing**:
   - `next/font` automatically matches font metrics (size-adjust, ascent-override) with system fallbacks to eliminate shift when web fonts load.

### Interaction to Next Paint (INP)
1. **Non-Blocking State Updates**:
   - Wrap non-urgent client state transitions (like tab switches or category filters) in React 19's `startTransition` so the browser can immediately acknowledge user clicks.

---

## 2. Technical SEO & Metadata Architecture

### App Router Metadata Object
Always export complete, strongly typed metadata in `layout.tsx` and specific `page.tsx` files:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://jeffhogg.com'),
  title: {
    default: 'Jeff Hogg | Full-Stack Developer & Systems Architect',
    template: '%s | Jeff Hogg',
  },
  description:
    'Full-Stack Developer and Solo Technical Lead specializing in DevOps automation, system architecture, API middleware, and modern database tuning.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Jeff Hogg | Full-Stack Developer & Systems Architect',
    description:
      'Modernizing legacy architectures, building resilient API layers, and driving end-to-end system automation.',
    url: 'https://jeffhogg.com',
    siteName: 'Jeff Hogg Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeff Hogg | Full-Stack Developer & Systems Architect',
    description: 'DevOps automation, modern API layers, and distributed database tuning.',
    creator: '@jeffehogg',
  },
}
```

---

## 3. Dynamic OpenGraph Social Previews (`opengraph-image.tsx`)

Use Next.js's built-in `@vercel/og` engine (`ImageResponse`) to generate dynamic, pixel-perfect social preview cards on-the-fly:

- Standard card size: `1200 x 630` pixels.
- Embed branding: Include name, role badge, clean typography, and subtle ambient glows in JSX.
- Avoid large external web fonts inside `ImageResponse`; use system fonts or fetch lightweight `.woff` buffers.

---

## 4. JSON-LD Structured Data (Google Rich Snippets)

Add structured schema markup to your root `layout.tsx` or `page.tsx` so search engines understand your identity and skills:

```tsx
export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeff Hogg',
    jobTitle: 'Full-Stack Developer & Technical Lead',
    url: 'https://jeffhogg.com',
    sameAs: [
      'https://github.com/jeffreyehogg',
      'https://www.linkedin.com/in/jeffhogg/',
      'https://twitter.com/jeffehogg',
    ],
    knowsAbout: [
      'DevOps',
      'CI/CD Pipelines',
      'System Architecture',
      'TypeScript',
      'Next.js',
      'React',
      'Docker',
      'Microsoft SQL Server',
      'PostgreSQL',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## 5. Automated Sitemaps & Robots (`app/sitemap.ts`)

Always maintain a programmatic sitemap to index all public routes automatically:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jeffhogg.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
```
