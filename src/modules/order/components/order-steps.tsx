import { Skeleton } from '@/components/ui/skeleton'
import {
	Order,
	OrderHistory,
	OrderStatus,
	OrderStatusLabel,
} from '@/schemas/order.schema'
import { IEvent } from '@/types'
import { LoadingOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import Card from 'antd/es/card/Card'
import Grid from 'antd/es/grid'
import {
	CircleAlert,
	CircleCheckBig,
	CircleHelp,
	Package,
	PackageCheck,
	Truck,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface OrderStepsProps {
	order: Order
}

const { useBreakpoint } = Grid

const OrderSteps = ({ order }: OrderStepsProps) => {
	const screens = useBreakpoint()
	const currentBreakPoints = Object.entries(screens)
		.filter((screen) => !!screen[1])
		.map((screen) => screen[0])

	const notFinishedCurrentStep = (event: IEvent) =>
		event.status !== 'CANCELED' && event.status !== 'COMPLETED' && event.loading

	const stepStatus = (event: IEvent) => {
		if (!event.date) return 'wait'
		if (event.status === 'CANCELED') return 'error'
		if (notFinishedCurrentStep(event)) return 'process'
		return 'finish'
	}

	const [events, setEvents] = useState<IEvent[]>([])

	useEffect(() => {
		if (order) {
			const orderHistories = order.histories
			const updatedEvents = getOrderStatusTimeline(
				orderHistories as OrderHistory[],
			)
			setEvents(updatedEvents)
		}
	}, [order])

	return (
		<Card
			styles={{
				body: {
					padding: 0,
				},
			}}
		>
			<div
				className="card-container"
				style={{
					overflowX: 'auto',
					whiteSpace: 'nowrap',
				}}
			>
				{order && (
					<Steps
						direction={
							currentBreakPoints.includes('lg') ? 'horizontal' : 'vertical'
						}
						current={events.findIndex((el) => el.status === order?.status)}
					>
						{events.map((event: IEvent, index: number) => (
							<Steps.Step
								status={stepStatus(event)}
								key={index}
								title={OrderStatusLabel[event.status]}
								icon={
									notFinishedCurrentStep(event) ? (
										<LoadingOutlined />
									) : (
										getIconByStatus(event.status)
									)
								}
								style={{
									minWidth: '300px',
									padding: '24px',
								}}
								description={event.note && event.note}
								// subTitle={
								// 	<Tooltip
								// 		title={event.date && dayjs(event.date).format('LLL')}
								// 	>
								// 		{event.date && dayjs(event.date).format('DD/MM')}
								// 	</Tooltip>
								// }
							/>
						))}
					</Steps>
				)}
				{!order && <Skeleton />}
			</div>
		</Card>
	)
}

export default OrderSteps

const getOrderStatusTimeline = (orderHistories: OrderHistory[]): IEvent[] => {
	let statusList: OrderStatus[] = [
		OrderStatus.PENDING,
		OrderStatus.WAIT_FOR_CONFIRMATION,
		OrderStatus.WAIT_FOR_DELIVERY,
		OrderStatus.DELIVERING,
		OrderStatus.COMPLETED,
		OrderStatus.CANCELED,
	]

	// If there's no 'CANCELED' status in orderHistories, remove it from statusList
	if (
		!orderHistories.some(
			(history) => history.action_status === OrderStatus.CANCELED,
		)
	) {
		statusList = statusList.filter((status) => status !== OrderStatus.CANCELED)
	}

	const sortedOrderHistories = [...orderHistories].sort(
		(a, b) =>
			new Date(a?.created_at ?? 0).getTime() -
			new Date(b?.created_at ?? 0).getTime(),
	)

	const eventList: IEvent[] = [
		{
			status: OrderStatus.PLACE_ORDER,
			date: sortedOrderHistories[0]?.created_at
				? new Date(sortedOrderHistories[0].created_at).getTime()
				: undefined,
			note: 'Order placed',
		},
	]

	let remainingStatus = [...statusList]

	sortedOrderHistories.forEach((history, index) => {
		const { actionStatus, created_at, note } = history

		const isLastHistory = index === sortedOrderHistories.length - 1

		const statusIndex = remainingStatus.indexOf(actionStatus)
		if (statusIndex !== -1) {
			remainingStatus = remainingStatus.slice(statusIndex + 1)
			eventList.push({
				status: actionStatus,
				date: created_at ? new Date(created_at).getTime() : undefined,
				loading: isLastHistory,
				note,
			})
		}
	})

	remainingStatus.forEach((status) => {
		eventList.push({ status, date: undefined })
	})

	return eventList
}

const getIconByStatus = (status: OrderStatus) => {
	switch (status) {
		case OrderStatus.PLACE_ORDER:
			return <Package />
		case OrderStatus.WAIT_FOR_CONFIRMATION:
			return <CircleHelp />
		case OrderStatus.WAIT_FOR_DELIVERY:
			return <CircleCheckBig />
		case OrderStatus.DELIVERING:
			return <Truck />
		case OrderStatus.COMPLETED:
			return <PackageCheck />
		case OrderStatus.PENDING:
			return <CircleAlert />
		default:
			return null
	}
}
