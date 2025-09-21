import ProductsList from "@/components/product/ProductsList";
import { Button } from "@/components/ui/button";
import type { CategoryType, ProductType } from "@/types";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminProducts = () => {
    const [products, setProducts] = useState<ProductType[] | null>(null)
    const [categories, setCategories] = useState<CategoryType[] | null>(null)
    const apiUrl = import.meta.env.VITE_API_URL

    function getProducts() {
        try {
            axios.get(apiUrl + "/admin/products/all", {
                withCredentials: true
            }).then(res => {
                console.log(res)
                setProducts(res.data)
            })
        } catch (err) {
            console.error(err)
            toast.error("Could not fetch products")
        }
    }

    function getCategories() {
        try {
            axios.get(apiUrl + "/admin/products/categories", {
                withCredentials: true
            }).then(res => {
                console.log(res)
                setCategories(res.data)
            })
        } catch (err) {
            console.error(err)
            toast.error("Could not fetch products")
        }
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    return (
        <div className="px-3">
            <div className="header flex items-center justify-between">
                <h1 className="text-2xl font-bold">Products Management</h1>
                <div className="actions">
                    <Button variant={"outline"} className="flex items-center gap-1" >
                        <Plus />
                        Add Product
                    </Button>
                </div>
            </div>

            <div className="products">
                {products && categories ? <ProductsList products={products} categories={categories} onUpdate={getProducts} /> : null}
            </div>
        </div>
    );
};

export default AdminProducts;