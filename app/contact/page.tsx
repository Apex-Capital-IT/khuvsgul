"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";

interface ContactData {
  description: string;
  phoneNumbers: string[];
  email: string;
  address: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function ContactPage() {
  const { t } = useI18n();
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const res = await fetch(`${API_URL}/contactUs`);
        const data = await res.json();
        console.log("Contact data fetched:", data);
        if (data.code === 0 && data.response && data.response.length > 0) {
          setContactData({
            description: data.response[0].description || "",
            phoneNumbers: Array.isArray(data.response[0].phoneNumbers)
              ? data.response[0].phoneNumbers
              : [],
            email: data.response[0].email || "",
            address: data.response[0].address || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch(`${API_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          title: formData.title,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.code === 0 || response.status === 200)) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", title: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error: any) {
      setSubmitError(
        error.message || "Failed to send message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
                <h2 className="text-xl font-medium mb-4">
                  {t("contact.subtitle")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {loading || !contactData
                    ? t("contact.description")
                    : contactData.description || t("contact.description")}
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
                      <div className="font-medium">
                        {t("contact.phone.title")}
                      </div>
                      <div className="text-gray-600 flex flex-col ">
                        {loading || !contactData ? (
                          <>
                            <a
                              className="hover:underline"
                              href="tel:+97677451953"
                            >
                              +976 77451953
                            </a>
                            <a
                              className="hover:underline"
                              href="tel:+97699020145"
                            >
                              +976 99020145
                            </a>
                            <a
                              className="hover:underline"
                              href="tel:+97699020136"
                            >
                              +976 99020136
                            </a>
                          </>
                        ) : contactData.phoneNumbers.length > 0 ? (
                          contactData.phoneNumbers.map((phone, index) => (
                            <a
                              key={index}
                              className="hover:underline"
                              href={`tel:${phone}`}
                            >
                              {phone}
                            </a>
                          ))
                        ) : (
                          <>
                            <a
                              className="hover:underline"
                              href="tel:+97677451953"
                            >
                              +976 77451953
                            </a>
                            <a
                              className="hover:underline"
                              href="tel:+97699020145"
                            >
                              +976 99020145
                            </a>
                            <a
                              className="hover:underline"
                              href="tel:+97699020136"
                            >
                              +976 99020136
                            </a>
                          </>
                        )}
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
                      <div className="font-medium">
                        {t("contact.email.title")}
                      </div>
                      <div className="text-gray-600 hover:underline">
                        <a
                          href={`mailto:${
                            loading || !contactData || !contactData.email
                              ? "demchirgun@gmail.com"
                              : contactData.email
                          }`}
                        >
                          {loading || !contactData || !contactData.email
                            ? "demchirgun@gmail.com"
                            : contactData.email}
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
                      <div className="font-medium">
                        {t("contact.address.title")}
                      </div>
                      <div className="text-gray-600">
                        {loading || !contactData || !contactData.address
                          ? t("contact.address.content")
                          : contactData.address}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium mb-4">
                  {t("contact.form.title")}
                </h2>

                {/* Success message */}
                {submitSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      Таны мессеж амжилттай илгээгдлээ! Бид удахгүй хариулах
                      болно.
                    </p>
                  </div>
                )}

                {/* Error message */}
                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.name.placeholder")}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.email.placeholder")}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.subject.placeholder")}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.message.placeholder")}
                      className="w-full min-h-[150px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={submitting}
                  >
                    {submitting ? "Илгээж байна..." : t("contact.form.send")}
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
