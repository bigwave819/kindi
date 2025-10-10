"use client";

import { useEffect, useState } from "react";
import { Utensils, ShoppingCart, Search } from "lucide-react";
import MenuCard from "@/components/user/MenuCard";
import { getMenuAction, getAllCategoriesAction } from "@/actions/admin-actions";

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

interface Category {
  id: number;
  name: string;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const [items, cats] = await Promise.all([
          getMenuAction(),
          getAllCategoriesAction(),
        ]);

        setMenuItems(items || []);
        setCategories([{ id: 0, name: "All" }, ...(cats || [])]);
      } catch (error) {
        console.error("Error loading menu:", error);
        setMenuItems([]);
        setCategories([{ id: 0, name: "All" }]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredMenu = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === "All" || 
      item.categoryName === selectedCategory;
    
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleCategorySelect = (categoryName: string, categoryId: number) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId === 0 ? null : categoryId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Utensils className="w-8 h-8 text-[#6F4E37]" />
        <h1 className="text-3xl font-bold text-[#3e2723]">Our Menu</h1>
      </div>

      <p className="text-gray-600 mb-8">
        Explore our delicious meals made with fresh ingredients. Choose your
        favorites and add them to your cart{" "}
        <ShoppingCart className="inline w-5 h-5 text-gray-700" />.
      </p>

      {/* Search & Filter */}
      {!loading && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.name, cat.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                  ${
                    selectedCategory === cat.name
                      ? "bg-[#6F4E37] text-white border-[#6F4E37]"
                      : "bg-white text-[#3e2723] border-gray-300 hover:bg-[#f9f7f5]"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] outline-none text-sm"
            />
          </div>
        </div>
      )}

      {/* Results Info */}
      {!loading && (
        <div className="mb-6 text-sm text-gray-600">
          Showing {filteredMenu.length} of {menuItems.length} items
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white shadow-sm p-5 flex flex-col items-center"
            >
              <div className="w-28 h-28 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 w-1/3 rounded mb-3"></div>
              <div className="h-8 bg-gray-200 w-24 rounded-full"></div>
            </div>
          ))}
        </div>
      ) : filteredMenu.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No items found.</p>
          <p className="text-gray-400 text-sm">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <MenuCard items={filteredMenu} />
      )}
    </div>
  );
}