import AuthHelper from '@/modules/auth/helpers/auth.helper'
import { useAuthStore } from '@/modules/auth/stores/use-auth-store'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { API_PATHS, API_URL } from '../common/constants'
import { loadProgressBar } from './nprogress.config'

const {
	AUTH: { SIGN_IN, REFRESH },
} = API_PATHS

const http = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 1000 * 60,
})

axiosRetry(http, {
	retries: 3,
	retryCondition: (error) => {
		// Retry on network errors or 5xx status codes
		return (
			axiosRetry.isNetworkOrIdempotentRequestError(error) ||
			error.response?.status === 401
		)
	},
	retryDelay: (retryCount) => {
		return axiosRetry.exponentialDelay(retryCount)
	},
})

http.interceptors.request.use(
	function (config: InternalAxiosRequestConfig) {
		const { accessToken } = useAuthStore.getState()
		if (accessToken && !config.url?.includes(REFRESH)) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	function (error) {
		return Promise.reject(error)
	},
)

http.interceptors.response.use(
	function (response: AxiosResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data

		return response?.data
	},
	async function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		const config = error?.config

		if (error?.config?.url?.includes(REFRESH)) {
			useAuthStore.getState().clear()
			return error
		}

		if (
			error?.response?.status === 401 &&
			!error?.config?.url?.includes(SIGN_IN)
		) {
			const access_token = await AuthHelper.refreshTokenFn()
			if (access_token) {
				config.headers.Authorization = `Bearer ${access_token}`
				return http(config)
			} else {
				useAuthStore.getState().clear()
			}
		}

		return Promise.reject(error)
	},
)

loadProgressBar(
	{
		showSpinner: false,
	},
	http,
)

export default http
