import { lazy } from 'react'

const ProductManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/product-management')
})

const ProductCreate = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/product-create')
})
const ProductUpdate = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/product-update')
})

export { ProductCreate, ProductManagement, ProductUpdate }
