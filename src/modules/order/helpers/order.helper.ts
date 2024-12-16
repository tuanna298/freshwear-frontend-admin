import { OrderStatus } from '@/schemas/order.schema'

class OrderHelper {
	static getNextStatus: (currentStatus: OrderStatus) => OrderStatus | null = (
		currentStatus,
	) => {
		const statusList: OrderStatus[] = [
			OrderStatus.PENDING,
			OrderStatus.WAIT_FOR_CONFIRMATION,
			OrderStatus.WAIT_FOR_DELIVERY,
			OrderStatus.DELIVERING,
			OrderStatus.COMPLETED,
		]

		const currentIndex = statusList.indexOf(currentStatus)

		if (currentIndex !== -1) {
			const nextIndex = currentIndex + 1

			if (nextIndex < statusList.length) {
				return statusList[nextIndex]
			}
		}

		return null
	}
}

export default OrderHelper
