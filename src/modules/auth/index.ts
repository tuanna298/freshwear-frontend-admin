import { lazy } from 'react'

const AuthLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./layouts/auth-layout')
})

const SignIn = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/sign-in')
})

export { AuthLayout, SignIn }
