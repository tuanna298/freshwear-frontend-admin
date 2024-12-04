import { FetchConfigType } from '@/types'
import { useInfiniteList } from '@refinedev/core'
import { QueryKey } from '@tanstack/react-query'
import type { AxiosRequestConfig } from 'axios'
import { isEmpty, isEqual, uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { RESOURCE_MAP } from '../common/constants'
import { BaseDTO } from '../common/interfaces'
import QueryHelper from '../helpers/query.helper'

type InfiniteQueryBaseParams<T extends BaseDTO> = {
	key: keyof typeof RESOURCE_MAP
	paginationConfigs?: {
		pageField: string
		perPageField: string
	}
	defaultConfigs?: AxiosRequestConfig<T>
	enabledInfiniteQuery?: boolean
	staleTime?: number
	defaultValues?: T[]

	/** return prisma where object  */
	getSearch?: (value: string) => object

	uniqueBy?: string
}

/** <-----FETCH INFINITE API WITH REACT QUERY---> */
export function useInfiniteQueryBase<T extends BaseDTO>({
	key,
	paginationConfigs = {
		pageField: 'page',
		perPageField: 'limit',
	},
	defaultConfigs = {},
	defaultValues,
	enabledInfiniteQuery = true,
	getSearch,
	uniqueBy,
}: InfiniteQueryBaseParams<T>) {
	const defaultKeys = isEmpty(defaultConfigs)
		? [key, 'infinite']
		: [key, 'infinite', JSON.stringify(defaultConfigs)]

	const [configs, setConfigs] = useState<FetchConfigType<T>>(defaultConfigs)
	const [queryKey, setQueryKey] = useState<QueryKey>(defaultKeys)

	const { pageField, perPageField } = paginationConfigs

	// <---QUERY DEFINE---->
	const fetchInfiniteQuery = useInfiniteList({
		resource: key,
		queryOptions: {
			queryKey,
			enabled: enabledInfiniteQuery,
			staleTime: 0,
			refetchOnMount: true,
		},
	})

	useEffect(() => {
		if (!isEmpty(configs)) {
			setQueryKey([key, 'infinite', JSON.stringify(configs)])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(configs)])

	// <----- ALL DATA ------->
	const allData = uniqBy(
		[
			...(defaultValues || []),
			...(fetchInfiniteQuery.data?.pages?.flatMap((page) => page?.data || []) ||
				[]),
		].filter((item) => !isEmpty(item)),
		uniqueBy || 'id',
	)

	return {
		fetchInfiniteQuery,
		setConfigs,
		context: queryKey,
		setSearch: QueryHelper.setSearch(
			setConfigs,
			paginationConfigs,
			getSearch,
			false,
			JSON.parse(defaultConfigs?.params?.where || '{}'),
		),
		pageField,
		perPageField,
		configs,
		allData,
		isFiltering: !isEqual(defaultConfigs, configs),
	}
}
