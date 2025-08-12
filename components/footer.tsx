import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-4">
      <footer className="mt-6 bg-[white] border-[1px] border-black rounded-3xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-bold text-xl">{t("brand.name")}</span>
          </div>

          <div className="flex flex-wrap gap-6">
            <Link href="/" className="text-gray-600 hover:text-black">
              {t("footer.home")}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-black">
              {t("footer.about")}
            </Link>

            <Link href="/contact" className="text-gray-600 hover:text-black">
              {t("footer.contact")}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} {t("brand.name")}. {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
