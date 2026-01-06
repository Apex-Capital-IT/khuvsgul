"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  async function onSubmit(data: any) {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      const result = await response.json();
      if (result.code !== 0) {
        throw new Error(result.message || "Админ нэвтрэхэд алдаа гарлаа");
      }
      if (result.response && result.response.access_token) {
        localStorage.setItem("admin_token", result.response.access_token);
        setIsAuthenticated(true);
      } else {
        throw new Error("Token not found in response");
      }
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа. Дахин оролдоно уу");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md border border-black bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Админ Нэвтрэх</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <div>
              <label className="block text-sm font-medium mb-1">Хэрэглэгчийн нэр</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Хэрэглэгчийн нэрээ оруулна уу"
                {...register("username", { required: "Хэрэглэгчийн нэр заавал" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Нууц үг</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Нууц үгээ оруулна уу"
                {...register("password", { required: "Нууц үг заавал" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {isLoading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show a loading spinner while redirecting
  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
} 