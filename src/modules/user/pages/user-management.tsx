import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { User } from '@/schemas/auth/user.schema'
import PageLayout from '@/shared/layouts/page'
import { HttpError, useDeleteMany } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { UserColumns } from '../components/user-column'

const UserManagement = () => {
	const queryClient = useQueryClient()

	const { mutate } = useDeleteMany()

	const columns = useMemo(() => UserColumns({}), [])

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<User, HttpError, User>({
		columns,
	})

	return (
		<PageLayout title="Quản lý người dùng" animated={true}>
			<DataTableHeader<User>
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
			<DataTable<User> table={table} />
			<DataTablePagination<User>
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
								queryClient.refetchQueries(['user'])
							},
						},
					)
				}
			/>
		</PageLayout>
	)
}

export default UserManagement
