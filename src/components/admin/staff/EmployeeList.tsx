import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import Image from "next/image"

type StaffItem = {
  id: string;
  name: string;
  phone: number ;
  post: string;      // corrected from number to string
  salary: number;
  gender: string;
  fileUrl: string;
};

interface StaffProps {
  staff: StaffItem[];
}

function EmployeeList({ staff } : StaffProps) {
    return ( 
        <Table>
            <TableCaption>List of All Staff</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Salary</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {staff.map((s) => 
                    <TableRow key={s.id}>
                        <TableCell>
                            <div className="w-7 h-7 rounded-full relative">
                                <Image 
                                    src={s.fileUrl} 
                                    alt={s.name}
                                    fill
                                    unoptimized
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </TableCell>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.phone}</TableCell>
                        <TableCell>{s.post}</TableCell>
                        <TableCell>{s.gender}</TableCell>
                        <TableCell>{s.salary}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
     );
}

export default EmployeeList;
