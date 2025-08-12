"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BenefitsSection from "@/components/benefits-section";
import NewsletterForm from "@/components/newsletter-form";
import Testimonials from "@/components/testimonials";
import { useI18n } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative h-screen flex items-center">
        <Image
          src="/cover.avif"
          alt={t("home.hero.imageAlt")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <p className="text-sm mb-2">{t("home.hero.kicker")}</p>
          <h1 className="text-4xl md:text-6xl font-medium mb-4">
            <span className="italic">{t("home.hero.title.part1")}</span> {t("home.hero.title.part2")}
            <br />
            <span className="italic">{t("home.hero.title.part3")}</span> {t("home.hero.title.part4")}
            <br />
            <span className="italic">{t("home.hero.title.part5")}</span> {t("home.hero.title.part6")}
          </h1>
          <p className="max-w-md mb-8 text-sm">
            {t("home.hero.description")}
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
              {t("home.mustTry.title.part1")} <span className="italic">{t("home.mustTry.title.part2")}</span>
              <br />
              {t("home.mustTry.title.part3")}
            </h2>
            <Link href="/trips" className="text-sm underline">
              {t("home.mustTry.seeAll")}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative rounded-lg overflow-hidden">
              <Link href="/trips/tropical-paradise" className="block">
                <Image
                  src="/cover.avif"
                  alt={t("home.card1.imageAlt")}
                  width={300}
                  height={400}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute top-0 right-0 p-2">
                  <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="font-medium mb-1">{t("home.card1.title")}</h3>
                  <div className="flex items-center text-xs mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {t("home.card1.location")}
                  </div>
                  <div className="flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {t("home.card1.duration")}
                  </div>
                  <div className="mt-2 font-medium">$999</div>
                </div>
              </Link>
            </div>
            <div className="group relative rounded-lg overflow-hidden">
              <Link href="/trips/mountain-odyssey" className="block">
                <Image
                  src="/cover.avif"
                  alt={t("home.card2.imageAlt")}
                  width={300}
                  height={400}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute top-0 right-0 p-2">
                  <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="font-medium mb-1">{t("home.card2.title")}</h3>
                  <div className="flex items-center text-xs mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {t("home.card2.location")}
                  </div>
                  <div className="flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {t("home.card2.duration")}
                  </div>
                  <div className="mt-2 font-medium">$1499</div>
                </div>
              </Link>
            </div>
            <div className="group relative rounded-lg overflow-hidden">
              <Link href="/trips/cultural-immersion" className="block">
                <Image
                  src="/cover.avif"
                  alt={t("home.card3.imageAlt")}
                  width={300}
                  height={400}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute top-0 right-0 p-2">
                  <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="font-medium mb-1">{t("home.card3.title")}</h3>
                  <div className="flex items-center text-xs mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {t("home.card3.location")}
                  </div>
                  <div className="flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {t("home.card3.duration")}
                  </div>
                  <div className="mt-2 font-medium">$899</div>
                </div>
              </Link>
            </div>
            <div className="group relative rounded-lg overflow-hidden">
              <Link href="/trips/urban-adventure" className="block">
                <Image
                  src="/cover.avif"
                  alt={t("home.card4.imageAlt")}
                  width={300}
                  height={400}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute top-0 right-0 p-2">
                  <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="font-medium mb-1">{t("home.card4.title")}</h3>
                  <div className="flex items-center text-xs mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {t("home.card4.location")}
                  </div>
                  <div className="flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {t("home.card4.duration")}
                  </div>
                  <div className="mt-2 font-medium">$1099</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/cover.avif"
              alt={t("home.gallery.imageAlt")}
              width={1200}
              height={500}
              className="w-full aspect-[21/9] object-cover"
            />
            <Link
              href="/gallery"
              className="absolute inset-0 bg-black/30 flex items-center justify-center"
            >
              <h2 className="text-white text-3xl font-medium">
                {t("home.gallery.title.part1")} <span className="italic">{t("home.gallery.title.part2")}</span>
                <br />
                {t("home.gallery.title.part3")}
              </h2>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <NewsletterForm />
    </>
  );
}
