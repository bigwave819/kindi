// app/admin/dashboard/page.tsx
import DashboardClient from "@/components/admin/dashboard/DashboardClient";
import { db } from "@/lib/db";
import { user, orders, menu, category } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  // Check authentication and authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  try {
    // ===== Fetch total counts =====
    const [totalUsersResult, totalOrdersResult, completedOrdersResult, cancelledOrdersResult, totalMenuResult] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(user),
      db.select({ count: sql<number>`count(*)` }).from(orders),
      db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, "COMPLETED")),
      db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, "CANCELLED")),
      db.select({ count: sql<number>`count(*)` }).from(menu),
    ]);

    const totalUsers = Number(totalUsersResult[0]?.count || 0);
    const totalOrders = Number(totalOrdersResult[0]?.count || 0);
    const completedOrders = Number(completedOrdersResult[0]?.count || 0);
    const cancelledOrders = Number(cancelledOrdersResult[0]?.count || 0);
    const totalMenu = Number(totalMenuResult[0]?.count || 0);

    // ===== Fetch sales by category =====
    const salesResult = await db
      .select({
        category: category.name,
        totalSales: sql<number>`sum(${orders.quantity} * ${orders.price})`,
      })
      .from(orders)
      .leftJoin(menu, eq(menu.id, orders.menuId))
      .leftJoin(category, eq(category.id, menu.categoryId))
      .groupBy(category.name);

    const salesByCategory = salesResult.map((row) => ({
      category: row.category || "Uncategorized",
      totalSales: Number(row.totalSales || 0),
    }));

    // ===== Fetch orders status =====
    const ordersStatusResult = await db
      .select({
        status: orders.status,
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .groupBy(orders.status);

    const ordersStatus = ordersStatusResult.map((row) => ({
      status: row.status.toUpperCase(),
      count: Number(row.count || 0),
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Dashboard Overview
          </h1>

          <DashboardClient
            salesByCategory={salesByCategory}
            ordersStatus={ordersStatus}
            summaryData={{
              totalUsers,
              totalOrders,
              completedOrders,
              cancelledOrders,
              totalMenu,
            }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    
    // Return error state
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Dashboard Overview
          </h1>
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-red-600 text-lg mb-4">
              Failed to load dashboard data
            </p>
            <p className="text-gray-600">
              Please try refreshing the page or contact support if the problem persists.
            </p>
          </div>
        </div>
      </div>
    );
  }
}