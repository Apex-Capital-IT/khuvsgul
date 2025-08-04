"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      console.log("STATUS:", response.status);
      console.log("RESULT:", result);

      if (result.code !== 0) {
        throw new Error(result.message || "Нэвтрэх үйлдэл амжилтгүй боллоо");
      }

      // Store the token in localStorage with the correct path
      if (result.response && result.response.access_token) {
        localStorage.setItem("token", result.response.access_token);
        // Successful login
        router.push("/");
      } else {
        throw new Error("Token not found in response");
      }
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа. Дахин оролдоно уу");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[95vw] md:max-w-[95vw] border-black border-[1px] bg-white h-full md:h-[95vh] rounded-none md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Зүүн: Форм */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-10 py-8 md:py-12 overflow-y-auto">
          {/* Back button */}
          <a href="/" className="mb-6 self-start flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span>Буцах</span>
          </a>
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <span className="font-bold text-2xl">🌐 Лого</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-center">Нэвтрэх</h2>
            <p className="text-gray-500 mb-6 text-center">
              Имэйл болон нууц үгээ оруулж нэвтэрнэ үү
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-4 items-center"
          >
            {error && (
              <div className="w-full max-w-xs md:w-[400px] p-3 mb-4 text-red-500 bg-red-50 border border-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="w-full max-w-xs md:w-[400px]">
              <label className="block text-sm font-medium mb-1">Имэйл</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Имэйлээ оруулна уу"
                {...register("email", { required: "Имэйл заавал" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>
            <div className="w-full max-w-xs md:w-[400px] relative">
              <label className="block text-sm font-medium mb-1">Нууц үг</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-10"
                placeholder="Нууц үгээ оруулна уу"
                {...register("password", { required: "Нууц үг заавал" })}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-12 right-2 flex items-center"
                aria-label={showPassword ? "Нууц үг нуух" : "Нууц үг харах"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between w-full max-w-xs md:w-[400px] text-sm">
              <div className="flex items-fl">
                <input type="checkbox" id="remember" className="mr-1" />
                <label htmlFor="remember">Сануулах</label>
              </div>
              <a
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Нууц үгээ мартсан?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full max-w-xs md:w-[400px] py-2 rounded-lg font-semibold transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {isLoading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500">
            Шинэ хэрэглэгч үү?{" "}
            <a
              href="/signup"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Бүртгүүлэх
            </a>
          </p>
        </div>

        <div className="hidden md:flex flex-1 flex-col px-12 items-center justify-center relative">
          <div className="absolute inset-0">
            <img
              src="/cover.avif"
              alt="Placeholder"
              className="w-full h-full object-cover opacity-100"
            />
          </div>
          <div className="relative z-10 p-10 text-white bg-black/30 rounded-xl backdrop-blur-4xl text-left w-full">
            <div className="mb-4 text-xs tracking-widest uppercase">
              Ухаалаг ишлэл
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Хүссэн бүхнээ ав
            </h2>
            <p className="text-sm max-w-xs">
              Хэрвээ чи шаргуу хөдөлмөрлөж, төлөвлөгөөгөө баримталж, үйл явцдаа
              итгэвэл хүссэн бүхнээ авч чадна.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
