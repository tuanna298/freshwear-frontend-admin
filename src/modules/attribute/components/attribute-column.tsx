import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Attribute, attributeSchema } from '@/schemas/attribute.schema'
import { BaseKey } from '@refinedev/core'
import { ColumnDef } from '@tanstack/react-table'
import AttributeForm from './attribute-form'

interface AttributeColumnsParams {
	onDelete: (id: BaseKey) => void
	onSubmit: (data: Attribute) => void
	isSuccess?: boolean
}

export const AttributeColumns = ({
	onDelete,
	onSubmit,
	isSuccess,
}: AttributeColumnsParams): ColumnDef<Attribute>[] => [
	SelectCheckboxColumn<Attribute>(),
	IndexColumn<Attribute>({}),
	{
		accessorKey: 'name',
		meta: 'Tên thuộc tính',
		size: 100,
		header: (props) => (
			<DataTableColumnHeader title="Tên thuộc tính" {...props} />
		),
		cell: ({ row }) => row.getValue('name'),
	},
	ActionsColumn<Attribute>({
		formDialogProps: {
			schema: attributeSchema,
			children: <AttributeForm />,
			className: 'h-fit',
			checkDirtyFields: false,
			title: 'Cập nhật thuộc tính',
			onSubmit,
			isSuccess,
		},
		onDelete,
	}),
]
