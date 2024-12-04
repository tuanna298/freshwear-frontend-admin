import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'

import { FilterConfigs } from '@/types'
import { isFunction } from 'lodash'
import QueryHelper from '../helpers/query.helper'

export const useInfinite = (filterConfigs?: FilterConfigs) => {
	const queryClient = useQueryClient()
	const [filterValue, setFilterValue] = useState<string>('')

	const onFilter = useCallback(
		(search: string) => {
			if (isFunction(filterConfigs?.setSearch)) {
				filterConfigs?.setSearch?.(search)
				setFilterValue(search)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filterConfigs?.setSearch],
	)

	// for filter change
	useUpdateEffect(() => {
		QueryHelper.refetchHandle(queryClient, filterConfigs?.queryKey)
	}, [filterConfigs?.queryKey])

	return {
		onFilter,
		filterValue,
		setFilterValue,
	}
}
