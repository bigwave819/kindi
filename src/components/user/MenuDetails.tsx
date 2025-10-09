"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function MenuDetails({ item }: { item: any }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const totalPrice = useMemo(() => item.price * quantity, [item.price, quantity]);

  const handleAddToCart = () => {
    addToCart(
      {
        id: item.id,
        title: item.title,
        price: item.price,
        fileUrl: item.fileUrl,
      },
      quantity
    );
    alert(`✅ Added ${quantity} × ${item.title} (${totalPrice} Frw) to cart!`);
  };

  return (
    <div className="flex flex-col justify-center md:w-1/2 w-full max-w-md space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#4E342E]">
        {item.title}
      </h1>
      <p className="text-gray-600 leading-relaxed">{item.description}</p>
      <p className="text-sm text-gray-500 italic">
        Category: <span className="font-medium">{item.categoryId}</span>
      </p>

      <h2 className="text-3xl font-semibold text-[#6F4E37]">
        {totalPrice.toLocaleString()} Frw
      </h2>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-6 flex items-center justify-center gap-2 bg-[#6F4E37] cursor-pointer hover:bg-[#5a3f2c] text-white py-3 rounded-xl font-semibold shadow-md transition-all"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
}
