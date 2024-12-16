import { OrderStatus } from '@/schemas/order.schema'

export interface OrderUpdateStatusDto {
	status: OrderStatus
	note: string
}
