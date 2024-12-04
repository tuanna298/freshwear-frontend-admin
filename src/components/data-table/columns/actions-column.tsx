import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'

import FormDialog, { FormDialogProps } from '@/components/custom/form-dialog'
import { Dialog } from '@/components/ui/dialog'
import { BaseDTO } from '@/shared/common/interfaces'
import { BaseKey, useDelete, useUpdate } from '@refinedev/core'
import { AlertDialog } from '../../ui/alert-dialog'
import TableActionsDropdownMenu from '../dropdown-menu/table-actions-dropdown-menu'

type ActionColumnParams<T extends BaseDTO> = {
	resource: string
	formDialogProps?: Omit<FormDialogProps<T>, 'id'>

	/** display or hidden action item */
	display?: {
		update?: boolean
		delete?: boolean
	}
	onUpdate?: (id: BaseKey) => void
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
	onUpdate,
	actions,
}: ActionColumnParams<T>): ColumnDef<T> => {
	return {
		id: 'actions',
		enableHiding: false,
		size: 100,
		cell: ({ row: { original } }) => {
			const deleteMutation = useDelete<T>({})
			const { mutate: update, isLoading: isUpdating } = useUpdate({
				resource,
				successNotification() {
					return {
						message: 'Cập nhật thành công',
						type: 'success',
					}
				},
			})
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
											onUpdate={() => onUpdate?.(original.id as BaseKey)}
											onDelete={() =>
												original.id &&
												deleteMutation.mutate({
													resource,
													id: original.id,
													successNotification: () => {
														return {
															message: 'Xóa thành công',
															type: 'success',
														}
													},
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
									successNotification: () => {
										return {
											message: 'Cập nhật thành công',
											type: 'success',
										}
									},
								})
							}
							isSuccess={isUpdating}
							{...formDialogProps}
						/>
					) : (
						<Dialog>
							<AlertDialog>
								<TableActionsDropdownMenu
									onDelete={() =>
										original.id &&
										deleteMutation.mutate({
											resource,
											id: original.id,
											successNotification: () => {
												return {
													message: 'Xóa thành công',
													type: 'success',
												}
											},
										})
									}
									onUpdate={() =>
										update({
											id: original.id,
											successNotification: () => {
												return {
													message: 'Cập nhật thành công',
													type: 'success',
												}
											},
										})
									}
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
