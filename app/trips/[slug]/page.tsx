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

export default function TripDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <section className="relative h-[300px] flex items-center">
        <Image
          src="/cover.avif"
          alt="Tropical Paradise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-5xl font-medium">
            Халуун орны <span className="italic">Диваажин</span>
            <br />
            Амралт
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
                  Bali, Indonesia
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
                  7 days, 6 nights
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Халуун орны гайхамшгийг нээ. Нарлаг эрэг, соёлын олон өнгө аяс бүхий аялал таны мэдрэмжийг сэргээх болно.
              </p>
              <p className="text-gray-600 mb-8">
                Манай Халуун орны Диваажин багц аялалд бид арал дээрх амьдралын хамгийн шилдэг, тансаг элементүүдийг багтаасан. Хөх тэнгисийн усанд шумбаж, зөөлөн салхийг мэдэрч, халуун орны гайхамшигт уур амьсгалд умбаарай. Энэ бол таны мөрөөдлийн аялалд хүрэх тасалбар бөгөөд амралт, адал явдал, байгалийн гоо үзэсгэлэн нэг дор цогцолсон аялал юм.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Үнэ</div>
                  <div className="text-xl font-bold">999,000₮</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Квот</div>
                  <div className="text-xl font-bold">20 үлдсэн</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Хуваарь</div>
                  <div className="text-xl font-bold">2023 оны 11-р сарын 10-17</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Үүнд багтсан:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
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
                    Тансаг далайн эргийн амралтын газарт байрлах
                  </li>
                  <li className="flex items-center">
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
                    Өдөр бүрийн өглөөний цай, өдрийн хоол, оройн хоол
                  </li>
                  <li className="flex items-center">
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
                    Аяллын даатгал ба нисэх буудлын трансфер
                  </li>
                  <li className="flex items-center">
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
                    Англи хэлтэй аяллын хөтөчтэй арал тойрох аялал
                  </li>
                  <li className="flex items-center">
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
                    Орон нутгийн соёл, адал явдалт туршлага
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Үүнд багтаагүй:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
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
                    Хувийн хэрэглээ (бэлэг дурсгал, спа гэх мэт)
                  </li>
                  <li className="flex items-center">
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
                    Олон улсын татвар, виз, нислэгийн тийз
                  </li>
                  <li className="flex items-center">
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
                    Сонголттой аяллууд
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Аяллын төлөвлөгөө</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="day1">
                    <AccordionTrigger>1-Р ӨДӨР: Бали-д ирэх</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Нисэх буудалд угтах, зочид буудалд хүргэх</li>
                        <li>Чөлөөт цаг, амралт</li>
                        <li>Оройн зоог</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="day2">
                    <AccordionTrigger>2-Р ӨДӨР: Далайн эргийн аялал</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Нар мандах йог</li>
                        <li>Эрэг дагуу аялал, усан спорт</li>
                        <li>Оройн амралт амралтын газарт</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="day3">
                    <AccordionTrigger>3-Р ӨДӨР: Соёлын аялал</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Орон нутгийн зах, музей үзэх</li>
                        <li>Соёлын үзүүлбэр, уламжлалт хоол амтлах</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="day4">
                    <AccordionTrigger>4-Р ӨДӨР: Адал явдалт аялал</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Ууланд авиралт, байгалийн үзэсгэлэнт газруудаар зугаалах</li>
                        <li>Адал явдалт тоглоом, спорт</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="day5">
                    <AccordionTrigger>5-Р ӨДӨР: Арал тойрох аялал</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Орон нутгийн арал, тосгодуудаар зочлох</li>
                        <li>Далайн хоолны зоог</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="day6">
                    <AccordionTrigger>6-Р ӨДӨР: Амралтын өдөр</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Чөлөөт цаг, спа үйлчилгээ</li>
                        <li>Далайн эрэг дээр амрах</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="day7">
                    <AccordionTrigger>7-Р ӨДӨР: Балигаас буцах</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Өглөөний цай</li>
                        <li>Чөлөөт цаг</li>
                        <li>Нисэх буудал руу хүргүүлэх, нутаг буцах</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
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
                        <SelectItem value="tropical">
                          Халуун орны Диваажин Амралт
                        </SelectItem>
                        <SelectItem value="mountain">
                          Уулын Адал Явдалт
                        </SelectItem>
                        <SelectItem value="cultural">
                          Соёлын аялал
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Эхлэх огноо" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nov10">2023 оны 11-р сарын 10</SelectItem>
                        <SelectItem value="nov17">2023 оны 11-р сарын 17</SelectItem>
                        <SelectItem value="nov24">2023 оны 11-р сарын 24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Зочдын тоо" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 хүн</SelectItem>
                        <SelectItem value="2">2 хүн</SelectItem>
                        <SelectItem value="3">3 хүн</SelectItem>
                        <SelectItem value="4">4 хүн</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <div>Үнэ (1 хүн)</div>
                      <div className="font-medium">999,000₮</div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div>НӨАТ (10%)</div>
                      <div className="font-medium">99,900₮</div>
                    </div>
                    <div className="flex justify-between font-bold">
                      <div>Нийт</div>
                      <div>1,098,900₮</div>
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
                  Аяллын маань мөрөөдөл биелсэн. Би хэзээ ч очиж үзнэ гэж бодоогүй газруудаар аялсан. Бүх зүйл эхнээсээ дуустал маш амар, саадгүй болсон.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/cover.avif"
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
                  Тэд миний хэзээ ч мартахгүй гайхалтай адал явдлыг бүтээсэн. Байр, үйлчилгээ маш сайн, амралт ба адал явдлын төгс хослол байлаа.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/cover.avif"
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
    </>
  );
}
