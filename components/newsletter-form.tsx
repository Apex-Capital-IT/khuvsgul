"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useI18n } from "@/components/LanguageProvider";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const { t } = useI18n();
  return (
    <section className="bg-brand-cream min-h-screen flex items-center justify-center p-4 lg:p-8">
      {/* Main Card Container */}
      <div className="relative w-full max-w-6xl mx-auto rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl bg-brand-dark min-h-[400px] flex flex-col items-center justify-center text-center">
        {/* Abstract Background Effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Dark base */}
          <div className="absolute inset-0 bg-[#0a0a0a]"></div>

          {/* Orange Gradient Flows */}
          <div className="absolute top-[-20%] right-[-10%] w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-brand-orange/40 rounded-full blur-[100px] lg:blur-[160px] mix-blend-screen opacity-60 animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-brand-orange/20 rounded-full blur-[80px] lg:blur-[140px] mix-blend-screen opacity-40"></div>

          {/* Diagonal Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-2xl px-6 py-12 lg:py-20 flex flex-col items-center">
          {/* Header Section */}
          <div className="">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white mb-4 tracking-tight leading-tight">
              Дурсамжаар дүүрэн
              <span className="block font-serif italic text-brand-orange mt-2">
                аяллаа эхлүүл
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
