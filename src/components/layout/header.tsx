"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./nav-links";
import UserAvatarMenu from "./user-avatar-menu";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

   if (pathname.startsWith("/admin") || pathname === "/not-found") {
    return null;
  }

  if (isPending) {
    return (
      <header className="bg-[#3e2723] text-white fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold tracking-wide">
            Kindi<span className="text-[#ffe0b2]">Coffee</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-[#3e2723] text-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo - Left side */}
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold tracking-wide inline-block">
            Kindi<span className="text-[#ffe0b2]">Coffee</span>
          </Link>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex flex-1 justify-center space-x-5">
          <NavLinks />
        </nav>

        {/* Right side - User avatar and mobile toggle */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* User Avatar - Desktop */}
          <div className="hidden md:block">
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