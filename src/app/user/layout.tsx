// app/user/layout.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If logged in and is admin → redirect
  if (session?.user?.role === "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
