import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/newsletter-form";
import BenefitsSection from "@/components/benefits-section";

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[300px] flex items-center">
        <Image
          src="/cover.avif"
          alt="Бидний тухай"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-5xl font-medium">
            Бидний <span className="italic">тухай</span>
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
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
                  alt="Видео зураг"
                  width={300}
                  height={200}
                  className="w-full aspect-video object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden row-span-2">
                <Image
                  src="/cover.avif"
                  alt="Бидний тухай зураг"
                  width={300}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/cover.avif"
                  alt="Бидний тухай зураг"
                  width={300}
                  height={200}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-medium mb-6">
                Онцгой <span className="italic">аялал</span>
                <br />
                туршлага бүтээх
              </h2>
              <p className="text-gray-600 mb-6">
                Бид дэлхийн гайхамшгуудаар онцгой аяллын туршлага бүтээхэд хүсэл
                эрмэлзэлтэй байдаг. Олон жилийн туршлагатайгаар бид жинхэнэ адал
                явдлын урлагийг эзэмшсэн бөгөөд тансаг байдал, соёл, тогтвортой
                байдлыг хослуулан бүтээдэг. Бидний үүрэг бол аялагчдыг дэлхийн
                гайхамшигтай холбож, очих газруудынхаа гоо үзэсгэлэнг хадгалах
                явдал юм.
              </p>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/trips">Дэлгэрэнгүй</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden mb-8">
            <Image
              src="/cover.avif"
              alt="Бидний аялал видео"
              width={1200}
              height={500}
              className="w-full aspect-[21/9] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-white text-3xl font-medium">
                Бидний <span className="italic">аялал</span> видеонуудаар
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-medium mb-2">
              Бидний <span className="italic">хүсэл тэмүүлэлтэй</span>
              <br />
              баг хамт олон
            </h2>
            <p className="text-gray-600">
              Xplore-ийн зүрх сэтгэл болох аялалд дуртай бидний баг хамт олонтой
              танилцана уу.
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
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Багийн гишүүн"
                width={400}
                height={500}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium">Анита Пател</h3>
                <p className="text-sm text-gray-500">
                  Үүсгэн байгуулагч ба Гүйцэтгэх захирал
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Багийн гишүүн"
                width={400}
                height={500}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium">Смит Ксандер</h3>
                <p className="text-sm text-gray-500">Аяллын мэргэжилтэн</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Багийн гишүүн"
                width={400}
                height={500}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium">Оливия Мартинез</h3>
                <p className="text-sm text-gray-500">Маркетингийн менежер</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
