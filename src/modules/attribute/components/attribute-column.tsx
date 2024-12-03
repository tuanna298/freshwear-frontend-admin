import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Attribute, attributeSchema } from '@/schemas/attribute.schema'
import { ColumnDef } from '@tanstack/react-table'
import AttributeForm from './attribute-form'

interface AttributeColumnsParams {
	resource: string
}

export const AttributeColumns = ({
	resource,
}: AttributeColumnsParams): ColumnDef<Attribute>[] => [
	SelectCheckboxColumn<Attribute>(),
	IndexColumn<Attribute>(),
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
		resource,
		formDialogProps: {
			schema: attributeSchema,
			children: <AttributeForm />,
			className: 'h-fit',
			checkDirtyFields: false,
			title: 'Cập nhật thuộc tính',
		},
	}),
]
