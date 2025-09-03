"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Gift, Copy, Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";

// API URL from environment variables
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  referralCode: string;
  bonus: number;
  bonusTransactions: any[];
  createdAt: string;
  updatedAt: string;
  status?: string;
}

interface Order {
  _id: string;
  travelId: string;
  travelersSize: number;
  contact: {
    fullName: string;
    email: string;
  };
  status: string;
  createdAt: string;
  travel?: {
    title: string;
    price: number;
    destination?: {
      location: string;
    };
    duration?: {
      days: number;
      nights: number;
    };
  };
}

type TabType = "detail" | "referral" | "orders";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("detail");
  const [copied, setCopied] = useState(false);

  // Fetch profile on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchProfile() {
      try {
        const response = await fetch(`${API_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        if (data.code !== 0) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setProfile(data.response);
      } catch (err: any) {
        setError(err.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setOrdersLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log("Orders API response:", data);

      if (data.code === 0 && data.response) {
        const ordersData = data.response;
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else if (ordersData && Array.isArray(ordersData.docs)) {
          setOrders(ordersData.docs);
        } else if (ordersData && Array.isArray(ordersData.orders)) {
          setOrders(ordersData.orders);
        } else if (ordersData && typeof ordersData === "object") {
          const possibleOrders = Object.values(ordersData).find((val) =>
            Array.isArray(val)
          );
          if (Array.isArray(possibleOrders)) {
            setOrders(possibleOrders);
          } else {
            console.warn("Unexpected orders response structure:", ordersData);
            setOrders([]);
          }
        } else {
          console.warn("Unexpected orders response structure:", ordersData);
          setOrders([]);
        }
      } else {
        console.warn("Orders API error:", data.message || "Unknown error");
        setOrders([]);
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "detail" as TabType,
      label: "Хувийн мэдээлэл",
      icon: User,
    },
    {
      id: "referral" as TabType,
      label: "Реферал & Бонус",
      icon: Gift,
    },
    {
      id: "orders" as TabType,
      label: "Захиалгууд",
      icon: Package,
    },
  ];

  const renderDetailContent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-6 h-6" />
          Хувийн мэдээлэл
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Нэр</label>
            <p className="text-lg">{profile?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Имэйл</label>
            <p className="text-lg">{profile?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Утасны дугаар
            </label>
            <p className="text-lg">{profile?.phoneNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Бүртгүүлсэн огноо
            </label>
            <p className="text-lg">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Сүүлд шинэчилсэн огноо
            </label>
            <p className="text-lg">
              {profile?.updatedAt
                ? new Date(profile.updatedAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Статус</label>
            <p className="text-lg">
              {profile?.status === "ACTIVE"
                ? "Идэвхтэй"
                : profile?.status === "INACTIVE"
                ? "Идэвхгүй"
                : profile?.status || "Тодорхойгүй"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderReferralContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Реферал код
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Таны реферал код
              </label>
              <div className="mt-2 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-mono font-bold text-blue-600">
                    {profile?.referralCode}
                  </p>
                  <button
                    onClick={() => copyToClipboard(profile?.referralCode || "")}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                      copied
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
                    )}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Хуулагдлаа</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Хуулах</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 text-center mt-3">
                  Энэ кодыг найзуудаа хуваалцаж бонус аваарай
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Бонус мэдээлэл
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Нийт бонус
              </label>
              <p className="text-3xl font-bold text-green-600">
                {profile?.bonus?.toLocaleString()} ₮
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Бонус гүйлгээний тоо
              </label>
              <p className="text-lg">
                {profile?.bonusTransactions?.length || 0}
              </p>
            </div>
            {profile?.bonusTransactions &&
              profile.bonusTransactions.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Сүүлийн гүйлгээнүүд
                  </label>
                  <div className="mt-2 space-y-2">
                    {profile.bonusTransactions
                      .slice(0, 5)
                      .map((transaction: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              {transaction.type || "Бонус"}
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              +{transaction.amount || 0} ₮
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrdersContent = () => {
    const safeOrders = Array.isArray(orders) ? orders : [];

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              Захиалгууд
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
              </div>
            ) : safeOrders.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>Хэрэглэгчийн захиалгууд олдсонгүй.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {safeOrders.map((order) => (
                  <div
                    key={order._id}
                    className="p-4 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {order.travel?.title || "Тухайгүй захиалга"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          📍{" "}
                          {order.travel?.destination?.location ||
                            "Тухайгүй хаяг"}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "px-2 py-1 text-xs font-medium rounded-full",
                          order.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        )}
                      >
                        {order.status === "CONFIRMED"
                          ? "Баталгаажсан"
                          : order.status === "PENDING"
                          ? "Хүлээгдэж буй"
                          : order.status === "CANCELLED"
                          ? "Цуцлагдсан"
                          : order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          Хугацаа:
                        </span>
                        <p className="text-gray-600">
                          {order.travel?.duration?.days || 0} өдөр,{" "}
                          {order.travel?.duration?.nights || 0} шөнө
                        </p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          Зочдын тоо:
                        </span>
                        <p className="text-gray-600">
                          {order.travelersSize} хүн
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium text-gray-700">
                            Холбоо барих:
                          </span>
                          <p className="text-gray-600">
                            {order.contact?.fullName || "Тодорхойгүй"}
                          </p>
                          <p className="text-gray-600">
                            {order.contact?.email || "Тодорхойгүй"}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-gray-700">
                            Захиалсан огноо:
                          </span>
                          <p className="text-gray-600">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString(
                                  "mn-MN",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : "Тодорхойгүй"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Профайл</h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Цэс</h3>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "detail" && renderDetailContent()}
            {activeTab === "referral" && renderReferralContent()}
            {activeTab === "orders" && renderOrdersContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
