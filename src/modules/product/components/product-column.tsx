import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Product } from '@/schemas/product.schema'
import { BaseKey } from '@refinedev/core'
import { ColumnDef } from '@tanstack/react-table'

interface ProductColumnsProps {
	onUpdate: (id: BaseKey) => void
}

export const ProductColumns = ({
	onUpdate,
}: ProductColumnsProps): ColumnDef<Product>[] => {
	return [
		SelectCheckboxColumn<Product>(),
		IndexColumn<Product>(),
		{
			accessorKey: 'name',
			meta: 'Tên màu sắc',
			size: 100,
			header: (props) => (
				<DataTableColumnHeader title="Tên màu sắc" {...props} />
			),
			cell: ({ row }) => row.getValue('name'),
		},
		ActionsColumn<Product>({
			resource: 'product',
			onUpdate,
		}),
	]
}
