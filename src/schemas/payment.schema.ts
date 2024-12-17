import { BaseDTO } from '@/shared/common/interfaces'
import { Order } from './order.schema'

export enum PaymentMethod {
	CASH = 'CASH',
	TRANSFER = 'TRANSFER',
}

export enum PaymentStatus {
	PENDING = 'PENDING',
	PAID = 'PAID',
	CANCELED = 'CANCELED',
}

export interface Payment extends BaseDTO {
	id: string
	order_id: string
	method: PaymentMethod
	transaction_code: string
	total: number
	description: string
	status: PaymentStatus
	create_at: Date
	order: Order
}
