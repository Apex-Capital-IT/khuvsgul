export default function BenefitsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-medium mb-4">
              Бидний үнэн <span className="italic">итгэл</span>
              <br />
              <span className="italic">таны</span> ашиг тусын төлөө
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Бидний итгэл үнэмшил нь зүгээр л үг биш, харин бидний санал болгож буй 
              аялал бүрийн үндэс юм. Тогтвортой байдал, жинхэнэ бодит байдал, 
              хэрэглэгчид төвлөсөн байдлыг эрхэмлэснээр бидэнтэй хийх аялал бүр таны хувьд 
              үнэ цэнэтэй байх болно.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Хэрэглэгчид төвлөсөн</h3>
                <p className="text-xs text-gray-600">
                  Таны сэтгэл ханамж бол бидний аялалын үйлчилгээг чиглүүлэгч луужин юм. 
                  Бид таны хэрэгцээг эн тэргүүнд тавьж байна.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Тогтвортой аялал</h3>
                <p className="text-xs text-gray-600">
                  Орон нутгийн байгаль орчин, нутгийн иргэдийг хүндэтгэсэн тогтвортой, 
                  байгальд ээлтэй аяллыг эрхэмлэдэг.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Жинхэнэ туршлага</h3>
                <p className="text-xs text-gray-600">
                  Бид аялал нь таныг мартагдашгүй, жинхэнэ орон нутгийн 
                  соёлын туршлага, сонирхолтой газруудтай холбох ёстой гэдэгт итгэдэг.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Чанартай хөтөч</h3>
                <p className="text-xs text-gray-600">
                  Аялал бүрийг мэдлэгтэй, хүсэл эрмэлзэлтэй хөтчид удирдан, 
                  таны аяллын туршлагыг улам баяжуулна.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
