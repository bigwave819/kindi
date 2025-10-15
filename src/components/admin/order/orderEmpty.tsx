import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
      <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-lg mb-2">You haven’t placed any orders yet.</p>
      <p className="text-sm mb-6">Start exploring and add items to your cart!</p>
      <Link href="/menu">
        <Button variant="outline">Go to Menu</Button>
      </Link>
    </div>
  );
}
