import CartItemsList from "@/components/cart/CartItemsList"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/context/CartContext"
import { useUserContext } from "@/context/UserContext"
import type { CartResponseType } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Cart = () => {
    const { user } = useUserContext()
    const { getCartItemsCount } = useCartContext()
    const navigate = useNavigate()
    const cartApiUrl = import.meta.env.VITE_API_URL + "/api/cart"
    const paymentApiUrl = import.meta.env.VITE_API_URL + "/api/payment"
    const [cart, setCart] = useState<CartResponseType>()

    function getCartItems() {
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
    }

    function onUpdateCart() {
        getCartItems()
        getCartItemsCount()
    }

    useEffect(() => {
        if (!user) {
            navigate("/auth/login")
            return
        }

        if (cart) return
        getCartItems()

    }, [user])

    if (!cart) {
        return <h1>Loading...</h1>
    }

    const handleCheckout = async () => {
        try {
            const requestBody = {
                totalAmount: cart.overall_total_price,
                cartItems: cart.products.map((item) => ({
                    productId: item.product_id,
                    quantity: item.quantity,
                    price: item.price_per_unit,
                })),
            };

            // Create Razorpay order via backend
            const response = await fetch(paymentApiUrl + "/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(await response.text());
            const razorpayOrderId = await response.text();

            const options = {
                key: import.meta.env.VITE_RZP_KEY_ID,
                amount: cart.overall_total_price * 100, // Razorpay expects amount in paise
                currency: "INR",
                name: "SalesSavvy",
                description: "Test Transaction",
                order_id: razorpayOrderId,
                //@ts-expect-error response
                handler: async function (response) {
                    try {
                        const verifyResponse = await fetch(paymentApiUrl + "/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify({
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                            }),
                        });
                        const result = await verifyResponse.text();
                        if (verifyResponse.ok) {
                            toast.success("Payment verified successfully!");
                            navigate("/");
                            getCartItemsCount()
                        } else {
                            alert("Payment verification failed: " + result);
                        }
                    } catch (error) {
                        console.error("Error verifying payment:", error);
                        alert("Payment verification failed. Please try again.");
                    }
                },
                prefill: {
                    name: user?.username,
                    email: "usermail@email.com",
                    contact: "9988776655",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error("Payment failed. Please try again.");
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div className="cart-page max-w-6xl mx-auto px-2 py-2 grid grid-cols-3 gap-16">
            <section className="cart-items col-span-3 md:col-span-2 p-2">
                <h2 className="text-xl font-bold text-center border-b pb-1 border-border">Your Cart</h2>
                <CartItemsList productsList={cart.products} onUpdateCart={onUpdateCart} />
            </section>

            <section className="cart-summary col-span-3 md:col-span-1 p-2">
                <h2 className="text-xl font-bold text-center border-b pb-1 border-border">Cart Summary</h2>
                <div className="py-2 space-y-4">
                    <p className="text-lg font-semibold">Total Products: {cart.products.length > 0 ? cart.products.map(product => product.quantity).reduce((acc, item) => acc + item) : 0}</p>
                    <p className="text-lg font-semibold">Total Amount: &#8377;{cart.overall_total_price}</p>
                    <Button onClick={handleCheckout} className="w-full">Proceed to Payment</Button>
                </div>
            </section>
        </div>
    )
}

export default Cart
