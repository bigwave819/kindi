// components/admin/category/category-add-form.tsx
'use client'

import { useState } from "react";
import EmojiPicker from "./imojiPicker";
import { EmojiClickData } from "emoji-picker-react";
import { createCategoryAction } from "@/actions/admin-actions";

type CategoryType = {
    id: number;
    icon: string;
    name: string;
    createdAt: Date;
}

interface CategoryManagerProps {
    categories: CategoryType[];
}

function CategoryAddForm({ categories: initialCategories }: CategoryManagerProps) {
    const [categories, setCategories] = useState<CategoryType[]>(initialCategories);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('📁');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleEmojiSelect = (emojiData: EmojiClickData) => {
        setSelectedEmoji(emojiData.emoji);
        setError(null);
    };

    const handleAddNewCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (!newCategoryName.trim()) {
            setError("Please enter a category name.");
            return;
        }

        if (!selectedEmoji) {
            setError("Please select an emoji.");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', newCategoryName.trim());
            formData.append('icon', selectedEmoji);

            const result = await createCategoryAction(formData);

            if (result.success) {
                setSuccess(result.message);
                setNewCategoryName('');
                setSelectedEmoji('📁');
                
                // Refresh the categories list
                if (result.category) {
                    setCategories([...categories, result.category as CategoryType]);
                }
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error("Failed to add category:", error);
            setError("Failed to add category. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleAddNewCategory} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Category Name</label>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => {
                            setNewCategoryName(e.target.value);
                            setError(null);
                        }}
                        placeholder="Enter category name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Select Emoji</label>
                    <div className="mb-2 text-2xl">{selectedEmoji}</div>
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-md">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !newCategoryName.trim() || !selectedEmoji}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Adding...' : 'Add Category'}
                </button>
            </form>
        </div>
    );
}

export default CategoryAddForm;