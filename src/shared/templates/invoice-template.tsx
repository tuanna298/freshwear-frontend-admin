import { NumberField } from '@/components/custom/number-field'
import { Order, OrderStatusLabel } from '@/schemas/order.schema'
import { QRCode } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/vi' // Import locale for Vietnamese
import React from 'react'

interface InvoiceTemplateProps {
	order: Order
}

const APP_NAME_ACRONYM = 'Cửa hàng FreshWear'
const CONTACT_PHONE_NUMBER = '0987654321'
const CONTACT_EMAIL = 'freshwear.fashion@gmail.com'

export const InvoiceTemplate = React.forwardRef<
	HTMLDivElement,
	InvoiceTemplateProps
>(({ order }, ref) => {
	const formattedDate = dayjs(order.createdAt).locale('vi').format('LLLL')

	return (
		<div
			ref={ref}
			className="flex flex-col rounded border bg-white p-6 shadow-md"
		>
			{/* QR Code & Header */}
			<div className="relative mb-6">
				<QRCode
					size={100}
					bordered={false}
					value={order.code || '-'}
					className="absolute right-0 top-0"
				/>
				<div className="text-center">
					<h2 className="text-2xl font-bold">{APP_NAME_ACRONYM}</h2>
					<p className="text-gray-600">
						Số điện thoại liên hệ: {CONTACT_PHONE_NUMBER}
					</p>
					<p className="text-gray-600">Email liên hệ: {CONTACT_EMAIL}</p>
				</div>
			</div>

			{/* Invoice Title */}
			<div className="mb-6 text-center">
				<h1 className="text-3xl font-bold">HOÁ ĐƠN</h1>
			</div>

			{/* Order Details */}
			<div className="mb-8 grid grid-cols-2 gap-4">
				<div>
					{order.user ? (
						<>
							<p className="font-semibold">
								Người nhận: {order.receiverName ?? 'Khách vãng lai'}
							</p>
							<p>Email: {order.email}</p>
							<p>Số điện thoại: {order.phoneNumber}</p>
							<p>Địa chỉ: {order.address}</p>
							<p>Ghi chú: {order.note}</p>
						</>
					) : (
						<p>Người nhận: Khách vãng lai</p>
					)}
				</div>
				<div className="text-right">
					<p className="font-semibold">Mã hoá đơn: #{order.code}</p>
					<p>{formattedDate}</p>
					<p>Trạng thái: {OrderStatusLabel[order.status]}</p>
				</div>
			</div>

			{/* Products Table */}
			<div className="mb-4 text-center">
				<h3 className="text-xl font-bold">Sản phẩm</h3>
			</div>
			<table className="w-full table-auto border-collapse">
				<thead>
					<tr className="border-b border-gray-300">
						<th className="py-2 text-left font-medium">#</th>
						<th className="py-2 text-left font-medium">Mô tả</th>
						<th className="py-2 text-left font-medium">Đơn giá</th>
						<th className="py-2 text-left font-medium">Số lượng</th>
						<th className="py-2 text-left font-medium">Thành tiền</th>
					</tr>
				</thead>
				<tbody>
					{order.details &&
						order.details.map((item, index) => (
							<tr key={index} className="border-b border-gray-200">
								<td className="py-2">{index + 1}</td>
								<td className="py-2">
									{item?.product_detail?.product?.name ?? 'N/A'} |{' '}
									{item?.product_detail?.color.name} -{' '}
									{item?.product_detail?.size.name}
								</td>
								<td className="py-2">
									<NumberField value={item.price} />
								</td>
								<td className="py-2">{item.quantity}</td>
								<td className="py-2">
									<NumberField value={item.price * item.quantity} />
								</td>
							</tr>
						))}
					<tr className="border-t border-gray-300">
						<td colSpan={3}></td>
						<td className="py-2 font-bold">Tổng tiền</td>
						<td className="py-2 font-bold">
							<NumberField value={order.total_money} />
						</td>
					</tr>
				</tbody>
			</table>

			{/* Footer */}
			<div className="mt-8">
				<hr className="border-gray-300" />
				<div className="mt-4 flex justify-between">
					<p className="text-gray-500">Hoá đơn #{order.code}</p>
				</div>
			</div>
		</div>
	)
})
