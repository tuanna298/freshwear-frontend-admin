import { ResourceProps } from '@refinedev/core'
import { API_PATHS } from './shared/common/constants'

const { USER, COLOR, BRAND, MATERIAL, ORDER, PAYMENT, PRODUCT, REVIEW, SIZE } =
	API_PATHS

const getResourceName = (path: string): string | undefined =>
	path.split('/').pop()

interface CustomResourceOptions {
	create?: boolean
	edit?: boolean
	show?: boolean
}

const createResource = (
	base: string,
	options: CustomResourceOptions = { create: true, edit: true, show: true },
) => {
	const resource: ResourceProps = {
		name: getResourceName(base) as string,
		list: base,
	}

	if (options.create) {
		resource.create = base + '/create'
	}

	if (options.edit) {
		resource.edit = base + '/edit/:id'
	}

	if (options.show) {
		resource.show = base + '/:id'
	}

	return resource
}

export default [
	createResource(USER.BASE),
	createResource(COLOR.BASE, { create: false, edit: false, show: false }),
	createResource(BRAND.BASE, { create: false, edit: false, show: false }),
	createResource(MATERIAL.BASE, { create: false, edit: false, show: false }),
	createResource(SIZE.BASE, { create: false, edit: false, show: false }),
	createResource(ORDER.BASE),
	createResource(PAYMENT.BASE),
	createResource(PRODUCT.BASE),
	createResource(REVIEW.BASE),
] as ResourceProps[]
