import 'nprogress/nprogress.css'

import { AxiosInstance, AxiosProgressEvent } from 'axios'
import NProgress from 'nprogress'

const calculatePercentage = (loaded: number, total: number) =>
	Math.floor(loaded * 1.0) / total

export function loadProgressBar(
	config: Partial<NProgress.NProgressOptions>,
	instance: AxiosInstance,
) {
	let requestsCounter = 0

	const setupStartProgress = () => {
		instance.interceptors.request.use((config) => {
			requestsCounter++
			NProgress.start()
			return config
		})
	}

	const setupUpdateProgress = () => {
		const update = (e: AxiosProgressEvent) =>
			NProgress.inc(calculatePercentage(e.loaded, e.total || 0))
		instance.defaults.onDownloadProgress = update
		instance.defaults.onUploadProgress = update
	}

	const setupStopProgress = () => {
		const responseFunc = (response: any) => {
			if (--requestsCounter === 0) {
				NProgress.done()
			}
			return response
		}

		const errorFunc = (error: any) => {
			if (--requestsCounter === 0) {
				NProgress.done()
			}
			return Promise.reject(error)
		}

		instance.interceptors.response.use(responseFunc, errorFunc)
	}

	NProgress.configure(config)
	setupStartProgress()
	setupUpdateProgress()
	setupStopProgress()
}
