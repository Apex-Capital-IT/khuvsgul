"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/newsletter-form";
import BenefitsSection from "@/components/benefits-section";
import { useI18n } from "@/components/LanguageProvider";

function getYouTubeId(input: string): string | null {
  if (!input) return null;

  // Already looks like an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  // Try to extract from common URL patterns
  try {
    const url = new URL(input);
    // e.g. https://www.youtube.com/watch?v=ID
    if (url.hostname.includes("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      // e.g. /embed/ID or /shorts/ID
      const parts = url.pathname.split("/");
      const maybeId = parts.pop() || parts.pop(); // handle trailing slash
      if (maybeId && /^[a-zA-Z0-9_-]{11}$/.test(maybeId)) return maybeId;
    }
    // e.g. https://youtu.be/ID
    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace("/", "");
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {
    // not a URL; fall through
  }

  return null;
}

export default function AboutPage() {
  const [open, setOpen] = useState(false);
  const [introVideoOpen, setIntroVideoOpen] = useState(false);
  const { t, getArray } = useI18n();

  // You can keep a full URL here OR just the ID — both will work
  const YOUTUBE_SOURCE = "https://www.youtube.com/watch?v=dq5JJ7nIer8";
  const INTRO_VIDEO_SOURCE = "https://www.youtube.com/watch?v=dq5JJ7nIer8"; // You can change this to a different video

  const videoId = useMemo(() => getYouTubeId(YOUTUBE_SOURCE), [YOUTUBE_SOURCE]);
  const introVideoId = useMemo(() => getYouTubeId(INTRO_VIDEO_SOURCE), [INTRO_VIDEO_SOURCE]);

  return (
    <>
      <section className="relative h-[300px] flex items-center">
        <Image
          src="/cover.avif"
          alt={t("about.hero.title")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-5xl font-medium">
            {t("about.hero.title")} <span className="italic">{t("about.hero.title.italic")}</span>
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden">
                {/* ▶️ Click to open YouTube modal */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={t("about.video.play")}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <Image
                  src="/cover.avif"
                  alt={t("about.video.play")}
                  width={300}
                  height={200}
                  className="w-full aspect-video object-cover"
                />
              </div>

              <div className="relative rounded-2xl overflow-hidden row-span-2">
                <Image
                  src="/cover.avif"
                  alt={t("about.hero.title")}
                  width={300}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/cover.avif"
                  alt={t("about.hero.title")}
                  width={300}
                  height={200}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-medium mb-6">
                {t("about.company.name")} <br />
                {t("about.company.type")}
              </h2>
              <div className="text-gray-600 mb-6">
                <strong>{t("about.vision.title")}</strong> {t("about.vision.content")}
                <br />
                <strong>{t("about.mission.title")}</strong> {t("about.mission.content")}
                <br />
                <strong>{t("about.values.title")}</strong>
                <ul className="list-disc list-inside mt-2">
                  {getArray("about.values.list").map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
                <strong className="block mt-4">{t("about.goals.title")}</strong>
                <ul className="list-disc list-inside mt-2">
                  {getArray("about.goals.list").map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/trips">{t("about.learnMore")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              {t("about.introduction.title")}
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/cover.avif"
                    alt={t("about.introduction.title")}
                    width={600}
                    height={400}
                    className="w-full aspect-[3/2] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-80">Est. 2019</div>
                  </div>
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setIntroVideoOpen(true)}
                      aria-label={t("about.video.play")}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/70 hover:bg-white/30 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-black p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{t("about.introduction.professional.title")}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("about.introduction.professional.description")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-black p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{t("about.introduction.team.title")}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("about.introduction.team.description")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-black p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{t("about.introduction.partnerships.title")}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("about.introduction.partnerships.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-black">2019</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">{t("about.introduction.stats.founded")}</div>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-black">100+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">{t("about.introduction.stats.travelers")}</div>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-black">24/7</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">{t("about.introduction.stats.support")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-medium mb-2">
              {t("about.team.title.part1")} <span className="italic">{t("about.team.title.part2")} {t("about.team.title.part3")}</span>
            </h2>
            <p className="text-gray-600">
              {t("about.team.description")}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full border mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden bg-white shadow-lg border border-gray-100">
              <div className="bg-gray-50 p-8 flex items-center justify-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{t("about.team.management.title")}</h3>
                <p className="text-sm text-gray-500">
                  {t("about.team.management.description")}
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden bg-white shadow-lg border border-gray-100">
              <div className="bg-gray-50 p-8 flex items-center justify-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{t("about.team.professionals.title")}</h3>
                <p className="text-sm text-gray-500">
                  {t("about.team.professionals.description")}
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden bg-white shadow-lg border border-gray-100">
              <div className="bg-gray-50 p-8 flex items-center justify-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{t("about.team.partners.title")}</h3>
                <p className="text-sm text-gray-500">
                  {t("about.team.partners.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {open && (
        <VideoModal onClose={() => setOpen(false)}>
          <div className="relative w-[80vw] h-[80vh] bg-black rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </VideoModal>
      )}

      {/* Introduction Video Modal */}
      {introVideoOpen && (
        <VideoModal onClose={() => setIntroVideoOpen(false)}>
          <div className="relative w-[80vw] h-[80vh] bg-black rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${introVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </VideoModal>
      )}

      <NewsletterForm />
    </>
  );
}

function VideoModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const { t } = useI18n();
  
  // lock body scroll & ESC to close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* backdrop */}
      <button
        aria-label={t("about.video.close")}
        className="absolute inset-0 w-full h-full bg-black/70"
        onClick={onClose}
      />
      {/* content */}
      <div className="relative z-[101]">
        {/* close button */}
        <button
          onClick={onClose}
          aria-label={t("about.video.close")}
          className="absolute -top-10 right-0 md:-top-12 md:-right-12 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
