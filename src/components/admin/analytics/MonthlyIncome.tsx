'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { MonthlyIncome } from '@/actions/admin-actions';

interface Props {
  data: MonthlyIncome[];
}

export default function MonthlyIncomeChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income (Last 4 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(value) => {
                  const date = new Date(value + '-01');
                  return date.toLocaleDateString('en-US', { month: 'short' });
                }} />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Income"]}
                  labelFormatter={(label) => {
                    const date = new Date(label + '-01');
                    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                  }}
                />
                <Line type="monotone" dataKey="totalIncome" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }} activeDot={{ r: 8, fill: "#059669" }} />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="text-center text-gray-500 py-8">No income data available</div>
        )}
      </CardContent>
    </Card>
  );
}
