import { lazy } from 'react'

const ColorManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/color-management')
})

export { ColorManagement }
