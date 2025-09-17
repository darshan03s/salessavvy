import type { CartResponseProductsType } from "@/types"
import { Trash } from "lucide-react"

const Quantity = ({ quantity }: { quantity: number }) => {
    return (
        <span className="text-sm text-muted-foreground flex gap-3 items-center">
            Quantity:
            <button className="font-bold w-6 h-6 bg-secondary text-secondary-foreground rounded-[100%] text-center">+</button>
            {quantity}
            <button className="font-bold w-6 h-6 bg-secondary text-secondary-foreground rounded-[100%] text-center">-</button>
        </span>
    )
}

const CartItem = ({ cartItem }: { cartItem: CartResponseProductsType }) => {
    return (
        <div className="cart-item flex items-center justify-between border-b border-border last:border-0 pb-1">
            <div className="flex items-center gap-4">
                <div className="cart-product-image w-20 h-auto">
                    <img src={`https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/z/e/r/4xl-c301-d-teal-dennis-lingo-original-imah3mzazgyqbgn8.jpeg?q=70`} />
                </div>

                <div className="cart-product-details p-2 flex flex-col">
                    <h3 className="text-lg font-semibold line-clamp-1">{cartItem.name}</h3>
                    <span className="text-sm text-muted-foreground line-clamp-1">{cartItem.description}</span>
                    <span className="text-md font-semibold">&#8377; {cartItem.price_per_unit}</span>
                    <div className="flex items-center gap-4">
                        <Quantity quantity={cartItem.quantity} />
                        <button className="rounded-full size-4 text-red-600">
                            <Trash className="h-full w-full" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
