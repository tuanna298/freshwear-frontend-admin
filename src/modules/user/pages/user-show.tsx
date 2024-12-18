import { API_URL } from '@/shared/common/constants'
import http from '@/shared/configs/http.config'
import PageLayout from '@/shared/layouts/page'
import { IResourceComponentsProps } from '@refinedev/core'
import { useQuery } from '@tanstack/react-query'
import { Col, Row, Spin } from 'antd'
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import UserOrderList from '../components/user-order-list'
import UserProfile from '../components/user-profile'

const UserShow: React.FC<IResourceComponentsProps> = () => {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: ['order', id],
		queryFn: async () => http.get(API_URL + `/user/${id}`),
		enabled: !!id,
	})

	const user = data?.data

	return (
		<PageLayout
			title="Chi tiết người dùng"
			wrapWithCard={false}
			animated={true}
		>
			<Spin spinning={isLoading}>
				<Row gutter={[16, 16]}>
					<Col xl={8} lg={24} xs={24}>
						{user && <UserProfile user={user} />}
					</Col>
					<Col xl={16} xs={24}>
						{user && (
							<Fragment>
								<UserOrderList id={user.id} />
							</Fragment>
						)}
					</Col>
				</Row>
			</Spin>
		</PageLayout>
	)
}

export default UserShow
