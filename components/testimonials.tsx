import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">
          Бодит <span className="italic">түүхүүд</span>
          <br />
          аялагчдаас
        </h2>
        <div className="relative">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-4 md:-ml-6">
              <CarouselItem className="pl-4 md:pl-6 basis-1/1 md:basis-1/2">
                <div className="border rounded-lg p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="text-3xl text-gray-300 mr-2">"</div>
                      <p className="text-sm">
                        Миний аялалын мөрөөдөл одоо биелэгдлээ, тэдэнд баярлалаа. Би
                        хэзээ ч очихгүй гэж боддог байсан газруудаар аялсан. Аялал
                        эхнээсээ дуусах хүртэл ямар ч асуудалгүй маш сайхан болсон.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image src="/images/avatar-1.jpg" alt="Хөрөг" width={32} height={32} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Прия Мехта</p>
                      <p className="text-xs text-gray-500">Энэтхэг</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-4 md:pl-6 basis-1/1 md:basis-1/2">
                <div className="border rounded-lg p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="text-3xl text-gray-300 mr-2">"</div>
                      <p className="text-sm">
                        Тэд маш гайхалтай адал явдлыг надад бэлэглэсэн бөгөөд би үүнийг
                        хэзээ ч мартахгүй. Байр сууц маш сайхан байсан бөгөөд амралт,
                        сонирхолтой явдлуудын төгс хослол байлаа.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image src="/images/avatar-2.jpg" alt="Хөрөг" width={32} height={32} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Хавьер Родригез</p>
                      <p className="text-xs text-gray-500">Испани</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-4 md:pl-6 basis-1/1 md:basis-1/2">
                <div className="border rounded-lg p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="text-3xl text-gray-300 mr-2">"</div>
                      <p className="text-sm">
                        Аяллын баг хамт олон үнэхээр мэргэжлийн, найрсаг байсан. Би шинэ найз нөхөдтэй болж, мартагдашгүй дурсамжтай үлдсэн.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image src="/images/avatar-3.jpg" alt="Хөрөг" width={32} height={32} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Сараа</p>
                      <p className="text-xs text-gray-500">Монгол</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-y-1/2 top-1/2" />
            <CarouselNext className="right-0 -translate-y-1/2 top-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
