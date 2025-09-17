import type { UserType } from "@/types";
import { createContext, useState, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react"

type UserContextType = {
    user: UserType | undefined,
    setUser: Dispatch<SetStateAction<UserType | undefined>>
};


// eslint-disable-next-line
export const UserContext = createContext<UserContextType | undefined>(undefined)

// eslint-disable-next-line
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartContextProvider');
    }
    return context;
}

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType>()
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider