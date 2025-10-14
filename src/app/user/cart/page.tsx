import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CartContent from "@/components/user/CartContent";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function CartPage() {
  // Get the session
  const session = await auth.api.getSession({
    headers: await headers()
  });

  let dbUser = null;

  if (session?.user?.id) {
    // Fetch the user from the database
    const result = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    dbUser = result[0] || null;
  }

  return <CartContent session={session} dbUser={dbUser} />;
}
