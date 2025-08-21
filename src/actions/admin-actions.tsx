'use server'
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { category, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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

export type categoryFormValues = z.infer<typeof categorySchema>

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


// Add this function to get categories
export async function getAllCategoriesAction() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || session.user.role !== 'admin') {
            redirect("/")
        }

        return await db.select().from(category).orderBy(category.name);
    } catch (error) {
        console.error(error);
        return [];
    }
}