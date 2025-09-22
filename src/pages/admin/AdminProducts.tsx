import ProductsList from "@/components/product/ProductsList";
import { Button } from "@/components/ui/button";
import type { CategoryType, ProductType } from "@/types";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productSchema } from "@/zodSchemas";
import { Label } from "@/components/ui/label";

type ProductData = z.infer<typeof productSchema>

const AdminProducts = () => {
    const [products, setProducts] = useState<ProductType[] | null>(null)
    const [categories, setCategories] = useState<CategoryType[] | null>(null)
    const productsApiUrl = import.meta.env.VITE_API_URL + "/admin/products"
    const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false)

    function getProducts() {
        try {
            axios.get(productsApiUrl + "/all", {
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
            axios.get(productsApiUrl + "/categories", {
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

    function handleAddProduct() {
        setIsAddingProduct(true)
    }

    const onSubmit = async (data: ProductData) => {
        console.log(data)
        try {
            axios.post(productsApiUrl, {
                name: data.name,
                description: data.description,
                stock: data.stock,
                price: data.price,
                imageUrl: data.image,
                category: data.category,
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }).then(res => {
                console.log(res)
                toast.success("Product Added")
                setIsAddingProduct(false)
                getProducts()
            })
        } catch (err) {
            console.log(err)
            toast.error("Could not add product")
            setIsAddingProduct(false)
        }
    }

    const AddProductModal = () => {
        const {
            register,
            handleSubmit,
            control,
            formState: { errors, isSubmitting },
        } = useForm<ProductData>({
            resolver: zodResolver(productSchema),
            mode: 'onSubmit',
            defaultValues: {
                category: "",
                description: "",
                image: "",
                name: "",
                price: 0,
                stock: 0
            }
        })
        return (
            <Dialog onOpenChange={setIsAddingProduct} open={isAddingProduct}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>Add name, description, price, stock, category</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="product-name" className="text-xs">Product Name</Label>
                            <Input
                                id="product-name"
                                type='text'
                                placeholder='Product Name'
                                className='w-full'
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="product-description" className="text-xs">Product Description</Label>
                            <Input
                                id="product-description"
                                type='text'
                                placeholder='Product Description'
                                className='w-full'
                                {...register('description')}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="product-image" className="text-xs">Product Image</Label>
                            <Input
                                id="product-image"
                                type='text'
                                placeholder='Product Image'
                                className='w-full'
                                {...register('image')}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">{errors.image.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="product-price" className="text-xs">Product Price</Label>
                            <Input
                                id="product-price"
                                type='number'
                                step={"0.01"}
                                placeholder='Product Price'
                                className='w-full'
                                {...register('price', {
                                    valueAsNumber: true,
                                    setValueAs: (value) => value === '' ? 0 : Number(value)
                                })}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">{errors.price.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="product-stock" className="text-xs">Product Stock</Label>
                            <Input
                                id="product-stock"
                                type='number'
                                placeholder='Product Stock'
                                className='w-full'
                                {...register('stock', {
                                    valueAsNumber: true,
                                    setValueAs: (value) => value === '' ? 0 : Number(value)
                                })}
                            />
                            {errors.stock && (
                                <p className="text-sm text-red-500">{errors.stock.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold">Product Category</span>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories!.map(c => (
                                                <SelectItem key={c.categoryId} value={c.categoryName}>
                                                    {c.categoryName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500">{errors.category.message}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting} className='disabled:opacity-50'>
                                {isSubmitting && (
                                    <span className='animate-spin rounded-full border-2 border-border border-t-transparent h-3 w-3'></span>
                                )}
                                {isSubmitting ? 'Adding...' : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    return (
        <>
            {isAddingProduct ? <AddProductModal /> : null}
            <div className="px-3">
                <div className="header flex items-center justify-between">
                    <h1 className="text-lg md:text-2xl font-bold">Products Management</h1>
                    <div className="actions">
                        <Button onClick={handleAddProduct} variant={"outline"} className="flex items-center gap-1" >
                            <Plus />
                            Add Product
                        </Button>
                    </div>
                </div>

                <div className="products">
                    {products && categories ? <ProductsList products={products} categories={categories} onUpdate={getProducts} /> : null}
                </div>
            </div>
        </>
    );
};

export default AdminProducts;