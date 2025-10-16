'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  totalOrders: number;
  completedRevenue: number;
  totalItemsSold: number;
  monthlyGrowth: number;
}

export default function QuickStatsCard({ totalOrders, completedRevenue, totalItemsSold, monthlyGrowth }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
            <span>Total Orders:</span>
            <span className="font-bold text-blue-600">{totalOrders.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <span>Completed Orders Revenue:</span>
            <span className="font-bold text-green-600">${completedRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
            <span>Total Menu Items Sold:</span>
            <span className="font-bold text-purple-600">{totalItemsSold.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
            <span>Monthly Growth:</span>
            <span className={`font-bold ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {monthlyGrowth.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
