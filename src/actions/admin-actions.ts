'use server'
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { category, menu, orders, staff, user } from "@/lib/db/schema";
import { eq, gte, sql, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";


const categorySchema = z.object({
    icon: z
        .string()
        .min(1, "Please select an emoji icon")
        .max(2, 'Emoji should be 1-2 characters'), // Allow for emoji variations
    name: z
        .string()
        .min(3, "Category name should contain at least 3 characters")
        .max(50, "Category name is too long")
})

const menuSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number().positive('the number should be greater than zero'),
    categoryId: z.number().positive('Please select a category'),
    fileUrl: z.string().url('invalid Url'),
    thumbnailUrl: z.string().url('Invalid File Url').optional()
})

const staffSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().regex(/^\d+$/, "Phone must be numbers only"),
    post: z.string().min(2, "Post is required"),
    gender: z.string().min(2, "Post is required"),
    salary: z.string().regex(/^\d+$/, "Salary must be a number"),
    fileUrl: z.string().url('invalid Url'),
})

export type categoryFormValues = z.infer<typeof categorySchema>



export type TopSoldMenuItem = {
  title: string | null;
  image: string | null;
  totalSold: number;
};

export type OrdersStatusSummary = {
  status: string;
  count: number;
  totalAmount: number;
};

export type MenuItem = {
  id: string;
  title: string;
  price: number;
  categoryId: number | null;
  description?: string | null;
  fileUrl?: string | null;
  thumbnailUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type MonthlyIncome = {
  month: string;
  totalIncome: number;
};


export async function getAllUsersAction() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        // Only allow admins
        if (!session?.user || session.user.role !== 'admin') {
            redirect("/")
        }

        return await db.select().from(user).orderBy(user.name);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createCategoryAction(formData: FormData) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        // Only allow admins
        if (!session?.user || session.user.role !== 'admin') {
            redirect("/")
        }

        const icon = formData.get('icon') as string;
        const name = formData.get('name') as string;

        const validatedSchema = categorySchema.parse({ icon, name })

        const existingCategory = await db
            .select()
            .from(category)
            .where(eq(category.name, validatedSchema.name))
            .limit(1)

        if (existingCategory.length > 0) {
            return {
                success: false,
                message: "the category already exists try Choose another"
            }
        }
        const insertedCategory = await db.insert(category).values({
            icon: icon,
            name: name,
        }).returning();

        revalidatePath("/admin/category")

        return {
            success: true,
            message: "successfully added new Category",
            category: insertedCategory[0]
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'failed to add the category'
        }
    }
}

export async function getAllCategoriesAction() {
    try {
        return await db.select().from(category).orderBy(category.name);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createMenuAction(formData: FormData) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || session.user.role !== 'admin') {
            redirect("/")
        }

        const validatedFields = menuSchema.parse({
            title: formData.get('title'),
            description: formData.get('description'),
            price: Number(formData.get('price')),
            categoryId: Number(formData.get('categoryId')),
            fileUrl: formData.get('fileUrl'),
            thumbnailUrl: formData.get('thumbnailUrl') || formData.get('fileUrl'),
        })

        await db.insert(menu).values({
            title: validatedFields.title,
            description: validatedFields.description,
            price: validatedFields.price,
            categoryId: validatedFields.categoryId,
            fileUrl: validatedFields.fileUrl,
            thumbnailUrl: validatedFields.thumbnailUrl
        })

        revalidatePath('/admin/menu')

        return {
            success: true,
            message: 'successfully add the menu'
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'faild to store the user assets'
        }
    }
}

export async function getMenuAction() {
    try {
        const menuItems = await db
            .select({
                id: menu.id,
                title: menu.title,
                description: menu.description,
                price: menu.price,
                fileUrl: menu.fileUrl,
                thumbnailUrl: menu.thumbnailUrl,
                categoryId: menu.categoryId,
                categoryName: category.name, // <-- get the category name
                createdAt: menu.createdAt,
                updatedAt: menu.updatedAt,
            })
            .from(menu)
            .leftJoin(category, eq(category.id, menu.categoryId))
            .orderBy(menu.createdAt);

        return menuItems;
    } catch (error) {
        return []
    }
}

