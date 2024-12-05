import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'

import FormDialog, { FormDialogProps } from '@/components/custom/form-dialog'
import { Dialog } from '@/components/ui/dialog'
import { BaseDTO } from '@/shared/common/interfaces'
import { BaseKey } from '@refinedev/core'
import { AlertDialog } from '../../ui/alert-dialog'
import TableActionsDropdownMenu from '../dropdown-menu/table-actions-dropdown-menu'

type ActionColumnParams<T extends BaseDTO> = {
	formDialogProps?: Omit<FormDialogProps<T>, 'id'>

	/** display or hidden action item */
	display?: {
		update?: boolean
		delete?: boolean
	}
	onUpdate?: (row: T) => void
	onDelete?: (id: BaseKey) => void
	actions?: (document: T) => ReactNode
}

/** An example actions menu for data table */
const ActionsColumn = <T extends BaseDTO>({
	formDialogProps,
	display = {
		update: true,
		delete: true,
	},
	onUpdate,
	onDelete,
	actions,
}: ActionColumnParams<T>): ColumnDef<T> => {
	return {
		id: 'actions',
		enableHiding: false,
		size: 100,
		cell: ({ row: { original } }) => {
			return (
				<>
					{formDialogProps ? (
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
											onUpdate={() => onUpdate?.(original)}
											onDelete={() => onDelete?.(original.id as BaseKey)}
											display={display}
											actions={actions?.(original)}
										/>
									</AlertDialog>
								),
							}}
							onSubmit={(data) => formDialogProps?.onSubmit?.(data)}
							isSuccess={formDialogProps?.isSuccess}
							{...formDialogProps}
						/>
					) : (
						<Dialog>
							<AlertDialog>
								<TableActionsDropdownMenu
									onUpdate={() => onUpdate?.(original)}
									onDelete={() => onDelete?.(original.id as BaseKey)}
									display={display}
									actions={actions?.(original)}
								/>
							</AlertDialog>
						</Dialog>
					)}
				</>
			)
		},
		meta: 'Hành động',
		header: 'Hành động',
	}
}

export default ActionsColumn
