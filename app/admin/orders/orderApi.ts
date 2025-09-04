export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export interface OrderFilters {
  pageNumber?: number;
  pageSize?: number;
}

export interface OrderStatusUpdate {
  status: string;
}

export async function getOrders({ 
  pageNumber = 1, 
  pageSize = 20, 
  token 
}: OrderFilters & { token: string | null }) {
  const response = await fetch(
    `${API_URL}/admin/v1/order?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(data.message || "Failed to fetch orders");
  }
  return data.response;
}

export async function getOrderDetails({ 
  orderId, 
  token 
}: { 
  orderId: string; 
  token: string | null 
}) {
  const response = await fetch(`${API_URL}/admin/v1/order/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(data.message || "Failed to fetch order details");
  }
  return data.response;
}

export async function updateOrderStatus({ 
  orderId, 
  status, 
  token 
}: { 
  orderId: string; 
  status: string; 
  token: string | null 
}) {
  const response = await fetch(`${API_URL}/admin/v1/order/${orderId}/status`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(data.message || "Failed to update order status");
  }
  return data.response;
}
