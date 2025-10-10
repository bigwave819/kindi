// app/user/profile/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileContent from "@/components/user/ProfileContent";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <ProfileContent session={session} />;
}