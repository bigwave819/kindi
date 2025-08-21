// app/admin/category/page.tsx
import { createCategoryAction, getAllCategoriesAction } from "@/actions/admin-actions";
import CategoryAddForm from "@/components/admin/category/category-add-form";
import CategoryList from "@/components/admin/category/category-list";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

async function CategoryPage() {
    const categories = await getAllCategoriesAction(); // Fixed function call

    return (
        <div className="space-y-10">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CategoryAddForm categories={categories} />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>All Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CategoryList categories={categories} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default CategoryPage;