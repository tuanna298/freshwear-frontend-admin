import { ResourceProps } from '@refinedev/core'
import { API_PATHS } from './shared/common/constants'

const { USER, COLOR, BRAND, MATERIAL, ORDER, PAYMENT, PRODUCT, REVIEW, SIZE } =
	API_PATHS

const getResourceName = (path: string): string | undefined =>
	path.split('/').pop()

const createResource = (base: string) => ({
	name: getResourceName(base),
	list: base,
	create: base + '/create',
	edit: base + '/edit/:id',
	show: base + '/:id',
})

export default [
	USER,
	COLOR,
	BRAND,
	MATERIAL,
	ORDER,
	PAYMENT,
	PRODUCT,
	REVIEW,
	SIZE,
].map((i) => createResource(i.BASE)) as ResourceProps[]
