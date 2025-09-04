"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CommentForm from "@/components/CommentForm";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

async function getTrip(slug: string) {
  const res = await fetch(`${API_URL}/travel/${slug}`, { cache: "no-store" });
  const data = await res.json();
  if (data.code !== 0) throw new Error(data.message || "Failed to fetch trip");
  return data.response;
}

export default function TripDetailPage({
  params,
}: {
  // In Next.js 15+, `params` is a promise
  params: Promise<{ slug: string }>;
}) {
  // Await params before using slug
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    travelersSize: 1,
    startDate: "",
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingForm.fullName.trim() || !bookingForm.email.trim()) {
      toast.error("Бүх талбарыг бөглөнө үү");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Нэвтрэх шаардлагатай");
      return;
    }

    setSubmitting(true);

    try {
      const orderData = {
        travelId: trip._id,
        travelersSize: bookingForm.travelersSize,
        contact: {
          fullName: bookingForm.fullName,
          email: bookingForm.email,
        },
      };

      const response = await fetch(`${API_URL}/api/v1/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.code === 0) {
        toast.success("Аялал амжилттай захиалагдлаа!");
        // Reset form
        setBookingForm({
          fullName: "",
          email: "",
          travelersSize: 1,
          startDate: "",
        });
      } else {
        throw new Error(data.message || "Захиалга амжилтгүй");
      }
    } catch (error: any) {
      toast.error(error.message || "Алдаа гарлаа");
    } finally {
      setSubmitting(false);
    }
  };

  // Use useEffect to fetch data since this is now a client component
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { slug } = await params;
        const tripData = await getTrip(slug);
        setTrip(tripData);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [params]);

  if (loading || !trip) {
    return <div>Loading...</div>;
  }

  const comments: any[] = Array.isArray(trip.comments) ? trip.comments : [];
  const images = trip.images || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Function to convert YouTube URLs to embed format
  const getEmbedUrl = (url: string): string => {
    if (!url) return "";

    // Handle YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";

      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0] || "";
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Handle Vimeo URLs
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0] || "";
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    // Return original URL if not a recognized video platform
    return url;
  };

  return (
    <>
      <section className="relative h-[300px] flex items-center">
        <Image
          src={images[currentImageIndex] || "/cover.avif"}
          alt={trip.title || "Trip Cover"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Navigation buttons - only show if there are multiple images */}
        {hasMultipleImages && (
          <>
            <Button
              onClick={previousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white border-0"
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>

            <Button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white border-0"
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </>
        )}

        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-5xl font-medium">
            {trip.title || "Аяллын нэр"}
            <br />
            <span className="italic text-2xl">
              {trip.categories && trip.categories.length > 0
                ? trip.categories.map((cat: any) => cat.name).join(", ")
                : "Багц"}
            </span>
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
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
                  {trip.destination?.location || "Байршил тодорхойгүй"}
                </div>
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {trip.duration
                    ? `${trip.duration.days || 0} өдөр, ${
                        trip.duration.nights || 0
                      } шөнө`
                    : "Хугацаа тодорхойгүй"}
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                {trip.description || "Дэлгэрэнгүй тайлбар байхгүй."}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Үнэ</div>
                  <div className="text-xl font-bold">
                    {trip.price ? `${trip.price.toLocaleString()}₮` : "-"}
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Квот</div>
                  <div className="text-xl font-bold">
                    {typeof trip.quota?.available === "number"
                      ? `${trip.quota.available} үлдсэн`
                      : "-"}
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Хуваарь</div>
                  <div className="text-xl font-bold">
                    {trip.startDateTime && trip.endDateTime
                      ? `${new Date(
                          trip.startDateTime
                        ).toLocaleDateString()} - ${new Date(
                          trip.endDateTime
                        ).toLocaleDateString()}`
                      : "-"}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Үүнд багтсан:</h3>
                <ul className="space-y-2">
                  {(trip.included || ["Мэдээлэл байхгүй"]).map(
                    (item: string, idx: number) => (
                      <li className="flex items-center" key={idx}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Үүнд багтаагүй:</h3>
                <ul className="space-y-2">
                  {(trip.excluded || ["Мэдээлэл байхгүй"]).map(
                    (item: string, idx: number) => (
                      <li className="flex items-center" key={idx}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Аяллын төлөвлөгөө</h3>
                <Accordion type="single" collapsible className="w-full">
                  {(trip.plans || []).map((day: any, idx: number) => (
                    <AccordionItem value={`day${idx + 1}`} key={idx}>
                      <AccordionTrigger>
                        {day.title || `Өдөр ${idx + 1}`}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 text-gray-600">
                          {(day.items || []).map(
                            (activity: string, aidx: number) => (
                              <li key={aidx}>{activity}</li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 border rounded-lg sticky top-24">
                <div className="flex justify-between mb-6">
                  <div className="font-medium">Аялал захиалах</div>
                  <div className="text-gray-500">Мессежүүд</div>
                </div>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Бүтэн нэр"
                      className="w-full"
                      value={bookingForm.fullName}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="И-мэйл"
                      className="w-full"
                      value={bookingForm.email}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Select
                      value={String(bookingForm.travelersSize)}
                      onValueChange={(value) =>
                        setBookingForm({
                          ...bookingForm,
                          travelersSize: parseInt(value, 10),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Зочдын тоо" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <SelectItem value={String(n)} key={n}>
                            {n} хүн
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={bookingForm.startDate}
                      onValueChange={(value) =>
                        setBookingForm({ ...bookingForm, startDate: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Эхлэх огноо" />
                      </SelectTrigger>
                      <SelectContent>
                        {(trip.schedules || []).map(
                          (date: string, idx: number) => (
                            <SelectItem value={date} key={idx}>
                              {date}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <div>Үнэ (1 хүн)</div>
                      <div className="font-medium">
                        {trip.price ? `${trip.price.toLocaleString()}₮` : "-"}
                      </div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div>НӨАТ (10%)</div>
                      <div className="font-medium">
                        {trip.price
                          ? `${Math.round(trip.price * 0.1).toLocaleString()}₮`
                          : "-"}
                      </div>
                    </div>
                    <div className="flex justify-between font-bold">
                      <div>Нийт</div>
                      <div>
                        {trip.price
                          ? `${Math.round(trip.price * 1.1).toLocaleString()}₮`
                          : "-"}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={submitting}
                  >
                    {submitting ? "Захиалах..." : "Одоо захиалах"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {trip.videos &&
        Array.isArray(trip.videos) &&
        trip.videos.length > 0 &&
        trip.videos.some((video: string) => video.trim()) && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-medium mb-8">
                Аяллын <span className="italic">видео</span>
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {trip.videos
                  .filter((video: string) => video.trim())
                  .map((video: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden"
                    >
                      <iframe
                        src={getEmbedUrl(video)}
                        title={`${trip.title} - Аяллын видео ${index + 1}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

      {/* Testimonials-style comments from real data */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium mb-8">
            Жинхэнэ <span className="italic">түүхүүд</span>
            <br />
            аялагчдаас
          </h2>
          {comments.length === 0 ? (
            <div className="text-gray-500">Одоогоор сэтгэгдэл алга.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {comments.map((c: any, idx: number) => (
                <div
                  key={c._id || idx}
                  className="border bg-white rounded-lg p-6"
                >
                  <div className="flex items-start mb-4">
                    <div className="text-3xl text-gray-300 mr-2">"</div>
                    <p className="text-sm">
                      {c.content || c.comment || c.text}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image
                        src={trip.images?.[0] || "/placeholder-user.jpg"}
                        alt="Avatar"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium">
                        {typeof c.user === "string"
                          ? "Зочин"
                          : c.user?.name || "Зочин"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CommentForm tripId={trip._id} />
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
