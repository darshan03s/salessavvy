import type { OrderType } from "@/types"
import { Badge } from "../ui/badge"

const OrderCard = ({ order }: { order: OrderType }) => {
    return (
        <div className="flex gap-4 items-center bg-background rounded-lg shadow-sm border border-border w-full">
            <div className="flex-shrink-0 w-16 h-auto p-1">
                <img
                    src={order.image_url}
                    className="w-full h-full object-cover rounded-sm"
                    alt={order.name}
                />
            </div>

            <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">{order.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{order.description}</p>
                <div className="flex gap-1 items-center w-full py-2">
                    <Badge>{order.price_per_unit}</Badge>
                    <Badge>x {order.quantity}</Badge>
                    <Badge>Total: {order.total_price}</Badge>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
