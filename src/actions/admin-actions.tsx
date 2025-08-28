'use server'
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { category, menu, staff, user } from "@/lib/db/schema";
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
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || session.user.role !== 'admin') {
            redirect("/")
        }
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