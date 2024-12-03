import { AppToast } from '@/components/ui/toast'

export const useCommonToast = () => ({
	onError: (error: any) => {
		const message = error?.response?.data?.detail?.message
		AppToast.error(error?.response?.data?.status_code ?? 500, {
			description: message || 'Không xác định',
		})
	},
	onSuccess: () => {
		AppToast.success(200, {
			description: 'Thao tác được ghi nhận',
		})
	},
})
