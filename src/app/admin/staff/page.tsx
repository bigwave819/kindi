import { getStaffAction } from "@/actions/admin-actions";
import EmployeeList from "@/components/admin/staff/EmployeeList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


async function StaffPage() {
    const staff = await getStaffAction()
    return (
        <div>
            <div className="flex w-full justify-between mb-7">
                <div>
                    <h1 className="font-bold text-3xl text-[#6F4E37]">Welcome to the staff Page</h1>
                    <p className="text-muted-foreground">Browse all your employees Right Here</p>
                </div>
                <div>
                    <Link href={`/admin/staff/create`}>
                        <Button className="cursor-pointer bg-[#6F4E37] hover:bg-[#312014]">Create The Staff</Button>
                    </Link>
                </div>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            ALL Employees
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <EmployeeList staff={staff} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default StaffPage;