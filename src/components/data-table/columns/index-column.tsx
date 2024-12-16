import { ColumnDef } from '@tanstack/react-table'

import { BaseDTO } from '@/shared/common/interfaces'
import DataTableColumnHeader from '../data-table-column-header'

interface IndexColumnProps {
	enableSorting?: boolean
}

export const IndexColumn = <T extends BaseDTO>({
	enableSorting,
}: IndexColumnProps): ColumnDef<T> => ({
	accessorKey: 'index',
	meta: '#',
	size: 1,
	header: (props) => (
		<DataTableColumnHeader className="text-center" title="#" {...props} />
	),
	cell: ({ row, table }) => {
		const { pagination } = table.getState()
		const { pageIndex, pageSize } = pagination

		const isDescOrder = table.getColumn('index')?.getIsSorted() === 'desc'

		return isDescOrder
			? table.getPageCount() - pageIndex * pageSize - row.index
			: pageIndex * pageSize + row.index + 1
	},
	enableSorting,
})
