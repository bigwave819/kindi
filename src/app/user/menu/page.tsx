import { Utensils, ShoppingCart } from "lucide-react";
import MenuCard from "@/components/user/MenuCard";
import { getMenuAction } from "@/actions/admin-actions"; // adjust import path

export default async function MenuPage() {
  // Fetch menu items from DB
  const menuItems = await getMenuAction();

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen mt-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Utensils className="w-8 h-8 text-[#6F4E37]" />
        <h1 className="text-3xl font-bold">Our Menu</h1>
      </div>

      <p className="text-gray-600 mb-10">
        Explore our delicious meals carefully crafted with fresh ingredients.
        Choose your favorite dishes and add them to your cart{" "}
        <ShoppingCart className="inline w-5 h-5 text-gray-700" />.
      </p>

      {/* Menu Grid */}
      {menuItems.length === 0 ? (
        <p className="text-gray-500">No menu items available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <MenuCard key={item.id} menu={item} />
          ))}
        </div>
      )}
    </div>
  );
}
