"use client";

import { useEffect, useState } from "react";
import { getMenuAction } from "@/actions/admin-actions";
import Image from "next/image";

type MenuItem = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  fileUrl: string;
};

export default function HomeClient({ session }: { session: any }) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMenuAction();
        setMenu(data);
      } catch (err) {
        setError("Failed to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
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

      {/* Features */}
      <section className="py-20 bg-[#f8f4f1]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3e2723]">
            Why Choose <span className="text-[#6F4E37]">Kindi Coffee</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.map((c, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl text-center"
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

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6F4E37] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menu...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#6F4E37] text-white rounded-md hover:bg-[#5a3f2c]"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {menu.length > 0 ? (
              menu.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="border rounded-2xl p-4 shadow hover:shadow-lg transition text-center"
                >
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={item.fileUrl || "/placeholder-coffee.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded-xl"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-coffee.jpg";
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="font-bold text-[#6F4E37]">RWF {item.price}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">
                  No menu items available yet.
                </p>
                <p className="text-gray-500 mt-2">
                  Check back soon for our delicious offerings!
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
