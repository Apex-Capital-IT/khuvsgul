import Image from "next/image"

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mb-8">
          Бодит <span className="italic">түүхүүд</span>
          <br />
          аялагчдаас
        </h2>
        <div className="flex items-center mb-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <div className="flex items-start mb-4">
              <div className="text-3xl text-gray-300 mr-2">"</div>
              <p className="text-sm">
                Миний аялалын мөрөөдөл одоо биелэгдлээ, тэдэнд баярлалаа. Би хэзээ ч очихгүй гэж боддог байсан газруудаар аялсан.
                Аялал эхнээсээ дуусах хүртэл ямар ч асуудалгүй маш сайхан болсон.
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <Image src="/images/avatar-1.jpg" alt="Хөрөг" width={32} height={32} />
              </div>
              <div>
                <p className="text-xs font-medium">Прия Мехта</p>
                <p className="text-xs text-gray-500">Энэтхэг</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-6">
            <div className="flex items-start mb-4">
              <div className="text-3xl text-gray-300 mr-2">"</div>
              <p className="text-sm">
                Тэд маш гайхалтай адал явдлыг надад бэлэглэсэн бөгөөд би үүнийг хэзээ ч мартахгүй. Байр сууц маш сайхан байсан бөгөөд
                амралт, сонирхолтой явдлуудын төгс хослол байлаа.
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <Image src="/images/avatar-2.jpg" alt="Хөрөг" width={32} height={32} />
              </div>
              <div>
                <p className="text-xs font-medium">Хавьер Родригез</p>
                <p className="text-xs text-gray-500">Испани</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
