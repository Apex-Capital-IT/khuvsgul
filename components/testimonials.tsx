"use client";
import { useI18n } from "@/components/LanguageProvider";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: t("testimonials.items.0.quote"),
      name: t("testimonials.items.0.name"),
      country: t("testimonials.items.0.country"),
    },
    {
      quote: t("testimonials.items.1.quote"),
      name: t("testimonials.items.1.name"),
      country: t("testimonials.items.1.country"),
    },
    {
      quote: t("testimonials.items.2.quote"),
      name: t("testimonials.items.2.name"),
      country: t("testimonials.items.2.country"),
    },
  ];

  // Auto-advance slider with infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 lg:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-brand-orange uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
            СЭТГЭГДЭЛ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-brand-dark mb-4">
            {t("testimonials.title.part1")}{" "}
            <span className="font-sans">{t("testimonials.title.part2")}</span>
          </h2>
          <div className="w-24 h-[3px] bg-brand-orange mx-auto mt-6"></div>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4 md:px-8">
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-4 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-6 left-6 text-6xl text-brand-orange/20 font-serif leading-none">
                      "
                    </div>

                    {/* Quote Text */}
                    <div className="relative z-10 mb-8 mt-8">
                      <p className="text-md max-w-2xl mx-auto md:text-md text-gray-700 font-light leading-relaxed italic">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[2px] bg-brand-orange mb-6"></div>

                    {/* Author Info */}
                    <div className="flex justify-center items-center">
                      <div className="w-4 h-4 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-brand-orange"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-brand-dark">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-700 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-3 bg-brand-orange"
                    : "w-3 h-3 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
