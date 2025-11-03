'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  completedOrdersCount: number;
  cancelledOrdersCount: number;
  completedRevenue: number;
}

export default function QuickStatsCard({
  completedOrdersCount,
  cancelledOrdersCount,
  completedRevenue,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">

          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <span>Completed Orders:</span>
            <span className="font-bold text-green-600">{completedOrdersCount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-red-50 rounded">
            <span>Cancelled Orders:</span>
            <span className="font-bold text-red-600">{cancelledOrdersCount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
            <span>Completed Orders Revenue:</span>
            <span className="font-bold text-blue-600">Frw {completedRevenue.toLocaleString()}</span>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
