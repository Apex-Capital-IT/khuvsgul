"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-sm shadow-md text-gray-800"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-light italic">
          Taiga
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/trips"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Аялал
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Чиглэл
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Бидний тухай
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Холбоо барих
          </Link>
        </nav>

        {/* Mobile Menu Button - Fixed visibility issue */}
        <button
          className="block md:hidden z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu
              className={`h-6 w-6 ${scrolled ? "text-gray-800" : "text-white"}`}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu - Improved UI */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        style={{ top: "0" }}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100">
          <Link
            href="/"
            className="text-xl font-light italic text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Khuvsgul
          </Link>
        </div>

        <nav className="flex flex-col px-4 bg-white py-8">
          <Link
            href="/trips"
            className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Аялал
          </Link>
          <Link
            href="/destination"
            className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Чиглэл
          </Link>
          <Link
            href="/about"
            className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Бидний тухай
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 text-lg py-4 hover:text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Холбоо барих
          </Link>
        </nav>
      </div>
    </header>
  );
}
