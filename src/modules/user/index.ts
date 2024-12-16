import { lazy } from 'react'

const UserManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/user-management')
})

const UserShow = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/user-show')
})

export { UserManagement, UserShow }
