import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CartContent from "@/components/user/CartContent";

export default async function CartPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <CartContent session={session} />;
}