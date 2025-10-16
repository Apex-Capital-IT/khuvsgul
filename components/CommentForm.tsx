"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Replace with your actual base URL or use env
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

type CommentFormProps = {
  tripId: string;
};

export default function CommentForm({ tripId }: CommentFormProps) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-hide error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Removed redirect when user is not logged in so trip page remains accessible.
  // We will handle auth on submit instead.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Require login on submit, not on page load
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Нэвтэрсний дараа сэтгэгдэл үлдээнэ үү");
      return;
    }

    // Disallow empty or whitespace-only comments
    if (comment.trim().length === 0) {
      setError("сэтгэгдэл бичнэ үү");
      return;
    }

    if (comment.length > 800) {
      setError("Сэтгэгдэл 800 тэмдэгтэнд багтах ёстой");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/travel/${tripId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment, rating }),
      });

      if (!res.ok) {
        const data = await res.json();
        // Handle specific error messages
        if (data.errorMessage === "Аялалын үнэлгээ өгсөн байна") {
          throw new Error(
            "Та энэ аялалд үнэлгээ өгсөн байна. Нэг удаа л үнэлгээ өгөх боломжтой."
          );
        }
        throw new Error(data.message || data.errorMessage || "Алдаа гарлаа.");
      }

      setSuccess(true);
      setComment("");
      // Ask server components to re-fetch data so the new comment appears
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-medium">Сэтгэгдэл бичих</h3>

      {/* Rating Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Үнэлгээ:</label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-colors ${
                star <= rating
                  ? "text-yellow-400 hover:text-yellow-500"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
        </div>
        <p className="text-xs text-gray-500">
          * Нэг аялалд зөвхөн нэг удаа үнэлгээ өгөх боломжтой
        </p>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={800}
        rows={4}
        className="w-full p-2 border rounded"
        placeholder="800 тэмдэгтэнд багтах ёстой"
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Сэтгэгдэл амжилттай илгээгдлээ!</p>
      )}
      <Button type="submit" disabled={loading} className="bg-black text-white">
        {loading ? "Илгээж байна..." : "Илгээх"}
      </Button>
    </form>
  );
}
