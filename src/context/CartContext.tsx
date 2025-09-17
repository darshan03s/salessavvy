import { createContext, useState, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react"

type CartContextType = {
    cartItemsCount: number,
    setCartItemsCount: Dispatch<SetStateAction<number>>
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
    return <CartContext.Provider value={{ cartItemsCount, setCartItemsCount }}>
        {children}
    </CartContext.Provider>
}

export default CartContextProvider