import { toast, ToastT } from 'sonner'

type ExternalToast = Omit<
	ToastT,
	'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'
> & {
	id?: number | string
}
export const AppToast = {
	success: (message: string | React.ReactNode, data: ExternalToast = {}) =>
		toast.success(message, data),
	info: (message: string | React.ReactNode, data: ExternalToast = {}) =>
		toast.info(message, data),
	warning: (message: string | React.ReactNode, data: ExternalToast = {}) =>
		toast.warning(message, data),
	error: (message: string | React.ReactNode, data: ExternalToast = {}) =>
		toast.error(message ?? 500, data),
	message: (message: string | React.ReactNode, data: ExternalToast = {}) =>
		toast.message(message, data),
	loading: (message: string | React.ReactNode, data: ExternalToast = {}) =>
		toast.loading(message, data),
}
