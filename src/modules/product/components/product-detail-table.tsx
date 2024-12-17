import DataTable from '@/components/data-table/data-table'
import { Attribute } from '@/schemas/attribute.schema'
import { Color } from '@/schemas/color.schema'
import { ProductDetail } from '@/schemas/product.schema'
import { useBase64Upload } from '@/shared/hooks/use-base64-upload'
import {
	getCoreRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { uniqueId } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ProductDetailColumns } from './product-detail-column'

const ProductDetailTable = () => {
	const { watch, trigger, setValue } = useFormContext()

	const colors: Color[] = watch('colors') || []
	const sizes: Attribute[] = watch('sizes') || []
	const material: Attribute = watch('material')
	const brand: Attribute = watch('brand')
	const name: string = watch('name')
	const details: ProductDetail[] = watch('details') || []

	const [sorting, setSorting] = useState<SortingState>([])

	const handleUpdateProductDetail = (
		id: string,
		field: keyof ProductDetail,
		value: any,
	) => {
		const details: ProductDetail[] = watch('details') || []

		const updatedDetails = details.map((detail) =>
			detail.id === id ? { ...detail, [field]: value } : detail,
		)
		setValue('details', updatedDetails)
	}

	const handleDeleteProductDetail = (id: string) => {
		const details: ProductDetail[] = watch('details') || []

		const updatedDetails = details.filter((detail) => detail.id !== id)
		setValue('details', updatedDetails)

		if (!updatedDetails.length) {
			setValue('colors', [])
			setValue('sizes', [])
		}
	}

	const handleBatchUpdateProductDetails = (
		field: keyof ProductDetail,
		value: any,
		selectedRows: Row<ProductDetail>[],
	) => {
		const details: ProductDetail[] = watch('details') || []

		if (selectedRows.length === 0) return

		const updatedDetails = details.map((detail) => {
			// Chỉ update các detail được chọn
			if (selectedRows.some((row) => row.original.id === detail.id)) {
				return { ...detail, [field]: value }
			}
			return detail
		})

		setValue('details', updatedDetails)
	}

	const { onUpload, uploadedFiles, progresses, isUploading } = useBase64Upload({
		mode: 'single',
	})

	const columns = useMemo(
		() =>
			ProductDetailColumns({
				productName: name,
				onUpdateProductDetail: handleUpdateProductDetail,
				onDeleteProductDetail: handleDeleteProductDetail,
				onBatchUpdateProductDetails: handleBatchUpdateProductDetails,
				fileUploaderProps: {
					isUploading,
					progresses,
					onUpload,
					uploadedFiles,
				},
			}),
		[name],
	)

	const table = useReactTable({
		data: details,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	useEffect(() => {
		if (!colors.length || !sizes.length) {
			if (details.length) {
				setValue('details', [])
			}
			return
		}

		trigger().then((isValid) => {
			if (isValid) {
				// Tạo một map để tracking các detail hiện tại
				const existingDetailsMap = new Map(
					details.map((detail) => [
						`${detail.color.id}-${detail.size.id}`,
						detail,
					]),
				)

				const newDetails = colors.flatMap((color) =>
					sizes.map((size) => {
						const key = `${color.id}-${size.id}`

						// Nếu detail đã tồn tại, giữ nguyên detail cũ
						if (existingDetailsMap.has(key)) {
							return existingDetailsMap.get(key)
						}

						// Nếu là detail mới, tạo detail với giá trị mặc định
						return {
							id: uniqueId(),
							size: size,
							material: material,
							color: color,
							brand: brand,
							image: '',
							price: 0,
							quantity: 0,
						}
					}),
				)

				// Loại bỏ các details không còn phù hợp với colors/sizes mới
				const filteredDetails = newDetails.filter(Boolean)

				setValue('details', filteredDetails)
			}
		})
	}, [colors, sizes, material, brand, trigger, name])

	return <DataTable<ProductDetail> table={table} />
}

export default ProductDetailTable
