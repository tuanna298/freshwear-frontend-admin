import DataTable from '@/components/data-table/data-table'
import { OrderDetail } from '@/schemas/order.schema'
import {
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { OrderDetailColumns } from './order-deliverables-column'

interface OrderDeliverablesProps {
	details: OrderDetail[]
}

const OrderDeliverables = ({ details }: OrderDeliverablesProps) => {
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(() => OrderDetailColumns({}), [])

	const table = useReactTable({
		data: details,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return <DataTable<OrderDetail> table={table} />
}

export default OrderDeliverables
