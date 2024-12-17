import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Payment } from '@/schemas/payment.schema'
import PageLayout from '@/shared/layouts/page'
import { HttpError } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useMemo } from 'react'
import { PaymentColumns } from '../components/payment-color'

const PaymentManagement = () => {
	const columns = useMemo(() => PaymentColumns(), [])

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Payment, HttpError>({
		columns,
	})
	return (
		<PageLayout title="Quản lý giao dịch" animated={true}>
			<DataTableHeader<Payment>
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
			/>
			<DataTable<Payment> table={table} />
			<DataTablePagination<Payment> table={table} />
		</PageLayout>
	)
}

export default PaymentManagement
