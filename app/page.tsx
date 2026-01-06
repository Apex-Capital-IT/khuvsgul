"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BenefitsSection from "@/components/benefits-section";
import NewsletterForm from "@/components/newsletter-form";
import Testimonials from "@/components/testimonials";
import { useI18n } from "@/components/LanguageProvider";
import { MapPin, Calendar, Heart, ChevronDown } from "lucide-react";
import { AboutUs } from "@/components/AboutUs";
import { QandA } from "@/components/QandA";

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

// Default content while API loads
const DEFAULT_DESCRIPTION =
  "Монголын тайга нууд амой, цэнгэг гол горхи, ан амьтдын онгон ертөнцийг танъдаа нээж өгөх зорилготой. Мянган жилд бүтээгдсэн энэхүү гайхамшигт экосистемийн хамгийн үзэсгэлэнт хэсгүүдийг аюулгүй, тавтухтай гаар мэдрэх аяллын багцуудыг бид танд санал болгож байна.";

// Animated Description Component
const AnimatedDescription = ({ text }: { text: string }) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const words = text.split(" ");
  const totalWords = words.length;
  const wordsPerGroup = 3;
  const totalGroups = Math.ceil(totalWords / wordsPerGroup);
  const delayPerGroup = 3000 / totalGroups; // 3 seconds total

  useEffect(() => {
    setVisibleWords(0);
    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        const next = prev + wordsPerGroup;
        if (next >= totalWords) {
          clearInterval(interval);
          return totalWords;
        }
        return next;
      });
    }, delayPerGroup);

    return () => clearInterval(interval);
  }, [text, totalWords, delayPerGroup]);

  return (
    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-gray-200 mx-auto overflow-hidden text-center">
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block mx-1 sm:mx-1.5"
          style={{
            opacity: index < visibleWords ? 1 : 0,
            transform:
              index < visibleWords ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

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
      <section className="relative min-h-screen h-screen w-full overflow-hidden flex flex-col font-sans">
        {/* 1. Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={homeData?.backgroundImageUrl || "/cover.jpg"}
              alt={t("home.hero.imageAlt")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Dark warm overlay to match the 'atmosphere' vibe */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
          </div>
        </div>

        {/* Main Content Container - Centered */}
        <div className="relative z-30 flex-1 flex flex-col justify-center items-center text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Title Section - Centered */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
                {homeData?.title || t("home.hero.title.part1")}
              </h1>
            </div>

            {/* Description - Centered */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <AnimatedDescription
                text={homeData?.subtitle || DEFAULT_DESCRIPTION}
              />
            </div>

            {/* CTA Button - Centered */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  document.getElementById("about-us")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="group flex items-center gap-3 text-white hover:text-brand-orange transition-colors duration-300 uppercase tracking-wider text-xs sm:text-sm font-medium cursor-pointer bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white/20"
              >
                <span>{t("home.hero.cta")}</span>
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <main
        id="about-us"
        className="container mx-auto px-4 py-8 md:px-8 md:py-16 lg:px-12"
      >
        <AboutUs />
      </main>{" "}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-brand-orange uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-4 block">
                {t("home.mustTry.title.part1")}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-brand-dark">
                <span className="font-serif italic">
                  {t("home.mustTry.title.part2")}
                </span>
                <br />
                {t("home.mustTry.title.part3")}
              </h2>
            </div>
            <Link
              href="/trips"
              className="text-sm font-medium text-brand-orange hover:text-brand-orange/80 transition-colors uppercase tracking-wide flex items-center gap-2"
            >
              {t("home.mustTry.seeAll")}
              <span>→</span>
            </Link>
          </div>

          {tripsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {trips.map((trip) => (
                <Link
                  key={trip.id}
                  href={trip.href}
                  className="group relative rounded-2xl overflow-hidden block shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    width={300}
                    height={400}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white">
                    <h3 className="font-semibold mb-2 text-base sm:text-lg line-clamp-2">
                      {trip.title}
                    </h3>
                    <div className="flex items-center text-xs sm:text-sm mb-1.5 opacity-90">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      {trip.location}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm mb-3 opacity-90">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {trip.duration}
                    </div>
                    <div className="text-brand-orange font-bold text-base sm:text-lg">
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
      <QandA />
      <Testimonials />
      <NewsletterForm />
    </>
  );
}
