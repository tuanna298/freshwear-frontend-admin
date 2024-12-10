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
import { CheckCircle } from 'lucide-react'

const OrderAccept = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="size-[30px] border-green-600 text-green-600 hover:text-green-600"
				>
					<CheckCircle size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col">
				<DialogHeader>
					<DialogTitle>Ghi chú hành động</DialogTitle>
				</DialogHeader>
				<Input
					id="name"
					defaultValue="Xác nhận đơn hàng"
					className="col-span-3"
				/>
				<DialogFooter>
					<Button type="submit">Đồng ý</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default OrderAccept
