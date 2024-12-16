import { lazy } from 'react'

const Dashboard = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/dashboard')
})

export { Dashboard }
