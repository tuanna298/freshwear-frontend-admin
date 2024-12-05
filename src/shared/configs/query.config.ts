import { QueryCache, QueryClientConfig } from '@tanstack/react-query'
import { get } from 'lodash'

export default {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: false,
		},
		mutations: {
			retry: (failureCount, error) => {
				if (get(error, 'response.status') === 500 && failureCount < 2)
					return true
				return false
			},
		},
	},
	queryCache: new QueryCache({
		onError: (error) => error,
	}),
} as QueryClientConfig
