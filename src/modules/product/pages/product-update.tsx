import FormContainer from '@/components/custom/form-container'
import {
	Product,
	productDefaultValues,
	productSchema,
} from '@/schemas/product.schema'
import PageLayout from '@/shared/layouts/page'
import { HttpError, useNavigation, useOne, useUpdate } from '@refinedev/core'
import { useQueryClient } from '@tanstack/react-query'
import { omit, uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ProductUpdateForm from '../components/product-update-form'

const getDefaultValue = (data: Product) => ({
	...data,
	colors: uniqBy(
		data.details?.map((detail) => detail.color),
		'id',
	),
	sizes: uniqBy(
		data.details?.map((detail) => detail.size),
		'id',
	),
})

const ProductUpdate = () => {
	const queryClient = useQueryClient()
	const { list } = useNavigation()
	const { state } = useLocation()
	const { id } = useParams<{ id: string }>()
	const { data: dataOne } = useOne<Product, HttpError>({
		resource: 'product',
		id,
		queryOptions: {
			enabled: !!id,
		},
	})

	const [product, setProduct] = useState<Product>(state?.data || {})

	useEffect(() => {
		if (dataOne?.data) {
			setProduct(dataOne.data)
		}
	}, [dataOne?.data])

	const update = useUpdate<Product>({
		resource: 'product',
		successNotification: () => ({
			message: `Cập nhật sản phẩm thành công`,
			type: 'success',
		}),
	})

	const onSubmit = (data: Product) =>
		update.mutate(
			{ id, values: data, invalidates: ['all'] },
			{
				onSuccess() {
					queryClient.refetchQueries(['product', 'list'])
					list('product')
				},
			},
		)

	if (!id) {
		list('product')
		return null
	}

	return (
		<PageLayout title="Chỉnh sửa sản phẩm" wrapWithCard={false} animated={true}>
			<FormContainer
				className="flex flex-col gap-5"
				id={'product-update-form-' + id}
				schema={productSchema}
				transformSchema={productSchema.transform((data) => {
					return {
						...omit(data, ['brand', 'material']),
						brand_id: data?.brand?.id,
						material_id: data?.material?.id,
						details: data.details?.map((detail) => ({
							...omit(detail, ['color', 'size']),
							color_id: detail.color.id,
							size_id: detail.size.id,
						})),
					}
				})}
				onSubmit={onSubmit}
				formProps={{
					defaultValues: getDefaultValue(product) || productDefaultValues,
				}}
				checkDirtyFields={false}
			>
				<ProductUpdateForm />
			</FormContainer>
		</PageLayout>
	)
}

export default ProductUpdate
