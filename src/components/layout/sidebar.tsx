"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Coffee,
  ClipboardList,
  Users,
  UserCog,
  ChartBarStacked,
  ChartNoAxesCombined,
  LogOut,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useState } from "react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: Coffee },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/staff", label: "Staff", icon: UserCog },
  { href: "/admin/category", label: "Category", icon: ChartBarStacked },
  { href: "/admin/analytics", label: "Analytics", icon: ChartNoAxesCombined },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-background border-r flex flex-col z-50 transform transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <Link href="/admin" className="text-2xl font-bold tracking-wide">
            Kindi<span>Admin</span>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md transition text-sm w-full",
                  pathname === href
                    ? "bg-[#6F4E37] text-white"
                    : "hover:bg-[#6F4E37] hover:text-white"
                )}
                onClick={() => setIsOpen(false)} // close sidebar on mobile
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button
            className="w-full bg-slate-200 text-black hover:bg-slate-300 justify-between cursor-pointer py-2 text-base font-semibold"
            onClick={handleSignOut}
          >
            {loading ? "Loading..." : "Logout"}
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </>
  );
}
