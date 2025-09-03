"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[70vh] mt-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnailUrl || item.fileUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    {item.price} Frw × {item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="flex justify-between items-center pt-4 border-t">
            <h2 className="text-xl font-bold">Total</h2>
            <p className="text-xl font-bold text-green-600">{total} Frw</p>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
