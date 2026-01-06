export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export async function updateCategory({ id, name, description, token }) {
  const response = await fetch(`${API_URL}/admin/v1/category/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(data.message || "Failed to update category");
  }
  return data.response;
}

export async function createCategory({ name, token }: { name: string; token: string | null }) {
  const response = await fetch(`${API_URL}/admin/v1/category`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(data.message || "Failed to create category");
  }
  return data.response;
}

export async function deleteCategory({ id, token }: { id: string; token: string | null }) {
  const response = await fetch(`${API_URL}/admin/v1/category/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(data.message || "Failed to delete category");
  }
  return data.response;
}
