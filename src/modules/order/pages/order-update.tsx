import { Button } from '@/components/ui/button'
import { Order } from '@/schemas/order.schema'
import PageLayout from '@/shared/layouts/page'
import { InvoiceTemplate } from '@/shared/templates/invoice-template'
import { useNavigation } from '@refinedev/core'
import { CheckCircle, CircleFadingArrowUp, Printer } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import OrderDescription from '../components/order-description'
import OrderSteps from '../components/order-steps'
import OrderDeliverables from '../components/table/order-deliverables'

const OrderUpdate = () => {
	const { list } = useNavigation()
	const { state } = useLocation()
	const { id } = useParams<{ id: string }>()

	const order: Order = state?.data

	const [printOrder, setPrintOrder] = useState<Order | undefined>()

	const componentRef = useRef(null)

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})

	useEffect(() => {
		if (printOrder && componentRef.current) {
			handlePrint()
			setPrintOrder(undefined)
		}
	}, [printOrder, handlePrint])

	const canAcceptOrder = order?.status === 'WAIT_FOR_CONFIRMATION'
	const canRejectOrder =
		order?.status === 'PENDING' ||
		order?.status === 'WAIT_FOR_CONFIRMATION' ||
		order?.status === 'WAIT_FOR_DELIVERY'
	const canForceConfirmOrder =
		order?.status === 'WAIT_FOR_CONFIRMATION' ||
		order?.status === 'WAIT_FOR_DELIVERY' ||
		order?.status === 'DELIVERING'

	if (!id) {
		list('order')
	}

	return (
		<PageLayout
			title="Chi tiết đơn hàng"
			wrapWithCard={false}
			animated={true}
			extra={
				<div className="flex gap-2">
					<Button
						className="flex gap-2"
						variant="outline"
						onClick={() => {
							if (order) {
								setPrintOrder(order)
							}
						}}
					>
						<Printer />
						In hoá đơn
					</Button>
					<Button
						className="flex gap-2"
						variant="outline"
						disabled={!canForceConfirmOrder}
					>
						<CircleFadingArrowUp />
						Chủ động chuyển trạng thái
					</Button>
					<Button className="flex gap-2" disabled={!canAcceptOrder}>
						<CheckCircle />
						Chấp thuận
					</Button>
					<Button className="flex gap-2" disabled={!canRejectOrder}>
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

			<div className="d-none" key={printOrder?.id}>
				{printOrder && (
					<InvoiceTemplate
						key={printOrder.id || Date.now()}
						order={printOrder}
						ref={componentRef}
					/>
				)}
			</div>
		</PageLayout>
	)
}

export default OrderUpdate
