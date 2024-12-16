import { DateField } from '@/components/custom/date-field'
import { OrderDetailsPopover } from '@/modules/order/components/order-details-popover'
import OrderStatusBadge from '@/modules/order/components/order-status-badge'
import { Order } from '@/schemas/order.schema'
import { baseTablePaginationConfig } from '@/shared/common/constants'
import { List, NumberField, useTable } from '@refinedev/antd'
import { BaseKey, HttpError, useNavigation } from '@refinedev/core'
import { Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMemo } from 'react'

const { Text } = Typography

type UserOrderListProps = {
	id: string | undefined
}

const UserOrderList: React.FC<UserOrderListProps> = ({ id }) => {
	const { edit } = useNavigation()

	const { tableProps, current, pageSize, sorters } = useTable<Order, HttpError>(
		{
			resource: 'order',
			pagination: {
				pageSize: 5,
			},
			initialSorter: [
				{
					field: 'created_at',
					order: 'desc',
				},
			],
			permanentFilter: [
				{
					field: 'user_id',
					operator: 'eq',
					value: id,
				},
			],
		},
	)

	const columns = useMemo<ColumnsType<Order>>(
		() => [
			{
				title: 'Mã',
				key: 'code',
				dataIndex: 'code',
				align: 'center',
				sorter: {},
				render: (_, { code }) => {
					return <Text>{code ? code : 'N/A'}</Text>
				},
			},
			{
				title: 'Trạng thái',
				key: 'status',
				dataIndex: 'status',
				align: 'center',
				sorter: {},
				render: (_, { status }) => <OrderStatusBadge status={status} />,
			},
			{
				title: 'Tổng tiền',
				key: 'total_money',
				dataIndex: 'total_money',
				align: 'end',
				sorter: {},
				render: (_, { total_money }) => (
					<NumberField
						options={{
							currency: 'VND',
							style: 'currency',
						}}
						value={total_money}
						locale={'vi'}
					/>
				),
			},
			{
				title: 'Sản phẩm',
				key: 'details',
				dataIndex: 'details',
				sorter: false,
				align: 'center',
				render: (_, record) => {
					return <OrderDetailsPopover record={record} />
				},
			},
			{
				title: 'Tạo lúc',
				key: 'created_at',
				dataIndex: 'created_at',
				defaultSortOrder: 'descend',
				sorter: {},
				render: (value) => {
					return <DateField format="DD/MM/YYYY" value={value} />
				},
			},
		],
		[sorters, current, pageSize, tableProps],
	)

	return (
		<List title="Đơn hàng" canCreate={false}>
			<Table
				{...tableProps}
				rowKey="id"
				columns={columns}
				pagination={{
					...tableProps.pagination,
					...baseTablePaginationConfig,
				}}
				onRow={(record) => {
					return {
						onDoubleClick: () => {
							return edit('order', record.id as BaseKey)
						},
					}
				}}
			/>
		</List>
	)
}

export default UserOrderList
