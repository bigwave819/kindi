'use client'

import { useEffect, useState } from 'react';
import { getTopSoldMenuItems, getOrdersStatusSummary, getIncomeLast4Months } from '@/actions/admin-actions';
import type { TopSoldMenuItem, OrdersStatusSummary, MonthlyIncome } from '@/actions/admin-actions';

import TopSoldItemsChart from '@/components/admin/analytics/TopSoldMenu';
import MonthlyIncomeChart from '@/components/admin/analytics/MonthlyIncome';
import OrderStatusSummary from '@/components/admin/analytics/OrdersStatus';
import QuickStatsCard from '@/components/admin/analytics/QuickStarts';

export default function AnalyticsPage() {
  const [topSoldItems, setTopSoldItems] = useState<TopSoldMenuItem[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrdersStatusSummary[]>([]);
  const [monthlyIncomeData, setMonthlyIncomeData] = useState<MonthlyIncome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [topSold, statusSummary, incomeData] = await Promise.all([
          getTopSoldMenuItems(),
          getOrdersStatusSummary(),
          getIncomeLast4Months()
        ]);

        setTopSoldItems(topSold || []);
        setOrderStatusData(statusSummary || []);
        setMonthlyIncomeData(incomeData || []);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading analytics data...</div>;

  const totalOrders = orderStatusData.reduce((sum, item) => sum + item.count, 0);
  const completedRevenue = orderStatusData.filter(item => item.status === 'COMPLETED')
    .reduce((sum, item) => sum + item.totalAmount, 0);
  const totalItemsSold = topSoldItems.reduce((sum, item) => sum + item.totalSold, 0);
  const monthlyGrowth = monthlyIncomeData.length >= 2
    ? ((monthlyIncomeData[monthlyIncomeData.length - 1].totalIncome
        - monthlyIncomeData[monthlyIncomeData.length - 2].totalIncome)
        / monthlyIncomeData[monthlyIncomeData.length - 2].totalIncome) * 100
    : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Restaurant Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSoldItemsChart data={topSoldItems} />
        <MonthlyIncomeChart data={monthlyIncomeData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderStatusSummary data={orderStatusData} />
        <QuickStatsCard
          totalOrders={totalOrders}
          completedRevenue={completedRevenue}
          totalItemsSold={totalItemsSold}
          monthlyGrowth={monthlyGrowth}
        />
      </div>
    </div>
  );
}
