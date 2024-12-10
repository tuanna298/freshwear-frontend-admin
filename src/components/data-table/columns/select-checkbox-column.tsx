import { Checkbox } from '@/components/ui/checkbox'
import { BaseDTO } from '@/shared/common/interfaces'
import { ColumnDef } from '@tanstack/react-table'

export const SelectCheckboxColumn = <T extends BaseDTO>(
	disabled: boolean = false,
): ColumnDef<T> => ({
	id: 'select',
	size: 50,
	header: ({ table }) => (
		<Checkbox
			disabled={disabled}
			checked={
				table.getIsAllPageRowsSelected() ||
				(table.getIsSomePageRowsSelected() && 'indeterminate')
			}
			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			aria-label="Select all"
		/>
	),
	cell: ({ row }) => (
		<Checkbox
			disabled={disabled}
			checked={row.getIsSelected()}
			onCheckedChange={(value) => row.toggleSelected(!!value)}
			aria-label="Select row"
		/>
	),
	enableSorting: false,
	enableHiding: false,
})
