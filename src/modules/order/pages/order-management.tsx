import CreateButton from '@/components/custom/create-button'
import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Order } from '@/schemas/order.schema'
import PageLayout from '@/shared/layouts/page'
import { HttpError } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderColumns } from '../components/order-column'

const OrderManagement = () => {
	const navigate = useNavigate()

	const onUpdate = (row: Order) =>
		navigate(`/order/edit/${row.id}`, {
			state: {
				data: row,
			},
		})

	const columns = useMemo(() => OrderColumns({ onUpdate }), [])

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Order, HttpError, Order>({
		columns,
		refineCoreProps: {
			queryOptions: {
				queryKey: ['order', 'list'],
			},
		},
	})

	return (
		<PageLayout title="Quản lý hoá đơn" animated={true}>
			<DataTableHeader<Order>
				table={table}
				onSearch={(search) =>
					setFilters([
						{
							field: 'search',
							operator: 'eq',
							value: search,
						},
					])
				}
				reloadProps={{
					isLoading: tableQuery.isFetching,
					onClick: () => tableQuery.refetch(),
				}}
				left={<CreateButton />}
			/>
			<DataTable<Order> table={table} />
			<DataTablePagination<Order> table={table} />
		</PageLayout>
	)
}

export default OrderManagement
