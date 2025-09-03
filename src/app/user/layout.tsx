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

  if (session?.user.role == 'admin') {
    redirect("/admin/dashboard");
  }

  return (
      <div>
        <main>
          {children}
        </main>
      </div>
  );
}