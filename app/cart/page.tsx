"use client";

import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItem, clearCart, getCartCount } =
    useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    updateCartItem(itemId, { travelersSize: newQuantity });
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Нэвтрэх шаардлагатай");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Сагс хоосон байна");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create orders for each cart item
      const orderPromises = cartItems.map((item) =>
        fetch(`${API_URL}/api/v1/order/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            travelId: item.travelId,
            travelersSize: item.travelersSize,
            contact: item.contact,
          }),
        })
      );

      const responses = await Promise.all(orderPromises);
      const results = await Promise.all(responses.map((res) => res.json()));

      const successCount = results.filter((result) => result.code === 0).length;

      if (successCount === cartItems.length) {
        toast.success("Бүх захиалга амжилттай үүсгэгдлээ!");
        clearCart();
        // Redirect to profile page to show updated order count
        window.location.href = "/profile?tab=orders";
      } else {
        toast.error("Зарим захиалга амжилтгүй боллоо");
      }
    } catch (error: any) {
      toast.error(error.message || "Алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.travelersSize;
      const vat = Math.round(itemTotal * 0.1);
      return total + itemTotal + vat;
    }, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black py-16">
        <div className="container h-screen  mx-auto px-4">
          <div className="max-w-md h-screen my-auto mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-brand-orange rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-medium text-white mb-4">
              Сагс хоосон байна
            </h1>
            <p className="text-white mb-8">
              Аяллын сагсанд нэмэх зүйл алга байна
            </p>
            <Link href="/trips">
              <Button className="bg-black text-white hover:bg-gray-800">
                Аялал харах
              </Button>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-medium text-gray-900">Сагс</h1>
            <div className="text-sm text-gray-600">{getCartCount()} зүйл</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Image */}
                      <div className="w-32 h-32 relative flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              {item.title}
                            </h3>
                            {item.destination && (
                              <p className="text-sm text-gray-600 mb-1">
                                {item.destination}
                              </p>
                            )}
                            {item.duration && (
                              <p className="text-sm text-gray-600">
                                {item.duration.days} өдөр,{" "}
                                {item.duration.nights} шөнө
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.travelersSize - 1
                                )
                              }
                              disabled={item.travelersSize <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.travelersSize}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.travelersSize + 1
                                )
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm text-gray-600 ml-2">
                              хүн
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              {item.price.toLocaleString()}₮
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.travelersSize} хүн
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Захиалгын дүн</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => {
                    const itemTotal = item.price * item.travelersSize;
                    const vat = Math.round(itemTotal * 0.1);
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-gray-600">
                            {item.travelersSize} хүн
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{itemTotal.toLocaleString()}₮</div>
                          <div className="text-gray-600">
                            + НӨАТ {vat.toLocaleString()}₮
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Нийт</span>
                      <span>{calculateTotal().toLocaleString()}₮</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    {isSubmitting
                      ? "Захиалга үүсгэж байна..."
                      : "Захиалга хийх"}
                  </Button>

                  <Link href="/trips">
                    <Button variant="outline" className="w-full">
                      Аялал үргэлжлүүлэх
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
