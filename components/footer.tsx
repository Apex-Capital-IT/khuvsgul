import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative bg-brand-dark text-white overflow-hidden">
      {/* Abstract Background Effect - matching newsletter CTA */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>

        {/* Orange Gradient Flows */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-brand-orange/40 rounded-full blur-[100px] lg:blur-[160px] mix-blend-screen opacity-60 animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-brand-orange/20 rounded-full blur-[80px] lg:blur-[140px] mix-blend-screen opacity-40"></div>

        {/* Diagonal Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-sans font-semibold mb-4 text-white">
              {t("brand.name")}
            </h3>
            <div className="w-16 h-[3px] bg-brand-orange mb-6"></div>
            <p className="text-gray-300 font-light leading-relaxed text-sm mb-6">
              Монгол дахь аялал жуулчлалын үндэсний сүлжээ компани
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-brand-orange hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-brand-orange hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-brand-orange hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange mb-6">
              Холбоосууд
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-brand-orange transition-colors duration-300 font-light"
                >
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-brand-orange transition-colors duration-300 font-light"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-300 hover:text-brand-orange transition-colors duration-300 font-light"
                >
                  Аяллууд
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-brand-orange transition-colors duration-300 font-light"
                >
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange mb-6">
              Холбоо барих
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:demchirgun@gmail.com"
                  className="text-gray-300 hover:text-brand-orange transition-colors duration-300 font-light text-sm"
                >
                  demchirgun@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+97699020145"
                  className="text-gray-300 hover:text-brand-orange transition-colors duration-300 font-light text-sm"
                >
                  +976 99020145
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 font-light text-sm">
                  Улаанбаатар, Монгол Улс
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-light">
              © {new Date().getFullYear()} {t("brand.name")}. Бүх эрх хуулиар
              хамгаалагдсан.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-orange transition-colors duration-300 font-light"
              >
                Нууцлалын бодлого
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-orange transition-colors duration-300 font-light"
              >
                Үйлчилгээний нөхцөл
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
