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
        <div className="space-y-2">
            {categories.map((category) => (
                <div key={category.id} className="flex items-center gap-3 p-3 border rounded-md">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                </div>
            ))}
        </div>
    );
}