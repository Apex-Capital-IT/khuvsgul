"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BenefitsSection from "@/components/benefits-section";
import NewsletterForm from "@/components/newsletter-form";
import Testimonials from "@/components/testimonials";
import { useI18n } from "@/components/LanguageProvider";
import { MapPin, Calendar, Heart } from "lucide-react";

type HomeData = {
  backgroundImageUrl: string;
  title: string;
  subtitle: string;
  benefits: Array<{
    title: string;
    content: string;
  }>;
};

type Trip = {
  id: string;
  href: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function Home() {
  const { t } = useI18n();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripsLoading, setTripsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${API_URL}/home`);
        const data = await res.json();
        console.log("Home data fetched:", data);
        if (data.code === 0 && data.response && data.response.length > 0) {
          setHomeData(data.response[0]);
        }
      } catch (err) {
        console.error("Failed to fetch home data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`${API_URL}/travel?pageNumber=1&pageSize=4`);
        const data = await res.json();
        console.log("Trips data fetched:", data);
        if (data.code === 0) {
          const raw = Array.isArray(data.response.docs)
            ? data.response.docs
            : [];
          const formatted: Trip[] = raw.map((trip: any) => ({
            id: trip._id,
            href: `/trips/${trip._id}`,
            title: trip.title,
            location: trip.destination?.location || "Location not specified",
            duration: `${trip.duration?.days || 0} өдөр, ${
              trip.duration?.nights || 0
            } шөнө`,
            price: trip.price,
            image: trip.images?.[0] || "/cover.avif",
          }));
          setTrips(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch trips:", err);
      } finally {
        setTripsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <>
      <section className="relative h-screen flex items-center">
        <Image
          src={homeData?.backgroundImageUrl || "/cover.avif"}
          alt={t("home.hero.imageAlt")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-6xl w-2/3 font-medium mb-4">
            {loading ? (
              <>
                <span className="italic">{t("home.hero.title.part1")}</span>{" "}
                {t("home.hero.title.part2")}
                <br />
                <span className="italic">
                  {t("home.hero.title.part3")}
                </span>{" "}
                {t("home.hero.title.part4")}
                <br />
                <span className="italic">
                  {t("home.hero.title.part5")}
                </span>{" "}
                {t("home.hero.title.part6")}
              </>
            ) : (
              homeData?.title || t("home.hero.title.part1")
            )}
          </h1>
          <p className="max-w-md mb-8 text-sm">
            {loading
              ? t("home.hero.description")
              : homeData?.subtitle || t("home.hero.description")}
          </p>
          <Button asChild className="bg-white text-black hover:bg-gray-100">
            <Link href="/trips">{t("home.hero.cta")}</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-medium">
              {t("home.mustTry.title.part1")}{" "}
              <span className="italic">{t("home.mustTry.title.part2")}</span>
              <br />
              {t("home.mustTry.title.part3")}
            </h2>
            <Link href="/trips" className="text-sm underline">
              {t("home.mustTry.seeAll")}
            </Link>
          </div>

          {tripsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border border-gray-100 animate-pulse"
                >
                  <div className="bg-gray-200 w-full aspect-[3/4]" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Аялал олдсонгүй</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trips.map((trip) => (
                <Link
                  key={trip.id}
                  href={trip.href}
                  className="group relative rounded-lg overflow-hidden block"
                >
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    width={300}
                    height={400}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute top-0 right-0 p-2">
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="font-medium mb-1">{trip.title}</h3>
                    <div className="flex items-center text-xs mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {trip.location}
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="h-4 w-4 mr-1" />
                      {trip.duration}
                    </div>
                    <div className="mt-2 font-medium">
                      {trip.price ? `${trip.price.toLocaleString()}₮` : "-"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <BenefitsSection benefits={homeData?.benefits} loading={loading} />

      <Testimonials />

      <NewsletterForm />
    </>
  );
}
