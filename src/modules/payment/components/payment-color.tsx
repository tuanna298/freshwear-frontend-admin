import { IndexColumn } from '@/components/data-table/columns/index-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Payment, PaymentMethod } from '@/schemas/payment.schema'
import { ColumnDef } from '@tanstack/react-table'

export const PaymentColumns = (): ColumnDef<Payment>[] => {
	return [
		IndexColumn<Payment>({}),
		{
			accessorKey: 'user_id',
			meta: 'Khách hàng',
			header: (props) => (
				<DataTableColumnHeader title="Khách hàng" {...props} />
			),
			cell: ({ row }) =>
				row.original?.order?.user?.full_name || 'Khách vãng lai',
			enableSorting: false,
		},
		{
			accessorKey: 'order_id',
			meta: 'Đơn hàng',
			header: (props) => <DataTableColumnHeader title="Đơn hàng" {...props} />,
			cell: ({ row }) => row.original?.order?.code,
		},
		{
			accessorKey: 'total',
			meta: 'Tổng tiền',
			header: (props) => <DataTableColumnHeader title="Tổng tiền" {...props} />,
			cell: ({ row }) => row.original.total,
		},
		{
			accessorKey: 'method',
			meta: 'Phương thức thanh toán',
			header: (props) => (
				<DataTableColumnHeader title="Phương thức thanh toán" {...props} />
			),
			cell: ({ row }) =>
				row.original.method === PaymentMethod.CASH
					? 'Tiền mặt'
					: 'Chuyển khoản',
		},
		{
			accessorKey: 'transaction_code',
			meta: 'Mã giao dịch',
			header: (props) => (
				<DataTableColumnHeader title="Mã giao dịch" {...props} />
			),
			cell: ({ row }) => row.original.transaction_code,
		},
		{
			accessorKey: 'status',
			meta: 'Trạng thái',
			header: (props) => (
				<DataTableColumnHeader title="Trạng thái" {...props} />
			),
			cell: ({ row }) => row.original.status,
		},
		{
			accessorKey: 'updated_at',
			meta: 'Thanh toán lúc',
			header: (props) => (
				<DataTableColumnHeader title="Thanh toán lúc" {...props} />
			),
			cell: ({ row }) => row.original.updated_at,
		},
	]
}
