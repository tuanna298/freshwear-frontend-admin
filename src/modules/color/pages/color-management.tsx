import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Color } from '@/schemas/color.schema'
import PageLayout from '@/shared/layouts/page'
import { HttpError, useDeleteMany } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useMemo } from 'react'
import { ColorColumns } from '../components/color-column'
import ColorDialog from '../components/color-dialog'

const ColorManagement = () => {
	const { mutate } = useDeleteMany()
	const columns = useMemo(() => ColorColumns(), [])

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
					mutate({
						resource: 'color',
						ids,
						successNotification: () => {
							return {
								message: 'Xóa thành công',
								type: 'success',
							}
						},
					})
				}
			/>
		</PageLayout>
	)
}

export default ColorManagement
