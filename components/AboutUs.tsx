import React from "react";
import { Plus } from "lucide-react";

export const AboutUs: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-12 relative">
            {/* The vertical orange line */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[2px] bg-brand-orange/80"></div>

            <span className="text-brand-orange uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 block">
              БИДНИЙ ТУХАЙ
            </span>

            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-brand-dark leading-tight">
                ДЭМЧ ИР ГҮН,
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif italic text-brand-dark leading-tight mt-2">
                хариуцлагатай аялал
              </h2>
            </div>

            {/* Horizontal Orange Line Divider */}
            <div className="w-24 h-[3px] bg-brand-orange mb-6 sm:mb-8"></div>

            <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed mb-8 sm:mb-10">
              Монгол дахь аялал жуулчлалын үндэсний сүлжээ компани. Бидний эрхэм
              зорилго бол компанийн үйл ажиллагааг ил тод, нээлттэй, хариуцлагатай
              байлгаж, иргэн бүр оролцох боломжийг бүрдүүлэх явдал юм.
            </p>

            {/* Feature List with custom Orange Cross icons */}
            <div className="space-y-4 sm:space-y-6">
              <ListItem text="Монгол орны онгон байгалын аялал." />
              <ListItem text="Аюулгүй, найдвартай үйлчилгээ." />
              <ListItem text="Орон нутгийн соёл, уламжлалтай таныг танилцуулна" />
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0 lg:pl-12">
            <div className="w-full h-full relative rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-xl">
              <img
                src="/taiga.jpg"
                alt="Mongolia Taiga Nature"
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Component for the List Items
const ListItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-4 group">
    <div className="mt-1 flex-shrink-0">
      <div className="relative">
        {/* Custom styled plus/star icon matching the design */}
        <Plus className="w-5 h-5 text-brand-orange stroke-[3px]" />
      </div>
    </div>
    <span className="text-lg text-gray-800 font-light group-hover:text-brand-orange transition-colors duration-300">
      {text}
    </span>
  </div>
);
