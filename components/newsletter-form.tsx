import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function NewsletterForm() {
  return (
    <section className="relative py-16 bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-medium mb-2">
            <span className="italic">Шинэ</span> аялалд
            <br />
            <span className="italic">гарахад</span> бэлэн үү?
          </h2>
          <p className="text-gray-600 text-sm">
            Мөрөөдлийн амралтаа цаашид мөрөөдөл хэвээр үлдээх хэрэггүй. Одоо
            үйлдэл хийж бидэнд дараагийн мартагдашгүй адал явдлаа бүтээлцэхийг
            зөвшөөрнө үү. Аялалын мөрөөдлөө мартагдашгүй бодит зүйл болгоход
            бидэнтэй нэгдээрэй.
          </p>
        </div>
        <div className="max-w-md mx-auto bg-white/40 backdrop-blur-sm p-6 rounded-lg">
          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Нэр"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-black bg-transparent placeholder-gray-400 text-sm py-2"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="tel"
                  placeholder="Утасны дугаар"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-black bg-transparent placeholder-gray-400 text-sm py-2"
                />
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="И-мэйл хаяг"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-black bg-transparent placeholder-gray-400 text-sm py-2"
              />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                defaultChecked
                className="text-black focus:ring-0 focus:ring-offset-0"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-600 leading-tight"
              >
                Мэдээллийн товхимолд бүртгүүлснээр би Үйлчилгээний нөхцөлийг
                зөвшөөрч байна
              </label>
            </div>
            <button className="flex items-center justify-center w-full rounded-full py-2 px-4 bg-black text-white hover:bg-gray-800 text-sm font-medium">
              Одоо бүртгүүлэх
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
