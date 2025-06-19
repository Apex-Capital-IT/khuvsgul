import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taiga Mongolia - Travel Agency",
  description: "Discover amazing travel experiences around the world",
  generator: "Hollo",
  openGraph: {
    title: "Taiga Mongolia - Travel Agency",
    description: "Discover amazing travel experiences around the world",
    url: "https://taiga.mn",
    siteName: "Taiga Mongolia",
    images: [
      {
        url: "/taiga.jpg", // make sure this file is in the /public directory
        width: 1200,
        height: 630,
        alt: "Beautiful Mongolian travel landscape",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
