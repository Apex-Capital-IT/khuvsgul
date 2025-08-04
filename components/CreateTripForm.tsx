"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function CreateTripForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    days: "",
    nights: "",
    totalQuota: "",
    startDate: "",
    endDate: "",
    included: [""],
    excluded: [""],
    plans: [{ title: "", items: [""] }],
    images: [""],
    isSpecial: false,
    status: "SCHEDULED",
    categories: [] as string[],
  });

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    // Fetch categories
    setCategoriesLoading(true);
    const token = localStorage.getItem("admin_token");
    fetch(`${API_URL}/admin/v1/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 0) {
          setCategories(data.response || []);
        }
      })
      .catch((err) => console.error("Error loading categories:", err))
      .finally(() => setCategoriesLoading(false));
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter(
        (_: string, i: number) => i !== index
      ),
    }));
  };

  const handlePlanChange = (
    planIndex: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
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
    setFormData((prev) => ({
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
    setFormData((prev) => ({
      ...prev,
      plans: [...prev.plans, { title: "", items: [""] }],
    }));
  };

  const removePlan = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      plans: prev.plans.filter((_, i) => i !== index),
    }));
  };

  const addPlanItem = (planIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, i) =>
        i === planIndex ? { ...plan, items: [...plan.items, ""] } : plan
      ),
    }));
  };

  const removePlanItem = (planIndex: number, itemIndex: number) => {
    setFormData((prev) => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");

    // Create FormData object
    const formDataToSend = new FormData();
    
    // Basic fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    
    // Location needs to be sent as a JSON string with specific format
    formDataToSend.append("destination", JSON.stringify({
      location: formData.location,
      s: ""  // Add empty string for 's' property
    }));
    
    // Duration needs to be sent as a JSON string
    formDataToSend.append("duration", JSON.stringify({
      days: Number(formData.days),
      nights: Number(formData.nights)
    }));
    
    // Convert price and quota to numbers
    formDataToSend.append("price", Number(formData.price).toString());
    formDataToSend.append("quota", Number(formData.totalQuota).toString());
    
    // Date formatting
    formDataToSend.append("startDateTime", new Date(formData.startDate).toISOString());
    formDataToSend.append("endDateTime", new Date(formData.endDate).toISOString());
    
    // Boolean fields
    formDataToSend.append("isSpecial", formData.isSpecial.toString());
    formDataToSend.append("status", formData.status);

    // Arrays need to be appended individually with [] notation
    formData.categories.forEach(id => {
      formDataToSend.append("categories[]", id);
    });

    // Filter out empty strings and append arrays
    formData.included
      .filter(item => item.trim())
      .forEach(item => {
        formDataToSend.append("included[]", item);
      });

    formData.excluded
      .filter(item => item.trim())
      .forEach(item => {
        formDataToSend.append("excluded[]", item);
      });

    // Plans need to be formatted as an array of objects
    const formattedPlans = formData.plans
      .filter(p => p.title.trim())
      .map(p => ({
        title: p.title,
        items: p.items.filter(item => item.trim())
      }));
    formDataToSend.append("plans", JSON.stringify(formattedPlans));

    // Images need to be appended as array
    formData.images
      .filter(img => img.trim())
      .forEach(img => {
        formDataToSend.append("images[]", img);
      });

    try {
      // For debugging - log the FormData entries
      console.log("Sending form data:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch(`${API_URL}/admin/v1/travel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type - browser will set it automatically with boundary
        },
        body: formDataToSend,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.errorMessage || 'Something went wrong');
      }

      // Handle success
      toast.success('Аялал амжилттай үүслээ!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset form after success
      setFormData({
        title: "",
        description: "",
        location: "",
        price: "",
        days: "",
        nights: "",
        totalQuota: "",
        startDate: "",
        endDate: "",
        included: [""],
        excluded: [""],
        plans: [{ title: "", items: [""] }],
        images: [""],
        isSpecial: false,
        status: "SCHEDULED",
        categories: [],
      });
      
    } catch (error: any) {
      console.error('Error creating trip:', error);
      toast.error(error.message || 'Алдаа гарлаа. Дахин оролдоно уу.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Гарчиг</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Аяллын гарчиг"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Байршил</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Жишээ: Хөвсгөл нуур"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Үнэ (₮)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="150000"
                required
              />
            </div>
            <div>
              <Label htmlFor="totalQuota">Нийт байрлал</Label>
              <Input
                id="totalQuota"
                type="number"
                value={formData.totalQuota}
                onChange={(e) =>
                  handleInputChange("totalQuota", e.target.value)
                }
                placeholder="20"
                required
              />
            </div>
            <div>
              <Label htmlFor="days">Өдөр</Label>
              <Input
                id="days"
                type="number"
                value={formData.days}
                onChange={(e) => handleInputChange("days", e.target.value)}
                placeholder="5"
                required
              />
            </div>
            <div>
              <Label htmlFor="nights">Шөнө</Label>
              <Input
                id="nights"
                type="number"
                value={formData.nights}
                onChange={(e) => handleInputChange("nights", e.target.value)}
                placeholder="4"
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">Эхлэх огноо</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">Дуусах огноо</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Тайлбар</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Аяллын дэлгэрэнгүй тайлбар"
              rows={3}
              required
            />
          </div>

          {/* Categories */}
          <div>
            <Label htmlFor="categories">Төрлүүд</Label>
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
                      checked={formData.categories.includes(category._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            categories: [...prev.categories, category._id],
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            categories: prev.categories.filter(
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
            {formData.included.map((item, index) => (
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
            {formData.excluded.map((item, index) => (
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
            {formData.plans.map((plan, planIndex) => (
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

          {/* Images */}
          <div>
            <Label>Зургийн холбоосууд</Label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={image}
                  onChange={(e) =>
                    handleArrayChange("images", index, e.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem("images", index)}
                >
                  Устгах
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("images")}
              className="mt-2"
            >
              Зураг нэмэх
            </Button>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Төлөв</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SCHEDULED">Төлөвлөгдсөн</SelectItem>
                <SelectItem value="ONGOING">Явагдаж буй</SelectItem>
                <SelectItem value="COMPLETED">Дууссан</SelectItem>
                <SelectItem value="CANCELLED">Цуцлагдсан</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isSpecial"
              checked={formData.isSpecial}
              onChange={(e) => handleInputChange("isSpecial", e.target.checked)}
            />
            <Label htmlFor="isSpecial">Онцгой аялал</Label>
          </div>

          <Button type="submit" className="w-full">
            Аялал үүсгэх
          </Button>
        </form>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}
