import { DateField } from '@/components/custom/date-field'
import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Review } from '@/schemas/review.schema'
import { ColumnDef } from '@tanstack/react-table'
import { Image, Rate } from 'antd'

interface ReviewColumnsProps {}

export const ReviewColumns = ({}: ReviewColumnsProps): ColumnDef<Review>[] => {
	return [
		SelectCheckboxColumn<Review>(),
		IndexColumn<Review>({}),
		{
			accessorKey: 'user_id',
			meta: 'Khách hàng',
			header: (props) => (
				<DataTableColumnHeader title="Khách hàng" {...props} />
			),
			cell: ({ row }) => row.original.user.full_name,
		},
		{
			accessorKey: 'rating',
			meta: 'Đánh giá',
			header: (props) => <DataTableColumnHeader title="Đánh giá" {...props} />,
			cell: ({ row }) => <Rate value={row.original.rating} disabled />,
		},
		{
			accessorKey: 'comment',
			meta: 'Bình luận',
			header: (props) => <DataTableColumnHeader title="Bình luận" {...props} />,
			cell: ({ row }) => row.original.comment,
		},
		{
			accessorKey: 'image',
			meta: 'Hình ảnh',
			header: (props) => <DataTableColumnHeader title="Hình ảnh" {...props} />,
			cell: ({ row }) => <Image src={row.original.image} width={100} />,
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
		ActionsColumn<Review>({}),
	]
}
