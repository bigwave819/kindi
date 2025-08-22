// app/admin/layout.tsx
import { AdminSidebar } from "@/components/layout/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({ 
  children, 
}: { 
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  if (session.user.role !== 'admin') {
    redirect("/");
  }

  return (
      <div className="flex">
        <AdminSidebar />
        <main className="ml-64 flex-1 p-6 bg-[#fdfdfc] min-w-0 justify-end overflow-auto">
          {children}
        </main>
      </div>
  );
}