import { NumberField } from '@/components/custom/number-field'
import ActionsColumn from '@/components/data-table/columns/actions-column'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { getContrastColor } from '@/lib/utils'
import { Attribute } from '@/schemas/attribute.schema'
import { Color } from '@/schemas/color.schema'
import { Product } from '@/schemas/product.schema'
import { BaseKey } from '@refinedev/core'
import { ColumnDef } from '@tanstack/react-table'

interface ProductColumnsProps {
	onUpdate: (id: BaseKey) => void
}

const renderQuantity = (product: Product) => {
	if (!product.details || product.details.length === 0) {
		return null
	}

	const totalQuantity = product.details.reduce((total, detail) => {
		return total + detail.quantity
	}, 0)

	return <div className="text-center">{totalQuantity}</div>
}

const renderPrice = (product: Product) => {
	if (!product.details || product.details.length === 0) {
		return null
	}

	const prices = product.details.map((detail) => detail.price)
	const lowestPrice = Math.min(...prices)

	return (
		<div className="text-center">
			{prices.length > 0 ? <NumberField value={lowestPrice} /> : null}
		</div>
	)
}

const renderSize = (product: Product) => {
	if (!product.details || product.details.length === 0) {
		return null
	}

	const sizes: Attribute[] = Object.values(
		product.details.reduce((uniqueSizeMap: any, detail) => {
			const sizeId = detail.size.id!
			if (!uniqueSizeMap[sizeId]) {
				uniqueSizeMap[sizeId] = detail.size
			}
			return uniqueSizeMap
		}, {}),
	)

	sizes.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<div className="flex flex-wrap items-center justify-center gap-2">
			{sizes.length > 0 && (
				<>
					{sizes.map((size) => (
						<Badge
							key={size.id!}
							className="aspect-square size-8 justify-center border-primary bg-background text-primary hover:bg-transparent"
						>
							{size.name}
						</Badge>
					))}
				</>
			)}
		</div>
	)
}

const renderColor = (product: Product) => {
	if (!product.details || product.details.length === 0) {
		return null
	}

	const colors: Color[] = Object.values(
		product.details!.reduce((uniqueColorMap: any, detail) => {
			const colorCode = detail.color.code
			if (!uniqueColorMap[colorCode]) {
				uniqueColorMap[colorCode] = detail.color
			}
			return uniqueColorMap
		}, {}),
	)

	colors.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<div className="flex flex-wrap items-center justify-center gap-2">
			{colors.length > 0 ? (
				<>
					{colors.map((color) => (
						<Badge
							className="justify-center"
							style={{
								backgroundColor: color.code,
								color: getContrastColor(color.code),
							}}
						>
							{color.code}
						</Badge>
					))}
				</>
			) : null}
		</div>
	)
}

export const ProductColumns = ({
	onUpdate,
}: ProductColumnsProps): ColumnDef<Product>[] => {
	return [
		SelectCheckboxColumn<Product>(),
		IndexColumn<Product>(),
		{
			accessorKey: 'code',
			meta: 'Mã',
			header: (props) => <DataTableColumnHeader title="Mã" {...props} />,
			cell: ({ row }) => row.original.code,
		},
		{
			accessorKey: 'name',
			meta: 'Tên',
			header: (props) => <DataTableColumnHeader title="Tên" {...props} />,
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-2">
						<img
							src={row.original.thumbnail!}
							alt={row.original.name}
							className="aspect-rectangle-vertical h-16"
						/>
						<span>{row.original.name}</span>
					</div>
				)
			},
		},
		{
			accessorKey: 'colors',
			meta: 'Màu sắc',
			header: (props) => (
				<DataTableColumnHeader
					className="text-center"
					title="Màu sắc"
					{...props}
				/>
			),
			cell: ({ row }) => renderColor(row.original),
			enableSorting: false,
		},
		{
			accessorKey: 'sizes',
			meta: 'Kích cỡ',
			header: (props) => (
				<DataTableColumnHeader
					className="text-center"
					title="Kích cỡ"
					{...props}
				/>
			),
			cell: ({ row }) => renderSize(row.original),
			enableSorting: false,
		},
		{
			accessorKey: 'price',
			meta: 'Giá',
			header: (props) => (
				<DataTableColumnHeader className="text-center" title="Giá" {...props} />
			),
			cell: ({ row }) => renderPrice(row.original),
			enableSorting: false,
		},
		{
			accessorKey: 'quantity',
			meta: 'SL tồn',
			header: (props) => (
				<DataTableColumnHeader
					className="text-center"
					title="SL tồn"
					{...props}
				/>
			),
			cell: ({ row }) => renderQuantity(row.original),
			enableSorting: false,
		},
		ActionsColumn<Product>({
			resource: 'product',
			onUpdate,
		}),
	]
}
