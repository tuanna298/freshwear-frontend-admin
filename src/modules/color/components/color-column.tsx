import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Color, colorSchema } from '@/schemas/color.schema'
import { ColumnDef } from '@tanstack/react-table'
import ColorForm from '../layouts/color-form'

export const colorColumns: ColumnDef<Color>[] = [
	SelectCheckboxColumn<Color>(),
	IndexColumn<Color>(),
	{
		accessorKey: 'name',
		meta: 'Tên màu sắc',
		size: 100,
		header: (props) => <DataTableColumnHeader title="Tên màu sắc" {...props} />,
		cell: ({ row }) => row.getValue('name'),
	},
	{
		accessorKey: 'code',
		meta: 'Mã màu',
		header: (props) => <DataTableColumnHeader title="Mã màu" {...props} />,
		cell: ({ row }) => row.getValue('code'),
	},
	ActionsColumn<Color>({
		resource: 'color',
		formDialogProps: {
			schema: colorSchema,
			children: <ColorForm mode="update" />,
			className: 'h-fit',
			checkDirtyFields: false,
			title: 'Cập nhật màu sắc',
		},
	}),
]
