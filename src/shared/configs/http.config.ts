import { useAuthStore } from '@/modules/auth/stores/use-auth-store'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { API_URL } from '../common/constants'
import { loadProgressBar } from './nprogress.config'

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
		if (accessToken) {
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
