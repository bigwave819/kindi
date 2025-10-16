import DashboardClient from "@/components/admin/dashboard/DashboardClient";

export default function DashboardPage() {
  // Hard-coded data for the charts
  const salesByCategory = [
    { category: "Drinks", totalSales: 120000 },
    { category: "Food", totalSales: 95000 },
    { category: "Desserts", totalSales: 70000 },
    { category: "Snacks", totalSales: 50000 },
  ];

  const ordersStatus = [
    { status: "COMPLETED", count: 45 },
    { status: "PENDING", count: 20 },
    { status: "CANCELED", count: 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard Overview
        </h1>
        <DashboardClient
          salesByCategory={salesByCategory}
          ordersStatus={ordersStatus}
        />
      </div>
    </div>
  );
}
