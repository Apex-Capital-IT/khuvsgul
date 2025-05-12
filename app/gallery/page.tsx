import Image from "next/image";
import NewsletterForm from "@/components/newsletter-form";

export default function GalleryPage() {
  return (
    <>
      <section className="relative h-[300px] flex items-center">
        <Image
          src="/cover.avif"
          alt="Галерей"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-5xl font-medium">
            Зурган <span className="italic">галерей</span>
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium mb-8">
            <span className="italic">Ази</span> тивээр аялсан
          </h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Ази"
                width={400}
                height={300}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden md:col-span-2 md:row-span-2">
              <Image
                src="/cover.avif"
                alt="Ази"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Ази"
                width={400}
                height={300}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden md:col-span-2">
              <Image
                src="/cover.avif"
                alt="Ази"
                width={800}
                height={400}
                className="w-full aspect-[2/1] object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Ази"
                width={400}
                height={300}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Ази"
                width={400}
                height={300}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium mb-8">
            <span className="italic">Соёл</span> дээр аялсан
          </h2>
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
          <div className="rounded-lg overflow-hidden">
            <div className="relative">
              <Image
                src="/cover.avif"
                alt="Соёл"
                width={1200}
                height={600}
                className="w-full aspect-[2/1] object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 text-xs rounded-full">
                Перу улсын баяр
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium mb-8">
            <span className="italic">Европ</span> тивээр аялсан
          </h2>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Европ"
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Европ"
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/cover.avif"
                alt="Европ"
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[500px]">
        <Image
          src="/cover.avif"
          alt="Видеоны ар дэвсгэр"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
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
      </section>

      <NewsletterForm />
    </>
  );
}
