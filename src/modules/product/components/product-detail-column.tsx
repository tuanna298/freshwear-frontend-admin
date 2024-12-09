import { FileUploader } from '@/components/custom/file-uploader'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import { SelectCheckboxColumn } from '@/components/data-table/columns/select-checkbox-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductDetail } from '@/schemas/product.schema'
import { UploadedFile } from '@/types'
import { ColumnDef, Row } from '@tanstack/react-table'
import { Trash } from 'lucide-react'

interface ProductDetailColumnProps {
	productName: string
	onUpdateProductDetail: (
		id: string,
		field: keyof ProductDetail,
		value: any,
	) => void
	onDeleteProductDetail: (id: string) => void
	onBatchUpdateProductDetails?: (
		field: keyof ProductDetail,
		value: any,
		selectedRows: Row<ProductDetail>[],
	) => void
	fileUploaderProps: {
		onUpload: (files: File[]) => Promise<UploadedFile<unknown>[] | undefined>
		progresses: Record<string, number>
		isUploading: boolean
		uploadedFiles: UploadedFile[]
	}
}

export const ProductDetailColumns = ({
	onUpdateProductDetail,
	onDeleteProductDetail,
	onBatchUpdateProductDetails,
	fileUploaderProps,
	productName,
}: ProductDetailColumnProps): ColumnDef<ProductDetail>[] => {
	return [
		SelectCheckboxColumn<ProductDetail>(),
		IndexColumn<ProductDetail>(),
		{
			accessorKey: 'name',
			meta: 'Tên',
			header: (props) => <DataTableColumnHeader title="Tên" {...props} />,
			cell: ({ row }) => (
				<span>
					{productName} [{row.original.color?.name} - {row.original.size?.name}]
				</span>
			),
		},
		{
			accessorKey: 'quantity',
			meta: 'Số lượng',
			header: (props) => <DataTableColumnHeader title="Số lượng" {...props} />,
			cell: ({ row, table }) => (
				<Input
					type="number"
					value={row.getValue('quantity')}
					onChange={(e) => {
						const value = Number(e.target.value)
						const selectedRows = table.getSelectedRowModel().rows
						// Nếu có batch update và có hàng được chọn
						if (onBatchUpdateProductDetails && selectedRows.length > 0) {
							onBatchUpdateProductDetails('quantity', value, selectedRows)
						} else {
							// Giữ nguyên logic cập nhật cũ
							onUpdateProductDetail(row.original.id!, 'quantity', value)
						}
					}}
					min={0}
				/>
			),
		},
		{
			accessorKey: 'price',
			meta: 'Giá',
			header: (props) => <DataTableColumnHeader title="Giá" {...props} />,
			cell: ({ row, table }) => (
				<Input
					type="number"
					value={row.getValue('price')}
					onChange={(e) => {
						const value = Number(e.target.value)
						const selectedRows = table.getSelectedRowModel().rows
						// Nếu có batch update và có hàng được chọn
						if (onBatchUpdateProductDetails && selectedRows.length > 0) {
							onBatchUpdateProductDetails('price', value, selectedRows)
						} else {
							onUpdateProductDetail(row.original.id!, 'price', value)
						}
					}}
					min={0}
				/>
			),
		},
		{
			size: 50,
			accessorKey: 'actions',
			meta: 'Hành động',
			header: (props) => <DataTableColumnHeader title="" {...props} />,
			cell: ({ row }) => (
				<Button
					type="button"
					variant="destructive"
					size="icon"
					className="h-8 w-8 hover:bg-destructive/20"
					onClick={() => onDeleteProductDetail(row.original.id!)}
				>
					<Trash className="h-4 w-4" />
				</Button>
			),
			enableSorting: false,
		},
		{
			accessorKey: 'images',
			meta: 'Hình ảnh',
			header: (props) => (
				<DataTableColumnHeader
					className="text-center"
					title="Hình ảnh"
					{...props}
				/>
			),
			cell: ({ row, table }) => (
				<FileUploader
					maxSize={5 * 1024 * 1024}
					{...fileUploaderProps}
					placeholder={row.original.image!}
					onUpload={async (files) => {
						const result = await fileUploaderProps.onUpload(files)
						if (!result?.length) return
						const selectedRows = table.getSelectedRowModel().rows

						// Nếu có batch update và có hàng được chọn
						if (onBatchUpdateProductDetails && selectedRows.length > 0) {
							onBatchUpdateProductDetails('image', result[0].url!, selectedRows)
						} else {
							onUpdateProductDetail(row.original.id!, 'image', result[0].url!)
						}
					}}
					className="aspect-square h-48"
					iconOnly
				/>
			),
			enableSorting: false,
		},
	]
}
