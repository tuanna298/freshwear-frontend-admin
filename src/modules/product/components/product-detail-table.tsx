import DataTable from '@/components/data-table/data-table'
import { Attribute } from '@/schemas/attribute.schema'
import { Color } from '@/schemas/color.schema'
import { ProductDetail } from '@/schemas/product.schema'
import { useBase64Upload } from '@/shared/hooks/use-base64-upload'
import {
	getCoreRowModel,
	getSortedRowModel,
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

	const [productDetails, setProductDetails] = useState<ProductDetail[]>([])
	const [sorting, setSorting] = useState<SortingState>([])

	const handleUpdateProductDetail = (
		id: string,
		field: keyof ProductDetail,
		value: any,
	) => {
		setProductDetails((prev) =>
			prev.map((detail) =>
				detail.id === id ? { ...detail, [field]: value } : detail,
			),
		)
	}

	const handleDeleteProductDetail = (id: string) => {
		setProductDetails((prev) => prev.filter((detail) => detail.id !== id))
	}

	const { onUpload, uploadedFiles, progresses, isUploading } = useBase64Upload({
		mode: 'single',
	})

	const columns = useMemo(
		() =>
			ProductDetailColumns({
				onUpdateProductDetail: handleUpdateProductDetail,
				onDeleteProductDetail: handleDeleteProductDetail,
				fileUploaderProps: {
					isUploading,
					progresses,
					onUpload,
					uploadedFiles,
				},
			}),
		[],
	)

	const table = useReactTable({
		data: productDetails,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	useEffect(() => {
		if (!colors.length || !sizes.length) return

		trigger().then((isValid) => {
			if (isValid) {
				const newProductDetails = colors.flatMap((color) =>
					sizes.map((size) => ({
						id: uniqueId(),
						name: name + ` [${color.name} - ${size.name}]`,
						size: size,
						material: material,
						color: color,
						brand: brand,
						image: '',
						price: 0,
						quantity: 0,
					})),
				)

				setProductDetails((prevDetails) => {
					const areDetailsEqual =
						prevDetails.length === newProductDetails.length &&
						prevDetails.every(
							(detail, index) =>
								detail.color === newProductDetails[index].color &&
								detail.size === newProductDetails[index].size,
						)

					return areDetailsEqual ? prevDetails : newProductDetails
				})
			}
		})
	}, [colors, sizes, material, brand, trigger, name])

	useEffect(() => {
		if (productDetails.length) {
			setValue('details', productDetails)
		}
	}, [productDetails])

	return <DataTable<ProductDetail> table={table} />
}

export default ProductDetailTable
