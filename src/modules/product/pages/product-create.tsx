import FormContainer from '@/components/custom/form-container'
import { Product, productSchema } from '@/schemas/product.schema'
import PageLayout from '@/shared/layouts/page'
import { useCreate, useNavigation } from '@refinedev/core'
import { useQueryClient } from '@tanstack/react-query'
import { omit } from 'lodash'
import ProductForm from '../components/product-form'

const ProductCreate = () => {
	const queryClient = useQueryClient()
	const { list } = useNavigation()
	const create = useCreate<Product>({
		resource: 'product',
		successNotification: () => ({
			message: `Thêm mới sản phẩm thành công`,
			type: 'success',
		}),
	})

	const onSubmit = (data: Product) =>
		create.mutate(
			{ values: data, invalidates: ['all'] },
			{
				onSuccess() {
					queryClient.refetchQueries(['product', 'list'])
					list('product')
				},
			},
		)

	return (
		<PageLayout title="Thêm mới sản phẩm" wrapWithCard={false} animated={true}>
			<FormContainer
				id="product-form"
				schema={productSchema}
				transformSchema={productSchema.transform((data) => {
					return {
						...data,
						details: {
							create: data.details?.map((detail) => ({
								...omit(detail, ['id', 'brand', 'material', 'color', 'size']),
								brand_id: detail.brand.id,
								material_id: detail.material.id,
								color_id: detail.color.id,
								size_id: detail.size.id,
							})),
						},
					}
				})}
				onSubmit={onSubmit}
				className="flex flex-col gap-5"
			>
				<ProductForm />
			</FormContainer>
		</PageLayout>
	)
}

export default ProductCreate
