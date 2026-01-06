import type React from "react";
import type { Metadata } from "next";

const siteUrl = "https://taiga.mn";
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

async function getTrip(slug: string) {
  try {
    const res = await fetch(`${apiUrl}/travel/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Unexpected status ${res.status}`);
    }

    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.message || "Failed to fetch trip");
    }

    return data.response;
  } catch (error) {
    console.error(`Failed to load trip ${slug} for metadata`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const trip = await getTrip(params.slug);

  const title = trip?.title || "Trip details";
  const description =
    (trip?.description && String(trip.description).slice(0, 160)) ||
    "Explore detailed travel packages with Taiga Mongolia.";
  const image = trip?.images?.[0] || "/taiga.jpg";
  const url = `${siteUrl}/trips/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Taiga Mongolia",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: trip?.title || "Trip cover",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function TripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
