import { OrderStatus } from '@/schemas/order.schema'
import { QueryKey } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { DebouncedFunc } from 'lodash'
import { ReactNode } from 'react'
import { type ClientUploadedFileData } from 'uploadthing/types'

export type CommonDialogProps = {
	mode: 'create' | 'update'
	trigger?: ReactNode
}

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

export type FilterConfigs = {
	setSearch: DebouncedFunc<
		(
			value: string,
			paginationOffset?: number | undefined,
			getSearch?: (val: string) => object,
		) => void
	>
	isLoading?: boolean
	queryKey: QueryKey
	clearFilter?: () => void
}
export type OptionsConfigs = {
	showSelectAll?: boolean
}

export type FetchConfigType<T> = AxiosRequestConfig<T> & { params?: object }

export interface IEvent {
	date: number | undefined
	status: OrderStatus
	loading?: boolean
	note?: string | null
}
