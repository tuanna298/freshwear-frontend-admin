import {
	List as AntdList,
	ConfigProvider,
	Tooltip,
	Typography,
	theme,
} from 'antd'
import dayjs from 'dayjs'

import { OrderHistory, OrderStatus } from '@/schemas/order.schema'
import { useSimpleList } from '@refinedev/antd'
import React, { useEffect } from 'react'
import {
	CreatedAt,
	Number,
	Timeline,
	TimelineContent,
	TimelineItem,
} from './styled'

const { Text } = Typography

export const DashBoardOrderTimeline: React.FC = () => {
	const {
		listProps,
		queryResult: { refetch, data },
	} = useSimpleList<OrderHistory[]>({
		resource: 'order/history',
		sorters: {
			permanent: [
				{
					field: 'created_at',
					order: 'desc',
				},
			],
		},
		pagination: {
			pageSize: 4,
		},
		syncWithLocation: false,
	})

	const histories = data?.data

	const getStatusColor = (
		status: OrderStatus,
	):
		| { indicatorColor: string; backgroundColor: string; text: string }
		| undefined => {
		switch (status) {
			case 'PENDING':
				return {
					indicatorColor: 'orange',
					backgroundColor: '#fff7e6',
					text: 'Chờ xử lý',
				}
			case 'WAIT_FOR_CONFIRMATION':
				return {
					indicatorColor: 'cyan',
					backgroundColor: '#e6fffb',
					text: 'Đơn hàng đã được đặt',
				}
			case 'DELIVERING':
				return {
					indicatorColor: 'green',
					backgroundColor: '#e6f7ff',
					text: 'Đơn hàng đang được giao',
				}
			case 'WAIT_FOR_DELIVERY':
				return {
					indicatorColor: 'gray',
					backgroundColor: '#f1f1f1',
					text: 'Đơn hàng đã sẵn sàng giao',
				}
			case 'COMPLETED':
				return {
					indicatorColor: 'blue',
					backgroundColor: '#e6fffb',
					text: 'Đơn hàng đã hoàn thành',
				}
			case 'CANCELED':
				return {
					indicatorColor: 'purple',
					backgroundColor: '#f9f0ff',
					text: 'Đơn hàng đã bị hủy',
				}
			default:
				break
		}
	}

	useEffect(() => {
		refetch()
	}, [refetch])

	return (
		<AntdList
			className="mt-3"
			{...listProps}
			pagination={{
				...listProps.pagination,
				simple: true,
				showSizeChanger: false,
				hideOnSinglePage: true,
			}}
		>
			<ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
				<Timeline>
					{histories &&
						histories.length > 0 &&
						histories.map(({ id, action_status, created_at, order_code }) => {
							return (
								<TimelineItem
									key={id}
									color={getStatusColor(action_status)?.indicatorColor}
								>
									<TimelineContent
										backgroundColor={
											getStatusColor(action_status)?.backgroundColor ||
											'transparent'
										}
									>
										<Tooltip
											placement="topLeft"
											title={dayjs(created_at).format('lll')}
										>
											<CreatedAt italic>
												{dayjs(created_at).fromNow()}
											</CreatedAt>
										</Tooltip>
										<Text>{getStatusColor(action_status)?.text}</Text>
										<Number strong>{order_code}</Number>
									</TimelineContent>
								</TimelineItem>
							)
						})}
				</Timeline>
			</ConfigProvider>
		</AntdList>
	)
}
