import { getAllCategoriesAction, getMenuAction } from "@/actions/admin-actions";
import MenuUpload from "@/components/admin/menu/create-menu";
import MenuGrid from "@/components/admin/menu/menu-grid";


async function MenuPage() {

    const [categories, menu] = await Promise.all([
        getAllCategoriesAction(),
        getMenuAction()
    ])
    return ( 
        <div className="container py-6">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">All Menu</h1>
                    <p className="text-muted-foreground">Here is All Your Menu You Have Uploaded</p>
                </div>
                <MenuUpload categories={categories} />
            </div>
            <MenuGrid menu={ menu || []} />
        </div>
     );
}

export default MenuPage;