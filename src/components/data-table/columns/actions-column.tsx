import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'

import FormDialog, { FormDialogProps } from '@/components/custom/form-dialog'
import { BaseDTO } from '@/shared/common/interfaces'
import { useDelete, useUpdate } from '@refinedev/core'
import { AlertDialog } from '../../ui/alert-dialog'
import TableActionsDropdownMenu from '../dropdown-menu/table-actions-dropdown-menu'

type ActionColumnParams<T extends BaseDTO> = {
	resource: string
	formDialogProps: Omit<FormDialogProps<T>, 'id'>

	/** display or hidden action item */
	display?: {
		update?: boolean
		delete?: boolean
	}
	actions?: (document: T) => ReactNode
}

/** An example actions menu for data table */
const ActionsColumn = <T extends BaseDTO>({
	resource,
	formDialogProps,
	display = {
		update: true,
		delete: true,
	},
	actions,
}: ActionColumnParams<T>): ColumnDef<T> => ({
	id: 'actions',
	enableHiding: false,
	size: 100,
	cell: ({ row: { original } }) => {
		const deleteMutation = useDelete<T>({})
		const { mutate: update, isLoading: isUpdating } = useUpdate({
			resource,
		})
		return (
			<FormDialog<T>
				id={`update-${original.id}-form`}
				formProps={{
					defaultValues: {
						...original,
					},
				}}
				dialogProps={{
					triggerContext: (
						<AlertDialog>
							<TableActionsDropdownMenu
								onDelete={() =>
									original.id &&
									deleteMutation.mutate({
										resource,
										id: original.id,
									})
								}
								display={display}
								actions={actions?.(original)}
							/>
						</AlertDialog>
					),
				}}
				onSubmit={(data) =>
					update({
						id: original.id,
						values: data,
					})
				}
				isSuccess={isUpdating}
				{...formDialogProps}
			/>
		)
	},
	meta: 'Hành động',
	header: 'Hành động',
})

export default ActionsColumn
