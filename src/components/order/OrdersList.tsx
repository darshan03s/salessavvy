import type { OrderType } from "@/types"
import OrderCard from "./OrderCard"

const OrdersList = ({ orders }: { orders: OrderType[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {orders.map((order, index) => {
                return <OrderCard key={index} order={order} />
            })}
        </div>
    )
}

export default OrdersList
