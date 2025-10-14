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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-medium mb-4">
              {t("benefits.title.part1")}{" "}
              <span className="italic">{t("benefits.title.part2")}</span>
              <br />
              <span className="italic">{t("benefits.title.part3")}</span>{" "}
              {t("benefits.title.part4")}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {t("benefits.description")}
            </p>
          </div>
          <div className="space-y-4">
            {loading ? (
              // Loading skeleton
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-lg flex items-start space-x-4 animate-pulse"
                  >
                    <div className="bg-gray-200 p-2 rounded-full h-9 w-9"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              displayBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg flex items-start space-x-4"
                >
                  <div className="bg-gray-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                    <h3 className="font-medium mb-1">{benefit.title}</h3>
                    <p className="text-xs text-gray-600">{benefit.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
