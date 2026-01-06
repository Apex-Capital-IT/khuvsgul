import type { MetadataRoute } from "next";

const siteUrl = "https://taiga.mn";
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

type TravelDoc = {
  _id: string;
  updatedAt?: string;
};

async function fetchTrips(): Promise<TravelDoc[]> {
  try {
    const res = await fetch(`${apiUrl}/travel?pageNumber=1&pageSize=100`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Unexpected status ${res.status}`);
    }

    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(data.message || "Failed to load trips");
    }

    const docs = data.response?.docs;
    return Array.isArray(docs) ? docs : [];
  } catch (error) {
    console.error("Failed to load trips for sitemap", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changefreq: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/trips`,
      lastModified: now,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changefreq: "monthly",
      priority: 0.6,
    },
  ];

  const trips = await fetchTrips();
  const tripEntries: MetadataRoute.Sitemap = trips.map((trip) => ({
    url: `${siteUrl}/trips/${trip._id}`,
    lastModified: trip.updatedAt ? new Date(trip.updatedAt) : now,
    changefreq: "weekly",
    priority: 0.7,
  }));

  return [...baseEntries, ...tripEntries];
}
