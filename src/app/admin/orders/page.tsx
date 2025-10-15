// app/user/orders/page.tsx
import { fetchOrders } from "@/actions/user-actions";
import OrderCard from "@/components/admin/order/orderCard";

export default async function OrdersPage() {
  const { success, orders, message } = await fetchOrders();

  if (!success) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        {message}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        No orders found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
