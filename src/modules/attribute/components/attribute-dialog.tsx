import CreateButton from '@/components/custom/create-button'
import FormDialog from '@/components/custom/form-dialog'
import { Attribute, attributeSchema } from '@/schemas/attribute.schema'
import { RESOURCE_MAP } from '@/shared/common/constants'
import { useCreate, useResource } from '@refinedev/core'
import { useQueryClient } from '@tanstack/react-query'
import AttributeForm from './attribute-form'

const AttributeDialog = () => {
	const queryClient = useQueryClient()

	const { resource } = useResource()

	if (!resource) {
		throw new Error('Resource not found')
	}

	const resourceLabel = RESOURCE_MAP[resource?.name].toLowerCase()

	const create = useCreate<Attribute>({
		resource: resource.name,
		successNotification: () => ({
			message: `Thêm mới ${resourceLabel} thành công`,
			type: 'success',
		}),
	})

	const onSubmit = (data: Attribute) =>
		create.mutate(
			{ values: data },
			{
				onSuccess() {
					queryClient.invalidateQueries([resource.name, 'list'])
				},
			},
		)

	return (
		<FormDialog<Attribute>
			schema={attributeSchema}
			id="attribute-form-dialog"
			trigger={<CreateButton />}
			isSubmitting={create.isLoading}
			onSubmit={onSubmit}
			isSuccess={create.isSuccess}
			className="h-fit"
		>
			<AttributeForm />
		</FormDialog>
	)
}

export default AttributeDialog
