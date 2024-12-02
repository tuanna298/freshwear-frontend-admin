import { lazy } from 'react'

const PublicLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./public')
})

const ProtectedLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./protected')
})

const AppLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./app')
})

export { AppLayout, ProtectedLayout, PublicLayout }
