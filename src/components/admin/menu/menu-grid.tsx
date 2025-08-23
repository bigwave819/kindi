'use client'
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

type MenuItem = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  fileUrl: string;
  thumbnailUrl: string | null;
  categoryId: number | null;
  categoryName?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface MenuProps {
  menu: MenuItem[];
}

function MenuGrid({ menu }: MenuProps) {
  const [visibleCount, setVisibleCount] = useState(3); // start with 3 items

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 3); // show 3 more items on each click
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {menu.slice(0, visibleCount).map((m) => (
          <div
            key={m.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-slate-100 relative">
              <Image
                src={m.fileUrl}
                alt={m.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium truncate">{m.title}</h3>
              {m.description && (
                <p className="text-xs text-slate-500 line-clamp-2">{m.description}</p>
              )}
              <div className="flex justify-between items-center mt-3 text-xs text-slate-400">
                <span>
                  {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
                </span>
                <span className="italic text-slate-500">
                  {m.categoryName ?? ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < menu.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSeeMore}
            className="px-4 py-2 bg-[#6F4E37] text-white rounded hover:bg-[#5a3d2e] transition"
          >
            See More
          </button>
        </div>
      )}
    </>
  );
}

export default MenuGrid;
