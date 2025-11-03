// app/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import HomeSkeleton from "@/components/skeleton/HomeSkeleton";
import HomeClient from "@/components/user/HomeCleint";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role === "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeClient session={session} />
    </Suspense>
  );
}