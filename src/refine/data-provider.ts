import { generateFilter, generateSort } from '@/lib/refine.util'
import { API_URL } from '@/shared/common/constants'
import {
	CreateManyParams,
	CreateManyResponse,
	CreateParams,
	CreateResponse,
	CustomParams,
	CustomResponse,
	DataProvider,
	DeleteOneParams,
	DeleteOneResponse,
	GetListParams,
	GetListResponse,
	GetManyParams,
	GetManyResponse,
	GetOneParams,
	GetOneResponse,
	UpdateParams,
	UpdateResponse,
} from '@refinedev/core'
import { stringify } from '@refinedev/simple-rest'

type MethodTypes = 'get' | 'delete' | 'head' | 'options'
type MethodTypesWithBody = 'post' | 'put' | 'patch'

const httpConfig = await import('@/shared/configs/http.config')

export default {
	getList: async <TData>({
		resource,
		pagination,
		filters,
		sorters,
		meta,
	}: GetListParams): Promise<GetListResponse<TData>> => {
		const url = `${API_URL}/${resource}`

		const { current = 1, pageSize, mode = 'server' } = pagination ?? {}

		const { headers: headersFromMeta, method } = meta ?? {}
		const requestMethod = (method as MethodTypes) ?? 'get'

		const queryFilters = generateFilter(filters)

		const query: {
			page?: number
			pageSize?: number
			sortBy?: string
			orderBy?: string
		} = {
			sortBy: 'updated_at',
		}

		if (mode === 'server') {
			query.page = current - 1
			query.pageSize = pageSize
		}

		const generatedSort = generateSort(sorters)
		if (generatedSort) {
			const { sortBy, orderBy } = generatedSort
			query.sortBy = sortBy.join(',')
			query.orderBy = orderBy.join(',')
		}

		const response = await httpConfig.default[requestMethod](
			`${url}?${stringify(query)}&${stringify(queryFilters)}`,
			{
				headers: headersFromMeta,
			},
		)

		const { content } = response.data

		const data = content.data
		const totalElements = content.totalElements
		const startIndex =
			pageSize !== undefined && current !== undefined
				? (current + 1) * pageSize
				: 0

		return {
			data: data,
			total: totalElements,
			startIndex,
		}
	},

	getMany: async <TData>({
		resource,
		ids,
		meta,
	}: GetManyParams): Promise<GetManyResponse<TData>> => {
		const { headers, method } = meta ?? {}
		const requestMethod = (method as MethodTypes) ?? 'get'

		const { data } = await httpConfig.default[requestMethod](
			`${API_URL}/${resource}?${stringify({ id: ids })}`,
			{ headers },
		)

		return {
			data,
		}
	},

	create: async <TData, TVariables = {}>({
		resource,
		variables,
		meta,
	}: CreateParams<TVariables>): Promise<CreateResponse<TData>> => {
		const url = `${API_URL}/${resource}`

		const { headers, method } = meta ?? {}
		const requestMethod = (method as MethodTypesWithBody) ?? 'post'

		const response = await httpConfig.default[requestMethod](url, variables, {
			headers,
		})

		const data = response.data.content

		return {
			data,
		}
	},

	createMany: async <TData, TVariables>({
		resource,
		variables,
		meta,
	}: CreateManyParams<TVariables>): Promise<CreateManyResponse<TData>> => {
		const url = `${API_URL}/${resource}`

		const { headers, method } = meta ?? {}
		const requestMethod = (method as MethodTypesWithBody) ?? 'post'

		const response = await httpConfig.default[requestMethod](url, variables, {
			headers,
		})

		const { content } = response.data
		const data = content

		return {
			data,
		}
	},

	update: async <TData, TVariables>({
		resource,
		id,
		variables,
		meta,
	}: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> => {
		const url = `${API_URL}/${resource}/${id}`

		const { headers, method } = meta ?? {}
		const requestMethod = (method as MethodTypesWithBody) ?? 'put'

		const { data } = await httpConfig.default[requestMethod](url, variables, {
			headers,
		})

		return {
			data,
		}
	},

	getOne: async <TData>({
		resource,
		id,
		meta,
	}: GetOneParams): Promise<GetOneResponse<TData>> => {
		const url = `${API_URL}/${resource}/${id}`

		const { headers, method } = meta ?? {}

		const requestMethod = (method as MethodTypes) ?? 'get'

		const response = await httpConfig.default[requestMethod](url, { headers })

		const { content } = response.data

		const data = content

		return {
			data,
		}
	},

	deleteOne: async <TData, TVariables>({
		resource,
		id,
		variables,
		meta,
	}: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
		const url = `${API_URL}/${resource}/${id}`

		const { headers, method } = meta ?? {}
		const requestMethod = (method as MethodTypesWithBody) ?? 'delete'

		const response = await httpConfig.default[requestMethod](url, {
			data: variables,
			headers,
		})

		const { content } = response.data

		const data = content

		return {
			data,
		}
	},

	custom: async <TData, TQuery, TPayload>({
		url,
		method,
		filters,
		sorters,
		payload,
		query,
		headers,
	}: CustomParams<TQuery, TPayload>): Promise<CustomResponse<TData>> => {
		let requestUrl = `${url}?`

		if (sorters) {
			const generatedSort = generateSort(sorters)
			if (generatedSort) {
				const { sortBy, orderBy } = generatedSort
				const sortQuery = {
					sortBy: sortBy.join(','),
					orderBy: orderBy.join(','),
				}
				requestUrl = `${requestUrl}&${stringify(sortQuery)}`
			}
		}

		if (filters) {
			const filterQuery = generateFilter(filters)
			requestUrl = `${requestUrl}&${stringify(filterQuery)}`
		}

		if (query) {
			requestUrl = `${requestUrl}&${stringify(query)}`
		}

		let axiosResponse
		switch (method) {
			case 'put':
			case 'post':
			case 'patch':
				axiosResponse = await httpConfig.default[method](url, payload, {
					headers,
				})
				break
			case 'delete':
				axiosResponse = await httpConfig.default.delete(url, {
					data: payload,
					headers: headers,
				})
				break
			default:
				axiosResponse = await httpConfig.default.get(requestUrl, {
					headers,
				})
				break
		}

		const data = axiosResponse.data.content
		const response = axiosResponse.data

		return Promise.resolve({ data, response })
	},
} as Omit<Required<DataProvider>, 'updateMany' | 'deleteMany'>
