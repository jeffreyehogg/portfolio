import { ClerkProvider } from "@clerk/nextjs";
import type { Appearance } from "@clerk/types";
import "./globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Footer } from "./components/Footer";
import { MobileBottomNav } from "./components/MobileBottomNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://kingdom.jeffhogg.com"),
  title: {
    default: "Kingdom Connect | One Body · Many Gifts · United in Christ",
    template: "%s | Kingdom Connect",
  },
  description:
    "Unified faith and community platform connecting your gifts to kingdom needs through hands-on volunteering, transparent project crowdfunding, and persistent prayer.",
  keywords: [
    "Christian volunteering",
    "faith platform",
    "church outreach",
    "prayer wall",
    "prayer journal",
    "Kingdom fund",
    "community ministry",
  ],
  authors: [{ name: "Jeff Hogg" }],
  creator: "Jeff Hogg",
  alternates: {
    canonical: "https://kingdom.jeffhogg.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kingdom.jeffhogg.com",
    siteName: "Kingdom Connect",
    title: "Kingdom Connect | Faith in Action",
    description:
      "Connect your gifts to kingdom needs through volunteer mobilization, direct mission crowdfunding, and communal prayer.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kingdom Connect Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kingdom Connect | Faith in Action",
    description:
      "Connect your gifts to kingdom needs through volunteer mobilization, direct mission crowdfunding, and communal prayer.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

const clerkAppearanceObject = {
  cssLayerName: "clerk",
  variables: { colorPrimary: "#4f46e5" },
  elements: {
    socialButtonsBlockButton:
      "bg-white border-slate-200 hover:bg-slate-50 hover:border-indigo-600 text-slate-700 font-medium",
    socialButtonsBlockButtonText: "font-semibold",
    formButtonReset:
      "bg-white border border-solid border-slate-200 hover:bg-slate-50 text-slate-600",
    membersPageInviteButton:
      "bg-indigo-600 border border-indigo-600 border-solid hover:bg-indigo-700 text-white",
    card: "bg-white shadow-xl rounded-2xl border border-slate-100",
  },
} satisfies Appearance;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Kingdom Connect",
  url: "https://kingdom.jeffhogg.com",
  logo: "https://kingdom.jeffhogg.com/og.png",
  description:
    "Unified faith and community platform connecting gifts to Kingdom needs through volunteering, transparent mission crowdfunding, and prayer.",
  sameAs: ["https://github.com/jeffreyehogg/portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <ClerkProvider appearance={clerkAppearanceObject}>
        <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Skip to main content
          </a>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <MobileBottomNav />
          <Toaster position="bottom-right" richColors />
        </body>
      </ClerkProvider>
    </html>
  );
}
