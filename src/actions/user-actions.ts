// lib/actions/user-actions.ts
'use server'

import { db } from "@/lib/db";
import { user, menu } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export async function updateProfileAction(data: {
  userId: string;
  name: string;
  phone?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  address?: string;
}) {
  const { userId, name, phone, district, sector, cell, village, address } = data;

  if (!name) throw new Error("Name is required");

  await db
    .update(user)
    .set({
      name,
      phone,
      district,
      sector,
      cell,
      village,
      address,
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId));

  // Revalidate the user profile page so the updated info is shown
  revalidatePath("/user/profile");

  return true;
}
