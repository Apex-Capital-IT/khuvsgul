"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  CheckCircle,
  User,
  Lock,
  Phone,
} from "lucide-react";

// API URL from environment variables
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const steps = [
    { id: 1, title: "Хувийн мэдээлэл", icon: User, completed: currentStep > 1 },
    {
      id: 2,
      title: "OTP баталгаажуулалт",
      icon: Mail,
      completed: currentStep > 2,
    },
    {
      id: 3,
      title: "Бүртгэл амжилттай",
      icon: CheckCircle,
      completed: currentStep > 3,
    },
  ];

  const sendOtp = async () => {
    const formData = getValues();
    setIsOtpLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("OTP илгээхэд алдаа гарлаа");
      }

      setIsOtpSent(true);
      setCurrentStep(2);
    } catch (err: any) {
      setError(err.message || "OTP илгээхэд алдаа гарлаа");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    if (!otp || otp.length !== 6) {
      setError("6 оронтой OTP код оруулна уу");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = getValues();
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          otp: otp,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
        }),
      });

      const result = await response.json();
      console.log("Full API result:", result);

      if (!response.ok) {
        let errorMsg = "Бүртгэл амжилтгүй боллоо";

        if (result && result.errorMessage) {
          errorMsg = result.errorMessage;
        } else if (Array.isArray(result) && result[0]?.errors?.message) {
          try {
            const zodErrors = JSON.parse(result[0].errors.message);
            if (Array.isArray(zodErrors)) {
              errorMsg = zodErrors
                .map((e) =>
                  e.path && e.path.includes("password")
                    ? `Password: ${e.message}`
                    : e.message
                )
                .join("\n");
            } else if (zodErrors?.message) {
              errorMsg = zodErrors.message;
            }
          } catch {
            errorMsg = result[0].errors.message;
          }
        }

        throw new Error(errorMsg);
      }

      // Successful registration
      setCurrentStep(3);
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа. Дахин оролдоно уу");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data: any) => {
    // Validate form first
    if (!data.name || !data.email || !data.phone || !data.password) {
      setError("Бүх талбарыг бөглөнө үү");
      return;
    }

    // Send OTP
    await sendOtp();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col justify-center gap-4 items-center"
          >
            {error && (
              <div className="w-full max-w-xs md:w-[400px] p-3 mb-4 text-red-500 bg-red-50 border border-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="w-full max-w-xs md:w-[400px]">
              <label className="block text-sm font-medium mb-1">Нэр</label>
              <input
                {...register("name", { required: "Нэр заавал" })}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Нэрээ оруулна уу"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full max-w-xs md:w-[400px]">
              <label className="block text-sm font-medium mb-1">Имэйл</label>
              <input
                type="email"
                {...register("email", { required: "Имэйл заавал" })}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Имэйлээ оруулна уу"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full max-w-xs md:w-[400px]">
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
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Утасны дугаараа оруулна уу"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="w-full max-w-xs md:w-[400px] relative">
              <label className="block text-sm font-medium mb-1">Нууц үг</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Нууц үг заавал",
                  minLength: { value: 6, message: "Хамгийн багадаа 6 тэмдэгт" },
                })}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-10"
                placeholder="Нууц үгээ оруулна уу"
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
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isOtpLoading}
              className={`w-full max-w-xs md:w-[400px] py-2 rounded-lg font-semibold transition-colors ${
                isOtpLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {isOtpLoading ? "OTP илгээж байна..." : "OTP илгээх"}
            </button>
          </form>
        );

      case 2:
        return (
          <div className="flex flex-col justify-center gap-6 items-center">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">OTP код илгээгдлээ</h3>
              <p className="text-gray-600 text-sm">
                {getValues("email")} хаяг руу OTP код илгээгдлээ
              </p>
            </div>

            {error && (
              <div className="w-full max-w-xs md:w-[400px] p-3 text-red-500 bg-red-50 border border-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="w-full max-w-xs md:w-[400px]">
              <label className="block text-sm font-medium mb-2 text-center">
                6 оронтой OTP код
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                }}
                className="w-full p-3 text-center text-2xl font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3 w-full max-w-xs md:w-[400px]">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Буцах
              </button>
              <button
                onClick={verifyOtpAndRegister}
                disabled={isLoading || otp.length !== 6}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  isLoading || otp.length !== 6
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                {isLoading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
              </button>
            </div>

            <button
              onClick={sendOtp}
              disabled={isOtpLoading}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {isOtpLoading ? "Илгээж байна..." : "OTP дахин илгээх"}
            </button>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col justify-center gap-6 items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-green-800">
              Бүртгэл амжилттай!
            </h3>
            <p className="text-gray-600 max-w-xs">
              Таны бүртгэл амжилттай үүслээ. Нэвтрэх хуудас руу шилжиж байна...
            </p>
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[99vw] md:max-w-[99vw] border-black border-[1px] bg-white h-full md:h-[99vh] rounded-none md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
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
        <div className="flex flex-col justify-center px-4 sm:px-8 md:px-10 py-8 md:py-12 overflow-y-auto">
          {/* Back button */}
          {currentStep === 1 && (
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
          )}

          {/* Stepper */}
          <div className="mb-2">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : currentStep === step.id
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        step.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-8">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-xs font-medium ${
                    currentStep === step.id
                      ? "text-blue-600"
                      : step.completed
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-center">
              {currentStep === 1
                ? "Бүртгүүлэх"
                : currentStep === 2
                ? "OTP баталгаажуулалт"
                : "Бүртгэл амжилттай"}
            </h2>
            <p className="text-gray-500 text-center">
              {currentStep === 1
                ? "Өөрийн аяллаа эхлүүлэхийн тулд бүртгүүлнэ үү"
                : currentStep === 2
                ? "Имэйл хаяг руу илгээсэн OTP кодыг оруулна уу"
                : "Таны бүртгэл амжилттай үүслээ"}
            </p>
          </div>

          {renderStepContent()}

          {currentStep === 1 && (
            <p className="mt-8 text-center text-sm text-gray-500">
              Бүртгэлтэй юу?{" "}
              <a
                href="/login"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Нэвтрэх
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
