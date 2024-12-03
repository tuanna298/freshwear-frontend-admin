import CreateButton from '@/components/custom/create-button'
import FormDialog from '@/components/custom/form-dialog'
import { Color, colorSchema } from '@/schemas/color.schema'
import { useCreate } from '@refinedev/core'
import ColorForm from './color-form'

const ColorDialog = () => {
	const create = useCreate<Color>({
		resource: 'color',
		successNotification: () => ({
			message: 'Thêm mới màu sắc thành công',
			type: 'success',
		}),
	})

	const onSubmit = (data: Color) => create.mutate({ values: data })

	return (
		<FormDialog<Color>
			schema={colorSchema}
			id="color-form-dialog"
			trigger={<CreateButton />}
			isSubmitting={create.isLoading}
			onSubmit={onSubmit}
			isSuccess={create.isSuccess}
			className="h-fit"
		>
			<ColorForm mode="create" />
		</FormDialog>
	)
}

export default ColorDialog