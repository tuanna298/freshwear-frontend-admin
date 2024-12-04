import { RESOURCE_MAP } from '@/shared/common/constants'
import { useNavigation, useResource } from '@refinedev/core'
import { PlusSquare } from 'lucide-react'
import { forwardRef } from 'react'
import { Button } from '../ui/button'

const CreateButton = forwardRef<HTMLButtonElement>((props, ref) => {
	const { resource } = useResource()
	const { create } = useNavigation()

	if (!resource) {
		throw new Error('Resource not found')
	}

	const resourceLabel = RESOURCE_MAP[resource.name as string].toLowerCase()

	return (
		<Button
			{...props}
			ref={ref}
			className="flex gap-2"
			{...(resource.canCreate ? { onClick: () => create(resource.name) } : {})}
		>
			<PlusSquare />
			Thêm mới {resourceLabel}
		</Button>
	)
})

CreateButton.displayName = 'CreateButton'

export default CreateButton
