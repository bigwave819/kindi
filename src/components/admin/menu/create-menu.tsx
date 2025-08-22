'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormState } from "react-hook-form";


type FormState = {
        title: string;
        description: string;
        price: number;
        categoryId: string;
        file: file || null
}





function MenuUpload() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ formState, setFormState ] = useState<FormState>({
        title: '',
        description: '',
        price: 0,
        categoryId: '',
        file: null
    })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#6F4E37] hover:bg-[#4b3525] cursor-pointer">Add the Menu <span><Plus /></span></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload The new Menu</DialogTitle>
                    <form className="space-y-3">
                        <div className="space-y-3">
                            <Label>title</Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Title"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="descrition"
                                placeholder="Description"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label>Price</Label>
                            <Input
                                type="text"
                                name="price"
                                placeholder="Price"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label>Category</Label>
                            <Input
                                type="text"
                                name="category"
                                placeholder="Category"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label>File</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                name="title"
                                placeholder="Title"
                            />
                        </div>
                        <Button className="w-full text-center bg-[#6F4E37] hover:bg-[#4b3525] cursor-pointer">
                            { loading ? 'Adding The Menu....' : 'Add The Button' }
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default MenuUpload;