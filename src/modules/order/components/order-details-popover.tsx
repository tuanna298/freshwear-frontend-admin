import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Order } from '@/schemas/order.schema'
import React, { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

type OrderDetailsPopoverProps = {
	record: Order
}

export const OrderDetailsPopover: React.FC<OrderDetailsPopoverProps> = ({
	record,
}) => {
	const ref = useRef(null)
	const [open, setOpen] = React.useState(false)
	const orderDetails = record?.details || []
	const totalQuantity = orderDetails.reduce((total, orderDetail) => {
		return total + orderDetail.quantity
	}, 0)

	useOnClickOutside(ref, () => setOpen(false))

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				className="cursor-pointer"
				ref={ref}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
			>
				{`${totalQuantity} sản phẩm`}
			</PopoverTrigger>
			<PopoverContent className="w-64 rounded-lg bg-white p-4 shadow-lg">
				<h4 className="mb-2 text-lg font-bold">Sản phẩm</h4>
				<ul className="space-y-1">
					{orderDetails.map((orderDetail) => (
						<li key={orderDetail.id} className="text-sm text-gray-700">
							{orderDetail?.product_detail?.product?.name} -{' '}
							{orderDetail?.product_detail?.color.name} -{' '}
							{orderDetail?.product_detail?.size.name} - x{orderDetail.quantity}
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	)
}
