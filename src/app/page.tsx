"use client";

import { useEffect, useState } from "react";
import { getMenuAction } from "@/actions/admin-actions";
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  fileUrl: string;
};

export default function Home() {
  const content = [
    {
      emoji: "👨‍🍳",
      title: "Master Chefs",
      description: "15+ years of traditional Rwandan culinary expertise",
    },
    {
      emoji: "🚚",
      title: "Lightning Fast",
      description: "Average 22-minute delivery with real-time tracking",
    },
    {
      emoji: "🍰",
      title: "24/7 Support",
      description: "Round-the-clock customer service and order assistance",
    },
  ];

  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function fetchMenu() {
      const data = await getMenuAction();
      setMenu(data);
    }
    fetchMenu();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between min-h-screen max-w-7xl mx-auto px-6 py-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide leading-tight">
            Welcome to <span className="text-[#6F4E37]">Kindi Coffee Shop</span>
          </h1>
          <p className="max-w-lg text-lg text-gray-600 mb-8">
            Brewing happiness one cup at a time ☕. Discover our freshly roasted
            beans, crafted drinks, and cozy atmosphere.
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 rounded-full text-white bg-[#6F4E37] hover:bg-[#5a3f2c] font-semibold transition shadow-md">
              Order Now
            </button>
            <button className="px-6 py-3 rounded-full border border-[#6F4E37] text-[#6F4E37] hover:bg-[#f8f4f1] font-semibold transition shadow-md">
              Explore Menu
            </button>
          </div>
        </div>

        <div className="flex-1 mt-12 md:mt-0 flex justify-center">
          <Image
            src="/coffe.png"
            alt="Coffee"
            width={400}
            height={400}
            className="h-[70vh] w-[90%]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#f8f4f1]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3e2723]">
            Why Choose <span className="text-[#6F4E37]">Kindi Coffee</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.map((c, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-gray-200 transition-all shadow-sm hover:shadow-xl text-center"
              >
                <div className="h-20 w-20 mx-auto rounded-full bg-[#FFF3E0] flex items-center justify-center text-3xl mb-6 shadow-md">
                  {c.emoji}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#3e2723]">
                  {c.title}
                </h3>
                <p className="text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#3e2723]">
          Our Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menu.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition text-center"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={item.fileUrl}
                  alt={item.title}
                  fill
                  className="object-cover rounded-xl"
                  unoptimized
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="font-bold text-[#6F4E37]">RWF {item.price}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/user/menu">
            <button className="px-8 py-3 rounded-full bg-[#6F4E37] text-white hover:bg-[#5a3f2c] font-semibold transition shadow-md">
              View More
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
