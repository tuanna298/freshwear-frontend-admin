import { useTable } from '@refinedev/antd'
import { useNavigation } from '@refinedev/core'
import { Avatar, Space, Table, Tag, Typography } from 'antd'
import { OrderId, Price, Title, TitleWrapper } from './styled'

import { Order, OrderStatusLabel } from '@/schemas/order.schema'
import { ColumnsType } from 'antd/es/table'

const { Paragraph } = Typography

export const RecentOrders: React.FC = () => {
	const {
		tableProps,
		tableQueryResult: { refetch },
	} = useTable<Order>({
		resource: 'order',
		initialSorter: [
			{
				field: 'updated_at',
				order: 'desc',
			},
		],
		initialPageSize: 4,
		permanentFilter: [
			{
				field: 'status',
				operator: 'eq',
				value: 'COMPLETED',
			},
		],
		syncWithLocation: false,
	})

	const { show } = useNavigation()

	const columns: ColumnsType<Order> = [
		{
			title: '',
			key: 'avatar',
			align: 'center',
			render: (_, record) => (
				<Avatar
					size={{
						xs: 60,
						lg: 108,
						xl: 132,
						xxl: 144,
					}}
					src={
						record.details[0]?.product_detail?.product?.thumbnail ??
						'/assets/images/placeholder.jpg'
					}
				/>
			),
		},
		{
			title: '',
			key: 'summary',
			render: (_, record) => (
				<TitleWrapper>
					<Title strong>
						{record.details[0]?.product_detail?.product?.name}
					</Title>
					<Paragraph
						ellipsis={{
							rows: 2,
							tooltip: record.details[0]?.product_detail?.product?.description,
							symbol: <span>...</span>,
						}}
					>
						{record.details[0]?.product_detail?.product?.description}
					</Paragraph>

					<OrderId
						strong
						onClick={() => {
							show('orders', record?.id as any)
						}}
					>
						#{record.code}
					</OrderId>
				</TitleWrapper>
			),
		},
		{
			key: 'amount',
			render: (_, record) => (
				<Space
					size="large"
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Price
						strong
						options={{
							currency: 'VND',
							style: 'currency',
							notation: 'standard',
						}}
						value={record.totalMoney}
					/>
					<Tag color="orange">{OrderStatusLabel[record.status]}</Tag>
				</Space>
			),
		},
	]
	return (
		<Table
			{...tableProps}
			pagination={{ ...tableProps.pagination, simple: true }}
			showHeader={false}
			rowKey="id"
			columns={columns}
		/>
	)
}
