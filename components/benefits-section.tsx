"use client";
import { useI18n } from "@/components/LanguageProvider";

export default function BenefitsSection() {
  const { t } = useI18n();
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-medium mb-4">
              {t("benefits.title.part1")} <span className="italic">{t("benefits.title.part2")}</span>
              <br />
              <span className="italic">{t("benefits.title.part3")}</span> {t("benefits.title.part4")}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {t("benefits.description")}
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
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
                <h3 className="font-medium mb-1">{t("benefits.point1.title")}</h3>
                <p className="text-xs text-gray-600">{t("benefits.point1.description")}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
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
                <h3 className="font-medium mb-1">{t("benefits.point2.title")}</h3>
                <p className="text-xs text-gray-600">{t("benefits.point2.description")}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
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
                <h3 className="font-medium mb-1">{t("benefits.point3.title")}</h3>
                <p className="text-xs text-gray-600">{t("benefits.point3.description")}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
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
                <h3 className="font-medium mb-1">{t("benefits.point4.title")}</h3>
                <p className="text-xs text-gray-600">{t("benefits.point4.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
