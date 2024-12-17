import { lazy } from 'react'

const PaymentManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/payment-management')
})

export { PaymentManagement }
