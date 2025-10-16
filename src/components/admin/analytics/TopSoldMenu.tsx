'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TopSoldMenuItem } from '@/actions/admin-actions';

interface Props {
  data: TopSoldMenuItem[];
}

export default function TopSoldItemsChart({ data }: Props) {
  const cleanData = data.map(item => ({
    title: item.title || 'Unknown Item',
    image: item.image || '/placeholder-image.jpg',
    totalSold: item.totalSold
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Sold Menu Items (This Month)</CardTitle>
      </CardHeader>
      <CardContent>
        {cleanData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cleanData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="title" width={80} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [value, "Quantity Sold"]} />
              <Bar dataKey="totalSold" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Quantity Sold" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-8">No sales data available</div>
        )}
      </CardContent>
    </Card>
  );
}
