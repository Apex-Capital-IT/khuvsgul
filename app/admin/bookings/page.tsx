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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const response = await fetch(`${API_URL}/admin/v1/booking`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (data.code !== 0) {
          throw new Error(data.message || "Failed to fetch bookings");
        }
        
        setBookings(data.response || []);
      } catch (err) {
        setError(err.message || "Error loading bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Уншиж байна...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500 text-center">{error}</div>;
  }

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
              {bookings.map((booking: any) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.user?.name || "N/A"}</TableCell>
                  <TableCell>{booking.travel?.title || "N/A"}</TableCell>
                  <TableCell>
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString("mn-MN")
                      : "N/A"}
                  </TableCell>
                  <TableCell>₮{booking.amount?.toLocaleString() || "0"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status === "PAID" ? "Төлөгдсөн" : "Хүлээгдэж буй"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}