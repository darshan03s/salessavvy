import CartItem from "./CartItem"
import type { CartResponseProductsType } from '@/types'

const CartItemsList = ({ productsList }: { productsList: CartResponseProductsType[] }) => {

    return (
        <div className="py-2 space-y-2">
            {productsList.map((product: CartResponseProductsType) => {
                return (
                    <CartItem key={product.product_id} cartItem={product} />
                )
            })}
        </div>
    )
}

export default CartItemsList
