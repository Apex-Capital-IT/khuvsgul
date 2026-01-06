"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-cream-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-brand-orange opacity-20 select-none">
            404
          </h1>
          <div className="-mt-20 md:-mt-28">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Хуудас олдсонгүй
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Уучлаарай, таны хайж буй хуудас олдсонгүй эсвэл устгагдсан байна.
            </p>
          </div>
        </div>

        {/* Illustration/Icon */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-brand-orange/10 mb-6">
            <Search className="w-16 h-16 text-brand-orange" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white gap-2 min-w-[200px]"
            >
              <Home className="w-5 h-5" />
              Нүүр хуудас руу
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2 min-w-[200px] border-brand-orange text-brand-orange hover:bg-brand-orange/10"
          >
            <ArrowLeft className="w-5 h-5" />
            Буцах
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Та эдгээр хуудсуудад очиж болно:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trips"
              className="text-brand-orange hover:underline text-sm font-medium"
            >
              Аяллууд
            </Link>
            <Link
              href="/about"
              className="text-brand-orange hover:underline text-sm font-medium"
            >
              Бидний тухай
            </Link>
            <Link
              href="/contact"
              className="text-brand-orange hover:underline text-sm font-medium"
            >
              Холбоо барих
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
