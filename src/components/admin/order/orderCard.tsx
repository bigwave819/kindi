import { Card, CardContent, CardHeader } from "@/components/ui/card";
import OrderStatusBadge from "./orderStatusBadge";
import OrderItem from "./orderItem";

export default function OrderCard({ order }: { order: any }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-200">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-3">
        <div>
          <p className="text-xs text-gray-400">
            Placed on: {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>

      <CardContent className="space-y-3 py-4">
        <div className="space-y-3">
          {order.items.map((item: any) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>

        <div className="border-t pt-3 flex justify-between items-center text-sm text-gray-600">
          <p>Delivery Address:</p>
          <p className="text-right">{order.address}</p>
        </div>

        <div className="flex justify-between items-center pt-3 font-semibold">
          <p>Total:</p>
          <p className="text-amber-600">{order.total.toLocaleString()} RWF</p>
        </div>
      </CardContent>
    </Card>
  );
}
