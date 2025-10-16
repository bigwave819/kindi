"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import OrderStatusBadge from "./orderStatusBadge";
import OrderItem from "./orderItem";
import { updateOrder } from "@/actions/admin-actions";

type OrderStatus = "COMPLETED" | "CANCELED" | 'PENDING';

interface OrderItemType {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface OrderType {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItemType[];
  address: string;
  total: number;
}

interface OrderCardProps {
  order: OrderType;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (newStatus: OrderStatus) => {
    if (status === newStatus) return; // no change
    setIsUpdating(true);

    try {
      const result = await updateOrder(order.id, newStatus);
      if (result.success) {
        setStatus(newStatus);
      } else {
        alert(result.message || "Failed to update order");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating order");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-200">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-3">
        <div>
          <p className="text-xs text-gray-400">
            Placed on: {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <OrderStatusBadge status={status} />
      </CardHeader>

      <CardContent className="space-y-3 py-4">
        <div className="space-y-3">
          {order.items.map((item) => (
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

        <div className="space-y-2">
          {
            order.status === 'COMPLETED' ? (
              <>

                <button
                  className="w-full bg-yellow-100 cursor-pointer py-1 text-amber-500 hover:bg-yellow-200 uppercase rounded-lg disabled:opacity-50"
                  onClick={() => handleUpdate("PENDING")}
                  disabled={status === "PENDING" || isUpdating}
                >
                  PENDING
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full bg-green-600 cursor-pointer py-1 text-white hover:bg-green-700 uppercase rounded-lg disabled:opacity-50"
                  onClick={() => handleUpdate("COMPLETED")}
                  disabled={status === "COMPLETED" || isUpdating}
                >
                  Completed
                </button>
                <button
                  className="w-full bg-red-600 cursor-pointer py-1 text-white hover:bg-red-700 uppercase rounded-lg disabled:opacity-50"
                  onClick={() => handleUpdate("CANCELED")}
                  disabled={status === "CANCELED" || isUpdating}
                >
                  CANCELED
                </button>
              </>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}
