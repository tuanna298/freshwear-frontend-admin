import { DateField } from '@/components/custom/date-field'
import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { User } from '@/schemas/auth/user.schema'
import { ColumnDef } from '@tanstack/react-table'

interface UserColumnsProps {}

export const UserColumns = ({}: UserColumnsProps): ColumnDef<User>[] => {
	return [
		SelectCheckboxColumn<User>(),
		IndexColumn<User>({}),
		{
			accessorKey: 'full_name',
			meta: 'Tên',
			header: (props) => <DataTableColumnHeader title="Tên" {...props} />,
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<img
						src={row.original.avatar! || '/images/avatar_placeholder.png'}
						alt={row.original.full_name}
						className="aspect-square h-10 rounded-full"
					/>
					<span>{row.original.full_name}</span>
				</div>
			),
		},
		{
			accessorKey: 'phone_number',
			meta: 'Số điện thoại',
			header: (props) => (
				<DataTableColumnHeader title="Số điện thoại" {...props} />
			),
			cell: ({ row }) => row.original.phone_number,
		},
		{
			accessorKey: 'email',
			meta: 'Email',
			header: (props) => <DataTableColumnHeader title="Email" {...props} />,
			cell: ({ row }) => row.original.email,
		},
		{
			accessorKey: 'dob',
			meta: 'Ngày sinh',
			header: (props) => <DataTableColumnHeader title="Ngày sinh" {...props} />,
			cell: ({ row }) => row.original.dob,
		},
		{
			accessorKey: 'address',
			meta: 'Địa chỉ',
			header: (props) => <DataTableColumnHeader title="Địa chỉ" {...props} />,
			cell: ({ row }) => row.original.address,
		},
		{
			accessorKey: 'last_login',
			meta: 'Đăng nhập cuối',
			header: (props) => (
				<DataTableColumnHeader title="Đăng nhập cuối" {...props} />
			),
			cell: ({ row }) => (
				<DateField
					value={row.original.last_login}
					format="DD/MM/YYYY hh:mm:ss"
				/>
			),
		},
		ActionsColumn<User>({}),
	]
}
