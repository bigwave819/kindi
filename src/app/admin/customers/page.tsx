// app/admin/customers/page.tsx
import { getAllUsersAction } from "@/actions/admin-actions";
import { UsersTable } from "@/components/admin/user/user-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CustomersPage() {
  const users = await getAllUsersAction();

  return (
    <div className="w-full min-h-screen p-6 justify-end">
      <Card className="w-full h-full shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">All Users</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}