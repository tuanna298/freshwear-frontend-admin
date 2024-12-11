import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { getContrastColor } from '@/lib/utils'
import { Color, colorSchema } from '@/schemas/color.schema'
import { BaseKey } from '@refinedev/core'
import { ColumnDef } from '@tanstack/react-table'
import ColorForm from './color-form'

interface ColorColumnsProps {
	onDelete: (id: BaseKey) => void
	onSubmit: (data: Color) => void
	isSuccess: boolean
}
export const ColorColumns = ({
	onDelete,
	onSubmit,
	isSuccess,
}: ColorColumnsProps): ColumnDef<Color>[] => {
	return [
		SelectCheckboxColumn<Color>(),
		IndexColumn<Color>({}),
		{
			accessorKey: 'name',
			meta: 'Tên màu sắc',
			size: 100,
			header: (props) => (
				<DataTableColumnHeader title="Tên màu sắc" {...props} />
			),
			cell: ({ row }) => row.getValue('name'),
		},
		{
			accessorKey: 'code',
			meta: 'Mã màu',
			header: (props) => <DataTableColumnHeader title="Mã màu" {...props} />,
			cell: ({ row }) => {
				const color = row.getValue<string>('code')
				return (
					<Badge
						className="justify-center"
						style={{
							backgroundColor: color,
							color: getContrastColor(color),
						}}
					>
						{color}
					</Badge>
				)
			},
		},
		ActionsColumn<Color>({
			formDialogProps: {
				schema: colorSchema,
				children: <ColorForm mode="update" />,
				className: 'h-fit',
				checkDirtyFields: false,
				title: 'Cập nhật màu sắc',
				onSubmit,
				isSuccess,
			},
			onDelete,
		}),
	]
}
