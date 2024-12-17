import { ColumnDef } from '@tanstack/react-table'

import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Order, OrderStatus } from '@/schemas/order.schema'
import { Ban, CheckCircle, ScanSearch } from 'lucide-react'
import OrderStatusUpdate from './order-status-update'

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
					<OrderStatusUpdate
						order={original}
						placeholder="Xác nhận đơn hàng"
						trigger={
							<Button
								variant="outline"
								size="icon"
								className="size-[30px] border-green-600 text-green-600 hover:text-green-600"
								disabled={original.status !== OrderStatus.WAIT_FOR_CONFIRMATION}
							>
								<CheckCircle size={18} />
							</Button>
						}
					/>
					<OrderStatusUpdate
						order={original}
						placeholder="Không đáp ứng được yêu cầu của khách hàng"
						trigger={
							<Button
								variant="outline"
								size="icon"
								className="size-[30px] border-destructive text-destructive hover:text-destructive"
								disabled={
									original.status === OrderStatus.COMPLETED ||
									original.status === OrderStatus.CANCELED ||
									original.status === OrderStatus.PAYMENT_FAILED
								}
							>
								<Ban size={18} />
							</Button>
						}
						isRejection
					/>
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
