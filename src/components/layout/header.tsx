"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import NavLinks from "./nav-links";
import UserAvatarMenu from "./user-avatar-menu";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  const items = useCartStore((state) => state.items);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  if (pathname.startsWith("/admin") || pathname === "/not-found") {
    return null;
  }

  return (
    <header className="top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo - Left side */}
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold tracking-wide bg-blur-sm inline-block">
            Kindi<span className="text-[#ffe0b2]">Coffee</span>
          </Link>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex flex-1 justify-center space-x-5">
          <NavLinks />
        </nav>

        {/* Right side - User avatar and mobile toggle */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/user/cart"
              className="relative flex items-center text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>
            <UserAvatarMenu user={session?.user} />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#4e342e] p-4 space-y-4 fixed top-16 left-0 right-0 z-50">
          <NavLinks onClick={() => setIsOpen(false)} />
          <UserAvatarMenu user={session?.user} />
        </div>
      )}
    </header>
  );
}