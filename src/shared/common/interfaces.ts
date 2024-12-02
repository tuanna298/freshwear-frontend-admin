import { FieldValues } from 'react-hook-form'

export interface DefaultBaseDTO extends FieldValues {
	id?: string | number | null
	created_at?: Date
	updated_at?: Date
	updated_by?: string | number
	created_by?: string | number
	deleted_at?: Date
	is_deleted?: boolean
}

export interface BaseDTO extends DefaultBaseDTO {
	/* eslint-disable */
	[key: string | number | symbol]: any
}

export interface BaseResponse<T> {
	statusCode: number
	message: string
	path: string
	timestamp: string
	data: T
}

interface Pagination {
	page: number
	perPage: number
	totalRecords: number
	totalPages: number
	previousPage: number
	currentPage: number
	nextPage: number
}
export interface PaginatedResult<T> {
	result: T[]
	paination: Pagination
}

interface ErrorDetail {
	code: string
	message: string
	details: string
	timestamp: string
	path?: string
}

export interface BaseErrorResponse {
	statusCode: number
	error?: ErrorDetail
	requestId?: string
}
