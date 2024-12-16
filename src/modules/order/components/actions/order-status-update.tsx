import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Order } from '@/schemas/order.schema'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useUpdateStatus from '../../hooks/use-update-status'

interface Props {
	order: Order
	trigger: React.ReactNode
	placeholder?: string
	isRejection?: boolean
}

const OrderStatusUpdate = ({
	order,
	trigger,
	placeholder,
	isRejection,
}: Props) => {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)

	const { note, setNote, onSubmit } = useUpdateStatus({
		order,
		onSuccessCallback: () => {
			setOpen(false)
			queryClient.refetchQueries(['order'])
		},
		isRejection,
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="flex flex-col">
				<DialogHeader>
					<DialogTitle>Ghi chú hành động</DialogTitle>
				</DialogHeader>
				<Input
					placeholder={placeholder}
					value={note}
					onChange={(e) => setNote(e.target.value)}
					className="col-span-3"
				/>
				<DialogFooter>
					<Button type="submit" onClick={onSubmit}>
						Đồng ý
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default OrderStatusUpdate
