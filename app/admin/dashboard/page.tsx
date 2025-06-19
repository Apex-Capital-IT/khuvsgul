"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    async function fetchUsers() {
      try {
        const response = await fetch(`${API_URL}/admin/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        if (data.code !== 0) {
          throw new Error(data.message || "Failed to fetch users");
        }
        setUsers(data.response);
      } catch (err: any) {
        setError(err.message || "Error loading users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen pt-20 px-4">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen pt-20 px-4 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Админ Хэрэглэгчид</h1>
        <Card>
          <CardHeader>
            <CardTitle>Хэрэглэгчдийн жагсаалт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Нэр</th>
                    <th className="px-4 py-2 text-left">Имэйл</th>
                    <th className="px-4 py-2 text-left">Утас</th>
                    <th className="px-4 py-2 text-left">Огноо</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phoneNumber}</td>
                      <td className="px-4 py-2">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("mn-MN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 