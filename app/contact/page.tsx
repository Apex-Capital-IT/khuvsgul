import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <>
      <section className="py-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-medium mb-8 text-center">Холбоо барих</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-medium mb-4">Бидэнтэй холбогдох</h2>
                <p className="text-gray-600 mb-6">
                  Бидний аяллын багцуудын талаар асуулт байна уу, эсвэл мөрөөдлийн амралтаа төлөвлөхөд тусламж хэрэгтэй юү? 
                  Манай баг таны хөтөлбөрийн алхам бүрд туслахад бэлэн байна.
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
                      <div className="font-medium">Утас</div>
                      <div className="text-gray-600">+123 456 7890</div>
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
                      <div className="font-medium">И-мэйл</div>
                      <div className="text-gray-600">info@xplore.com</div>
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
                    <div>
                      <div className="font-medium">Хаяг</div>
                      <div className="text-gray-600">123 Аялагчдын гудамж, Хотын нэр, Мужийн нэр, Улс</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium mb-4">Мессеж илгээх</h2>
                <form className="space-y-4">
                  <div>
                    <Input type="text" placeholder="Таны нэр" className="w-full" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Таны и-мэйл" className="w-full" />
                  </div>
                  <div>
                    <Input type="text" placeholder="Гарчиг" className="w-full" />
                  </div>
                  <div>
                    <Textarea placeholder="Таны мессеж" className="w-full min-h-[150px]" />
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Мессеж илгээх</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
