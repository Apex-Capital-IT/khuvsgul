import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

export const QandA: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Аялал хэрхэн захиалах вэ?",
      answer:
        "Та манай вебсайтаар дамжуулан захиалга өгөх, манай оффис дээр биечлэн ирэх, эсвэл 7700-XXXX дугаарт холбогдон захиалга өгөх боломжтой. Бид танд 24/7 цагийн турш туслахад бэлэн.",
    },
    {
      question: "Аяллын төлбөрт юу багтсан бэ?",
      answer:
        "Манай аяллын багцад тээврийн зардал, тав тухтай зочид буудал, өдрийн 3 хоол, мэргэжлийн хөтөч орчуулагч болон үзвэр үйлчилгээний тасалбарууд бүрэн багтсан болно.",
    },
    {
      question: "Визний материал бүрдүүлэхэд туслах уу?",
      answer:
        "Тийм ээ, бид аялагчдадаа зориулан визний урилга гаргах, шаардлагатай бичиг баримтын зөвлөгөө өгөх болон элчин сайдын яамны цаг захиалах үйлчилгээг үзүүлдэг.",
    },
    {
      question: "Аялал цуцлагдсан тохиолдолд яах вэ?",
      answer:
        "Хэрэв та аялал эхлэхээс 14 хоногийн өмнө мэдэгдэж цуцлавал бид төлбөрийн 100%-ийг буцаан олгоно. Харин 7 хоногийн өмнө цуцалбал 50%-ийн шимтгэлтэйг анхаарна уу.",
    },
    {
      question: "Хувийн аялал зохион байгуулж болох уу?",
      answer:
        "Боломжтой. Бид таны хүсэл сонирхолд нийцүүлэн гэр бүлийн, найз нөхдийн болон албан байгууллагын тусгай аяллыг зохион байгуулж өгөх үйлчилгээтэй.",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Q&A Content */}
        <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-8 relative">
          <span className="text-brand-orange uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 block">
            ТҮГЭЭМЭЛ АСУУЛТ
          </span>

          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-brand-dark leading-tight">
              Таньд асуулт байна уу?
            </h2>
          </div>

          <div className="w-24 h-[3px] bg-brand-orange mb-6"></div>

          <p className="text-sm sm:text-base text-gray-700 font-light leading-relaxed mb-8 lg:mb-10 border-l-2 border-brand-orange pl-4 sm:pl-6">
            Бид таны аяллыг мартагдашгүй, тав тухтай, аюулгүй байлгахын төлөө
            хичээн ажилладаг. Хэрэв танд нэмэлт асуулт байвал бидэнтэй
            холбогдоорой.
          </p>

          {/* Accordion List */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 sm:py-5 flex items-center justify-between group text-left focus:outline-none"
                >
                  <span
                    className={`text-base sm:text-lg lg:text-xl font-medium transition-colors duration-300 pr-4 ${
                      openIndex === index
                        ? "text-brand-orange"
                        : "text-brand-dark"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div className="relative ml-4 flex-shrink-0">
                    <div
                      className={`transition-transform duration-500 ease-in-out ${
                        openIndex === index ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-6 h-6 text-brand-orange" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-brand-orange transition-colors" />
                      )}
                    </div>
                  </div>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100 pb-4 sm:pb-5"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base lg:text-lg pr-4 sm:pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-6 relative h-[400px] sm:h-[500px] lg:h-auto lg:min-h-[700px] lg:pl-8 mt-8 lg:mt-0">
          <div className="w-full h-full relative rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-xl">
            <img
              src="/cover.avif"
              alt="Mongolian Taiga Forest"
              className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Contact Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-white/95 backdrop-blur-md p-4 sm:p-5 lg:p-6 rounded-xl border border-white/50 shadow-lg">
              <h3 className="text-brand-dark font-serif text-xl sm:text-2xl italic mb-2">
                Холбоо барих
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Танд тусламж хэрэгтэй бол бидэнтэй холбогдоорой.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-brand-orange font-bold text-base sm:text-lg">
                  7700-1234
                </span>
                <Link href="/contact">
                  <button className="bg-brand-dark text-white px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-brand-orange transition-colors w-full sm:w-auto">
                    Имэйл илгээх
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
