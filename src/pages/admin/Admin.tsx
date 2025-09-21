import { useUserContext } from "@/context/UserContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Admin = () => {
    const { user, fetchingUser } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !fetchingUser) {
            navigate("/auth/login")
            return
        }

        if (user?.role === "CUSTOMER") {
            toast.error("You are not Admin")
            navigate("/")
            return
        }
    }, [])

    return (
        <div className="admin-page h-[calc(100vh-48px-48px)]">
            Admin
        </div>
    )
}

export default Admin
