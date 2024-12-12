import { DateField } from '@/components/custom/date-field'
import { NumberField } from '@/components/custom/number-field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserGender } from '@/schemas/auth/user.schema'
import { Order, OrderPayment, OrderStatusLabel } from '@/schemas/order.schema'
import { Badge, Descriptions, DescriptionsProps, Empty } from 'antd'
import dayjs from 'dayjs'
import { capitalize } from 'lodash'

interface OrderDescriptionProps {
	order: Order
}

const PaymentList = ({ payments }: { payments: OrderPayment[] }) => (
	<>
		{payments ? (
			payments.map((payment) => (
				<div key={payment.id}>
					<NumberField value={payment.total_money} />
					{' - '}
					{payment.status === 'PENDING' ? (
						<span>Unpaid</span>
					) : (
						<>
							<DateField
								value={dayjs(new Date(payment?.updated_at ?? ''))}
								format="DD/MM/YYYY HH:MM"
							/>
							{payment.transactionCode}
						</>
					)}
				</div>
			))
		) : (
			<span>Unpaid</span>
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
			label: 'Note',
			span: 3,
			children: note ?? 'N/A',
		},
		{
			key: '7',
			label: 'Total',
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
				?.map((payment) => capitalize(payment.method))
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
						{user.gender === UserGender.MALE ? 'Nam' : 'Nữ'}
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
