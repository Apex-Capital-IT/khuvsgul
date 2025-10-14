"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { User, Gift, Copy, Check, Package, Eye, Trash2 } from "lucide-react";
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
  travel: string; // This is the travel ID, not travelId
  user: string;
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
  travelDetails?: {
    _id: string;
    title: string;
    description: string;
    price: number;
    destination?: {
      location: string;
    };
    duration?: {
      days: number;
      nights: number;
    };
    categories?: Array<{
      name: string;
    }>;
    isSpecial: boolean;
    included?: string[];
    excluded?: string[];
    plans?: Array<{
      title: string;
      items: string[];
    }>;
    startDateTime?: string;
    endDateTime?: string;
    quota?: {
      available: number;
      total: number;
    };
    images?: string[];
    like: number;
    likedUsers?: string[];
    status: string;
    isDeleted: boolean;
    createdUserId: string;
    comments?: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    updatedUserId: string;
  };
}

interface OrderDetail extends Omit<Order, 'travel' | 'updatedAt'> {
  // Extended interface for detailed order view
  travel: string; // Keep the travel ID
  updatedAt?: string;
  paymentStatus?: string;
  notes?: string;
}

type TabType = "detail" | "referral" | "orders";

function ProfilePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("detail");
  const [copied, setCopied] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch profile on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Profile page: checking token", token ? "Token found" : "No token");
    
    if (!token) {
      console.log("No token found, redirecting to login");
      router.push("/login");
      return;
    }

    async function fetchProfile() {
      try {
        console.log("Fetching profile with token:", token?.substring(0, 20) + "...");
        console.log("API URL:", `${API_URL}/api/v1/user/profile`);
        
        const response = await fetch(`${API_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("Profile API response status:", response.status);
        console.log("Profile API response headers:", Object.fromEntries(response.headers.entries()));

        const data = await response.json();
        console.log("Profile API response data:", data);

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          
          // Handle different error response formats
          let errorMessage = "Failed to fetch profile";
          if (data.errorMessage) {
            errorMessage = data.errorMessage;
          } else if (data.message) {
            errorMessage = data.message;
          } else if (data.error) {
            errorMessage = data.error;
          }
          
          console.error("Profile API error:", errorMessage, "Full response:", data);
          throw new Error(errorMessage);
        }

        // Handle different success response formats
        if (data.code !== undefined) {
          // Standard format with code
          if (data.code !== 0) {
            throw new Error(data.message || "Failed to fetch profile");
          }
          setProfile(data.response);
        } else if (data.errorMessage) {
          // Error format
          throw new Error(data.errorMessage);
        } else if (data.user || data.profile) {
          // Direct user/profile data
          setProfile(data.user || data.profile);
        } else {
          // Assume the data itself is the profile
          setProfile(data);
        }
      } catch (err: any) {
        console.error("Profile fetch error:", err);
        let errorMessage = err.message || "Error loading profile";
        
        // Add more context for common errors
        if (err.message?.includes("Unauthorized")) {
          errorMessage = "Authorization failed. Please log in again.";
          localStorage.removeItem("token");
          router.push("/login");
          return;
        } else if (err.message?.includes("fetch")) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  // Handle URL parameters for tab switching
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["detail", "referral", "orders"].includes(tab)) {
      setActiveTab(tab as TabType);
    }
  }, [searchParams]);

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
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log("Orders API response:", data);

      if (data.code === 0 && data.response) {
        const ordersData = data.response;
        let ordersArray: Order[] = [];
        
        if (Array.isArray(ordersData)) {
          ordersArray = ordersData;
        } else if (ordersData && Array.isArray(ordersData.docs)) {
          ordersArray = ordersData.docs;
        } else if (ordersData && Array.isArray(ordersData.orders)) {
          ordersArray = ordersData.orders;
        } else if (ordersData && typeof ordersData === "object") {
          const possibleOrders = Object.values(ordersData).find((val) =>
            Array.isArray(val)
          );
          if (Array.isArray(possibleOrders)) {
            ordersArray = possibleOrders;
          } else {
            console.warn("Unexpected orders response structure:", ordersData);
            ordersArray = [];
          }
        } else {
          console.warn("Unexpected orders response structure:", ordersData);
          ordersArray = [];
        }

        // Fetch trip details for each order
        const ordersWithTripDetails = await Promise.all(
          ordersArray.map(async (order) => {
            console.log("Processing order:", order._id, "travel ID:", order.travel);
            console.log("Travel field type:", typeof order.travel);
            console.log("Travel field stringified:", JSON.stringify(order.travel));
            console.log("Full order object keys:", Object.keys(order));
            
            // Check multiple possible travel field names
            const travelFieldCandidates = [
              order.travel,
              (order as any).travelId,
              (order as any).tripId,
              (order as any).trip
            ];
            
            console.log("Travel field candidates:", travelFieldCandidates);
            
            // Find the first valid travel identifier
            let validTravelField = null;
            for (const candidate of travelFieldCandidates) {
              if (candidate && 
                  (typeof candidate === 'string' || 
                   (typeof candidate === 'object' && Object.keys(candidate).length > 0))) {
                validTravelField = candidate;
                break;
              }
            }
            
            console.log("Valid travel field found:", validTravelField);
            const hasTravelData = validTravelField !== null;
            
            if (hasTravelData) {
              try {
                const tripDetails = await fetchTripDetails(validTravelField);
                console.log("Order trip details:", tripDetails);
                if (tripDetails) {
                  return {
                    ...order,
                    travelDetails: tripDetails
                  };
                }
              } catch (error) {
                console.error(`Failed to fetch trip details for order ${order._id}:`, error);
              }
            }
            return order;
          })
        );

        setOrders(ordersWithTripDetails);
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

  const fetchTripDetails = async (travelId: any) => {
    try {
      console.log("Fetching travel details for ID:", travelId);
      console.log("Travel ID type:", typeof travelId);
      console.log("Travel ID stringified:", JSON.stringify(travelId));
      
      // Extract travel ID from different possible formats
      let extractedTravelId = null;
      
      if (typeof travelId === 'string' && travelId.trim() !== '') {
        extractedTravelId = travelId.trim();
      } else if (typeof travelId === 'object' && travelId !== null) {
        // Check common object properties for travel ID
        if (travelId._id) {
          extractedTravelId = String(travelId._id).trim();
        } else if (travelId.id) {
          extractedTravelId = String(travelId.id).trim();
        } else if (travelId.travelId) {
          extractedTravelId = String(travelId.travelId).trim();
        } else {
          // If it's an object but doesn't have expected properties, log it for debugging
          console.log("Travel ID is an object without expected properties:", Object.keys(travelId));
        }
      }
      
      console.log("Extracted travel ID:", extractedTravelId);
      
      // Validate extracted travel ID
      if (!extractedTravelId || extractedTravelId === '') {
        console.error("Could not extract valid travel ID from:", travelId);
        return null;
      }
      
      const cleanTravelId = extractedTravelId;
      console.log("Clean travel ID:", cleanTravelId);
      
      const token = localStorage.getItem("token");
      
      // Strategy 1: Try public endpoint without auth (like trips detail page)
      try {
        console.log("Trying public endpoint without auth...");
        const response = await fetch(`${API_URL}/travel/${cleanTravelId}`, { 
          cache: "no-store"
        });
        
        console.log(`Public endpoint response status:`, response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Public endpoint response data:`, data);
          
          if (data.code === 0 && data.response) {
            console.log("Successfully fetched travel details from public endpoint");
            return data.response;
          }
        }
      } catch (error) {
        console.log("Public endpoint failed:", error);
      }
      
      // Strategy 2: Try public endpoint with auth
      if (token) {
        try {
          console.log("Trying public endpoint with auth...");
          const response = await fetch(`${API_URL}/travel/${cleanTravelId}`, { 
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          
          console.log(`Public endpoint with auth response status:`, response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log(`Public endpoint with auth response data:`, data);
            
            if (data.code === 0 && data.response) {
              console.log("Successfully fetched travel details from public endpoint with auth");
              return data.response;
            }
          }
        } catch (error) {
          console.log("Public endpoint with auth failed:", error);
        }
      }
      
      // Strategy 3: Try user API endpoint
      if (token) {
        try {
          console.log("Trying user API endpoint...");
          const response = await fetch(`${API_URL}/api/v1/travel/${cleanTravelId}`, { 
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          
          console.log(`User API endpoint response status:`, response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log(`User API endpoint response data:`, data);
            
            if (data.code === 0 && data.response) {
              console.log("Successfully fetched travel details from user API endpoint");
              return data.response;
            }
          }
        } catch (error) {
          console.log("User API endpoint failed:", error);
        }
      }
      
      // Strategy 4: As last resort, fetch from travels list and find by ID
      try {
        console.log("Trying to fetch from travels list as fallback...");
        const response = await fetch(`${API_URL}/travel?pageNumber=1&pageSize=1000`, { 
          cache: "no-store"
        });
        
        console.log(`Travels list fallback response status:`, response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Travels list fallback response data:`, data);
          
          if (data.code === 0 && data.response && data.response.docs) {
            const travel = data.response.docs.find((t: any) => t._id === cleanTravelId);
            if (travel) {
              console.log("Successfully found travel in list:", travel);
              return travel;
            } else {
              console.log("Travel not found in list, ID:", cleanTravelId);
            }
          }
        }
      } catch (error) {
        console.log("Travels list fallback failed:", error);
      }
      
      // If all strategies failed
      console.error("All strategies to fetch travel details failed for ID:", cleanTravelId);
      return null;
      
    } catch (error) {
      console.error('Failed to fetch trip details:', error);
      return null;
    }
  };

  const fetchOrderDetail = async (orderId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setOrderDetailLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      console.log("Order detail API response:", data);

      if (data.code === 0 && data.response) {
        const orderData = data.response;
        
        // Fetch complete trip details if travel exists
        // Check if travel field exists and has content for order details
        const hasOrderTravelData = orderData.travel && 
          (typeof orderData.travel === 'string' || 
           (typeof orderData.travel === 'object' && Object.keys(orderData.travel).length > 0));
           
        console.log("Order detail has travel data:", hasOrderTravelData);
        
        if (hasOrderTravelData) {
          console.log("Fetching trip details for order detail, travel ID:", orderData.travel);
          console.log("Order detail travel field type:", typeof orderData.travel);
          console.log("Order detail travel field stringified:", JSON.stringify(orderData.travel));
          const tripDetails = await fetchTripDetails(orderData.travel);
          console.log("Order detail trip details:", tripDetails);
          if (tripDetails) {
            // Add trip details to order data
            orderData.travelDetails = tripDetails;
          }
        }
        
        setSelectedOrder(orderData);
        setIsModalOpen(true);
      } else {
        throw new Error(data.message || "Failed to fetch order details");
      }
    } catch (err: any) {
      console.error("Error fetching order detail:", err);
      setError(err.message || "Error loading order details");
    } finally {
      setOrderDetailLoading(false);
    }
  };

  const handleOrderClick = (orderId: string) => {
    fetchOrderDetail(orderId);
  };

  const deleteOrder = async (orderId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/order/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error("Failed to delete order");
      }

      const data = await response.json();
      console.log("Delete order API response:", data);

      if (data.code === 0) {
        // Close modal and refresh orders list
        setIsModalOpen(false);
        setSelectedOrder(null);
        // Refresh orders list
        if (activeTab === "orders") {
          fetchOrders();
        }
      } else {
        throw new Error(data.message || "Failed to delete order");
      }
    } catch (err: any) {
      console.error("Error deleting order:", err);
      setError(err.message || "Error deleting order");
    } finally {
      setDeleteLoading(false);
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
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <h3 className="font-semibold mb-2">Profile Loading Error</h3>
            <p className="mb-3">{error}</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setError("");
                  setLoading(true);
                  window.location.reload();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Login Again
              </button>
            </div>
          </div>
          
          {/* Debug information */}
          <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded text-sm">
            <h4 className="font-semibold mb-2">Debug Information:</h4>
            <p><strong>API URL:</strong> {API_URL}</p>
            <p><strong>Token Present:</strong> {localStorage.getItem("token") ? "Yes" : "No"}</p>
            <p><strong>Browser:</strong> {navigator.userAgent}</p>
            <details className="mt-2">
              <summary className="cursor-pointer font-medium">Click to open browser console for more details</summary>
              <p className="mt-1 text-xs">Check the browser console (F12) for detailed error logs and network requests.</p>
            </details>
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
      count: orders.length,
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
              {orders.length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                  {orders.length} захиалга
                </span>
              )}
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
                    className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          {order.travelDetails?.title || "Тухайгүй захиалга"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          📍{" "}
                          {order.travelDetails?.destination?.location ||
                            "Тухайгүй хаяг"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderClick(order._id);
                          }}
                          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Дэлгэрэнгүй харах"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          Хугацаа:
                        </span>
                        <p className="text-gray-600">
                          {order.travelDetails?.duration?.days || 0} өдөр,{" "}
                          {order.travelDetails?.duration?.nights || 0} шөнө
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
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          Үнэ (1 хүн):
                        </span>
                        <p className="text-gray-600">
                          {order.travelDetails?.price ? `${order.travelDetails.price.toLocaleString()} ₮` : "-"}
                        </p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          Нийт үнэ:
                        </span>
                        <p className="text-gray-600 font-medium">
                          {order.totalPrice ? `${order.totalPrice.toLocaleString()} ₮` : "-"}
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
                        <span className="flex-1">{tab.label}</span>
                        {tab.count !== undefined && tab.count > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                            {tab.count}
                          </span>
                        )}
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

        {/* Order Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-around">
                <DialogTitle className="flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Захиалгын дэлгэрэнгүй мэдээлэл
                </DialogTitle>
                {selectedOrder && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-2"
                        disabled={deleteLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteLoading ? "Устгаж байна..." : "Устгах"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Захиалга устгах</AlertDialogTitle>
                        <AlertDialogDescription>
                          Та энэ захиалгыг устгахдаа итгэлтэй байна уу? Энэ
                          үйлдлийг буцаах боломжгүй.
                          <br />
                          <br />
                          <strong>Захиалгын ID:</strong> {selectedOrder._id}
                          <br />
                          <strong>Аялал:</strong>{" "}
                          {selectedOrder.travelDetails?.title || "Тодорхойгүй"}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteOrder(selectedOrder._id)}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? "Устгаж байна..." : "Тийм, устгах"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </DialogHeader>

            {orderDetailLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            ) : selectedOrder ? (
              <div className="space-y-6">
                {/* Order Status and Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Захиалгын мэдээлэл
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Захиалгын ID
                        </label>
                        <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                          {selectedOrder._id}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Статус
                        </label>
                        <span
                          className={cn(
                            "inline-block px-3 py-1 text-sm font-medium rounded-full",
                            selectedOrder.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : selectedOrder.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedOrder.status === "CANCELLED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          {selectedOrder.status === "CONFIRMED"
                            ? "Баталгаажсан"
                            : selectedOrder.status === "PENDING"
                            ? "Хүлээгдэж буй"
                            : selectedOrder.status === "CANCELLED"
                            ? "Цуцлагдсан"
                            : selectedOrder.status}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Зочдын тоо
                        </label>
                        <p className="text-lg font-semibold">
                          {selectedOrder.travelersSize} хүн
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Захиалсан огноо
                        </label>
                        <p className="text-sm">
                          {selectedOrder.createdAt
                            ? new Date(
                                selectedOrder.createdAt
                              ).toLocaleDateString("mn-MN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Тодорхойгүй"}
                        </p>
                      </div>
                      {selectedOrder.updatedAt && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Сүүлд шинэчилсэн
                          </label>
                          <p className="text-sm">
                            {new Date(
                              selectedOrder.updatedAt
                            ).toLocaleDateString("mn-MN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Холбоо барих мэдээлэл
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Бүтэн нэр
                        </label>
                        <p className="text-lg font-semibold">
                          {selectedOrder.contact?.fullName || "Тодорхойгүй"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Имэйл
                        </label>
                        <p className="text-sm">
                          {selectedOrder.contact?.email || "Тодорхойгүй"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Travel Information */}
                {selectedOrder.travelDetails && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Аялалын мэдээлэл
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Аялалын нэр
                        </label>
                        <p className="text-xl font-bold">
                          {selectedOrder.travelDetails.title}
                        </p>
                        {selectedOrder.travelDetails.categories && selectedOrder.travelDetails.categories.length > 0 && (
                          <p className="text-sm text-gray-600 italic">
                            {selectedOrder.travelDetails.categories.map((cat: any) => cat.name).join(", ")}
                          </p>
                        )}
                      </div>

                      {selectedOrder.travelDetails.description && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Тайлбар
                          </label>
                          <p className="text-sm text-gray-700">
                            {selectedOrder.travelDetails.description}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Хаяг
                          </label>
                          <p className="text-sm">
                            📍{" "}
                            {selectedOrder.travelDetails.destination?.location ||
                              "Тодорхойгүй"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Хугацаа
                          </label>
                          <p className="text-sm">
                            {selectedOrder.travelDetails.duration?.days || 0} өдөр,{" "}
                            {selectedOrder.travelDetails.duration?.nights || 0} шөнө
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Үнэ (1 хүн)
                          </label>
                          <p className="text-lg font-bold text-green-600">
                            {selectedOrder.travelDetails.price?.toLocaleString()} ₮
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            НӨАТ (10%)
                          </label>
                          <p className="text-sm font-medium text-gray-600">
                            {selectedOrder.travelDetails.price ? `${Math.round(selectedOrder.travelDetails.price * 0.1).toLocaleString()} ₮` : "-"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Нийт үнэ
                          </label>
                          <p className="text-lg font-bold text-blue-600">
                            {selectedOrder.totalPrice ? `${selectedOrder.totalPrice.toLocaleString()} ₮` : "-"}
                          </p>
                        </div>
                        {selectedOrder.travelDetails.quota && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Үлдсэн байр
                            </label>
                            <p className="text-sm">
                              {selectedOrder.travelDetails.quota.available} / {selectedOrder.travelDetails.quota.total}
                            </p>
                          </div>
                        )}
                      </div>

                      {(selectedOrder.travelDetails.startDateTime) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Эхлэх огноо
                            </label>
                            <p className="text-sm">
                              {selectedOrder.travelDetails.startDateTime ? 
                                new Date(
                                  selectedOrder.travelDetails.startDateTime
                                ).toLocaleDateString("mn-MN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }) : "Тодорхойгүй"}
                            </p>
                          </div>
                          {selectedOrder.travelDetails.endDateTime && (
                            <div>
                              <label className="text-sm font-medium text-gray-500">
                                Дуусах огноо
                              </label>
                              <p className="text-sm">
                                {selectedOrder.travelDetails.endDateTime ? 
                                  new Date(
                                    selectedOrder.travelDetails.endDateTime
                                  ).toLocaleDateString("mn-MN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }) : "Тодорхойгүй"}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedOrder.travelDetails.images &&
                        selectedOrder.travelDetails.images.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Зурагууд
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                              {selectedOrder.travelDetails.images
                                .slice(0, 6)
                                .map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`Travel image ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                      {/* Included Services */}
                      {selectedOrder.travelDetails.included && selectedOrder.travelDetails.included.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Үүнд багтсан:
                          </label>
                          <ul className="mt-2 space-y-1">
                            {selectedOrder.travelDetails.included.map((item: string, idx: number) => (
                              <li className="flex items-center text-sm" key={idx}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-green-500 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Excluded Services */}
                      {selectedOrder.travelDetails.excluded && selectedOrder.travelDetails.excluded.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Үүнд багтаагүй:
                          </label>
                          <ul className="mt-2 space-y-1">
                            {selectedOrder.travelDetails.excluded.map((item: string, idx: number) => (
                              <li className="flex items-center text-sm" key={idx}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-red-500 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Travel Plans */}
                      {selectedOrder.travelDetails.plans && selectedOrder.travelDetails.plans.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Аяллын төлөвлөгөө:
                          </label>
                          <div className="mt-2 space-y-2">
                            {selectedOrder.travelDetails.plans.map((day: any, idx: number) => (
                              <div key={idx} className="border rounded-lg p-3">
                                <h4 className="font-medium text-sm mb-2">
                                  {day.title || `Өдөр ${idx + 1}`}
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {(day.items || []).map((activity: string, aidx: number) => (
                                    <li key={aidx} className="flex items-start">
                                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Additional Information */}
                {(selectedOrder.paymentStatus || selectedOrder.notes) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Нэмэлт мэдээлэл</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedOrder.paymentStatus && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Төлбөрийн статус
                          </label>
                          <p className="text-sm">
                            {selectedOrder.paymentStatus}
                          </p>
                        </div>
                      )}
                      {selectedOrder.notes && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Тэмдэглэл
                          </label>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {selectedOrder.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Захиалгын мэдээлэл олдсонгүй.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    }>
      <ProfilePageContent />
    </Suspense>
  );
}
