import { ColumnDef } from '@tanstack/react-table'

import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Order } from '@/schemas/order.schema'
import { ScanSearch } from 'lucide-react'
import OrderAccept from './order-accept'
import OrderReject from './order-reject'

type ActionColumnParams = {
	onUpdate?: (row: Order) => void
}

const OrderActionsColumn = ({
	onUpdate,
}: ActionColumnParams): ColumnDef<Order> => {
	return {
		id: 'actions',
		enableHiding: false,
		size: 100,
		cell: ({ row: { original } }) => {
			return (
				<div className="flex items-center justify-center gap-2">
					<OrderAccept />
					<OrderReject />
					<Button
						variant="outline"
						size="icon"
						className="size-[30px] border-primary text-primary hover:text-primary"
						onClick={() => onUpdate?.(original)}
					>
						<ScanSearch size={18} />
					</Button>
				</div>
			)
		},
		meta: 'Hành động',
		header: (props) => (
			<DataTableColumnHeader
				className="text-center"
				title="Hành động"
				{...props}
			/>
		),
	}
}

export default OrderActionsColumn
