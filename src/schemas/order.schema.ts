import ZodUtil from '@/lib/zod.util'
import { BaseDTO } from '@/shared/common/interfaces'
import { z } from 'zod'
import { userSchema } from './auth/user.schema'
import { productDetailSchema, productSchema } from './product.schema'

export enum PaymentMethod {
	CASH = 'CASH',
	TRANSFER = 'TRANSFER',
}

export enum OrderStatus {
	PLACE_ORDER = 'PLACE_ORDER',
	PENDING = 'PENDING',
	WAIT_FOR_CONFIRMATION = 'WAIT_FOR_CONFIRMATION',
	WAIT_FOR_DELIVERY = 'WAIT_FOR_DELIVERY',
	DELIVERING = 'DELIVERING',
	COMPLETED = 'COMPLETED',
	CANCELED = 'CANCELED',
	EXPIRED = 'EXPIRED',
}

export enum OrderStatusLabel {
	PENDING = 'Chờ xử lý',
	PLACE_ORDER = 'Đặt hàng',
	WAIT_FOR_CONFIRMATION = 'Chờ xác nhận',
	WAIT_FOR_DELIVERY = 'Chờ giao hàng',
	DELIVERING = 'Đang giao hàng',
	CANCELED = 'Đã hủy',
	COMPLETED = 'Hoàn thành',
	EXPIRED = 'Đã hết hạn',
	PAYMENT_FAILED = 'Thanh toán thất bại',
}

export const orderDetailSchema = z.object({
	id: z.string().optional().nullable(),
	product_detail_id: z.string(),
	order_id: z.string(),
	quantity: z.number(),
	price: z.number(),
	total: z.number(),
	product_detail: productDetailSchema
		.extend({
			product: productSchema.optional().nullable(),
		})
		.optional()
		.nullable(),
})

export const orderHistorySchema = z.object({
	id: z.string().optional().nullable(),
	order_id: z.string(),
	action_status: z.nativeEnum(OrderStatus),
	note: z.string().optional().nullable(),
})

export const orderPaymentSchema = z.object({
	id: z.string().optional().nullable(),
	order_id: z.string(),
	total_money: z.number(),
	status: z.nativeEnum(OrderStatus),
	method: z.nativeEnum(PaymentMethod),
	transaction_code: z.string().optional().nullable(),
})

export const orderSchema = z.object({
	id: z.string().optional().nullable(),
	address: z.string(),
	phone_number: z.string(),
	email: z.string(),
	receiver_name: z.string(),
	total_money: z.number(),
	note: z.string().optional().nullable(),
	method: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH),
	status: z.nativeEnum(OrderStatus).default(OrderStatus.PENDING),
	details: z.array(orderDetailSchema),
	histories: z.array(orderHistorySchema),
	payments: z.array(orderPaymentSchema),
	user: userSchema.optional().nullable(),
})

export const orderDefaultValues = ZodUtil.getDefaults(orderSchema)
export type Order = BaseDTO & z.infer<typeof orderSchema>
export type OrderDetail = BaseDTO & z.infer<typeof orderDetailSchema>
export type OrderHistory = BaseDTO & z.infer<typeof orderHistorySchema>
export type OrderPayment = BaseDTO & z.infer<typeof orderPaymentSchema>

export const ORDER_FIELDS = orderSchema.keyof().enum
