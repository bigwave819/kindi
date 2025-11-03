'use server'

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { menu } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { orders, user } from '@/lib/db/schema';

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


export async function createOrder(items: any[]) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect('/')
  }

  const userId = session.user.id;

  const userData = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  if (
    !userData
  ) {
    throw new Error("Incomplete location information.");
  }

  try {
    const orderRecords = items.map((item) => ({
      userId,
      menuId: item.id,
      quantity: item.quantity,
      price: item.price,
      district: userData.district,
      sector: userData.sector,
      cell: userData.cell,
      village: userData.village,
      address: userData.address,
    }));

    await db.insert(orders).values(orderRecords);

    revalidatePath("/user/orders");
    return { success: true, message: "Order placed successfully." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'failed to create the order' + error
    }
  }
}

export async function fetchOrders() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) throw new Error("User not logged in.");

    const currentUserId = session.user.id;

    const dbUser = await db.query.user.findFirst({
      where: eq(user.id, currentUserId),
    });

    if (!dbUser) throw new Error("User not found.");

    const isAdmin = dbUser.role === "admin";

    const fetchedOrders = await db
      .select({
        id: orders.id,
        quantity: orders.quantity,
        price: orders.price,
        status: orders.status,
        orderDate: orders.createdAt,
        district: orders.district,
        sector: orders.sector,
        village: orders.village,
        address: orders.address,
        menu: {
          id: menu.id,
          name: menu.title,
          image: menu.fileUrl,
        },
        userId: orders.userId,
      })
      .from(orders)
      .leftJoin(menu, eq(menu.id, orders.menuId))
      .where(isAdmin ? undefined : eq(orders.userId, currentUserId));

    return {
      success: true,
      orders: fetchedOrders,
      message: ""
    };
  } catch (error: any) {
    console.error("❌ Error in fetchOrders:", error);
    return {
      success: false,
      orders: [],
      message: error.message || "Failed to fetch orders."
    };
  }
}
