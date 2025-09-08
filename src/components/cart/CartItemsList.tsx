import { cartItem } from "@/data"
import CartItem from "./CartItem"

const CartItemsList = () => {

    return (
        <div className="py-2 space-y-2">
            {[...Array(3)].map((_, index) => {
                return (
                    <CartItem key={index} cartItem={cartItem} />
                )
            })}
        </div>
    )
}

export default CartItemsList
