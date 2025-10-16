"use client";

import Image from "next/image";
import { User2 } from "lucide-react";

type StaffItem = {
  id: string;
  name: string;
  phone: number;
  post: string;
  salary: number;
  gender: string;
  fileUrl: string;
};

interface StaffCardProps {
  staff: StaffItem;
}

export default function StaffCard({ staff }: StaffCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-4 flex flex-col items-center text-center border border-amber-100">
      <div className="w-56 h-56 rounded-full relative overflow-hidden mb-3">
        {staff.fileUrl ? (
          <Image
            src={staff.fileUrl}
            alt={staff.name}
            fill
            unoptimized
            className="object-cover rounded-full"
          />
        ) : (
          <User2 className="w-56 h-56 text-amber-600" />
        )}
      </div>
      <h3 className="text-lg font-bold text-amber-800">{staff.name}</h3>
      <p className="text-sm text-gray-500">{staff.post}</p>
      <p className="text-sm text-gray-500">{staff.gender}</p>
      <p className="text-sm text-gray-500">Phone: {staff.phone}</p>
      <p className="text-sm font-semibold text-amber-600">Salary: {staff.salary.toLocaleString()} RWF</p>
    </div>
  );
}
