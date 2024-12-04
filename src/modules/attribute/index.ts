import { lazy } from 'react'

const AttributeManagement = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./pages/attribute-management')
})

export { AttributeManagement }
