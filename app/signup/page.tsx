"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

// API URL from environment variables
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phone,
        }),
      });

      const result = await response.json();
      console.log("STATUS:", response.status);
      console.log("RESULT:", result);

      if (result.code !== 0) {
        throw new Error(result.message || "Бүртгэл амжилтгүй боллоо");
      }

      // Successful registration
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа. Дахин оролдоно уу");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[99vw] border-black border-[1px] bg-white h-[99vh] rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Зүүн: Зураг ба ишлэл */}
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
              Аяллаа эхлүүлээрэй
            </h2>
            <p className="text-sm max-w-xs">
              Бүх аялал нэг алхмаас эхэлдэг. Одоо бүртгүүлж, өөрийн аяллаа
              эхлүүлээрэй.
            </p>
          </div>
        </div>
        {/* Баруун: Форм */}
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          {/* Back button */}
          <a
            href="/"
            className="mb-6 self-start flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Буцах</span>
          </a>
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <span className="font-bold text-2xl">🌐 Лого</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-center">Бүртгүүлэх</h2>
            <p className="text-gray-500 mb-6 text-center">
              Өөрийн аяллаа эхлүүлэхийн тулд бүртгүүлнэ үү
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-4 items-center"
          >
            {error && (
              <div className="w-[400px] p-3 mb-4 text-red-500 bg-red-50 border border-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Нэр</label>
              <input
                {...register("name", { required: "Нэр заавал" })}
                className="w-[400px] mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Нэрээ оруулна уу"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Имэйл</label>
              <input
                type="email"
                {...register("email", { required: "Имэйл заавал" })}
                className="w-[400px] mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Имэйлээ оруулна уу"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Утасны дугаар
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Утасны дугаар заавал",
                  pattern: {
                    value: /^\d{8,12}$/,
                    message: "Зөв утасны дугаар оруулна уу (8-12 цифр)",
                  },
                })}
                className="w-[400px] mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Утасны дугаараа оруулна уу"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Нууц үг</label>
              <input
                type="password"
                {...register("password", {
                  required: "Нууц үг заавал",
                  minLength: { value: 6, message: "Хамгийн багадаа 6 тэмдэгт" },
                })}
                className="w-[400px] mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Нууц үгээ оруулна уу"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-[400px] py-2 rounded-lg font-semibold transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {isLoading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500">
            Бүртгэлтэй юу?{" "}
            <a
              href="/login"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Нэвтрэх
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
