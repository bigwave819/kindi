"use client";

import { useState, useEffect, useMemo } from "react";
import { getStaffAction } from "@/actions/admin-actions";
import StaffGrid from "@/components/admin/staff/StaffGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StaffItem {
  id: string;
  name: string;
  phone: number;
  post: string;
  salary: number;
  gender: string;
  fileUrl: string;
}

export default function StaffPage() {
  const [staffData, setStaffData] = useState<StaffItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch staff on mount
  useEffect(() => {
    async function fetchStaff() {
      const data = await getStaffAction();
      setStaffData(data || []);
      setLoading(false);
    }
    fetchStaff();
  }, []);

  // Filter staff based on search input
  const filteredStaff = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return staffData.filter(
      (staff) =>
        staff.name.toLowerCase().includes(lowerSearch) ||
        staff.post.toLowerCase().includes(lowerSearch) ||
        staff.phone.toString().includes(lowerSearch)
    );
  }, [search, staffData]);

  if (loading) return <p className="text-gray-500 text-center mt-20">Loading staff...</p>;

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row w-full justify-between mb-8 items-start md:items-center">
        <div>
          <h1 className="font-extrabold text-4xl text-[#6F4E37]">Welcome to the Staff Page</h1>
          <p className="text-gray-500 mt-2">Browse all your employees right here</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/admin/staff/create`}>
            <Button className="bg-[#6F4E37] hover:bg-[#312014] text-white">Create Staff</Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, post or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-amber-800 mb-4">All Employees</h2>
        {filteredStaff.length > 0 ? (
          <StaffGrid staff={filteredStaff} />
        ) : (
          <p className="text-gray-500 text-center">No staff found.</p>
        )}
      </div>
    </div>
  );
}
