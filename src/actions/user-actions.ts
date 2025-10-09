'use server'
import { db } from "@/lib/db";
import { menu } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getSingleMenuAction(slug: string) {
  try {
    const result = await db
      .select()
      .from(menu)
      .where(eq(menu.id, slug))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return null;
  }
}