import * as DialogPrimitive from '@radix-ui/react-dialog'
import { isNull } from 'lodash'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { ACTION_MAP, RESOURCE_MAP } from '@/shared/common/constants'
import { DefaultBaseDTO } from '@/shared/common/interfaces'
import { useResourceParams } from '@refinedev/core'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import FormContainer, { FormContainerProps } from './form-container'

export type FormDialogProps<T extends DefaultBaseDTO> =
	FormContainerProps<T> & {
		trigger?: ReactNode
		title?: ReactNode
		description?: ReactNode
		submit?: ReactNode
		cancel?: ReactNode
		onClose?: () => void
		footer?: ReactNode | null
		isSuccess?: boolean
		isSubmitting?: boolean
		dialogProps?: DialogPrimitive.DialogProps & {
			triggerContext?: ReactNode
		}
		open?: boolean
		setOpen?: Dispatch<SetStateAction<boolean>>
	}

/** combine Dialog and FormContainer */
const FormDialog = <T extends DefaultBaseDTO>(props: FormDialogProps<T>) => {
	const { formAction, resource } = useResourceParams()

	const {
		trigger,
		title = `${ACTION_MAP[formAction as string]} ${RESOURCE_MAP[resource?.name as string].toLowerCase()}`,
		description,
		children,
		submit,
		cancel,
		isSuccess,
		dialogProps,
		isSubmitting,
		footer,
		onClose,
		open: externalState,
		setOpen: setExternalState,
		...formContainerProps
	} = props
	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		if (isSuccess) {
			setOpen(false)
		}
	}, [isSuccess])

	useEffect(() => {
		if (!open && typeof onClose === 'function') {
			onClose()
		}
		setExternalState?.(open)
	}, [open])

	useEffect(() => {
		if (typeof externalState == 'boolean') {
			setOpen(externalState)
		}
	}, [externalState])

	return (
		<Dialog
			open={open}
			onOpenChange={(value) => {
				setOpen(value)
			}}
			{...dialogProps}
		>
			{dialogProps?.triggerContext || (
				<DialogTrigger asChild>{trigger}</DialogTrigger>
			)}
			<DialogContent aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>

				{/* CONTENT */}
				<FormContainer<T>
					{...formContainerProps}
					className={cn(
						'h-[50vh] space-y-2 overflow-y-auto p-1',
						formContainerProps.className,
					)}
				>
					{children}
				</FormContainer>

				{/* footer */}
				{!isNull(footer) &&
					(footer || (
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant={'outline'}>
									{cancel || 'Hủy'}
								</Button>
							</DialogClose>
							<Button
								type="submit"
								disabled={isSubmitting}
								form={formContainerProps.id}
								className="flex flex-row items-center gap-2"
							>
								{isSubmitting && (
									<LoaderCircle className="size-4 animate-spin opacity-90" />
								)}
								{submit || 'Xác nhận'}
							</Button>
						</DialogFooter>
					))}
			</DialogContent>
		</Dialog>
	)
}

export default FormDialog
