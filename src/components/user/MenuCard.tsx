"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  fileUrl: string;
  thumbnailUrl: string | null;
  categoryId: number | null;
  categoryName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function MenuCard({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center"
        >
          {/* Image */}
          <div className="relative w-28 h-28 mb-4">
            <Image
              src={item.fileUrl || "/placeholder-coffee.jpg"}
              alt={item.title}
              fill
              className="rounded-full object-cover border-4 border-white shadow"
              unoptimized
            />
          </div>

          {/* Content */}
          <h3 className="font-semibold text-lg text-[#3e2723] mb-1 text-center">
            {item.title}
          </h3>
          <p className="text-[#6F4E37] font-bold mb-3">{item.price} RWF</p>

          {/* Button */}
          <Link
            href={`/user/menu/${item.id}`}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#6F4E37] text-white font-medium hover:bg-[#5a3f2c] transition"
          >
            <ShoppingBag className="w-5 h-5" />
            Order Now
          </Link>
        </div>
      ))}
    </div>
  );
}