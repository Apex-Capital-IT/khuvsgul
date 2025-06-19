"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  // Step 1: Email submit
  const onEmailSubmit = (data: any) => {
    setEmail(data.email);
    setStep(2);
  };

  // Step 2: OTP submit
  const onOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length !== 8) {
      setOtpError("8 оронтой код оруулна уу");
      return;
    }
    setOtpError("");
    setStep(3);
  };

  // Step 3: New password submit
  const onPasswordSubmit = (data: any) => {
    alert("Нууц үг амжилттай шинэчлэгдлээ!");
    reset();
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
  };

  // OTP input handler
  const handleOtpChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    // Move to next input
    if (value && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[95vw] border-black border-[1px] bg-white h-[95vh] rounded-3xl shadow-2xl flex overflow-hidden">
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
              Нууц үгээ мартсан уу?
            </h2>
            <p className="text-sm max-w-xs">
              Аюулгүй байдлаа хамгаалж, шинэ нууц үгээ үүсгээрэй.
            </p>
          </div>
        </div>
        {/* Баруун: Форм */}
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          {/* Back button */}
          <a
            href="/login"
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
            <h2 className="text-3xl font-bold mb-2 text-center">
              Нууц үг сэргээх
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              {step === 1 && "Имэйлээ оруулна уу"}
              {step === 2 &&
                "Таны имэйл рүү илгээсэн 8 оронтой кодыг оруулна уу"}
              {step === 3 && "Шинэ нууц үгээ оруулна уу"}
            </p>
          </div>
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-2 rounded-full ${
                  step === s ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
          {/* Step 1: Email */}
          {step === 1 && (
            <form
              onSubmit={handleSubmit(onEmailSubmit)}
              className="flex flex-col justify-center gap-4 items-center"
            >
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
                    {String(errors.email.message)}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-[400px] bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
              >
                Үргэлжлүүлэх
              </button>
            </form>
          )}
          {/* Step 2: OTP */}
          {step === 2 && (
            <form
              onSubmit={onOtpSubmit}
              className="flex flex-col justify-center gap-4 items-center"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Баталгаажуулах код
                </label>
                <div className="flex gap-2 justify-center">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  ))}
                </div>
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-[400px] bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
              >
                Баталгаажуулах
              </button>
            </form>
          )}
          {/* Step 3: New Password */}
          {step === 3 && (
            <form
              onSubmit={handleSubmit(onPasswordSubmit)}
              className="flex flex-col justify-center gap-4 items-center"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Шинэ нууц үг
                </label>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "Нууц үг заавал",
                    minLength: {
                      value: 6,
                      message: "Хамгийн багадаа 6 тэмдэгт",
                    },
                  })}
                  className="w-[400px] mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="Шинэ нууц үгээ оруулна уу"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.newPassword.message)}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-[400px] bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
              >
                Нууц үг шинэчлэх
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
