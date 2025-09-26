import { useUserContext } from "@/context/UserContext"
import type { CartResponseProductsType } from "@/types"
import axios from "axios"
import { Trash } from "lucide-react"
import { toast } from "sonner"

const Quantity = ({ quantity, product_id, onUpdateCart }: { quantity: number, product_id: number, onUpdateCart: () => void }) => {
    const cartApiUrl = import.meta.env.VITE_API_URL + "/api/cart"
    const { user } = useUserContext()

    async function updateProductQuantity(product_id: number, op: string) {
        try {
            await axios.put(
                cartApiUrl + "/update",
                { productId: product_id, username: user?.username, quantity: op === '+' ? 1 : -1 },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                },
            );

            onUpdateCart()
        } catch (err) {
            toast.error("Unable to update quantity")
            console.error(err)
        }

    }

    return (
        <span className="text-sm text-muted-foreground flex gap-3 items-center">
            Quantity:
            <button
                onClick={() => updateProductQuantity(product_id, '+')}
                className="font-bold w-6 h-6 bg-secondary text-secondary-foreground rounded-[100%] text-center">
                +
            </button>
            {quantity}
            <button
                onClick={() => updateProductQuantity(product_id, '-')}
                className="font-bold w-6 h-6 bg-secondary text-secondary-foreground rounded-[100%] text-center">
                -
            </button>
        </span>
    )
}

const CartItem = ({ cartItem, onUpdateCart }: { cartItem: CartResponseProductsType, onUpdateCart: () => void }) => {
    const cartApiUrl = import.meta.env.VITE_API_URL + "/api/cart"
    const { user } = useUserContext()

    async function deleteCartItem(product_id: number) {
        try {
            await axios.delete(cartApiUrl + "/delete", {
                data: {
                    productId: product_id,
                    username: user?.username
                },
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            toast.success("Deleted successfully");
        } catch (err) {
            toast.error("Unable to delete cart item")
            console.error("Delete failed:", err);
        }

        onUpdateCart()
    }

    return (
        <div className="cart-item flex items-center justify-between border-b border-border last:border-0 pb-1">
            <div className="flex items-center gap-4">
                <div className="cart-product-image w-20 h-auto">
                    <img src={`${cartItem.image_url}`} className="rounded-sm" />
                </div>

                <div className="cart-product-details p-2 flex flex-col">
                    <h3 className="text-lg font-semibold line-clamp-1">{cartItem.name}</h3>
                    <span className="text-sm text-muted-foreground line-clamp-1">{cartItem.description}</span>
                    <span className="text-md font-semibold">&#8377; {cartItem.price_per_unit}</span>
                    <span className="text-xs font-semibold">Total : &#8377; {cartItem.total_price}</span>
                    <div className="flex items-center gap-4">
                        <Quantity quantity={cartItem.quantity} product_id={cartItem.product_id} onUpdateCart={onUpdateCart} />
                        <button className="rounded-full size-4 text-red-600">
                            <Trash
                                onClick={() => deleteCartItem(cartItem.product_id)}
                                className="h-full w-full" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
