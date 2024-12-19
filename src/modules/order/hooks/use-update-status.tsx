import { AppToast } from '@/components/ui/toast'
import { Order, OrderStatus } from '@/schemas/order.schema'
import { API_URL } from '@/shared/common/constants'
import http from '@/shared/configs/http.config'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { OrderUpdateStatusDto } from '../common/types'
import OrderHelper from '../helpers/order.helper'
interface Props {
	order: Order
	onSuccessCallback?: () => void
	isRejection?: boolean
}

const useUpdateStatus = ({ order, onSuccessCallback, isRejection }: Props) => {
	const [note, setNote] = useState<string>('')

	const { mutate } = useMutation({
		mutationKey: ['force-status'],
		mutationFn: ({ status, note }: OrderUpdateStatusDto) =>
			http.put(API_URL + `/order/${order.id}/update-status`, {
				status,
				note,
			}),
	})

	const onSubmit = async () => {
		if (!note) {
			AppToast.error('Vui lòng nhập ghi chú hành động')
		}

		const status = isRejection
			? OrderStatus.CANCELED
			: OrderHelper.getNextStatus(order.status)

		if (status) {
			mutate(
				{
					status,
					note,
				},
				{
					onSuccess() {
						onSuccessCallback && onSuccessCallback()
						AppToast.success('Chuyển trạng thái thành công')
					},
				},
			)
		}
	}

	return {
		note,
		setNote,
		onSubmit,
	}
}

export default useUpdateStatus
