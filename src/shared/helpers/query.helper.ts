import { FetchConfigType } from '@/types'
import { QueryClient, QueryKey } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { debounce, isEmpty, isFunction } from 'lodash'
import { Dispatch, SetStateAction } from 'react'

export default class QueryHelper {
	static refetchHandle = (queryClient: QueryClient, queryKey?: QueryKey) => {
		if (queryKey) {
			const state = queryClient.getQueryState(queryKey)
			if (state?.status !== 'success') {
				queryClient.refetchQueries({
					queryKey,
					exact: true,
					type: 'inactive',
				})
			}
		}
	}

	static setSearch = <T>(
		setConfigs: Dispatch<SetStateAction<FetchConfigType<T>>>,
		paginationConfigs: {
			pageField: string
			perPageField: string
		},
		/** return prisma where object  */
		getSearch?: (value: string) => object,
		isAvailable?: boolean,
		defaultConfigs?: AxiosRequestConfig<T>,
	) =>
		debounce((value: string, paginationOffset?: number) => {
			const available =
				isAvailable || false
					? {
							is_deleted: false,
							is_locked: false,
						}
					: {}
			setConfigs((prev: FetchConfigType<T>) => ({
				...prev,
				params: {
					...(prev?.params || {}),
					[paginationConfigs.pageField]: 0 + (paginationOffset || 0),
					...(isFunction(getSearch)
						? {
								where: isEmpty(value.trim())
									? JSON.stringify({ ...available, ...defaultConfigs })
									: JSON.stringify({
											...getSearch?.(value?.trim()),
											...available,
										}),
							}
						: {
								search: value?.trim(),
							}),
				},
			}))
		}, 500)
}
