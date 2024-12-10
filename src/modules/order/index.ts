import { lazy } from 'react'

const OrderManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/order-management')
})

const OrderUpdate = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/order-update')
})

export { OrderManagement, OrderUpdate }
