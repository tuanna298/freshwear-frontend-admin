import { NumberField } from '@/components/custom/number-field'
import DataTable from '@/components/data-table/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order, OrderDetail } from '@/schemas/order.schema'
import {
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { SquareChartGantt } from 'lucide-react'
import { useMemo, useState } from 'react'
import { OrderDetailColumns } from './order-deliverables-column'

interface OrderDeliverablesProps {
	order: Order
}

const OrderDeliverables = ({ order }: OrderDeliverablesProps) => {
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(() => OrderDetailColumns({}), [])

	const table = useReactTable({
		data: (order?.details as OrderDetail[]) || [],
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between pb-0">
				<CardTitle className="text-4xl font-bold">Sản phẩm</CardTitle>
				<Button className="!m-0 flex gap-2">
					<SquareChartGantt />
					<span>Xem lịch sử hoá đơn</span>
				</Button>
			</CardHeader>

			<CardContent className="h-full space-y-2 p-6">
				<DataTable<OrderDetail> table={table} />
				<div className="flex w-full items-center justify-end">
					<span className="mr-2 text-2xl font-bold text-[#67be23]">TỔNG</span>
					<NumberField
						className="text-2xl font-bold"
						value={order?.total_money || 0}
					/>
				</div>
			</CardContent>
		</Card>
	)
}

export default OrderDeliverables
