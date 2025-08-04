"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const response = await fetch(`${API_URL}/admin/v1/travel`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (data.code !== 0) {
          throw new Error(data.message || "Failed to fetch trips");
        }
        
        setTrips(data.response.docs || []);
      } catch (err) {
        setError(err.message || "Error loading trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
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
        <h1 className="text-2xl font-bold">Аяллууд</h1>
        <Button>Шинэ аялал нэмэх</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip: any) => (
          <Card key={trip._id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{trip.title}</h3>
                  <p className="text-sm text-gray-500">{trip.description}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Байршил:</span>
                  <span>{trip.destination?.location || "Тодорхойгүй"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Үнэ:</span>
                  <span className="font-semibold">₮{trip.price?.toLocaleString() || "0"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Хугацаа:</span>
                  <span>{trip.duration?.days || 0} хоног</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Төлөв:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    trip.status === "SCHEDULED" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {trip.status === "SCHEDULED" ? "Төлөвлөгдсөн" : trip.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {trip.categories?.length || 0} төрөл
                </span>
                <Button size="sm" variant="outline">Засах</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}