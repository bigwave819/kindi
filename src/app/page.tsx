import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HomeClient from "@/components/user/HomeCleint";

export default async function HomePage() {
  // ✅ Run only on server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role === "admin") {
    redirect("/admin/dashboard");
  }

  // Pass session info into client part if needed
  return <HomeClient session={session} />;
}
