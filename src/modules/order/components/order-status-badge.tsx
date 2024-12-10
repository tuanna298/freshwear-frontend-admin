import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { OrderStatus, OrderStatusLabel } from '@/schemas/order.schema'

type OrderStatusProps = {
	status: OrderStatus
}

const statusColorMap: Record<OrderStatus, string> = {
	PENDING: 'bg-orange-500 text-white',
	WAIT_FOR_CONFIRMATION: 'bg-cyan-500 text-white',
	DELIVERING: 'bg-green-500 text-white',
	WAIT_FOR_DELIVERY: 'bg-lime-500 text-white',
	COMPLETED: 'bg-blue-500 text-white',
	CANCELED: 'bg-red-500 text-white',
	EXPIRED: 'bg-red-500 text-white',
}

const OrderStatusBadge: React.FC<OrderStatusProps> = ({ status }) => (
	<Badge className={cn(statusColorMap[status], 'pointer-events-none')}>
		{OrderStatusLabel[status]}
	</Badge>
)

export default OrderStatusBadge
