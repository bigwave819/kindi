import { Badge } from "@/components/ui/badge";

export default function OrderStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
    CANCELED: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <Badge className={`${colors[status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {status}
    </Badge>
  );
}
