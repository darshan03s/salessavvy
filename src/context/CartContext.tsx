import axios from "axios"
import { createContext, useState, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "./UserContext"
import { toast } from "sonner"

type CartContextType = {
    cartItemsCount: number,
    setCartItemsCount: Dispatch<SetStateAction<number>>
    getCartItemsCount: () => void
    updateCartItemsCount: (url: string) => void
    addToCart: (product_id: number, cartApiUrl: string) => void
}

// eslint-disable-next-line
export const CartContext = createContext<CartContextType | undefined>(undefined)

// eslint-disable-next-line
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartContextProvider');
    }
    return context;
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartItemsCount, setCartItemsCount] = useState<number>(0);
    const navigate = useNavigate()
    const { user } = useUserContext()

    function getCartItemsCount() {
        axios.get(import.meta.env.VITE_API_URL + "/api/cart/items-count", {
            withCredentials: true
        }).then((res) => {
            setCartItemsCount(res.data)
        }).catch(error => {
            if (error.response?.status === 401) {
                navigate("/auth/login");
            }
            console.error('Error fetching cart items count:', error);
        })
    }

    function updateCartItemsCount(cartApiUrl: string) {
        axios.get(cartApiUrl + "/items-count", {
            withCredentials: true
        }).then((res) => {
            setCartItemsCount(res.data)
        })
    }

    async function addToCart(product_id: number, cartApiUrl: string) {
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
            updateCartItemsCount(cartApiUrl)
        } else {
            toast.error("Failed to add product to cart")
        }
    }

    return <CartContext.Provider value={{ cartItemsCount, setCartItemsCount, getCartItemsCount, updateCartItemsCount, addToCart }}>
        {children}
    </CartContext.Provider>
}

export default CartContextProvider