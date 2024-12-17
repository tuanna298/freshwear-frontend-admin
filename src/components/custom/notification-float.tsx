import { cn } from '@/lib/utils'
import useNotificationSSE from '@/shared/hooks/use-notification-sse'
import { BellFilled, CheckOutlined } from '@ant-design/icons'
import { Badge, Button, FloatButton } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { AnimatedList } from './animated-list'

export interface NotificationItem {
	id: number
	content: string
	user_id: string
	href: string
	type: NotificationType
	read: boolean
	delivered: boolean
	data: Record<string, any>
	created_at: string
}

enum NotificationType {
	ORDER_PLACED = 'ORDER_PLACED',
	ORDER_PENDING = 'ORDER_PENDING',
	ORDER_CHANGED = 'ORDER_CHANGED',
	PRODUCT_LOW_STOCK = 'PRODUCT_LOW_STOCK',
}

const NOTIFICATION_TITLES: Record<NotificationType, string> = {
	[NotificationType.ORDER_PLACED]: 'Đơn hàng mới được đặt',
	[NotificationType.ORDER_PENDING]: 'Đơn hàng đang chờ xử lý',
	[NotificationType.ORDER_CHANGED]: 'Thay đổi trạng thái đơn hàng',
	[NotificationType.PRODUCT_LOW_STOCK]: 'Sản phẩm sắp hết hàng',
}

const NOTIFICATION_CONFIGS = {
	[NotificationType.ORDER_PLACED]: { icon: '📦', color: '#00C9A7' },
	[NotificationType.ORDER_PENDING]: { icon: '⏳', color: '#FFB800' },
	[NotificationType.ORDER_CHANGED]: { icon: '🔄', color: '#FF3D71' },
	[NotificationType.PRODUCT_LOW_STOCK]: { icon: '⚠️', color: '#1E86FF' },
}

const Notification = ({
	id,
	content,
	type,
	created_at,
	href,
	read,
	onMarkAsRead,
}: NotificationItem & {
	onMarkAsRead: (id: number) => void
}) => {
	const { icon, color } = NOTIFICATION_CONFIGS[type] || {
		icon: '🔔',
		color: '#GRAY',
	}

	const handleClick = () => {
		// Mark as read before navigating
		onMarkAsRead(id)
		window.location.href = href
	}

	return (
		<figure
			onClick={handleClick}
			className={cn(
				'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
				'transition-all duration-200 ease-in-out hover:scale-[103%]',
				'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
				'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solidrgba(255,255,255,.1)] dark:[box-shadow:0-20px80px-20px_#ffffff1f_inset]',
			)}
		>
			<div className="flex flex-row items-center gap-3">
				<div
					className="flex size-10 items-center justify-center rounded-full"
					style={{ backgroundColor: color }}
				>
					<span className="text-lg">{icon}</span>
				</div>
				<div className="flex flex-col overflow-hidden">
					<figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
						<span className="text-sm sm:text-lg">
							{NOTIFICATION_TITLES[type as NotificationType] ||
								'Không xác định'}
						</span>
						<span className="mx-1">·</span>
						<span className="text-xs text-gray-500">
							{dayjs(created_at).fromNow()}
						</span>
					</figcaption>
					<p className="text-sm font-normal dark:text-white/60">{content}</p>
				</div>
				{!read && <Badge status="processing" />}
			</div>
		</figure>
	)
}

const NotificationFloat: React.FC = () => {
	const { notifications, markAllNotificationAsRead, markNotificationAsRead } =
		useNotificationSSE()

	const unreadCount = notifications.filter((n) => !n.read).length

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FloatButton
					badge={{
						count: unreadCount,
						overflowCount: 9,
					}}
					icon={<BellFilled />}
				/>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				side="top"
				sideOffset={20}
				className={cn(
					'relative flex h-[500px] w-full min-w-[450px] flex-col overflow-hidden rounded-lg border bg-background p-6 md:shadow-xl',
				)}
			>
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-lg font-semibold">Thông báo</h3>
					{unreadCount > 0 && (
						<Button
							type="text"
							icon={<CheckOutlined />}
							onClick={() => markAllNotificationAsRead.mutate()}
							loading={markAllNotificationAsRead.isLoading}
						>
							Đánh dấu tất cả đã đọc
						</Button>
					)}
				</div>
				{notifications.length === 0 ? (
					<div className="flex h-full items-center justify-center text-gray-500">
						Không có thông báo mới
					</div>
				) : (
					<AnimatedList delay={200}>
						{notifications.map((item) => (
							<Notification
								{...item}
								key={item.id}
								onMarkAsRead={markNotificationAsRead.mutate}
							/>
						))}
					</AnimatedList>
				)}
			</PopoverContent>
		</Popover>
	)
}

export default NotificationFloat
