"use client";

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

  return (
    <div>
      {/* Hero Section */}
      <section>
        <div
          className="flex flex-col items-center justify-center min-h-screen w-full 
          bg-gradient-to-r from-[#3e2723] via-[#6F4E37] to-[#a1887f] text-white p-8 text-center"
        >
          {/* Headline */}
          <h1 className="text-5xl font-bold mb-4 tracking-wide">
            Welcome to <span className="text-[#ffe0b2]">Kindi Coffee Shop</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-xl text-lg mb-6 text-gray-100">
            Brewing happiness one cup at a time ☕. Discover our freshly roasted
            beans, crafted drinks, and cozy atmosphere.
          </p>

          {/* Call to Action */}
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full bg-[#ffe0b2] text-[#3e2723] font-semibold hover:bg-[#fdd79a] transition">
              Order Now
            </button>
            <button className="px-6 py-3 rounded-full border border-[#ffe0b2] text-[#ffe0b2] font-semibold hover:bg-[#4e342e] transition">
              Explore Menu
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-[#3e2723] via-[#6F4E37] to-[#a1887f] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3e2723]">
            Why Choose <span className="text-[#ffe0b2]">Kindi Coffee</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border-1 border-[#725f5c] transition-all shadow-md hover:shadow-xl text-white text-center"
              >
                {/* Emoji/Icon */}
                <div className="h-20 w-20 mx-auto rounded-full bg-[#ffe0b2] flex items-center justify-center text-3xl mb-4">
                  {c.emoji}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-2">
                  {c.title}
                </h3>

                {/* Description */}
                <p className="">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
