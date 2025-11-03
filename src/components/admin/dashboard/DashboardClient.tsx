"use client";

import { BringToFront, Users, Utensils } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  PieLabelRenderProps,
} from "recharts";

interface DashboardClientProps {
  salesByCategory: { category: string; totalSales: number }[];
  ordersStatus: { status: string; count: number }[];
  summaryData: {
    totalUsers: number;
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalMenu: number;
  };
}

export default function DashboardClient({
  salesByCategory,
  ordersStatus,
  summaryData,
}: DashboardClientProps) {
  const data = [
    { id: 1, title: "Total Users", Icon: Users, total: summaryData.totalUsers },
    { id: 2, title: "Total Orders", Icon: BringToFront, total: summaryData.totalOrders },
    { id: 3, title: "Completed Orders", Icon: BringToFront, total: summaryData.completedOrders },
    { id: 4, title: "Cancelled Orders", Icon: BringToFront, total: summaryData.cancelledOrders },
    { id: 5, title: "Total Menu", Icon: Utensils, total: summaryData.totalMenu },
  ];

  const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444"];

  // Typed Pie label to fix TypeScript unknown percent
  const renderPieLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, percent, name } = props;
    const percentValue = typeof percent === "number" ? percent : 0;

    return (
      <text
        x={cx}
        y={cy}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${name}: ${(percentValue * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => {
          const Icon = item.Icon;
          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-full">
                  <Icon size={26} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800">{item.total.toLocaleString()}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Sales by Category */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Sales by Category</h2>
          {salesByCategory.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={salesByCategory}
                  dataKey="totalSales"
                  nameKey="category"
                  outerRadius={110}
                  label={renderPieLabel}
                >
                  {salesByCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} RWF`, "Sales"]}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart - Orders Status Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Orders Status Summary</h2>
          {ordersStatus.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={ordersStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="status"
                  tick={{ fill: "#6b7280" }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip
                  formatter={(value: number) => [`${value} orders`, "Count"]}
                  labelFormatter={(label) => `Status: ${label}`}
                />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
