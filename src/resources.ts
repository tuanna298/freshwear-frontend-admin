import { ResourceProps } from '@refinedev/core'
import { API_PATHS } from './shared/common/constants'

const { USER } = API_PATHS

const getResourceName = (path: string): string | undefined =>
	path.split('/').pop()

const createResource = (base: string) => ({
	name: getResourceName(base),
	list: base,
})

export default [USER].map((i) => createResource(i.BASE)) as ResourceProps[]
