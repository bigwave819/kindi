"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Coffee,
    ClipboardList,
    Users,
    UserCog,
    BarChart,
    Settings,
    LogOut,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-client";


const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Menu", icon: Coffee },
    { href: "/admin/orders", label: "Orders", icon: ClipboardList },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/staff", label: "Staff", icon: UserCog },
    { href: "/admin/reports", label: "Reports", icon: BarChart },
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
        <Sidebar className="">
            <SidebarContent>
                {/* Logo */}
                <div className="p-6">
                    <Link href="/admin" className="text-2xl font-bold tracking-wide">
                        Kindi<span className="">Admin</span>
                    </Link>
                </div>

                {/* Menu */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {links.map(({ href, label, icon: Icon }) => (
                                <SidebarMenuItem key={href}>
                                    <SidebarMenuButton asChild className="text-xl mb-5 p-4">
                                        <Link
                                            href={href}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-4 rounded-md transition",
                                                pathname === href
                                                    ? "bg-[#6F4E37]"
                                                    : "hover:bg-[#6F4E37] hover:text-[#ffe0b2]"
                                            )}
                                        >
                                            <Icon size={18} />
                                            <span>{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-4 border-t">
                <Button className="bg-slate-300 text-black hover:bg-slate-400 justify-between cursor-pointer px-10 text-lg font-semibold" onClick={handleSignOut}>
                    Logout
                    <span><LogOut /></span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
