import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { User } from '@/schemas/auth/user.schema'
import PageLayout from '@/shared/layouts/page'
import { BaseKey, HttpError, useDelete, useDeleteMany } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserColumns } from '../components/user-column'

const UserManagement = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate } = useDeleteMany()

	const deleteMutation = useDelete()

	const onDelete = (id: BaseKey) =>
		deleteMutation.mutate({
			resource: 'user',
			id,
			successNotification() {
				return {
					message: 'Xóa thành công',
					type: 'success',
				}
			},
		})
	const onShow = (id: BaseKey) => navigate(`/user/show/${id}`)

	const columns = useMemo(() => UserColumns({ onDelete, onShow }), [])

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
							resource: 'user',
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
