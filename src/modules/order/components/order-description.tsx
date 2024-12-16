import { DateField } from '@/components/custom/date-field'
import { NumberField } from '@/components/custom/number-field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserGender } from '@/schemas/auth/user.schema'
import {
	Order,
	OrderPayment,
	OrderStatusLabel,
	PaymentMethod,
} from '@/schemas/order.schema'
import { Badge, Descriptions, DescriptionsProps, Empty } from 'antd'
import dayjs from 'dayjs'

interface OrderDescriptionProps {
	order: Order
}

const PaymentList = ({ payments }: { payments: OrderPayment[] }) => (
	<>
		{payments ? (
			payments.map((payment) => (
				<div key={payment.id}>
					<NumberField value={payment.total} />
					{' - '}
					{payment.status === 'PENDING' ? (
						<span>Chưa thanh toán</span>
					) : (
						<>
							<DateField
								value={dayjs(new Date(payment?.updated_at ?? ''))}
								format="DD/MM/YYYY"
							/>{' '}
							- <span className="font-bold">Mã giao dịch</span>:{' '}
							{payment.transaction_code}
						</>
					)}
				</div>
			))
		) : (
			<span>Chưa thanh toán</span>
		)}
	</>
)

const OrderDescription = ({ order }: OrderDescriptionProps) => {
	if (!order) return null

	const {
		status,
		created_at,
		code,
		note,
		total_money,
		payments,
		address,
		user,
	} = order

	const items: DescriptionsProps['items'] = [
		{
			key: '5',
			label: 'Mã đơn hàng',
			span: 1,
			children: code,
		},
		{
			key: '6',
			label: 'Ghi chú',
			span: 3,
			children: note ?? 'N/A',
		},
		{
			key: '7',
			label: 'Tổng tiền',
			children: <NumberField value={total_money ?? 0} />,
		},
		{
			key: '9',
			label: 'Vận chuyển',
			children: <NumberField value={0} />,
		},
		{
			key: '13',
			label: 'Địa chỉ',
			span: 4,
			children: address,
		},

		{
			key: '12',
			label: 'Phương thức thanh toán',
			children: payments
				?.map((payment) =>
					payment.method === PaymentMethod.CASH ? 'Tiền mặt' : 'Chuyển khoản',
				)
				.join(', '),
		},
		{
			key: '11',
			label: 'Thanh toán',
			span: 3,
			children: <PaymentList payments={(payments as OrderPayment[]) || []} />,
		},
		{
			key: '14',
			label: 'Khách hàng',
			span: 2,
			children: user ? (
				<>
					<div>
						<strong>Tên</strong>: {user.full_name}
					</div>
					<div>
						<strong>Email</strong>: {user.email}
					</div>
					<div>
						<strong>Giới tính</strong>:{' '}
						{user.gender === UserGender.MALE
							? 'Nam'
							: user.gender === UserGender.FEMALE
								? 'Nữ'
								: 'Không xác định'}
					</div>
					<div>
						<strong>Địa chỉ</strong>: {address || 'N/A'}
					</div>
				</>
			) : (
				<div>
					<Empty />
				</div>
			),
		},
		{
			key: '3',
			label: 'Tạo lúc',
			children: (
				<DateField value={dayjs(created_at)} format="DD/MM/YYYY HH:MM" />
			),
		},
		{
			key: '2',
			label: 'Trạng thái',
			span: 2,
			children: <Badge status="processing" text={OrderStatusLabel[status]} />,
		},
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-bold">Thông tin đơn hàng</CardTitle>
			</CardHeader>
			<CardContent>
				{order && (
					<Descriptions bordered column={4} layout="vertical" items={items} />
				)}
			</CardContent>
		</Card>
	)
}

export default OrderDescription
