// components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Coffee,
  ClipboardList,
  Users,
  UserCog,
  ChartBarStacked ,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: Coffee },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/staff", label: "Staff", icon: UserCog },
  { href: "/admin/category", label: "Category", icon: ChartBarStacked  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-64 min-w-64 border-r bg-background h-screen flex flex-col">
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
            <div key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md transition text-sm w-full",
                  pathname === href
                    ? "bg-[#6F4E37] text-white"
                    : "hover:bg-[#6F4E37] hover:text-white"
                )}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          className="w-full bg-slate-200 text-black hover:bg-slate-300 justify-between cursor-pointer py-2 text-base font-semibold"
          onClick={handleSignOut}
        >
          Logout
          <LogOut size={18} />
        </Button>
      </div>
    </div>
  );
}