import { RESOURCE_MAP } from '@/shared/common/constants'
import { useResource } from '@refinedev/core'
import { PlusSquare } from 'lucide-react'
import { forwardRef } from 'react'
import { Button } from '../ui/button'

const CreateButton = forwardRef<HTMLButtonElement>((props, ref) => {
	const { resource } = useResource()
	return (
		<Button {...props} ref={ref} className="flex gap-2">
			<PlusSquare />
			Thêm mới {RESOURCE_MAP[resource?.name as string].toLowerCase()}
		</Button>
	)
})

CreateButton.displayName = 'CreateButton'

export default CreateButton
