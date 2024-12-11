import { lazy } from 'react'

const UserManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/user-management')
})

export { UserManagement }
