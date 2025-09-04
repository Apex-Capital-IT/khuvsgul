"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import CreateTripForm from "@/components/CreateTripForm";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Home,
  Users,
  MapPin,
  Settings,
  LogOut,
  FolderOpen,
  BarChart3,
  Calendar,
  MessageSquare,
  Plus,
} from "lucide-react";
import {
  updateCategory,
  createCategory,
  deleteCategory,
} from "../categories/categoryApi";

// Order interface from bookings page
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

// Function to delete a trip
const deleteTrip = async (tripId: string, token: string) => {
  const response = await fetch(`${API_URL}/admin/v1/travel/${tripId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(data.message || "Failed to delete trip");
  }

  return data;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

// Function to update a trip
const updateTrip = async (tripId: string, tripData: any, token: string) => {
  // Create FormData object to match your API expectation
  const formData = new FormData();

  // Add all fields as form-data
  Object.keys(tripData).forEach((key) => {
    if (
      key === "included" ||
      key === "excluded" ||
      key === "categories" ||
      key === "videos"
    ) {
      // Array fields need [] notation
      if (Array.isArray(tripData[key])) {
        tripData[key].forEach((item: any) => {
          if (item && item.toString().trim()) {
            formData.append(`${key}[]`, item.toString());
          }
        });
      }
    } else if (key === "plans") {
      // Plans need to be JSON string
      if (Array.isArray(tripData[key])) {
        formData.append(key, JSON.stringify(tripData[key]));
      }
    } else if (key === "destination") {
      // Destination needs to be JSON string
      formData.append(key, JSON.stringify({ location: tripData[key] }));
    } else if (key === "duration") {
      // Duration needs to be JSON string
      formData.append(
        key,
        JSON.stringify({
          days: parseInt(tripData[key]) || 0,
          nights: parseInt(tripData[key]) || 0,
        })
      );
    } else {
      // Regular fields
      if (tripData[key] !== undefined && tripData[key] !== null) {
        formData.append(key, tripData[key].toString());
      }
    }
  });

  const response = await fetch(`${API_URL}/admin/v1/travel/${tripId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      // Don't set Content-Type - browser will set it automatically with boundary for FormData
    },
    body: formData,
  });

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(data.message || "Failed to update trip");
  }

  return data;
};

// Function to remove an image from a trip
const removeImage = async (tripId: string, imageUrl: string, token: string) => {
  const response = await fetch(
    `${API_URL}/admin/v1/travel/${tripId}/images/remove`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrls: [imageUrl] }),
    }
  );

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(data.message || "Failed to remove image");
  }

  return data;
};

