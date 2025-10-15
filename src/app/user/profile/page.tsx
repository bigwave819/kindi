// app/user/profile/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileContent from "@/components/user/ProfileContent";
import { db } from "@/lib/db";
import { user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let dbUser = null;
  if (session?.user?.id) {
    const result = await db.select().from(userTable).where(eq(userTable.id, session.user.id)).limit(1);
    dbUser = result[0] || null;
  }

  return <ProfileContent session={session} dbUser={dbUser} />;
}