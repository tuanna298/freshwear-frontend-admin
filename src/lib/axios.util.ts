import { BaseErrorResponse } from '@/shared/common/interfaces'

import axios, { AxiosError } from 'axios'
import { getErrorDetailMessage, getErrorSumaryMessage } from './tanstack.util'

export function isAxiosError<ResponseType>(
	error: unknown,
): error is AxiosError<ResponseType> {
	return axios.isAxiosError(error)
}

export const handleError = (error: unknown) => {
	let errorMessage = 'Đã xảy ra lỗi không xác định.'
	let errorDescription = 'Vui lòng thử lại sau.'

	if (isAxiosError<BaseErrorResponse>(error)) {
		errorMessage = getErrorSumaryMessage(error)
		errorDescription = getErrorDetailMessage(error)
	} else if (error instanceof Error) {
		errorMessage = error.message
	}

	return {
		errorMessage,
		errorDescription,
	}
}
