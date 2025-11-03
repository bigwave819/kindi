"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: string | number;
  name: string;
  email: string;
  role: string | null;
};


export function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableCaption>List of all your employees</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Username</TableHead>
          <TableHead className="font-bold">Email</TableHead>
          <TableHead className="font-bold">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className={user.role === 'admin' ? 'px-3 py-1 bg-green-100 text-green-800 w-18 rounded-full' : 'px-3 py-1 bg-red-100 text-red-800 w-18 rounded-full justify-center items-center'}>{user.role}</div>
            </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No users found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
