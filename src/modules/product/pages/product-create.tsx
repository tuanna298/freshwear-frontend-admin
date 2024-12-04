import FormContainer from '@/components/custom/form-container'
import { Product, productSchema } from '@/schemas/product.schema'
import PageLayout from '@/shared/layouts/page'
import { useCreate } from '@refinedev/core'
import ProductForm from '../components/product-form'

const ProductCreate = () => {
	const create = useCreate<Product>({
		successNotification: () => ({
			message: `Thêm mới sản phẩm thành công`,
			type: 'success',
		}),
	})

	const onSubmit = (data: Product) => create.mutate({ values: data })

	return (
		<PageLayout title="Thêm mới sản phẩm" wrapWithCard={false} animated={true}>
			<FormContainer
				id="product-form"
				schema={productSchema}
				transformSchema={productSchema.transform((data) => {
					return {
						...data,
						details: {
							create: data.details,
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
