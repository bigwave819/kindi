import { BringToFront, Users, Utensils } from "lucide-react";

function DashboardPage() {
    const data = [
        {
            id: 1,
            title: 'Total Users',
            Icon: Users,
            total: 20
        },
        {
            id: 2,
            title: 'Total Orders',
            Icon: BringToFront,
            total: 30
        },
        {
            id: 3,
            title: 'Total Menu',
            Icon: Utensils,
            total: 9
        },
    ]
    
    return ( 
        <div className="w-full min-h-screen flex justify-center p-10">
            <div className="bg-amber-50 w-full p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item) => {
                        const Icon = item.Icon
                        return (
                            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between border-gray-200">
                                <div className="p-4 rounded-full bg-amber-50 w-20 h-20 flex justify-center items-center">
                                    <Icon size={34} className="text-primary"/>
                                </div>
                                <h1 className="font-bold text-primary text-xl mt-2">{item.title}</h1>
                                <h1 className="font-bold text-primary text-2xl mt-3">{item.total}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;