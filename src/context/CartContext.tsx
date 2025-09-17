import axios from "axios"
import { createContext, useState, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { useNavigate } from "react-router-dom"

type CartContextType = {
    cartItemsCount: number,
    setCartItemsCount: Dispatch<SetStateAction<number>>
    getCartItemsCount: () => void
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

    return <CartContext.Provider value={{ cartItemsCount, setCartItemsCount, getCartItemsCount }}>
        {children}
    </CartContext.Provider>
}

export default CartContextProvider