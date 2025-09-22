import { Pencil } from "lucide-react"
import { Button } from "../ui/button"
import { type CategoryType, type ProductType } from "../../types"
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
import { useEffect, useState } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { productSchema } from "@/zodSchemas"

type ProductData = z.infer<typeof productSchema>

const EditProductCard = ({ product, categories, onUpdate }: { product: ProductType, categories: CategoryType[], onUpdate: () => void }) => {
    const [isEditingProduct, setIsEditingProduct] = useState<boolean>(false)
    const [currentlyEditingProduct, setCurrentlyEditingProduct] = useState<ProductType | null>(null)
    const adminProductsApiUrl = import.meta.env.VITE_API_URL + "/admin/products"

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductData>({
        resolver: zodResolver(productSchema),
        mode: 'onSubmit',
    })

    useEffect(() => {
        if (currentlyEditingProduct) {
            reset({
                name: currentlyEditingProduct.name,
                description: currentlyEditingProduct.description,
                price: currentlyEditingProduct.price,
                stock: currentlyEditingProduct.stock,
                category: currentlyEditingProduct.category || "",
                image: currentlyEditingProduct.images[0]
            })
        }
    }, [currentlyEditingProduct, reset])

    function handleEditProduct(product: ProductType) {
        setIsEditingProduct(true)
        setCurrentlyEditingProduct(product)
    }

    const onSubmit = async (data: ProductData) => {
        const modifiedProduct = { id: currentlyEditingProduct?.product_id, ...data }
        console.log(modifiedProduct)

        try {
            axios.put(
                adminProductsApiUrl + `/${modifiedProduct.id}`,
                {
                    name: modifiedProduct.name,
                    description: modifiedProduct.description,
                    category: modifiedProduct.category,
                    image: modifiedProduct.image,
                    price: modifiedProduct.price,
                    stock: modifiedProduct.stock
                },
                {
                    withCredentials: true,
                }
            ).then(res => {
                console.log(res)
                setIsEditingProduct(false)
                setCurrentlyEditingProduct(null)
                onUpdate()
            })
        } catch (err) {
            console.error(err)
            toast.error("Could not update product")
            setIsEditingProduct(false)
            setCurrentlyEditingProduct(null)
        } finally {
            setIsEditingProduct(false)
            setCurrentlyEditingProduct(null)
        }
    }

    function handleDelete() {
        try {
            axios.delete(adminProductsApiUrl + `/${currentlyEditingProduct?.product_id}`, {
                withCredentials: true
            }).then(() => {
                toast.success("Deleted product")
                setIsEditingProduct(false)
                setCurrentlyEditingProduct(null)
                onUpdate()
            })
        } catch (err) {
            console.error(err)
            toast.error('Could not delete product')
            setIsEditingProduct(false)
            setCurrentlyEditingProduct(null)
        }
    }

    const EditProductModal = () => {
        return (
            <Dialog onOpenChange={setIsEditingProduct} open={isEditingProduct}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Edit name, description, price, stock, category</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <Input
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
                            <Input
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
                            <Input
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
                            <Input
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
                            <Input
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
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(c => (
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
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </Button>
                            <Button onClick={handleDelete} type="button" variant={"destructive"}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <>
            {isEditingProduct && <EditProductModal />}
            <div className="product-card border rounded-md border-border">
                <div className="product-image rounded-md rounded-b-none w-full h-[20rem]">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full p-4 rounded-md rounded-b-none" />
                </div>

                <div className="p-1.5 space-y-4">
                    <div className="product-info space-y-1">
                        <h3 className="product-name font-semibold text-lg line-clamp-1 cursor-pointer hover:underline">{product.name}</h3>
                        <p className="product-description text-sm text-accent-foreground/50 line-clamp-1">{product.description}</p>
                        <p className="product-price font-bold text-xl">&#8377; {product.price.toFixed(2)}</p>
                        <p className="product-stock text-sm text-accent-foreground/50">In stock: {product.stock}</p>
                    </div>

                    <Button
                        onClick={() => handleEditProduct(product)}
                        className="w-full">
                        <Pencil className="size-4" />
                        Edit Product
                    </Button>
                </div>
            </div>
        </>
    )
}

export default EditProductCard