import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Color } from '@/schemas/color.schema'
import PageLayout from '@/shared/layouts/page'
import { useDeleteMany } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { colorColumns } from '../components/color-column'
import ColorFormDialog from '../layouts/color-form-dialog'

const ColorManagement = () => {
	const { mutate } = useDeleteMany()
	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Color>({
		columns: colorColumns,
	})

	return (
		<PageLayout title="Quản lý màu sắc" animated={true}>
			<DataTableHeader<Color>
				table={table}
				onSearch={(search) =>
					setFilters([
						{
							field: 'q',
							operator: 'eq',
							value: search,
						},
					])
				}
				reloadProps={{
					isLoading: tableQuery.isFetching,
					onClick: () => tableQuery.refetch(),
				}}
				left={<ColorFormDialog />}
			/>
			<DataTable<Color> table={table} />
			<DataTablePagination<Color>
				table={table}
				handleDelete={(ids: string[]) => mutate({ resource: 'color', ids })}
			/>
		</PageLayout>
	)
}

export default ColorManagement
