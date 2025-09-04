"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

// Keep types flexible because backend may return either IDs or populated objects
interface Order {
  _id: string;
  travel: any; // can be string ID or populated object
  user: any; // can be string ID or populated object
  travelersSize: number;
  pricePerQuota: number;
  totalPrice: number;
  contact: {
    fullName: string;
    email: string;
  };
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userDetails?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  travelDetails?: {
    _id: string;
    title: string;
    description?: string;
    price?: number;
    destination?: { location?: string } | string;
    duration?: { days?: number; nights?: number };
    images?: string[];
  } | null;
}

// --- Helpers ---------------------------------------------------------------

const extractTravelId = (t: any): string | null => {
  if (!t) return null;
  if (typeof t === "string" && t.trim()) return t.trim();
  if (typeof t === "object") {
    return (
      (t._id && String(t._id)) ||
      (t.id && String(t.id)) ||
      (t.travelId && String(t.travelId)) ||
      (t.tripId && String(t.tripId)) ||
      null
    );
  }
  return null;
};

const normalizeTravel = (t: any) => {
  if (!t || typeof t !== "object") return null;
  return {
    ...t,
    destination:
      typeof t.destination === "string"
        ? { location: t.destination }
        : t.destination,
  };
};

// Accepts an ID or a pre-populated object and returns a normalized travel object
const fetchTravelDetails = async (travelOrId: any) => {
  try {
    // If already populated, just normalize and return
    if (
      travelOrId &&
      typeof travelOrId === "object" &&
      (travelOrId.title || travelOrId._id)
    ) {
      return normalizeTravel(travelOrId);
    }

    const travelId = extractTravelId(travelOrId);
    if (!travelId) return null;

    const adminToken = localStorage.getItem("admin_token");

    // Try admin endpoint first if we have a token
    if (adminToken) {
      const adminRes = await fetch(`${API_URL}/admin/v1/travel/${travelId}`, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (adminRes.ok) {
        const data = await adminRes.json();
        if (data.code === 0 && data.response)
          return normalizeTravel(data.response);
      }
    }

    // Fallback: public endpoint
    const pubRes = await fetch(`${API_URL}/travel/${travelId}`, {
      cache: "no-store",
    });
    if (pubRes.ok) {
      const data = await pubRes.json();
      if (data.code === 0 && data.response)
        return normalizeTravel(data.response);
    }

    return null;
  } catch (e) {
    console.error("Failed to fetch travel details:", e);
    return null;
  }
};

const fetchUserDetails = async (userId: string) => {
  try {
    const token = localStorage.getItem("admin_token");
    if (!token) return null; // endpoint needs auth
    const res = await fetch(`${API_URL}/api/v1/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.code !== 0) return null;
    return data.response;
  } catch (e) {
    console.error("Failed to fetch user details:", e);
    return null;
  }
};

// --- Page -------------------------------------------------------------------

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const response = await fetch(`${API_URL}/admin/v1/order`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const data = await response.json();

        if (data.code !== 0) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        // Be defensive about the shape returned by backend
        const bookingsData: any[] = Array.isArray(data.docs)
          ? data.docs
          : Array.isArray(data.response?.docs)
          ? data.response.docs
          : Array.isArray(data.response?.orders)
          ? data.response.orders
          : Array.isArray(data.response)
          ? data.response
          : [];

        // hydrate travel + user in parallel for each booking
        const withDetails: Order[] = await Promise.all(
          bookingsData.map(async (booking: any) => {
            const [travelDetails, userDetails] = await Promise.all([
              fetchTravelDetails(booking.travel),
              typeof booking.user === "string"
                ? fetchUserDetails(booking.user)
                : null,
            ]);
            return { ...booking, travelDetails, userDetails };
          })
        );

        setBookings(withDetails);
      } catch (err: any) {
        setError(err.message || "Error loading orders");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="p-8 text-center">Уншиж байна...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Захиалгууд</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Хэрэглэгч</TableHead>
                <TableHead>Аялал</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead>Төлбөр</TableHead>
                <TableHead>Төлөв</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                // Prefer fetched travelDetails, otherwise normalize inline object
                const t =
                  booking.travelDetails ||
                  (typeof booking.travel === "object"
                    ? normalizeTravel(booking.travel)
                    : null);

                const location =
                  (typeof t?.destination === "string" && t.destination) ||
                  t?.destination?.location ||
                  "Тухайгүй хаяг";

                const days = t?.duration?.days ?? 0;
                const nights = t?.duration?.nights ?? 0;

                return (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {booking.userDetails?.name ||
                            booking.contact?.fullName ||
                            "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.userDetails?.email ||
                            booking.contact?.email ||
                            ""}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {t?.title || "Тухайгүй аялал"}
                        </div>
                        <div className="text-sm text-gray-500">
                          📍 {location}
                        </div>
                        <div className="text-sm text-gray-500">
                          {days} өдөр, {nights} шөнө
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div>
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString(
                                "mn-MN"
                              )
                            : "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.travelersSize} хүн
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="font-medium">
                          ₮{booking.totalPrice?.toLocaleString() || "0"}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₮{booking.pricePerQuota?.toLocaleString() || "0"} /
                          хүн
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status === "CONFIRMED"
                          ? "Баталгаажсан"
                          : booking.status === "PENDING"
                          ? "Хүлээгдэж буй"
                          : booking.status === "CANCELLED"
                          ? "Цуцлагдсан"
                          : booking.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
