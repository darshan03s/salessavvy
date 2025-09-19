import type { OrderType } from "@/types"
import { Badge } from "../ui/badge"

const OrderCard = ({ order }: { order: OrderType }) => {
    return (
        <div className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="flex-shrink-0 w-16 h-16">
                <img
                    src={order.image_url}
                    className="w-full h-full object-cover rounded-md"
                    alt={order.name}
                />
            </div>

            <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{order.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{order.description}</p>
                <div className="flex gap-1 items-center w-full">
                    <Badge>{order.price_per_unit}</Badge>
                    <Badge>x {order.quantity}</Badge>
                    <Badge>Total: {order.total_price}</Badge>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
