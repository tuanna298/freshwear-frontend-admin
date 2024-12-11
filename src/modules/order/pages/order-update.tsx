import { Button } from '@/components/ui/button'
import { Order } from '@/schemas/order.schema'
import PageLayout from '@/shared/layouts/page'
import { useNavigation } from '@refinedev/core'
import { CheckCircle, CircleFadingArrowUp, Printer } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import OrderDescription from '../components/order-description'
import OrderSteps from '../components/order-steps'
import OrderDeliverables from '../components/table/order-deliverables'

const OrderUpdate = () => {
	const { list } = useNavigation()
	const { state } = useLocation()
	const { id } = useParams<{ id: string }>()

	const order: Order = state?.data

	const canRejectOrder =
		order?.status === 'PENDING' ||
		order?.status === 'WAIT_FOR_CONFIRMATION' ||
		order?.status === 'WAIT_FOR_DELIVERY'
	const canForceConfirmOrder =
		order?.status === 'WAIT_FOR_CONFIRMATION' ||
		order?.status === 'WAIT_FOR_DELIVERY' ||
		order?.status === 'DELIVERING'

	useEffect(() => {
		if (!id) {
			list('order')
		}
	}, [id])

	return (
		<PageLayout
			title="Chi tiết đơn hàng"
			wrapWithCard={false}
			animated={true}
			extra={
				<div className="flex gap-2">
					<Button className="flex gap-2" variant="outline">
						<Printer />
						In hoá đơn
					</Button>
					<Button className="flex gap-2" variant="outline">
						<CircleFadingArrowUp />
						Chủ động chuyển trạng thái
					</Button>
					<Button className="flex gap-2">
						<CheckCircle />
						Chấp thuận
					</Button>
					<Button className="flex gap-2">
						<CheckCircle />
						Từ chối
					</Button>
				</div>
			}
		>
			{/* OrderSteps */}
			<OrderSteps order={order} />

			{/* Order deliverables */}
			<OrderDeliverables order={order} />

			{/* order info */}
			<OrderDescription order={order} />
		</PageLayout>
	)
}

export default OrderUpdate
