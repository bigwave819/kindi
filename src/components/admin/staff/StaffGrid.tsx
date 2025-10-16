import StaffCard from "./StaffCard";

type StaffItem = {
  id: string;
  name: string;
  phone: number;
  post: string;
  salary: number;
  gender: string;
  fileUrl: string;
};

interface StaffGridProps {
  staff: StaffItem[];
}

export default function StaffGrid({ staff }: StaffGridProps) {
  if (!staff || staff.length === 0)
    return <p className="text-gray-500 text-center">No staff found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {staff.map((member) => (
        <StaffCard key={member.id} staff={member} />
      ))}
    </div>
  );
}
