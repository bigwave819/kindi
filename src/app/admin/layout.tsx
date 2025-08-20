import { AdminSidebar } from "@/components/layout/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";


export default async function adminDashboardLayout({ children, }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/")
    }

    if (session.user.role != 'admin') {
        redirect("/")
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AdminSidebar />
                <main className="flex-1 p-6 bg-[#fdfdfc]">{children}</main>
            </div>
        </SidebarProvider>
    )
}