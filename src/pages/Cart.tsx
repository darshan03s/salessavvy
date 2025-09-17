import CartItemsList from "@/components/cart/CartItemsList"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/UserContext"
import type { CartResponseType } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Cart = () => {
    const { user } = useUserContext()
    const navigate = useNavigate()
    const cartApiUrl = import.meta.env.VITE_API_URL + "/api/cart"
    const [cart, setCart] = useState<CartResponseType>()

    useEffect(() => {
        if (!user) {
            navigate("/auth/login")
            return
        }

        if (cart) return
        axios.get(cartApiUrl + "/items", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then((res) => {
            console.log(res)
            setCart(res.data.cart)
        }
        ).catch(() => {
            toast.error("Could not fetch cart items")
        })

    }, [user])

    if (!cart) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="cart-page max-w-6xl mx-auto px-2 py-2 grid grid-cols-3 gap-16">
            <section className="cart-items col-span-3 md:col-span-2 p-2">
                <h2 className="text-xl font-bold text-center border-b pb-1 border-border">Your Cart</h2>
                <CartItemsList productsList={cart.products} />
            </section>

            <section className="cart-summary col-span-3 md:col-span-1 p-2">
                <h2 className="text-xl font-bold text-center border-b pb-1 border-border">Cart Summary</h2>
                <div className="py-2 space-y-4">
                    <p className="text-lg font-semibold">Total Products: {cart.products.length}</p>
                    <p className="text-lg font-semibold">Total Amount: &#8377;{cart.overall_total_price}</p>
                    <Button className="w-full">Proceed to Payment</Button>
                </div>
            </section>
        </div>
    )
}

export default Cart
