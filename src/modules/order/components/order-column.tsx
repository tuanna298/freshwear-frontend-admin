import { NumberField } from '@/components/custom/number-field'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Order } from '@/schemas/order.schema'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import OrderActionsColumn from './actions/order-actions-column'
import { OrderDetailsPopover } from './order-details-popover'
import OrderStatusBadge from './order-status-badge'

interface OrderColumnsProps {
	onUpdate: (row: Order) => void
}

export const OrderColumns = ({
	onUpdate,
}: OrderColumnsProps): ColumnDef<Order>[] => {
	return [
		IndexColumn<Order>(),
		{
			accessorKey: 'code',
			meta: 'Mã',
			header: (props) => <DataTableColumnHeader title="Mã" {...props} />,
			cell: ({ row }) => row.original.code,
		},
		{
			accessorKey: 'status',
			meta: 'Trạng thái',
			header: (props) => (
				<DataTableColumnHeader title="Trạng thái" {...props} />
			),
			cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
		},
		{
			accessorKey: 'total_money',
			meta: 'Tổng tiền',
			header: (props) => <DataTableColumnHeader title="Tổng tiền" {...props} />,
			cell: ({ row }) => {
				return <NumberField value={row.original.total_money} />
			},
		},
		{
			accessorKey: 'user',
			meta: 'Khách hàng',
			header: (props) => (
				<DataTableColumnHeader title="Khách hàng" {...props} />
			),
			cell: ({ row }) => row.original?.user?.full_name || 'Khách vãng lai',
			enableSorting: false,
		},
		{
			accessorKey: 'deliverables',
			meta: 'Hàng hóa',
			header: (props) => <DataTableColumnHeader title="Hàng hóa" {...props} />,
			cell: ({ row }) => <OrderDetailsPopover record={row.original} />,
			enableSorting: false,
		},
		{
			accessorKey: 'created_at',
			meta: 'Tạo lúc',
			header: (props) => <DataTableColumnHeader title="Tạo lúc" {...props} />,
			cell: ({ row }) =>
				dayjs(row.original.created_at).format('DD/MM/YYYY HH:mm'),
			enableSorting: false,
		},
		OrderActionsColumn({
			onUpdate,
		}),
	]
}
