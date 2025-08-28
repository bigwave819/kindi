import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2  } from "lucide-react";

// components/admin/category/category-list.tsx
type CategoryType = {
    id: number;
    icon: string;
    name: string;
    createdAt: Date;
}

interface CategoryListProps {
    categories: CategoryType[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Icon</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    categories.map((c) => 
                        <TableRow key={c.id}>
                            <TableCell>{c.icon}</TableCell>
                            <TableCell>{c.name}</TableCell>
                            <TableCell className="inline-flex space-x-4"><span><Trash2 className="text-red-700" /></span> </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}