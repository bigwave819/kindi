
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full 
      bg-gradient-to-r from-[#3e2723] via-[#6F4E37] to-[#a1887f] text-white p-8 text-center">
      
      {/* Headline */}
      <h1 className="text-5xl font-bold mb-4 tracking-wide">
        Welcome to <span className="text-[#ffe0b2]">Kindi Coffee Shop</span>
      </h1>

      {/* Subheading */}
      <p className="max-w-xl text-lg mb-6 text-gray-100">
        Brewing happiness one cup at a time ☕  
        Discover our freshly roasted beans, crafted drinks, and cozy atmosphere.
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
  );
}
