"use client";

import { useCartStore } from "@/store/cartStore";

export default function MenuCard({ menu }: any) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <img
        src={menu.thumbnailUrl || menu.fileUrl}
        alt={menu.title}
        className="w-full h-52 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold">{menu.title}</h2>
      <p className="text-sm text-gray-500">{menu.description}</p>
      <p className="text-xs text-gray-400 mb-2">{menu.categoryName}</p>
      <p className="font-bold text-[#6F4E37]">{menu.price} Frw</p>
      <button
        onClick={() => addToCart(menu)}
        className="mt-2 w-full bg-[#6F4E37] text-white px-3 py-1 rounded hover:bg-[#503827]"
      >
        Add to Cart
      </button>
    </div>
  );
}
