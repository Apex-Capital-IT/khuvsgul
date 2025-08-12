"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useI18n } from "@/components/LanguageProvider";

export default function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">
          {t("testimonials.title.part1")} <span className="italic">{t("testimonials.title.part2")}</span>
          <br />
          {t("testimonials.title.part3")}
        </h2>
        <div className="relative">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-4 md:-ml-6">
              <CarouselItem className="pl-4 md:pl-6 basis-1/1 md:basis-1/2">
                <div className="border rounded-lg p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="text-3xl text-gray-300 mr-2">"</div>
                      <p className="text-sm">{t("testimonials.items.0.quote")}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image src="/images/avatar-1.jpg" alt={t("testimonials.items.0.avatarAlt")}
                        width={32} height={32} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{t("testimonials.items.0.name")}</p>
                      <p className="text-xs text-gray-500">{t("testimonials.items.0.country")}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-4 md:pl-6 basis-1/1 md:basis-1/2">
                <div className="border rounded-lg p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="text-3xl text-gray-300 mr-2">"</div>
                      <p className="text-sm">{t("testimonials.items.1.quote")}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image src="/images/avatar-2.jpg" alt={t("testimonials.items.1.avatarAlt")} width={32} height={32} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{t("testimonials.items.1.name")}</p>
                      <p className="text-xs text-gray-500">{t("testimonials.items.1.country")}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-4 md:pl-6 basis-1/1 md:basis-1/2">
                <div className="border rounded-lg p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="text-3xl text-gray-300 mr-2">"</div>
                      <p className="text-sm">{t("testimonials.items.2.quote")}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image src="/images/avatar-3.jpg" alt={t("testimonials.items.2.avatarAlt")} width={32} height={32} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{t("testimonials.items.2.name")}</p>
                      <p className="text-xs text-gray-500">{t("testimonials.items.2.country")}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-y-1/2 top-1/2" />
            <CarouselNext className="right-0 -translate-y-1/2 top-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