// Function to add a new image to a trip
const addImage = async (tripId: string, imageUrl: string, token: string) => {
  const response = await fetch(
    `${API_URL}/admin/v1/travel/${tripId}/images/add`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrls: [imageUrl] }),
    }
  );

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(data.message || "Failed to add image");
  }

  return data;
};

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function AdminDashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [travels, setTravels] = useState<any[]>([]);
  const [travelsLoading, setTravelsLoading] = useState(false);
  const [travelsError, setTravelsError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });
  const [categoryUpdateError, setCategoryUpdateError] = useState("");
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [createCategoryError, setCreateCategoryError] = useState("");
  const [deleteCategoryError, setDeleteCategoryError] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [deleteTripError, setDeleteTripError] = useState("");
  const [deleteTripConfirmOpen, setDeleteTripConfirmOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<any>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [tripForm, setTripForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    destination: "",
    status: "",
    quota: "",
    startDate: "",
    endDate: "",
    included: [""],
    excluded: [""],
    plans: [{ title: "", items: [""] }],
    videos: [""],
    images: [""],
    isSpecial: false,
    categories: [] as string[],
  });
  const [tripUpdateError, setTripUpdateError] = useState("");
  const [tripDetailsModalOpen, setTripDetailsModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{
    name: string;
    avatar?: string;
  } | null>(null);

  // Order management state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(20);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderStatusModalOpen, setOrderStatusModalOpen] = useState(false);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [statusUpdateError, setStatusUpdateError] = useState("");
  const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [selectedOrderForDetails, setSelectedOrderForDetails] =
    useState<Order | null>(null);
  const [detailedTravelData, setDetailedTravelData] = useState<any>(null);
  const [travelDataLoading, setTravelDataLoading] = useState(false);

  // Helper functions for form arrays
  const handleArrayChange = (field: string, index: number, value: string) => {
    setTripForm((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map(
        (item: string, i: number) => (i === index ? value : item)
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setTripForm((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setTripForm((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter(
        (_: string, i: number) => i !== index
      ),
    }));
  };

  const handlePlanChange = (
    planIndex: number,
    field: string,
    value: string
  ) => {
    setTripForm((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, i) =>
        i === planIndex ? { ...plan, [field]: value } : plan
      ),
    }));
  };

  const handlePlanItemChange = (
    planIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setTripForm((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, i) =>
        i === planIndex
          ? {
              ...plan,
              items: plan.items.map((item, j) =>
                j === itemIndex ? value : item
              ),
            }
          : plan
      ),
    }));
  };

  const addPlan = () => {
    setTripForm((prev) => ({
      ...prev,
      plans: [...prev.plans, { title: "", items: [""] }],
    }));
  };

  const removePlan = (index: number) => {
    setTripForm((prev) => ({
      ...prev,
      plans: prev.plans.filter((_, i) => i !== index),
    }));
  };

  const addPlanItem = (planIndex: number) => {
    setTripForm((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, i) =>
        i === planIndex ? { ...plan, items: [...plan.items, ""] } : plan
      ),
    }));
  };

  const removePlanItem = (planIndex: number, itemIndex: number) => {
    setTripForm((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, i) =>
        i === planIndex
          ? {
              ...plan,
              items: plan.items.filter((_, j) => j !== itemIndex),
            }
          : plan
      ),
    }));
  };

  // Order helper functions
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

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) throw new Error("No admin token found");

      const response = await fetch(
        `${API_URL}/admin/v1/order/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.code !== 0) {
        throw new Error(data.message || "Failed to update order status");
      }

      return data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const fetchDetailedTravelData = async (travelId: string) => {
    try {
      setTravelDataLoading(true);
      const token = localStorage.getItem("admin_token");

      // Try admin endpoint first for more complete data
      if (token) {
        const adminRes = await fetch(`${API_URL}/admin/v1/travel/${travelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (adminRes.ok) {
          const data = await adminRes.json();
          if (data.code === 0 && data.response) {
            return normalizeTravel(data.response);
          }
        }
      }

      // Fallback to public endpoint
      const pubRes = await fetch(`${API_URL}/travel/${travelId}`);
      if (pubRes.ok) {
        const data = await pubRes.json();
        if (data.code === 0 && data.response) {
          return normalizeTravel(data.response);
        }
      }

      throw new Error("Failed to fetch travel details");
    } catch (error) {
      console.error("Error fetching detailed travel data:", error);
      throw error;
    } finally {
      setTravelDataLoading(false);
    }
  };

  const openOrderDetails = async (order: Order) => {
    setSelectedOrderForDetails(order);
    setOrderDetailsModalOpen(true);

    // Fetch detailed travel data if we have a travel ID
    const travelId = extractTravelId(order.travel);
    if (travelId) {
      try {
        const detailedTravel = await fetchDetailedTravelData(travelId);
        setDetailedTravelData(detailedTravel);
      } catch (error) {
        console.error("Failed to fetch detailed travel data:", error);
        // Use existing travel data as fallback
        setDetailedTravelData(order.travelDetails);
      }
    } else {
      setDetailedTravelData(order.travelDetails);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin");
      return;
    }
    const payload = parseJwt(token);
    const now = Math.floor(Date.now() / 1000);
    if (!payload || (payload.exp && payload.exp < now)) {
      localStorage.removeItem("admin_token");
      router.replace("/admin");
      return;
    }
    setAdminUser({
      name: payload?.username || "Админ",
      avatar: "/placeholder-user.jpg",
    });
  }, [router]);

  useEffect(() => {
    if (selectedTab === "Users") {
      setUsersLoading(true);
      setUsersError("");
      const token = localStorage.getItem("admin_token");
      fetch(`${API_URL}/admin/v1/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code !== 0)
            throw new Error(data.message || "Failed to fetch users");
          setUsers(data.response);
        })
        .catch((err) => setUsersError(err.message || "Error loading users"))
        .finally(() => setUsersLoading(false));
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "Trips") {
      setTravelsLoading(true);
      setTravelsError("");
      const token = localStorage.getItem("admin_token");
      fetch(`${API_URL}/admin/v1/travel`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code !== 0)
            throw new Error(data.message || "Failed to fetch travels");
          setTravels(data.response.docs || []);
        })
        .catch((err) => setTravelsError(err.message || "Error loading travels"))
        .finally(() => setTravelsLoading(false));
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "Categories") {
      setCategoriesLoading(true);
      setCategoriesError("");
      const token = localStorage.getItem("admin_token");
      fetch(`${API_URL}/admin/v1/category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code !== 0)
            throw new Error(data.message || "Failed to fetch categories");
          setCategories(data.response || []);
        })
        .catch((err) =>
          setCategoriesError(err.message || "Error loading categories")
        )
        .finally(() => setCategoriesLoading(false));
    }
  }, [selectedTab]);

  // Fetch orders with pagination
  useEffect(() => {
    if (selectedTab === "Dashboard" || selectedTab === "Bookings") {
      setOrdersLoading(true);
      setOrdersError("");
      const token = localStorage.getItem("admin_token");

      fetch(
        `${API_URL}/admin/v1/order?pageNumber=${currentPage}&pageSize=${pageSize}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          if (data.code !== 0) {
            throw new Error(data.message || "Failed to fetch orders");
          }

          // Be defensive about the shape returned by backend
          const ordersData: any[] = Array.isArray(data.docs)
            ? data.docs
            : Array.isArray(data.response?.docs)
            ? data.response.docs
            : Array.isArray(data.response?.orders)
            ? data.response.orders
            : Array.isArray(data.response)
            ? data.response
            : [];

          // Calculate total pages from response
          const totalCount = data.totalPages || data.response?.totalPages || 1;
          setTotalPages(totalCount);

          // For dashboard, show only recent 5 orders, for bookings show all
          const ordersToProcess =
            selectedTab === "Dashboard" ? ordersData.slice(0, 5) : ordersData;

          // hydrate travel + user in parallel for each order
          const withDetails: Order[] = await Promise.all(
            ordersToProcess.map(async (order: any) => {
              const [travelDetails, userDetails] = await Promise.all([
                fetchTravelDetails(order.travel),
                typeof order.user === "string"
                  ? fetchUserDetails(order.user)
                  : null,
              ]);
              return { ...order, travelDetails, userDetails };
            })
          );

          setOrders(withDetails);
        })
        .catch((err: any) => {
          setOrdersError(err.message || "Error loading orders");
        })
        .finally(() => {
          setOrdersLoading(false);
        });
    }
  }, [selectedTab, currentPage, pageSize]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="w-4 h-4" />;
      case "Users":
        return <Users className="w-4 h-4" />;
      case "MapPin":
        return <MapPin className="w-4 h-4" />;
      case "FolderOpen":
        return <FolderOpen className="w-4 h-4" />;
      case "BarChart3":
        return <BarChart3 className="w-4 h-4" />;
      case "Calendar":
        return <Calendar className="w-4 h-4" />;
      case "MessageSquare":
        return <MessageSquare className="w-4 h-4" />;
      case "Plus":
        return <Plus className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const navItems = [
    { label: "Dashboard", icon: "Home" },
    { label: "Users", icon: "Users" },
    { label: "Trips", icon: "MapPin" },
    { label: "Create Trip", icon: "Plus" },
    { label: "Categories", icon: "FolderOpen" },
    { label: "Bookings", icon: "Calendar" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      <SidebarProvider className="w-66">
        <Sidebar className="bg-white border-r w-64 flex flex-col justify-between">
          <SidebarHeader className="p-6 text-2xl font-bold tracking-tight">
            Menu
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    className={`flex items-center gap-3 w-full text-sm py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors ${
                      selectedTab === item.label ? "bg-gray-100 font-bold" : ""
                    }`}
                    onClick={() => setSelectedTab(item.label)}
                  >
                    {renderIcon(item.icon)}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start w-full">
              <Settings className="w-4 h-4 mr-2" />
              Setting
            </Button>
            <Button
              variant="destructive"
              className="justify-start w-full"
              onClick={() => {
                localStorage.removeItem("admin_token");
                router.replace("/admin");
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Гарах
            </Button>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <Input placeholder="Search ...." className="w-1/3" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={adminUser?.avatar || "/placeholder-user.jpg"}
                />
                <AvatarFallback>
                  {adminUser?.name ? adminUser.name[0] : "A"}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">
                {adminUser?.name || "Админ"}
              </span>
            </div>
          </div>
        </div>
        {selectedTab === "Dashboard" && (
          <>
            <div className="px-8 py-6">
              <Card className="bg-[#7B61FF] text-white rounded-2xl shadow-lg overflow-hidden">
                <CardContent className="flex flex-col md:flex-row items-center justify-between p-8">
                  <div>
                    <div className="uppercase text-xs font-bold mb-2">
                      АЯЛАЛ ЖУУЛЧЛАЛ
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      Монгол орны гайхамшгийг нээж, аяллын шинэ туршлага аваарай
                    </div>
                    <Button className="mt-4 bg-white text-[#7B61FF] font-bold">
                      Аялалдаа бүртгүүлэх
                    </Button>
                  </div>
                  <img
                    src="/cover.avif"
                    alt="Banner"
                    className="w-64 h-32 object-cover rounded-xl hidden md:block"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="px-8">
              <div className="text-lg font-bold mb-4">
                Үргэлжлүүлэн үзэх аяллууд
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                <Card className="min-w-[300px]">
                  <CardContent className="p-4">
                    <div className="text-xs text-blue-600 font-bold mb-2">
                      ХӨВСГӨЛ НУУР
                    </div>
                    <div className="font-semibold mb-2">
                      Хөвсгөл нуурын гайхамшигт аялал
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>Б</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Бат-Эрдэнэ</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="min-w-[300px]">
                  <CardContent className="p-4">
                    <div className="text-xs text-purple-600 font-bold mb-2">
                      ГОВЬ
                    </div>
                    <div className="font-semibold mb-2">
                      Говийн гайхамшигт элсэн манхан аялал
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>С</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Сарангэрэл</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="min-w-[300px]">
                  <CardContent className="p-4">
                    <div className="text-xs text-pink-600 font-bold mb-2">
                      ТАЙГА
                    </div>
                    <div className="font-semibold mb-2">
                      Тайгын өвөрмөц байгаль, цас мөсний аялал
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>Д</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Даваадорж</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="px-8 py-6">
              <div className="text-lg font-bold mb-4">Сүүлийн захиалгууд</div>
              <Card>
                <CardContent className="p-0">
                  {ordersLoading ? (
                    <div className="p-8 text-center">Уншиж байна...</div>
                  ) : ordersError ? (
                    <div className="p-8 text-red-500 text-center">
                      {ordersError}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Хэрэглэгч</TableHead>
                          <TableHead>Аялал</TableHead>
                          <TableHead>Огноо</TableHead>
                          <TableHead>Төлбөр</TableHead>
                          <TableHead>Төлөв</TableHead>
                          <TableHead>Үйлдэл</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="text-center py-8 text-gray-500"
                            >
                              Захиалга байхгүй байна
                            </TableCell>
                          </TableRow>
                        ) : (
                          orders.map((order) => {
                            // Prefer fetched travelDetails, otherwise normalize inline object
                            const t =
                              order.travelDetails ||
                              (typeof order.travel === "object"
                                ? normalizeTravel(order.travel)
                                : null);

                            return (
                              <TableRow key={order._id}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">
                                      {order.userDetails?.name ||
                                        order.contact?.fullName ||
                                        "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {order.userDetails?.email ||
                                        order.contact?.email ||
                                        ""}
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div>
                                    <div className="font-medium">
                                      {t?.title || "Тухайгүй аялал"}
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div>
                                    <div>
                                      {order.createdAt
                                        ? new Date(
                                            order.createdAt
                                          ).toLocaleDateString("mn-MN")
                                        : "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {order.travelersSize} хүн
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div>
                                    <div className="font-medium">
                                      ₮
                                      {order.totalPrice?.toLocaleString() ||
                                        "0"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      ₮
                                      {order.pricePerQuota?.toLocaleString() ||
                                        "0"}{" "}
                                      / хүн
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      order.status === "CONFIRMED"
                                        ? "bg-green-100 text-green-800"
                                        : order.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.status === "CANCELLED"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {order.status === "CONFIRMED"
                                      ? "Баталгаажсан"
                                      : order.status === "PENDING"
                                      ? "Хүлээгдэж буй"
                                      : order.status === "CANCELLED"
                                      ? "Цуцлагдсан"
                                      : order.status}
                                  </span>
                                </TableCell>

                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => openOrderDetails(order)}
                                    >
                                      Дэлгэрэнгүй
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedOrder(order);
                                        setNewOrderStatus(order.status);
                                        setOrderStatusModalOpen(true);
                                      }}
                                    >
                                      Төлөв солих
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTab("Bookings")}
                >
                  Бүх захиалга үзэх
                </Button>
              </div>
            </div>
          </>
        )}
        {selectedTab === "Users" && (
          <div className="px-8 py-6">
            <div className="text-lg font-bold mb-4">Хэрэглэгчид</div>
            <Card>
              <CardContent className="p-0">
                {usersLoading ? (
                  <div className="p-8">Уншиж байна...</div>
                ) : usersError ? (
                  <div className="p-8 text-red-500">{usersError}</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Нэр</TableHead>
                        <TableHead>Имэйл</TableHead>
                        <TableHead>Утас</TableHead>
                        <TableHead>Огноо</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u._id}>
                          <TableCell>{u.name}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>{u.phoneNumber}</TableCell>
                          <TableCell>
                            {u.createdAt
                              ? new Date(u.createdAt).toLocaleDateString(
                                  "mn-MN",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : ""}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        {selectedTab === "Categories" && (
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">Аяллын төрлүүд</div>
              <Button
                onClick={() => setIsCreateCategoryModalOpen(true)}
                size="sm"
              >
                Шинэ төрөл нэмэх
              </Button>
            </div>
            {categoriesLoading ? (
              <div className="p-8 text-center">Уншиж байна...</div>
            ) : categoriesError ? (
              <div className="p-8 text-red-500 text-center">
                {categoriesError}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category: any) => (
                    <Card key={category._id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            {/* Removed description field */}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {category.trips?.length || 0} аялал
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedCategory(category);
                                setCategoryForm({
                                  name: category.name,
                                  description: category.description, // still needed for API, but not shown
                                });
                                setIsCategoryModalOpen(true);
                              }}
                            >
                              Засах
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setCategoryToDelete(category);
                                setDeleteConfirmOpen(true);
                              }}
                            >
                              Устгах
                            </Button>
                          </div>
                        </div>
                        {deleteCategoryError && (
                          <div className="text-red-500 text-sm mt-2">
                            {deleteCategoryError}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Dialog
                  open={isCategoryModalOpen}
                  onOpenChange={setIsCategoryModalOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Аяллын төрөл засах</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Нэр
                        </label>
                        <Input
                          name="name"
                          value={categoryForm.name}
                          onChange={(e) =>
                            setCategoryForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Аяллын төрлийн нэр"
                        />
                      </div>
                      {/* Removed description field */}
                      {categoryUpdateError && (
                        <div className="text-red-500 text-sm">
                          {categoryUpdateError}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsCategoryModalOpen(false)}
                      >
                        Цуцлах
                      </Button>
                      <Button
                        onClick={async () => {
                          try {
                            setCategoryUpdateError("");
                            const token = localStorage.getItem("admin_token");
                            await updateCategory({
                              id: selectedCategory._id,
                              name: categoryForm.name,
                              description: categoryForm.description, // still sent for API compatibility
                              token,
                            });
                            setCategories((cats) =>
                              cats.map((cat) =>
                                cat._id === selectedCategory._id
                                  ? { ...cat, ...categoryForm }
                                  : cat
                              )
                            );
                            setIsCategoryModalOpen(false);
                          } catch (err: any) {
                            setCategoryUpdateError(
                              err.message || "Error updating category"
                            );
                          }
                        }}
                      >
                        Хадгалах
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={isCreateCategoryModalOpen}
                  onOpenChange={setIsCreateCategoryModalOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Шинэ төрөл үүсгэх</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Нэр
                        </label>
                        <Input
                          name="newCategoryName"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="Аяллын төрлийн нэр"
                        />
                      </div>
                      {createCategoryError && (
                        <div className="text-red-500 text-sm">
                          {createCategoryError}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateCategoryModalOpen(false)}
                      >
                        Цуцлах
                      </Button>
                      <Button
                        onClick={async () => {
                          try {
                            setCreateCategoryError("");
                            const token = localStorage.getItem("admin_token");
                            const newCat = await createCategory({
                              name: newCategoryName,
                              token,
                            });
                            setCategories((cats) => [...cats, newCat]);
                            setIsCreateCategoryModalOpen(false);
                            setNewCategoryName("");
                          } catch (err: any) {
                            setCreateCategoryError(
                              err.message || "Error creating category"
                            );
                          }
                        }}
                        disabled={!newCategoryName.trim()}
                      >
                        Үүсгэх
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {/* Delete Confirmation Modal */}
                <Dialog
                  open={deleteConfirmOpen}
                  onOpenChange={setDeleteConfirmOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Та устгахдаа итгэлтэй байна уу?</DialogTitle>
                    </DialogHeader>
                    <div>
                      <p>
                        Та <b>{categoryToDelete?.name}</b> төрлийг устгах гэж
                        байна. Энэ үйлдлийг буцаах боломжгүй!
                      </p>
                      {deleteCategoryError && (
                        <div className="text-red-500 text-sm mt-2">
                          {deleteCategoryError}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteConfirmOpen(false)}
                      >
                        Цуцлах
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          if (!categoryToDelete) return;
                          try {
                            setDeleteCategoryError("");
                            const token = localStorage.getItem("admin_token");
                            await deleteCategory({
                              id: categoryToDelete._id,
                              token,
                            });
                            setCategories((cats) =>
                              cats.filter(
                                (cat) => cat._id !== categoryToDelete._id
                              )
                            );
                            setDeleteConfirmOpen(false);
                            setCategoryToDelete(null);
                          } catch (err: any) {
                            setDeleteCategoryError(
                              err.message || "Error deleting category"
                            );
                          }
                        }}
                      >
                        Устгах
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        )}
        {selectedTab === "Trips" && (
          <div className="px-8 py-6">
            <div className="text-lg font-bold mb-4">Аяллууд</div>
            {travelsLoading ? (
              <div className="p-8 text-center">Уншиж байна...</div>
            ) : travelsError ? (
              <div className="p-8 text-red-500 text-center">{travelsError}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travels.map((travel) => (
                  <Card key={travel._id}>
                    <CardContent className="p-6">
                      {/* Trip cover image */}
                      <div className="mb-4">
                        <img
                          src={
                            (Array.isArray(travel.images) &&
                              travel.images[0]) ||
                            "/placeholder.jpg"
                          }
                          alt={travel.title || "Trip image"}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{travel.title}</h3>
                          <div className="text-sm text-gray-500">
                            {travel.description &&
                            travel.description.length > 100 ? (
                              <div>
                                <p>
                                  {expandedDescriptions[travel._id]
                                    ? travel.description
                                    : `${travel.description.substring(
                                        0,
                                        100
                                      )}...`}
                                </p>
                                <button
                                  onClick={() =>
                                    setExpandedDescriptions((prev) => ({
                                      ...prev,
                                      [travel._id]: !prev[travel._id],
                                    }))
                                  }
                                  className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1"
                                >
                                  {expandedDescriptions[travel._id]
                                    ? "See less"
                                    : "See more"}
                                </button>
                              </div>
                            ) : (
                              <p>
                                {travel.description ||
                                  "No description available"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Байршил:</span>
                          <span>
                            {travel.destination?.location || "Тодорхойгүй"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Үнэ:</span>
                          <span className="font-semibold">
                            ₮{travel.price?.toLocaleString() || "0"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Хугацаа:</span>
                          <span>{travel.duration?.days || 0} хоног</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Төлөв:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              travel.status === "SCHEDULED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {travel.status === "SCHEDULED"
                              ? "Төлөвлөгдсөн"
                              : travel.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              console.log("Original trip data:", travel);
                              setSelectedTrip(travel);
                              setTripForm({
                                title: travel.title || "",
                                description: travel.description || "",
                                price: travel.price?.toString() || "",
                                duration:
                                  travel.duration?.days?.toString() || "",
                                destination: travel.destination?.location || "",
                                status: travel.status || "",
                                quota:
                                  travel.quota?.total?.toString() ||
                                  travel.quota?.toString() ||
                                  "",
                                startDate: travel.startDateTime
                                  ? new Date(travel.startDateTime)
                                      .toISOString()
                                      .split("T")[0]
                                  : "",
                                endDate: travel.endDateTime
                                  ? new Date(travel.endDateTime)
                                      .toISOString()
                                      .split("T")[0]
                                  : "",
                                included:
                                  travel.included &&
                                  Array.isArray(travel.included)
                                    ? travel.included
                                    : [""],
                                excluded:
                                  travel.excluded &&
                                  Array.isArray(travel.excluded)
                                    ? travel.excluded
                                    : [""],
                                plans:
                                  travel.plans && Array.isArray(travel.plans)
                                    ? travel.plans
                                    : [{ title: "", items: [""] }],
                                videos:
                                  travel.videos && Array.isArray(travel.videos)
                                    ? travel.videos
                                    : [""],
                                images:
                                  travel.images && Array.isArray(travel.images)
                                    ? travel.images
                                    : [""],
                                isSpecial: travel.isSpecial || false,
                                categories:
                                  travel.categories &&
                                  Array.isArray(travel.categories)
                                    ? travel.categories.map((cat: any) =>
                                        typeof cat === "object" ? cat._id : cat
                                      )
                                    : [],
                              });
                              setIsEditTripModalOpen(true);
                            }}
                          >
                            Засах
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setTripToDelete(travel);
                              setDeleteTripConfirmOpen(true);
                            }}
                          >
                            Устгах
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTrip(travel);
                            setTripDetailsModalOpen(true);
                          }}
                        >
                          Дэлгэрэнгүй
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        {selectedTab === "Create Trip" && (
          <div className="px-8 py-6">
            <div className="text-lg font-bold mb-4">Шинэ аялал үүсгэх</div>
            <CreateTripForm />
          </div>
        )}

        {/* Delete Trip Confirmation Modal */}
        <Dialog
          open={deleteTripConfirmOpen}
          onOpenChange={setDeleteTripConfirmOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Та аяллыг устгахдаа итгэлтэй байна уу?</DialogTitle>
            </DialogHeader>
            <div>
              <p>
                Та <b>{tripToDelete?.title}</b> аяллыг устгах гэж байна. Энэ
                үйлдлийг буцаах боломжгүй!
              </p>
              {deleteTripError && (
                <div className="text-red-500 text-sm mt-2">
                  {deleteTripError}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteTripConfirmOpen(false)}
              >
                Цуцлах
              </Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  if (!tripToDelete || !tripToDelete._id) return;
                  const tripId = tripToDelete._id as string;
                  try {
                    setDeleteTripError("");
                    const token = localStorage.getItem("admin_token");
                    if (!token) return;
                    await deleteTrip(tripId, token);
                    setTravels((trips) =>
                      trips.filter((trip) => trip._id !== tripId)
                    );
                    setDeleteTripConfirmOpen(false);
                    setTripToDelete(null);
                  } catch (err: any) {
                    setDeleteTripError(err.message || "Error deleting trip");
                  }
                }}
              >
                Устгах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Trip Modal */}
        <Dialog
          open={isEditTripModalOpen}
          onOpenChange={setIsEditTripModalOpen}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Аялал засах</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Гарчиг</Label>
                  <Input
                    id="title"
                    value={tripForm.title}
                    onChange={(e) =>
                      setTripForm((f) => ({
                        ...f,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Аялалын гарчиг"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Үнэ (₮)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={tripForm.price}
                    onChange={(e) =>
                      setTripForm((f) => ({
                        ...f,
                        price: e.target.value,
                      }))
                    }
                    placeholder="Үнэ"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Хугацаа (хоног)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={tripForm.duration}
                    onChange={(e) =>
                      setTripForm((f) => ({
                        ...f,
                        duration: e.target.value,
                      }))
                    }
                    placeholder="Хугацаа"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Байршил</Label>
                  <Input
                    id="destination"
                    value={tripForm.destination}
                    onChange={(e) =>
                      setTripForm((f) => ({
                        ...f,
                        destination: e.target.value,
                      }))
                    }
                    placeholder="Байршил"
                  />
                </div>
                <div>
                  <Label htmlFor="quota">Нийт байрлал</Label>
                  <Input
                    id="quota"
                    type="number"
                    value={tripForm.quota}
                    onChange={(e) =>
                      setTripForm((f) => ({
                        ...f,
                        quota: e.target.value,
                      }))
                    }
                    placeholder="Нийт байрлал"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Төлөв</Label>
                  <Select
                    value={tripForm.status}
                    onValueChange={(value) =>
                      setTripForm((f) => ({
                        ...f,
                        status: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Төлөв сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SCHEDULED">Төлөвлөгдсөн</SelectItem>
                      <SelectItem value="ACTIVE">Идэвхтэй</SelectItem>
                      <SelectItem value="COMPLETED">Дууссан</SelectItem>
                      <SelectItem value="CANCELLED">Цуцлагдсан</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Эхлэх огноо</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={tripForm.startDate}
                    onChange={(e) =>
                      setTripForm((f) => ({
                        ...f,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Дуусах огноо</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={tripForm.endDate}
                    onChange={(e) =>
                      setTripForm((f) => ({
                        ...f,
                        endDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Тайлбар</Label>
                <Textarea
                  id="description"
                  value={tripForm.description}
                  placeholder="Аялалын тайлбар"
                  rows={4}
                  onChange={(e) =>
                    setTripForm((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Categories */}
              <div>
                <Label>Төрлүүд</Label>
                {categoriesLoading ? (
                  <div className="p-4 text-center">Төрлүүд уншиж байна...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {categories.map((category: any) => (
                      <label
                        key={category._id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={tripForm.categories.includes(category._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTripForm((f) => ({
                                ...f,
                                categories: [...f.categories, category._id],
                              }));
                            } else {
                              setTripForm((f) => ({
                                ...f,
                                categories: f.categories.filter(
                                  (id) => id !== category._id
                                ),
                              }));
                            }
                          }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Included Services */}
              <div>
                <Label>Орсон үйлчилгээ</Label>
                {tripForm.included.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("included", index, e.target.value)
                      }
                      placeholder="Жишээ: Өглөөний цай"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("included", index)}
                    >
                      Устгах
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("included")}
                  className="mt-2"
                >
                  Нэмэх
                </Button>
              </div>

              {/* Excluded Services */}
              <div>
                <Label>Орхоогүй үйлчилгээ</Label>
                {tripForm.excluded.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("excluded", index, e.target.value)
                      }
                      placeholder="Жишээ: Нислэгийн тийз"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("excluded", index)}
                    >
                      Устгах
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("excluded")}
                  className="mt-2"
                >
                  Нэмэх
                </Button>
              </div>

              {/* Plans */}
              <div>
                <Label>Аяллын төлөвлөгөө</Label>
                {tripForm.plans.map((plan, planIndex) => (
                  <div key={planIndex} className="border p-4 rounded-lg mt-4">
                    <div className="flex gap-2 mb-4">
                      <Input
                        value={plan.title}
                        onChange={(e) =>
                          handlePlanChange(planIndex, "title", e.target.value)
                        }
                        placeholder="Өдрийн гарчиг"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePlan(planIndex)}
                      >
                        Устгах
                      </Button>
                    </div>
                    {plan.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2 mt-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            handlePlanItemChange(
                              planIndex,
                              itemIndex,
                              e.target.value
                            )
                          }
                          placeholder="Үйл ажиллагаа"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePlanItem(planIndex, itemIndex)}
                        >
                          Устгах
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addPlanItem(planIndex)}
                      className="mt-2"
                    >
                      Үйл ажиллагаа нэмэх
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addPlan}
                  className="mt-2"
                >
                  Өдөр нэмэх
                </Button>
              </div>

              {/* Videos */}
              <div>
                <Label>Видео холбоосууд</Label>
                {tripForm.videos.map((video, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={video}
                      onChange={(e) =>
                        handleArrayChange("videos", index, e.target.value)
                      }
                      placeholder="Жишээ: https://youtube.com/watch?v=..."
                      type="url"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("videos", index)}
                    >
                      Устгах
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("videos")}
                  className="mt-2"
                >
                  Видео нэмэх
                </Button>
              </div>

              {/* Images */}
              <div>
                <Label>Зургийн холбоосууд</Label>
                {tripForm.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={image}
                      onChange={(e) =>
                        handleArrayChange("images", index, e.target.value)
                      }
                      placeholder="Зургийн URL"
                      type="url"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        if (!selectedTrip?._id || !image.trim()) return;
                        try {
                          const token = localStorage.getItem("admin_token");
                          if (!token) return;

                          await removeImage(selectedTrip._id, image, token);

                          // Update local state
                          setTripForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                          }));

                          // Update travels state
                          setTravels((prev) =>
                            prev.map((trip) =>
                              trip._id === selectedTrip._id
                                ? {
                                    ...trip,
                                    images:
                                      trip.images?.filter(
                                        (img: string) => img !== image
                                      ) || [],
                                  }
                                : trip
                            )
                          );
                        } catch (err: any) {
                          console.error("Failed to remove image:", err);
                          // You could add a toast notification here
                        }
                      }}
                    >
                      Устгах
                    </Button>
                  </div>
                ))}

                {/* Image file upload */}
                <div className="mt-4">
                  <Label htmlFor="newImageFiles">Шинэ зураг нэмэх (файл)</Label>
                  <Input
                    id="newImageFiles"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (!selectedTrip?._id || files.length === 0) return;

                      try {
                        const token = localStorage.getItem("admin_token");
                        if (!token) return;

                        // Upload each file
                        for (const file of files) {
                          // Create FormData for file upload
                          const formData = new FormData();
                          formData.append("images", file);

                          const response = await fetch(
                            `${API_URL}/admin/v1/travel/${selectedTrip._id}/images/add`,
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${token}`,
                                // Don't set Content-Type - browser will set it automatically with boundary for FormData
                              },
                              body: formData,
                            }
                          );

                          const data = await response.json();

                          if (data.code !== 0) {
                            throw new Error(
                              data.message || "Failed to add image"
                            );
                          }

                          // Get the uploaded image URL from response (assuming it returns the URL)
                          if (data.response && data.response.imageUrl) {
                            const newImageUrl = data.response.imageUrl;

                            // Update local state
                            setTripForm((prev) => ({
                              ...prev,
                              images: [...prev.images, newImageUrl],
                            }));

                            // Update travels state
                            setTravels((prev) =>
                              prev.map((trip) =>
                                trip._id === selectedTrip._id
                                  ? {
                                      ...trip,
                                      images: [
                                        ...(trip.images || []),
                                        newImageUrl,
                                      ],
                                    }
                                  : trip
                              )
                            );
                          }
                        }

                        // Clear the file input
                        (e.target as HTMLInputElement).value = "";
                      } catch (err: any) {
                        console.error("Failed to add image:", err);
                        // You could add a toast notification here
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Олон зураг сонгох боломжтой. Файл сонгосны дараа автоматаар
                    хуулагдана.
                  </p>
                </div>
              </div>

              {/* Special Trip */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isSpecial"
                  checked={tripForm.isSpecial}
                  onChange={(e) =>
                    setTripForm((prev) => ({
                      ...prev,
                      isSpecial: e.target.checked,
                    }))
                  }
                />
                <Label htmlFor="isSpecial">Онцгой аялал</Label>
              </div>

              {tripUpdateError && (
                <div className="text-red-500 text-sm">{tripUpdateError}</div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditTripModalOpen(false)}
              >
                Цуцлах
              </Button>
              <Button
                onClick={async () => {
                  if (!selectedTrip || !selectedTrip._id) return;
                  try {
                    setTripUpdateError("");
                    const token = localStorage.getItem("admin_token");
                    if (!token) return;

                    const updateData = {
                      title: tripForm.title,
                      description: tripForm.description,
                      price: tripForm.price,
                      duration: tripForm.duration,
                      destination: tripForm.destination,
                      status: tripForm.status,
                      quota: tripForm.quota,
                      startDateTime: tripForm.startDate
                        ? new Date(tripForm.startDate).toISOString()
                        : undefined,
                      endDateTime: tripForm.endDate
                        ? new Date(tripForm.endDate).toISOString()
                        : undefined,
                      included: tripForm.included.filter((item) => item.trim()),
                      excluded: tripForm.excluded.filter((item) => item.trim()),
                      plans: tripForm.plans.filter((p) => p.title.trim()),
                      videos: tripForm.videos.filter((video) => video.trim()),
                      isSpecial: tripForm.isSpecial.toString(),
                      categories: tripForm.categories,
                    };

                    // Debug: Log the data being sent
                    console.log("Sending update data:", updateData);

                    await updateTrip(selectedTrip._id, updateData, token);

                    // Update local state
                    setTravels((trips) =>
                      trips.map((trip) =>
                        trip._id === selectedTrip._id
                          ? { ...trip, ...updateData }
                          : trip
                      )
                    );

                    setIsEditTripModalOpen(false);
                    setSelectedTrip(null);
                  } catch (err: any) {
                    setTripUpdateError(err.message || "Error updating trip");
                  }
                }}
              >
                Хадгалах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Trip Details Modal */}
        <Dialog
          open={tripDetailsModalOpen}
          onOpenChange={setTripDetailsModalOpen}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Аяллын дэлгэрэнгүй мэдээлэл</DialogTitle>
            </DialogHeader>
            {selectedTrip && (
              <div className="space-y-6">
                {/* Trip Image */}
                {selectedTrip.images && selectedTrip.images.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Зураг</Label>
                    <div className="mt-2">
                      <img
                        src={
                          Array.isArray(selectedTrip.images) &&
                          selectedTrip.images[0]
                            ? selectedTrip.images[0]
                            : "/placeholder.jpg"
                        }
                        alt={selectedTrip.title || "Trip image"}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Гарчиг</Label>
                    <p className="mt-1 text-gray-700">
                      {selectedTrip.title || "Тодорхойгүй"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Үнэ</Label>
                    <p className="mt-1 text-gray-700 font-semibold">
                      ₮{selectedTrip.price?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Хугацаа</Label>
                    <p className="mt-1 text-gray-700">
                      {selectedTrip.duration?.days || 0} хоног
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Байршил</Label>
                    <p className="mt-1 text-gray-700">
                      {selectedTrip.destination?.location || "Тодорхойгүй"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Төлөв</Label>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedTrip.status === "SCHEDULED"
                          ? "bg-green-100 text-green-800"
                          : selectedTrip.status === "ACTIVE"
                          ? "bg-blue-100 text-blue-800"
                          : selectedTrip.status === "COMPLETED"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedTrip.status === "SCHEDULED"
                        ? "Төлөвлөгдсөн"
                        : selectedTrip.status === "ACTIVE"
                        ? "Идэвхтэй"
                        : selectedTrip.status === "COMPLETED"
                        ? "Дууссан"
                        : selectedTrip.status}
                    </span>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Онцгой аялал</Label>
                    <p className="mt-1 text-gray-700">
                      {selectedTrip.isSpecial ? "Тийм" : "Үгүй"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-sm font-medium">Тайлбар</Label>
                  <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                    {selectedTrip.description || "Тайлбар байхгүй"}
                  </p>
                </div>

                {/* Categories */}
                {selectedTrip.categories &&
                  selectedTrip.categories.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Төрлүүд</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedTrip.categories.map(
                          (category: any, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {typeof category === "object"
                                ? category.name || "Unknown"
                                : String(category)}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Included Services */}
                {selectedTrip.included &&
                  Array.isArray(selectedTrip.included) &&
                  selectedTrip.included.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">
                        Орсон үйлчилгээ
                      </Label>
                      <div className="mt-2 space-y-1">
                        {selectedTrip.included.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-gray-700">
                                {typeof item === "string" ? item : String(item)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Excluded Services */}
                {selectedTrip.excluded &&
                  Array.isArray(selectedTrip.excluded) &&
                  selectedTrip.excluded.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">
                        Орхоогүй үйлчилгээ
                      </Label>
                      <div className="mt-2 space-y-1">
                        {selectedTrip.excluded.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              <span className="text-gray-700">
                                {typeof item === "string" ? item : String(item)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Plans */}
                {selectedTrip.plans && selectedTrip.plans.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">
                      Аяллын төлөвлөгөө
                    </Label>
                    <div className="mt-2 space-y-4">
                      {selectedTrip.plans.map(
                        (plan: any, planIndex: number) => (
                          <div
                            key={planIndex}
                            className="border rounded-lg p-3"
                          >
                            <h4 className="font-medium text-gray-800 mb-2">
                              {typeof plan.title === "string"
                                ? plan.title
                                : `Өдөр ${planIndex + 1}`}
                            </h4>
                            {plan.items &&
                              Array.isArray(plan.items) &&
                              plan.items.length > 0 && (
                                <div className="space-y-1">
                                  {plan.items.map(
                                    (item: any, itemIndex: number) => (
                                      <div
                                        key={itemIndex}
                                        className="flex items-center gap-2 text-sm text-gray-600"
                                      >
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                        <span>
                                          {typeof item === "string"
                                            ? item
                                            : String(item)}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {selectedTrip.videos && selectedTrip.videos.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Видеонууд</Label>
                    <div className="mt-2 space-y-2">
                      {selectedTrip.videos.map(
                        (video: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <a
                              href={video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline text-sm"
                            >
                              Видео {index + 1}
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedTrip.startDateTime && (
                    <div>
                      <Label className="text-sm font-medium">Эхлэх огноо</Label>
                      <p className="mt-1 text-gray-700">
                        {new Date(
                          selectedTrip.startDateTime
                        ).toLocaleDateString("mn-MN")}
                      </p>
                    </div>
                  )}
                  {selectedTrip.endDateTime && (
                    <div>
                      <Label className="text-sm font-medium">
                        Дуусах огноо
                      </Label>
                      <p className="mt-1 text-gray-700">
                        {new Date(selectedTrip.endDateTime).toLocaleDateString(
                          "mn-MN"
                        )}
                      </p>
                    </div>
                  )}
                  {selectedTrip.quota && (
                    <div>
                      <Label className="text-sm font-medium">
                        Нийт байрлал
                      </Label>
                      <p className="mt-1 text-gray-700">
                        {typeof selectedTrip.quota === "object"
                          ? `${selectedTrip.quota.total || 0} (Боломжтой: ${
                              selectedTrip.quota.available || 0
                            })`
                          : selectedTrip.quota}
                      </p>
                    </div>
                  )}
                  {selectedTrip.createdAt && (
                    <div>
                      <Label className="text-sm font-medium">
                        Үүсгэсэн огноо
                      </Label>
                      <p className="mt-1 text-gray-700">
                        {new Date(selectedTrip.createdAt).toLocaleDateString(
                          "mn-MN"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={() => setTripDetailsModalOpen(false)}
                className="w-full"
              >
                Хаах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {selectedTab === "Bookings" && (
          <div className="px-8 py-6">
            <div className="text-lg font-bold mb-4">Бүх захиалгууд</div>
            <Card>
              <CardContent className="p-0">
                {ordersLoading ? (
                  <div className="p-8 text-center">Уншиж байна...</div>
                ) : ordersError ? (
                  <div className="p-8 text-red-500 text-center">
                    {ordersError}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Хэрэглэгч</TableHead>
                        <TableHead>Аялал</TableHead>
                        <TableHead>Огноо</TableHead>
                        <TableHead>Төлбөр</TableHead>
                        <TableHead>Төлөв</TableHead>
                        <TableHead>Үйлдэл</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-gray-500"
                          >
                            Захиалга байхгүй байна
                          </TableCell>
                        </TableRow>
                      ) : (
                        orders.map((order) => {
                          // Prefer fetched travelDetails, otherwise normalize inline object
                          const t =
                            order.travelDetails ||
                            (typeof order.travel === "object"
                              ? normalizeTravel(order.travel)
                              : null);

                          return (
                            <TableRow key={order._id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {order.userDetails?.name ||
                                      order.contact?.fullName ||
                                      "N/A"}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {order.userDetails?.email ||
                                      order.contact?.email ||
                                      ""}
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {t?.title || "Тухайгүй аялал"}
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell>
                                <div>
                                  <div>
                                    {order.createdAt
                                      ? new Date(
                                          order.createdAt
                                        ).toLocaleDateString("mn-MN")
                                      : "N/A"}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {order.travelersSize} хүн
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    ₮{order.totalPrice?.toLocaleString() || "0"}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ₮
                                    {order.pricePerQuota?.toLocaleString() ||
                                      "0"}{" "}
                                    / хүн
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    order.status === "CONFIRMED"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : order.status === "CANCELLED"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {order.status === "CONFIRMED"
                                    ? "Баталгаажсан"
                                    : order.status === "PENDING"
                                    ? "Хүлээгдэж буй"
                                    : order.status === "CANCELLED"
                                    ? "Цуцлагдсан"
                                    : order.status}
                                </span>
                              </TableCell>

                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openOrderDetails(order)}
                                  >
                                    Дэлгэрэнгүй
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedOrder(order);
                                      setNewOrderStatus(order.status);
                                      setOrderStatusModalOpen(true);
                                    }}
                                  >
                                    Төлөв солих
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Pagination for Bookings tab */}
            {!ordersLoading && !ordersError && totalPages > 1 && (
              <div className="mt-4 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                >
                  Өмнөх
                </Button>
                <span className="text-sm text-gray-600">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage >= totalPages}
                >
                  Дараах
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Order Status Update Modal */}
        <Dialog
          open={orderStatusModalOpen}
          onOpenChange={setOrderStatusModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Захиалгын төлөв солих</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedOrder && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">
                    Захиалгын мэдээлэл:
                  </div>
                  <div className="font-medium">
                    {selectedOrder.userDetails?.name ||
                      selectedOrder.contact?.fullName ||
                      "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedOrder.travelDetails?.title || "Тухайгүй аялал"}
                  </div>
                  <div className="text-sm text-gray-500">
                    ₮{selectedOrder.totalPrice?.toLocaleString() || "0"}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="newStatus">Шинэ төлөв</Label>
                <Select
                  value={newOrderStatus}
                  onValueChange={setNewOrderStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Төлөв сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Хүлээгдэж буй</SelectItem>
                    <SelectItem value="CONFIRMED">Баталгаажсан</SelectItem>
                    <SelectItem value="CANCELLED">Цуцлагдсан</SelectItem>
                    <SelectItem value="COMPLETED">Дууссан</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {statusUpdateError && (
                <div className="text-red-500 text-sm">{statusUpdateError}</div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setOrderStatusModalOpen(false);
                  setStatusUpdateError("");
                }}
              >
                Цуцлах
              </Button>
              <Button
                onClick={async () => {
                  if (!selectedOrder || !newOrderStatus) return;

                  try {
                    setStatusUpdateError("");
                    await updateOrderStatus(selectedOrder._id, newOrderStatus);

                    // Update local state
                    setOrders((prev) =>
                      prev.map((order) =>
                        order._id === selectedOrder._id
                          ? { ...order, status: newOrderStatus }
                          : order
                      )
                    );

                    setOrderStatusModalOpen(false);
                    setSelectedOrder(null);
                  } catch (err: any) {
                    setStatusUpdateError(
                      err.message || "Төлөв солихад алдаа гарлаа"
                    );
                  }
                }}
                disabled={
                  !newOrderStatus || newOrderStatus === selectedOrder?.status
                }
              >
                Хадгалах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Order Details Modal */}
        <Dialog
          open={orderDetailsModalOpen}
          onOpenChange={setOrderDetailsModalOpen}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Захиалгын дэлгэрэнгүй мэдээлэл</DialogTitle>
            </DialogHeader>
            {selectedOrderForDetails && (
              <div className="space-y-6">
                {/* Order Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    Захиалгын мэдээлэл
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Захиалгын ID</div>
                      <div className="font-medium">
                        {selectedOrderForDetails._id}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        Үүсгэсэн огноо
                      </div>
                      <div className="font-medium">
                        {selectedOrderForDetails.createdAt
                          ? new Date(
                              selectedOrderForDetails.createdAt
                            ).toLocaleDateString("mn-MN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Тодорхойгүй"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Төлөв</div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedOrderForDetails.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : selectedOrderForDetails.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedOrderForDetails.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedOrderForDetails.status === "CONFIRMED"
                          ? "Баталгаажсан"
                          : selectedOrderForDetails.status === "PENDING"
                          ? "Хүлээгдэж буй"
                          : selectedOrderForDetails.status === "CANCELLED"
                          ? "Цуцлагдсан"
                          : selectedOrderForDetails.status}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        Аяллагчдын тоо
                      </div>
                      <div className="font-medium">
                        {selectedOrderForDetails.travelersSize} хүн
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    Хэрэглэгчийн мэдээлэл
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Нэр</div>
                      <div className="font-medium">
                        {selectedOrderForDetails.userDetails?.name ||
                          selectedOrderForDetails.contact?.fullName ||
                          "Тодорхойгүй"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Имэйл</div>
                      <div className="font-medium">
                        {selectedOrderForDetails.userDetails?.email ||
                          selectedOrderForDetails.contact?.email ||
                          "Тодорхойгүй"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    Төлбөрийн мэдээлэл
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Нэг хүний үнэ</div>
                      <div className="font-medium text-lg">
                        ₮
                        {selectedOrderForDetails.pricePerQuota?.toLocaleString() ||
                          "0"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Нийт төлбөр</div>
                      <div className="font-bold text-xl text-green-700">
                        ₮
                        {selectedOrderForDetails.totalPrice?.toLocaleString() ||
                          "0"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel Information */}
                {travelDataLoading ? (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-center py-4">
                      Аяллын мэдээлэл уншиж байна...
                    </div>
                  </div>
                ) : (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-center py-4 text-gray-500">
                      Аяллын мэдээлэл олдсонгүй
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={() => {
                  setOrderDetailsModalOpen(false);
                  setSelectedOrderForDetails(null);
                  setDetailedTravelData(null);
                }}
                className="w-full"
              >
                Хаах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
