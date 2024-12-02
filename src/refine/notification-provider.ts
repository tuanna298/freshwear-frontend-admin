import { AppToast } from '@/components/ui/toast'
import { NotificationProvider } from '@refinedev/core'

export default {
	open: ({ message, key, type, description }) => {
		const toastData = { id: key, description }

		switch (type) {
			case 'success':
				AppToast.success(message, toastData)
				break
			case 'error':
				AppToast.error(message, toastData)
				break
			default:
				AppToast.message(message, toastData)
		}
	},
} as NotificationProvider
