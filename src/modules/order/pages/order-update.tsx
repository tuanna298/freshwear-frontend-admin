import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PageLayout from '@/shared/layouts/page'
import { CheckCircle, CircleFadingArrowUp, Printer } from 'lucide-react'

const OrderUpdate = () => {
	return (
		<PageLayout
			title="Chỉnh sửa sản phẩm"
			wrapWithCard={false}
			animated={true}
			extra={
				<div className="flex gap-2">
					<Button className="flex gap-2">
						<Printer />
						In hoá đơn
					</Button>
					<Button className="flex gap-2">
						<CircleFadingArrowUp />
						Chủ động chuyển trạng thái
					</Button>
					<Button className="flex gap-2">
						<CheckCircle />
						Chấp thuận
					</Button>
					<Button className="flex gap-2">
						<CheckCircle />
						Từ chối
					</Button>
				</div>
			}
		>
			{/* Order deliverables */}
			<Card>
				<CardContent className="h-full space-y-2 p-6"></CardContent>
			</Card>
		</PageLayout>
	)
}

export default OrderUpdate
