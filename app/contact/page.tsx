"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useI18n();
  
  return (
    <>
      <section className="py-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-medium mb-8 text-center">
              {t("contact.title")}
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-medium mb-4">{t("contact.subtitle")}</h2>
                <p className="text-gray-600 mb-6">
                  {t("contact.description")}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">{t("contact.phone.title")}</div>
                      <div className="text-gray-600 flex flex-col ">
                        <a className="hover:underline" href="tel:+97677451953">
                          +976 77451953
                        </a>
                        <a className="hover:underline" href="tel:+97699020145">
                          +976 99020145
                        </a>
                        <a className="hover:underline" href="tel:+97699020136">
                          +976 99020136
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">{t("contact.email.title")}</div>
                      <div className="text-gray-600 hover:underline">
                        <a href="mailto:demchirgun@gmail.com">
                          demchirgun@gmail.com
                        </a>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <Link
                      className="hover:underline"
                      target="blank"
                      href="https://www.google.com/maps/place/49%C2%B037'32.4%22N+100%C2%B009'44.5%22E/@49.625674,100.162368,603m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d49.625674!4d100.162368?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                    >
                      <div className="font-medium">{t("contact.address.title")}</div>
                      <div className="text-gray-600">
                        {t("contact.address.content")}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium mb-4">{t("contact.form.title")}</h2>
                <form className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder={t("contact.form.name.placeholder")}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={t("contact.form.email.placeholder")}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder={t("contact.form.subject.placeholder")}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder={t("contact.form.message.placeholder")}
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    {t("contact.form.send")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
