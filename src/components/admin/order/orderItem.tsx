import Image from "next/image";

export default function OrderItem({ item }: { item: any }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all">
      <div className="flex items-center gap-3">
        <Image
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
          className="rounded-md object-cover"
        />
        <div>
          <p className="font-medium text-gray-800">{item.name}</p>
          <p className="text-xs text-gray-500">
            {item.quantity} × {item.price.toLocaleString()} RWF
          </p>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-700">
        {(item.price * item.quantity).toLocaleString()} RWF
      </p>
    </div>
  );
}
