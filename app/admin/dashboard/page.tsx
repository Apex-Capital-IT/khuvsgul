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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

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
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [travels, setTravels] = useState([]);
  const [travelsLoading, setTravelsLoading] = useState(false);
  const [travelsError, setTravelsError] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  const [adminUser, setAdminUser] = useState<{
    name: string;
    avatar?: string;
  } | null>(null);

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
    { label: "Messages", icon: "MessageSquare" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      <SidebarProvider className="w-66">
        <Sidebar className="bg-white border-r w-64 flex flex-col justify-between">
          <SidebarHeader className="p-6 text-2xl font-bold tracking-tight">
            Coursue
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
              <div className="text-lg font-bold mb-4">Таны аяллууд</div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Хөтөч</TableHead>
                        <TableHead>Аяллын төрөл</TableHead>
                        <TableHead>Тайлбар</TableHead>
                        <TableHead>Үйлдэл</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>Б</AvatarFallback>
                          </Avatar>
                          <span>Бат-Эрдэнэ</span>
                        </TableCell>
                        <TableCell>Усан аялал</TableCell>
                        <TableCell>
                          Хөвсгөл нуурын эрэг дээр амралт, завиар зугаалах
                        </TableCell>
                        <TableCell>
                          <Button size="sm">Дэлгэрэнгүй</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>С</AvatarFallback>
                          </Avatar>
                          <span>Сарангэрэл</span>
                        </TableCell>
                        <TableCell>Элсэн манхан</TableCell>
                        <TableCell>
                          Говийн элсэн манхан, тэмээ унах туршлага
                        </TableCell>
                        <TableCell>
                          <Button size="sm">Дэлгэрэнгүй</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>Д</AvatarFallback>
                          </Avatar>
                          <span>Даваадорж</span>
                        </TableCell>
                        <TableCell>Өвлийн аялал</TableCell>
                        <TableCell>
                          Тайгын өвөрмөц байгаль, цас мөсний адал явдал
                        </TableCell>
                        <TableCell>
                          <Button size="sm">Дэлгэрэнгүй</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
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
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{travel.title}</h3>
                          <p className="text-sm text-gray-500">
                            {travel.description}
                          </p>
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
                        <span className="text-sm text-gray-600">
                          {travel.categories?.length || 0} төрөл
                        </span>
                        <Button size="sm" variant="outline">
                          Засах
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

        {selectedTab === "Bookings" && (
          <div className="px-8 py-6">
            <div className="text-lg font-bold mb-4">Захиалгууд</div>
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
                    <TableRow>
                      <TableCell>Бат-Эрдэнэ</TableCell>
                      <TableCell>Хөвсгөл нуурын аялал</TableCell>
                      <TableCell>2024-01-15</TableCell>
                      <TableCell>₮150,000</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Төлөгдсөн
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Сарангэрэл</TableCell>
                      <TableCell>Говийн элсэн манхан</TableCell>
                      <TableCell>2024-01-20</TableCell>
                      <TableCell>₮200,000</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Хүлээгдэж буй
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
        {selectedTab === "Messages" && (
          <div className="px-8 py-6">
            <div className="text-lg font-bold mb-4">Зурвасууд</div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>Б</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Бат-Эрдэнэ</h3>
                        <span className="text-sm text-gray-500">
                          2 цагийн өмнө
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Хөвсгөл нуурын аялалд хэдэн хүн явж болох вэ?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>С</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Сарангэрэл</h3>
                        <span className="text-sm text-gray-500">
                          5 цагийн өмнө
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Говийн аялалд ямар тоног төхөөрөмж хэрэгтэй вэ?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
