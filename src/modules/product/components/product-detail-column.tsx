import { CurrencyInput } from '@/components/custom/currency-input'
import { FileUploader } from '@/components/custom/file-uploader'
import { IndexColumn } from '@/components/data-table/columns/index-column'
import DataTableColumnHeader from '@/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductDetail } from '@/schemas/product.schema'
import { UploadedFile } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Trash } from 'lucide-react'

interface ProductDetailColumnProps {
	productName: string
	onUpdateProductDetail: (
		id: string,
		field: keyof ProductDetail,
		value: any,
	) => void
	onDeleteProductDetail: (id: string) => void
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
	fileUploaderProps,
	productName,
}: ProductDetailColumnProps): ColumnDef<ProductDetail>[] => {
	return [
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
			cell: ({ row }) => (
				<Input
					type="number"
					value={row.getValue('quantity')}
					onChange={(e) =>
						onUpdateProductDetail(
							row.original.id!,
							'quantity',
							Number(e.target.value),
						)
					}
					min={0}
				/>
			),
		},
		{
			accessorKey: 'price',
			meta: 'Giá',
			header: (props) => <DataTableColumnHeader title="Giá" {...props} />,
			cell: ({ row }) => (
				<CurrencyInput
					initialValue={row.getValue('price')}
					onCallback={(realValue: number) =>
						onUpdateProductDetail(row.original.id!, 'price', realValue)
					}
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
			cell: ({ row }) => (
				<FileUploader
					maxSize={5 * 1024 * 1024}
					{...fileUploaderProps}
					placeholder={row.original.image!}
					onUpload={async (files) => {
						await fileUploaderProps.onUpload(files).then((result) => {
							if (!result?.length) return
							onUpdateProductDetail(row.original.id!, 'image', result[0].url!)
						})
					}}
					className="aspect-square h-48"
					iconOnly
				/>
			),
			enableSorting: false,
		},
	]
}
