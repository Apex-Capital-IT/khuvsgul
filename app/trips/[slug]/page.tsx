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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

async function getTrip(slug: string) {
  const res = await fetch(`${API_URL}/travel/${slug}`, { cache: "no-store" });
  const data = await res.json();
  if (data.code !== 0) throw new Error(data.message || "Failed to fetch trip");
  return data.response;
}

export default async function TripDetailPage({
  params,
}: {
  // In Next.js 15+, `params` is a promise
  params: Promise<{ slug: string }>;
}) {
  // Await params before using slug
  const { slug } = await params;
  const trip = await getTrip(slug);

  return (
    <>
      <section className="relative h-[300px] flex items-center">
        <Image
          src={trip.images?.[0] || "/cover.avif"}
          alt={trip.title || "Trip Cover"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-5xl font-medium">
            {trip.title || "Аяллын нэр"}
            <br />
            <span className="italic">
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
                <form className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Бүтэн нэр"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Аяллын багц" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={trip._id}>{trip.title}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
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
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Зочдын тоо" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((n) => (
                          <SelectItem value={String(n)} key={n}>
                            {n} хүн
                          </SelectItem>
                        ))}
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
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Одоо захиалах
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section can remain static or be enhanced with real data if available */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium mb-8">
            Жинхэнэ <span className="italic">түүхүүд</span>
            <br />
            аялагчдаас
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border bg-white rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl text-gray-300 mr-2">"</div>
                <p className="text-sm">
                  Аяллын маань мөрөөдөл биелсэн. Би хэзээ ч очиж үзнэ гэж
                  бодоогүй газруудаар аялсан. Бүх зүйл эхнээсээ дуустал маш
                  амар, саадгүй болсон.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src={trip.images?.[0] || "/cover.avif"}
                    alt="Avatar"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium">Priya Mehta</p>
                  <p className="text-xs text-gray-500">India</p>
                </div>
              </div>
            </div>
            <div className="border bg-white rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl text-gray-300 mr-2">"</div>
                <p className="text-sm">
                  Тэд миний хэзээ ч мартахгүй гайхалтай адал явдлыг бүтээсэн.
                  Байр, үйлчилгээ маш сайн, амралт ба адал явдлын төгс хослол
                  байлаа.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src={trip.images?.[0] || "/cover.avif"}
                    alt="Avatar"
                    width={32}
                    height={32}
                  />
                </div>

                <div>
                  <p className="text-xs font-medium">Javier Rodriguez</p>
                  <p className="text-xs text-gray-500">Spain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CommentForm tripId={trip._id} />
        </div>
      </section>
    </>
  );
}
