import { NumberField } from '@/components/custom/number-field'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { OrderDetail } from '@/schemas/order.schema'
import { ColumnDef } from '@tanstack/react-table'

interface OrderDetailColumnProps {}

export const OrderDetailColumns =
	({}: OrderDetailColumnProps): ColumnDef<OrderDetail>[] => {
		return [
			IndexColumn<OrderDetail>({}),
			{
				accessorKey: 'name',
				meta: 'Sản phẩm',
				header: (props) => (
					<DataTableColumnHeader
						title="Sản phẩm"
						className="w-full text-center"
						{...props}
					/>
				),
				cell: ({ row }) => (
					<div className="flex items-center">
						<img
							src={
								row.original.product_detail?.image ||
								'assets/img/other/placeholder.jpg'
							}
							className="aspect-square size-[60xp] rounded-full lg:size-[108px]"
							alt="product-image"
						/>

						<div className="ms-[25px] flex flex-col whitespace-nowrap">
							<span className="text-2xl font-bold">
								{row.original.product_detail?.product?.name}
							</span>
							<span>{row.original.product_detail?.product?.code}</span>
						</div>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'quantity',
				meta: 'Số lượng',
				header: (props) => (
					<DataTableColumnHeader
						title="Số lượng"
						className="w-full justify-center text-center"
						{...props}
					/>
				),
				cell: ({ row }) => (
					<div className="px-3 text-center font-bold">
						x{row.original.quantity}
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'price',
				meta: 'Đơn giá',
				header: (props) => (
					<DataTableColumnHeader
						title="Đơn giá"
						className="w-full text-end"
						{...props}
					/>
				),
				cell: ({ row }) => (
					<div className="text-end">
						<NumberField
							className="font-bold"
							value={row.original.product_detail?.price ?? 0}
						/>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'amount',
				meta: 'Thành tiền',
				header: (props) => (
					<DataTableColumnHeader
						title="Thành tiền"
						className="w-full text-end"
						{...props}
					/>
				),
				cell: ({ row }) => (
					<div className="text-end">
						<NumberField
							className="font-bold"
							value={
								(row.original.quantity ?? 0) *
								(row.original.product_detail?.price ?? 0)
							}
						/>
					</div>
				),
				enableSorting: false,
			},
		]
	}
