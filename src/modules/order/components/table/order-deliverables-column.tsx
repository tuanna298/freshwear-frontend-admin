import { IndexColumn } from '@/components/data-table/columns/index-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { OrderDetail } from '@/schemas/order.schema'
import { ColumnDef } from '@tanstack/react-table'

interface OrderDetailColumnProps {}

export const OrderDetailColumns =
	({}: OrderDetailColumnProps): ColumnDef<OrderDetail>[] => {
		return [
			IndexColumn<OrderDetail>(),
			{
				accessorKey: 'name',
				meta: 'Sản phẩm',
				header: (props) => (
					<DataTableColumnHeader title="Sản phẩm" {...props} />
				),
				cell: ({ row }) => <span></span>,
			},
		]
	}
