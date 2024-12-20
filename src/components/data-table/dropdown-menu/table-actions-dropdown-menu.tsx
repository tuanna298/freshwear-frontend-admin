import { FilePenLine, Trash } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { AlertDialog, AlertDialogTrigger } from '../../ui/alert-dialog'
import { DialogTrigger } from '../../ui/dialog'
import DeleteAlertDialogContent from '../alert/delete-alert-dialog-content'

type Props = {
	onUpdate?: () => void
	onDelete: () => void
	display?: {
		update?: boolean
		delete?: boolean
	}
	actions?: ReactNode
}
const TableActionsDropdownMenu = ({
	onUpdate,
	onDelete,
	display = {
		update: true,
		delete: true,
	},
	actions,
}: Props) => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

	return (
		<div className="flex items-center gap-2">
			{display?.update && (
				<DialogTrigger asChild>
					<FilePenLine className="size-4 cursor-pointer" onClick={onUpdate} />
				</DialogTrigger>
			)}
			{display?.delete && (
				<AlertDialog
					open={deleteDialogOpen}
					onOpenChange={(open) => {
						setDeleteDialogOpen(open)
					}}
				>
					<AlertDialogTrigger asChild>
						<Trash className="size-4 cursor-pointer text-destructive" />
					</AlertDialogTrigger>
					<DeleteAlertDialogContent
						onCancel={() => {
							setDeleteDialogOpen(false)
						}}
						onClick={onDelete}
					/>
				</AlertDialog>
			)}
			{actions}
		</div>
	)
}

export default TableActionsDropdownMenu
