import CartItemsList from "@/components/cart/CartItemsList"
import { Button } from "@/components/ui/button"

const Cart = () => {
    return (
        <div className="cart-page max-w-6xl mx-auto px-2 py-2 grid grid-cols-3 gap-16">
            <section className="cart-items col-span-3 md:col-span-2 p-2">
                <h2 className="text-xl font-bold text-center border-b pb-1 border-border">Your Cart</h2>
                <CartItemsList />
            </section>

            <section className="cart-summary col-span-3 md:col-span-1 p-2">
                <h2 className="text-xl font-bold text-center border-b pb-1 border-border">Cart Summary</h2>
                <div className="py-2 space-y-4">
                    <p className="text-lg font-semibold">Total Products: 3</p>
                    <p className="text-lg font-semibold">Total Amount: $99</p>
                    <Button className="w-full">Proceed to Payment</Button>
                </div>
            </section>
        </div>
    )
}

export default Cart
