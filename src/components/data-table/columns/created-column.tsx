import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

import { BaseDTO } from '@/shared/common/interfaces'
import CodeCell from '../cell/code-cell'
import DataTableColumnHeader from '../data-table-column-header'

export const CreatedColumn = <T extends BaseDTO>(
	title?: string,
	size?: number,
	format?: string,
): ColumnDef<T> => ({
	accessorKey: 'created_at',
	meta: title || 'Ngày tạo',
	size: size || 100,
	header: (props) => (
		<DataTableColumnHeader title={title || 'Ngày tạo'} {...props} />
	),
	cell: ({ row: { original } }) => (
		<CodeCell
			value={dayjs(original.created_at).format(format || 'HH:mm DD/MM/YYYY')}
		/>
	),
})
