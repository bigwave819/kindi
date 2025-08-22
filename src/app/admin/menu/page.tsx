import MenuUpload from "@/components/admin/menu/create-menu";


function MenuPage() {
    return ( 
        <div className="w-full flex min-h-[80vh] justify-center px-20 py-5">
            <div className="flex justify-between w-full">
                <h1>All Menu</h1>
                <MenuUpload />
            </div>
        </div>
     );
}

export default MenuPage;