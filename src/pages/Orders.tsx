import Loading from "@/components/Loading"
import OrdersList from "@/components/order/OrdersList"
import { useUserContext } from "@/context/UserContext"
import type { OrderType } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Orders = () => {
    const { user } = useUserContext()
    const ordersApiUrl = import.meta.env.VITE_API_URL + "/api/orders"
    const navigate = useNavigate()
    const [orders, setOrders] = useState<OrderType[] | null>(null)

    useEffect(() => {
        if (!user) {
            navigate("/auth/login")
            return
        }
        if (orders) return
        try {
            axios.get(ordersApiUrl, {
                withCredentials: true
            }).then((res) => {
                setOrders(res.data.products)
            }).catch((err) => {
                toast.error("Unable to fetch orders")
                console.error(err)
            })
        } catch (err) {
            toast.error("Unable to fetch orders")
            console.error(err)
        }
    }, [user, orders])

    if (!orders) {
        return <Loading />
    }

    return (
        <div className="py-1 flex flex-col gap-1 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-center">Your Orders</h1>
            <OrdersList orders={orders} />
        </div>
    )
}

export default Orders
