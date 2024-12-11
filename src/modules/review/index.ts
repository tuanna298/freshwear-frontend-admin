import { lazy } from 'react'

const ReviewManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/review-management')
})

export { ReviewManagement }
