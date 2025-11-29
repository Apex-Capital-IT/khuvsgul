"use client";
import { useI18n } from "@/components/LanguageProvider";

type Benefit = {
  title: string;
  content: string;
};

type BenefitsSectionProps = {
  benefits?: Benefit[];
  loading?: boolean;
};

export default function BenefitsSection({
  benefits,
  loading,
}: BenefitsSectionProps) {
  const { t } = useI18n();

  // Use fallback static data if benefits not provided or empty
  const defaultBenefits = [
    {
      title: t("benefits.point1.title"),
      content: t("benefits.point1.description"),
    },
    {
      title: t("benefits.point2.title"),
      content: t("benefits.point2.description"),
    },
    {
      title: t("benefits.point3.title"),
      content: t("benefits.point3.description"),
    },
    {
      title: t("benefits.point4.title"),
      content: t("benefits.point4.description"),
    },
  ];

  const displayBenefits =
    benefits && benefits.length > 0 ? benefits : defaultBenefits;

  return (
    <section className="py-16 lg:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 lg:mb-16">
          <span className="text-brand-orange uppercase tracking-[0.2em] text-sm font-semibold mb-4 block"></span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-brand-dark mb-4">
            <span className="font-serif px-2 italic">
              {t("benefits.title.part1")}
              <span className="font-serif px-2 italic">
                {t("benefits.title.part2")}
              </span>
            </span>
            <span className="font-serif italic">
              {t("benefits.title.part3")}
            </span>{" "}
            {t("benefits.title.part4")}
          </h2>
          <div className="w-24 h-[3px] bg-brand-orange mt-6"></div>
          <p className="text-gray-700 max-w-2xl text-base lg:text-lg mt-6 font-light leading-relaxed">
            {t("benefits.description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {loading ? (
            // Loading skeleton
            <>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white p-2 lg:p-8 rounded-2xl flex items-start space-x-4 animate-pulse shadow-sm"
                >
                  <div className="bg-gray-200 p-3 rounded-full h-8 w-8"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            displayBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 lg:p-8 rounded-2xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-brand-orange/10 p-1 rounded-full flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-brand-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark mb-2 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {benefit.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
