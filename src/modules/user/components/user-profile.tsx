import { DateField } from '@/components/custom/date-field'
import { User, UserGender } from '@/schemas/auth/user.schema'
import {
	HistoryOutlined,
	PhoneOutlined,
	SignatureOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Card, Grid, Space, Typography } from 'antd'
import React from 'react'

const { useBreakpoint } = Grid

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
	const { xl } = useBreakpoint()

	return (
		<Card bordered={false} className="h-full">
			<Space direction="vertical" className="h-full w-full">
				<Space direction="vertical" className="w-full text-center">
					{/* <Avatar size={120} src={user?.avatar}></Avatar> */}
					<Typography.Title level={3}>{user?.full_name}</Typography.Title>
				</Space>
				<Space
					direction="vertical"
					className={`${xl ? '' : 'text-center'} w-full`}
				>
					<Typography.Text className="flex justify-between">
						<span>
							<SignatureOutlined /> Tên đăng nhập
						</span>
						{user?.username}
					</Typography.Text>
					<Typography.Text className="flex justify-between">
						<span>
							<PhoneOutlined /> Email
						</span>
						{user?.email}
					</Typography.Text>
					<Typography.Text className="flex justify-between">
						<span>
							<UserOutlined /> Giới tính
						</span>
						{user?.gender === UserGender.MALE
							? 'Nam'
							: user?.gender === UserGender.FEMALE
								? 'Nữ'
								: 'Không xác định'}
					</Typography.Text>
					<Typography.Text className="flex justify-between">
						<span>
							<HistoryOutlined /> Đăng nhập lần cuối
						</span>
						<DateField format="LLL" value={user?.last_login || 0} />
					</Typography.Text>
				</Space>
			</Space>
		</Card>
	)
}

export default UserProfile
