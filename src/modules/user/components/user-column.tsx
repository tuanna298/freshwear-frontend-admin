import { DateField } from '@/components/custom/date-field'
import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { User } from '@/schemas/auth/user.schema'
import { BaseKey } from '@refinedev/core'
import { ColumnDef } from '@tanstack/react-table'
import { ScanSearch } from 'lucide-react'

interface UserColumnsProps {
	onDelete: (id: BaseKey) => void
	onShow: (id: BaseKey) => void
}

export const UserColumns = ({
	onDelete,
	onShow,
}: UserColumnsProps): ColumnDef<User>[] => {
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
		ActionsColumn<User>({
			display: {
				delete: true,
				update: false,
			},
			onDelete,
			actions: (user: User) => (
				<ScanSearch
					className="size-4 cursor-pointer text-primary"
					onClick={() => onShow(user.id as BaseKey)}
				/>
			),
		}),
	]
}
