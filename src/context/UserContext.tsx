import type { UserType } from "@/types";
import { createContext, useState, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react"

type UserContextType = {
    user: UserType | null,
    setUser: Dispatch<SetStateAction<UserType | null>>
    fetchingUser: boolean
    setFetchingUser: Dispatch<SetStateAction<boolean>>
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
    const [user, setUser] = useState<UserType | null>(null)
    const [fetchingUser, setFetchingUser] = useState<boolean>(true)
    return <UserContext.Provider value={{ user, setUser, fetchingUser, setFetchingUser }}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider