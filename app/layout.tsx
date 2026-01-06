import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://taiga.mn";
const defaultTitle = "Taiga Mongolia - Travel Agency";
const defaultDescription =
  "Discover amazing travel experiences around the world with Taiga Mongolia. Explore curated trips, sustainable adventures, and authentic cultural journeys.";
const defaultOgImage = "/taiga.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Taiga Mongolia",
  },
  description: defaultDescription,
  generator: "Hollo",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "Taiga Mongolia",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Beautiful Mongolian travel landscape",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Taiga Mongolia",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: defaultDescription,
  sameAs: ["https://www.facebook.com/taigamongolia", "https://www.instagram.com/taigamongolia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
