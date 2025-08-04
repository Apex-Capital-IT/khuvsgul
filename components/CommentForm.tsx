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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

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
          // Append token if needed for authenticated API
          ...(localStorage.getItem("token") && {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Алдаа гарлаа.");
      }

      setSuccess(true);
      setComment("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-medium">Сэтгэгдэл бичих</h3>
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