export async function createStaffAction(formData: FormData) {
    try {
        // 1. Ensure only admin can create staff
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session?.user || session.user.role !== "admin") {
            redirect("/")
        }

        const file = formData.get("fileUrl") as File | null;

        if (!file) throw new Error("Please select a file");

        const validatedFields = staffSchema.parse({
            name: formData.get("name"),
            phone: formData.get("phone"),
            post: formData.get("post"),
            gender: formData.get("gender"),
            salary: formData.get("salary"),
            fileUrl: formData.get('fileUrl')
        });

        // 3. Insert into DB
        await db.insert(staff).values({
            name: validatedFields.name,
            phone: Number(validatedFields.phone),
            post: validatedFields.post,
            gender: validatedFields.gender,
            salary: Number(validatedFields.salary),
            fileUrl: validatedFields.fileUrl,
        })

        // 4. Refresh admin staff page
        revalidatePath("/admin/staff")

        return {
            success: true,
            message: "Staff successfully added ✅",
        }
    } catch (error) {
        console.error(error)

        return {
            success: false,
            message: "failed to add the staff data"
        }
    }
}

export async function getStaffAction() {

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || session.user.role !== 'admin') {
            redirect("/")
        }
        const menuItems = await db
            .select({
                id: staff.id,
                name: staff.name,
                phone: staff.phone,
                post: staff.post,
                gender: staff.gender,
                salary: staff.salary,
                fileUrl: staff.fileUrl,// <-- get the category name
            })
            .from(staff)

        return menuItems;
    } catch (error) {
        return []
    }
}

export async function getTopSoldMenuItems(): Promise<TopSoldMenuItem[]> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  try {
    const result = await db
      .select({
        title: menu.title,
        image: menu.fileUrl,
        totalSold: sql<number>`SUM(${orders.quantity})`,
      })
      .from(orders)
      .leftJoin(menu, eq(orders.menuId, menu.id))
      .where(and(
        gte(orders.createdAt, startOfMonth),
        eq(orders.status, "COMPLETED")
      ))
      .groupBy(menu.title, menu.fileUrl)
      .orderBy(desc(sql`SUM(${orders.quantity})`))
      .limit(5);

    return result;
  } catch (error) {
    console.error("getTopSoldMenuItems error:", error);
    return [];
  }
}

export async function getOrdersStatusSummary(): Promise<OrdersStatusSummary[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  try {
    const result = await db
      .select({
        status: sql<string>`UPPER(${orders.status})`.as("status"),
        count: sql<number>`COUNT(*)`,
        totalAmount: sql<number>`SUM(${orders.quantity} * ${orders.price})`,
      })
      .from(orders)
      .groupBy(orders.status);

    return result.map((row) => ({
      status: row.status,
      count: Number(row.count),
      totalAmount: Number(row.totalAmount),
    }));
  } catch (error) {
    console.error("getOrdersStatusSummary error:", error);
    return [];
  }
}


export async function getMenusByCategory(categoryId: number): Promise<MenuItem[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  try {
    if (isNaN(categoryId)) throw new Error("Invalid category ID");

    const result = await db
      .select()
      .from(menu)
      .where(eq(menu.categoryId, categoryId));

    return result as MenuItem[];
  } catch (error) {
    console.error("getMenusByCategory error:", error);
    return [];
  }
}

export async function getIncomeLast4Months(): Promise<MonthlyIncome[]> {
  const now = new Date();
  const fourMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  try {
    const result = await db
      .select({
        month: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        totalIncome: sql<number>`SUM(${orders.quantity} * ${orders.price})`,
      })
      .from(orders)
      .where(and(
        gte(orders.createdAt, fourMonthsAgo),
        eq(orders.status, "COMPLETED")
      ))
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`);

    return result;
  } catch (error) {
    console.error("getIncomeLast4Months error:", error);
    return [];
  }
}

export async function updateOrder(
  id: string,
  status: "COMPLETED" | "CANCELED" | 'PENDING'
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  try {
    await db
      .update(orders)
      .set({ status })
      .where(sql`${orders.id} = ${id}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update order: " + error,
    };
  }
}