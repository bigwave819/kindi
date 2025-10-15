"use client";

import { ShoppingCart, Trash2, MapPin } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useState } from "react";
import { LocationModal } from "./LocationModal";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/actions/user-actions";

interface CartContentProps {
  session: any; // user session
  dbUser?: any; // full user from db
}

export default function CartContent({ session, dbUser }: CartContentProps) {
  const { items, removeFromCart, clearCart } = useCartStore();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const userLocation = dbUser
    ? [dbUser.village, dbUser.cell, dbUser.sector, dbUser.district]
        .filter(Boolean)
        .join(", ")
    : session?.location;

  const hasLocation = Boolean(userLocation);

  const handleOrder = async () => {
    if (!session) {
      alert("You need to log in to place an order!");
      return;
    }

    if (!hasLocation) {
      setShowLocationModal(true);
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setIsOrdering(true);
      const res = await createOrder(items);

      if (res?.success) {
        alert(`Order placed successfully! Delivery to: ${userLocation}`);
        clearCart();
      } else {
        alert(res?.message || "Failed to place your order. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      alert("An unexpected error occurred while placing your order.");
    } finally {
      setIsOrdering(false);
    }
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 min-h-[70vh] mt-20">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <Link
              href="/user/menu"
              className="bg-[#6F4E37] text-white px-6 py-2 rounded-lg hover:bg-[#5a3f2c] transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Info Banner */}
            {session && (
              <div
                className={`p-4 rounded-lg ${
                  hasLocation
                    ? "bg-green-50 border border-green-200"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      hasLocation ? "bg-green-100" : "bg-amber-100"
                    }`}
                  >
                    <MapPin
                      className={`w-4 h-4 ${
                        hasLocation ? "text-green-600" : "text-amber-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        hasLocation ? "text-green-800" : "text-amber-800"
                      }`}
                    >
                      {session.name || session.email}
                    </p>
                    <p
                      className={`text-sm ${
                        hasLocation ? "text-green-600" : "text-amber-600"
                      }`}
                    >
                      {hasLocation
                        ? `Delivery to: ${userLocation}`
                        : "Delivery location needed"}
                    </p>
                  </div>
                  {!hasLocation && (
                    <Link
                      href="/user/profile"
                      className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition-colors"
                    >
                      Add
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.fileUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="text-gray-600">
                        {item.price.toLocaleString()} Frw × {item.quantity}
                      </p>
                      <p className="text-green-600 font-medium">
                        Subtotal:{" "}
                        {(item.price * item.quantity).toLocaleString()} Frw
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <h2 className="text-xl font-bold">Total Amount</h2>
              <p className="text-xl font-bold text-green-600">
                {total.toLocaleString()} Frw
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Button
                variant="destructive"
                onClick={handleClearCart}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </Button>

              <Button
                onClick={handleOrder}
                disabled={isOrdering}
                className={`bg-primary hover:bg-primary/90 text-white`}
              >
                {isOrdering
                  ? "Placing Order..."
                  : hasLocation
                  ? "Order Now"
                  : "Add Location First"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <LocationModal
        open={showLocationModal}
        onOpenChange={setShowLocationModal}
      />
    </>
  );
}
