import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Review } from '@/schemas/review.schema'
import PageLayout from '@/shared/layouts/page'
import { HttpError, useDeleteMany } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { ReviewColumns } from '../components/review-color'

const ReviewManagement = () => {
	const queryClient = useQueryClient()

	const { mutate } = useDeleteMany()

	const columns = useMemo(() => ReviewColumns({}), [])

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Review, HttpError, Review>({
		columns,
	})
	return (
		<PageLayout title="Quản lý đánh giá khách hàng" animated={true}>
			<DataTableHeader<Review>
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
			<DataTable<Review> table={table} />
			<DataTablePagination<Review>
				table={table}
				handleDelete={(ids: string[]) =>
					mutate(
						{
							resource: 'color',
							ids,
							successNotification: () => {
								return {
									message: 'Xóa thành công',
									type: 'success',
								}
							},
						},
						{
							onSuccess() {
								queryClient.refetchQueries(['review'])
							},
						},
					)
				}
			/>
		</PageLayout>
	)
}

export default ReviewManagement
