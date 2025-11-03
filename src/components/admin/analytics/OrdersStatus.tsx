"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { OrdersStatusSummary } from "@/actions/admin-actions";

interface Props {
  data: OrdersStatusSummary[];
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#10b981",
  PENDING: "#f59e0b",
  CANCELLED: "#ef4444",
  CANCELED: "#ef4444",
  PREPARING: "#3b82f6",
};

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function OrderStatusSummary({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orders Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            No order status data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalCompletedRevenue = data
    .filter((item) => item.status === "COMPLETED")
    .reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Status Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* ✅ Pie Chart */}
          <div className="w-full lg:w-1/2 h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  dataKey="count"
                  label={CustomLabel}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.status] || "#6b7280"}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value} orders`, "Orders"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ Completed Revenue Only */}
          <div className="lg:w-1/2 lg:pl-4 mt-4 lg:mt-0">
            <h4 className="font-semibold mb-3">Revenue by Status</h4>
            {data.map((status) => (
              <div key={status.status} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: STATUS_COLORS[status.status] || "#6b7280" }}
                  />
                  <span className="text-sm capitalize">{status.status.toLowerCase()}</span>
                </div>
                <span className="font-semibold">
                  {status.totalAmount.toLocaleString()} Frw
                </span>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center font-bold">
                <span>Total Revenue (Completed):</span>
                <span className="text-green-600">
                  {totalCompletedRevenue} Frw
                </span>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
