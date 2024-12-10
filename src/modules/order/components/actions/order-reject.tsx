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
import { Ban } from 'lucide-react'

const OrderReject = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="size-[30px] border-destructive text-destructive hover:text-destructive"
				>
					<Ban size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col">
				<DialogHeader>
					<DialogTitle>Ghi chú hành động</DialogTitle>
				</DialogHeader>
				<Input
					id="name"
					defaultValue="Không đáp ứng được yêu cầu của khách hàng"
					className="col-span-3"
				/>
				<DialogFooter>
					<Button type="submit">Đồng ý</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default OrderReject
