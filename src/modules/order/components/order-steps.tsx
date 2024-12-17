import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
	Order,
	OrderHistory,
	OrderStatus,
	OrderStatusLabel,
} from '@/schemas/order.schema'
import { IEvent } from '@/types'
import {
	AlertOutlined,
	CarOutlined,
	CheckOutlined,
	DropboxOutlined,
	FileProtectOutlined,
	LoadingOutlined,
	QuestionOutlined,
} from '@ant-design/icons'
import { Skeleton, Steps, Tooltip } from 'antd'
import Grid from 'antd/es/grid'
import dayjs from 'dayjs'
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
		event.status !== 'CANCELED' &&
		event.status !== OrderStatus.PAYMENT_FAILED &&
		event.status !== 'COMPLETED' &&
		event.loading

	const stepStatus = (event: IEvent) => {
		if (!event.date) return 'wait'
		if (event.status === 'CANCELED') return 'error'
		if (event.status === OrderStatus.PAYMENT_FAILED) return 'error'
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
		<Card>
			<CardHeader className="hidden" />

			<CardContent
				style={{
					overflow: 'auto',
					whiteSpace: 'nowrap',
					padding: 0,
					maxWidth: 'calc(100vw - 350px)',
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
								subTitle={
									<Tooltip
										title={event.date && dayjs(event.date).format('LLL')}
									>
										{event.date && dayjs(event.date).format('DD/MM')}
									</Tooltip>
								}
							/>
						))}
					</Steps>
				)}
				{!order && <Skeleton paragraph={{ rows: 1 }} />}
			</CardContent>
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
		OrderStatus.PAYMENT_FAILED,
	]

	// If there's 'CANCELED' status in orderHistories, remove it from statusList
	if (
		!orderHistories.some(
			(history) => history.action_status === OrderStatus.CANCELED,
		)
	) {
		statusList = statusList.filter((status) => status !== OrderStatus.CANCELED)
	}

	// If there's 'PAYMENT_FAILED' status in orderHistories, keep it; otherwise, remove it
	if (
		!orderHistories.some(
			(history) => history.action_status === OrderStatus.PAYMENT_FAILED,
		)
	) {
		statusList = statusList.filter(
			(status) => status !== OrderStatus.PAYMENT_FAILED,
		)
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
			note: 'Đơn hàng đã được tạo',
		},
	]

	let remainingStatus = [...statusList]

	sortedOrderHistories.forEach((history, index) => {
		const { action_status, created_at, note } = history

		const isLastHistory = index === sortedOrderHistories.length - 1

		const statusIndex = remainingStatus.indexOf(action_status)

		if (statusIndex !== -1) {
			remainingStatus = remainingStatus.slice(statusIndex + 1)
			eventList.push({
				status: action_status,
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
			return <DropboxOutlined />
		case OrderStatus.WAIT_FOR_CONFIRMATION:
			return <QuestionOutlined />
		case OrderStatus.WAIT_FOR_DELIVERY:
			return <CheckOutlined />
		case OrderStatus.DELIVERING:
			return <CarOutlined />
		case OrderStatus.COMPLETED:
			return <FileProtectOutlined />
		case OrderStatus.PENDING:
			return <AlertOutlined />
		default:
			return null
	}
}
