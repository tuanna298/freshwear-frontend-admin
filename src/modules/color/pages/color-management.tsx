import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Color } from '@/schemas/color.schema'
import PageLayout from '@/shared/layouts/page'
import {
	BaseKey,
	HttpError,
	useDelete,
	useDeleteMany,
	useUpdate,
} from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { ColorColumns } from '../components/color-column'
import ColorDialog from '../components/color-dialog'

const ColorManagement = () => {
	const queryClient = useQueryClient()

	const { mutate } = useDeleteMany()

	const deleteMutation = useDelete()
	const update = useUpdate({
		resource: 'color',
		successNotification() {
			return {
				message: 'Cập nhật thành công',
				type: 'success',
			}
		},
	})
	const onUpdate = (data: Color) =>
		update.mutate(
			{
				id: data.id,
				values: data,
			},
			{
				onSuccess() {
					queryClient.invalidateQueries(['color', 'list'])
				},
			},
		)
	const onDelete = (id: BaseKey) =>
		deleteMutation.mutate(
			{
				resource: 'color',
				id,
				successNotification() {
					return {
						message: 'Xóa thành công',
						type: 'success',
					}
				},
			},
			{
				onSuccess() {
					queryClient.invalidateQueries(['color', 'list'])
				},
			},
		)

	const columns = useMemo(
		() =>
			ColorColumns({
				onDelete,
				onSubmit: onUpdate,
				isSuccess: update.isSuccess,
			}),
		[update.isSuccess],
	)

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Color, HttpError, Color>({
		columns,
	})

	return (
		<PageLayout title="Quản lý màu sắc" animated={true}>
			<DataTableHeader<Color>
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
				left={<ColorDialog />}
			/>
			<DataTable<Color> table={table} />
			<DataTablePagination<Color>
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
								queryClient.refetchQueries(['color'])
							},
						},
					)
				}
			/>
		</PageLayout>
	)
}

export default ColorManagement
