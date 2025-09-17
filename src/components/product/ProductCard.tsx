import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { type ProductType } from "../../types"
import axios from "axios"
import { useUserContext } from "@/context/UserContext"
import { toast } from "sonner"
import { useCartContext } from "@/context/CartContext"

const ProductCard = ({ product }: { product: ProductType }) => {
    const cartApiUrl = import.meta.env.VITE_API_URL + "/api/cart"
    const navigate = useNavigate()
    const { user } = useUserContext()
    const { setCartItemsCount } = useCartContext()

    const handleClick = () => {
        navigate(`/product/${product.product_id}`)
    }

    function updateCartItemsCount() {
        axios.get(cartApiUrl + "/items-count", {
            withCredentials: true
        }).then((res) => {
            setCartItemsCount(res.data)
        })
    }

    async function handleAddToCart(product_id: number) {
        const response = await axios.post(
            cartApiUrl + "/add",
            { productId: product_id, username: user?.username, quantity: 1 },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            },
        );
        if (response.status === 201) {
            toast.success("Added product to cart")
            updateCartItemsCount()
        } else {
            toast.error("Failed to add product to cart")
        }
    }

    return (
        <div className="product-card border rounded-md border-border">
            <div className="product-image rounded-md rounded-b-none w-full h-[20rem]">
                <img src={product.images[0]} alt={product.name} className="w-full h-full p-4 rounded-md rounded-b-none" />
            </div>

            <div className="p-1.5 space-y-4">
                <div className="product-info space-y-1">
                    <h3 onClick={handleClick} className="product-name font-semibold text-lg line-clamp-1 cursor-pointer hover:underline">{product.name}</h3>
                    <p className="product-description text-sm text-accent-foreground/50 line-clamp-1">{product.description}</p>
                    <p className="product-price font-bold text-xl">&#8377; {product.price.toFixed(2)}</p>
                    <p className="product-stock text-sm text-accent-foreground/50">In stock: {product.stock}</p>
                </div>

                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product.product_id)
                    }}
                    className="w-full">
                    <ShoppingCart className="size-4" />
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductCard
