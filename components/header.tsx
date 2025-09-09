"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, User, LogOut, Globe, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/LanguageProvider";
import { useCart } from "@/components/CartProvider";

export default function Header() {
  const router = useRouter();
  const { t, locale, setLocale } = useI18n();
  const { getCartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest(".dropdown-container")) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-sm shadow-md text-gray-800"
          : "bg-black/50  backdrop-blur-2xl text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-light italic">
          {t("brand.name")}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/trips"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            {t("nav.trips")}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            {t("nav.contact")}
          </Link>
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                  scrolled
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white/10 text-white"
                }`}
              >
                <Globe className="w-4 h-4" />
                {locale === "en" ? "English" : "Монгол"}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocale("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("mn")}>
                  Монгол
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Cart Icon */}
          <Link
            href="/cart"
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              scrolled ? "bg-gray-100 hover:bg-gray-200" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <ShoppingCart className={`w-5 h-5 ${scrolled ? "text-gray-800" : "text-white"}`} />
            {getCartCount() > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                scrolled ? "bg-red-500 text-white" : "bg-red-500 text-white"
              }`}>
                {getCartCount()}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  scrolled ? "bg-gray-100" : "bg-white/10"
                }`}
              >
                <User className="w-5 h-5" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-4 w-48 bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 hover:rounded-lg rounded-lg z-[9999]">
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center text-black px-4 py-2 text-sm hover:bg-black hover:text-white rounded-t-lg hover:rounded-t-lg transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t("nav.profile")}
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-black text-sm hover:bg-black hover:text-white rounded-b-lg hover:rounded-b-lg  transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav.logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-medium px-3 py-2 rounded-xl transition-colors ${
                scrolled
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-white text-black hover:text-blue-600"
              }`}
            >
              {t("nav.login")}
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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
            {t("brand.name")}
          </Link>
        </div>

        <nav className="flex flex-col px-4 bg-white py-8">
          <Link
            href="/trips"
            className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.trips")}
          </Link>
          <Link
            href="/about"
            className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 text-lg py-4 hover:text-gray-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.contact")}
          </Link>
          <Link
            href="/cart"
            className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors flex items-center justify-between"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Сагс</span>
            {getCartCount() > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.profile")}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-gray-800 text-lg py-4 hover:text-red-600 transition-colors text-left"
              >
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/signup"
                className="text-gray-800 text-lg py-4 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.signup")}
              </Link>
            </>
          )}
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 border rounded-xl px-3 py-2">
              <Globe className="w-4 h-4 text-gray-700" />
              <button
                className={`text-sm ${
                  locale === "en" ? "font-semibold" : "text-gray-500"
                }`}
                onClick={() => setLocale("en")}
              >
                English
              </button>
              <span className="text-gray-300">/</span>
              <button
                className={`text-sm ${
                  locale === "mn" ? "font-semibold" : "text-gray-500"
                }`}
                onClick={() => setLocale("mn")}
              >
                Монгол
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
