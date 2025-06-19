"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          Taiga
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
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
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  scrolled ? "bg-gray-100" : "bg-white/10"
                }`}
              >
                <User className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Профайл
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Гарах
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-medium px-3 py-2 rounded-xl transition-colors ${
                scrolled
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-white text-black hover:text-blue-600"
              }`}
            >
              Нэвтрэх
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
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Профайл
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-gray-800 text-lg py-4 hover:text-red-600 transition-colors text-left"
              >
                Гарах
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-800 text-lg py-4 border-b border-gray-100 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Нэвтрэх
              </Link>
              <Link
                href="/signup"
                className="text-gray-800 text-lg py-4 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Бүртгүүлэх
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
