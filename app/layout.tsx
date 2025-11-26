import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/i18n/context"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://isas2025.vercel.app'),
  title: "ISAS'25 | Intelligent Systems Autumn School - From Sensor to Dashboard",
  description:
    "From Sensor to Dashboard: Building Integrated Solutions for Smart Cities and Industry. ISAS'25 - First Edition, December 9-13, 2025 at FSA Ait Melloul. Free registration for students, researchers, and professionals.",
  keywords: [
    "ISAS 2025",
    "Intelligent Systems Autumn School",
    "Smart Cities",
    "Industry 4.0",
    "IoT",
    "Sensor to Dashboard",
    "Smart Systems Engineering",
    "Technology Integration",
    "Machine Learning",
    "Embedded Systems",
    "Data Visualization",
    "Technical Challenges",
    "Free Training Morocco",
    "Ait Melloul",
    "Ibn Zohr University",
    "FSA",
    "GISI Department",
    "IMIS Lab",
  ],
  authors: [{ name: "GISI Department & IMIS Lab - Faculty of Applied Sciences - Ibn Zohr University" }],
  creator: "ISAS 2025 Organizing Committee",
  publisher: "Ibn Zohr University",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ISAS'25 | From Sensor to Dashboard - Smart Cities & Industry",
    description:
      "First Edition: 5 days of hands-on learning, workshops, and technical challenges. December 9-13, 2025, FSA Ait Melloul. Free registration!",
    type: "website",
    locale: "fr_FR",
    siteName: "ISAS 2025",
    url: "https://isas2025.vercel.app",
    images: [
      {
        url: "/images/og.svg",
        width: 1200,
        height: 630,
        alt: "ISAS 2025 - Intelligent Systems Autumn School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISAS 2025 | Intelligent Systems Autumn School",
    description: "Formation gratuite en IA, IoT, VR et Hackathon. 8-12 Décembre 2025. Inscription gratuite !",
    creator: "@isas2025",
  },
  alternates: {
    canonical: "https://isas2025.vercel.app",
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  category: "Education",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1729" },
    { media: "(prefers-color-scheme: light)", color: "#0f1729" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Intelligent Systems Autumn School 2025 (ISAS'25)",
              description:
                "From Sensor to Dashboard: Building Integrated Solutions for Smart Cities and Industry. Five intensive days of hands-on learning, specialized workshops, and large-scale technical challenges.",
              startDate: "2025-12-09",
              endDate: "2025-12-13",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Faculty of Applied Sciences - Ait Melloul (Conference Hall & Multipurpose Room)",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Ait Melloul",
                  addressCountry: "MA",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "GISI Department & IMIS Lab - Ibn Zohr University",
                url: "https://www.uiz.ac.ma",
              },
              isAccessibleForFree: true,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "MAD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
