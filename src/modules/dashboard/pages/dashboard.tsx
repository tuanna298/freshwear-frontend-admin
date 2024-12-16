import { Card, Col, Flex, Row, Segmented, Typography } from 'antd'

import PageLayout from '@/shared/layouts/page'
import { SegmentedValue } from 'antd/es/segmented'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
	DailyOrders,
	DailyRevenue,
	DashBoardOrderTimeline,
	NewCustomers,
	RecentOrders,
	TrendingMenu,
} from '../components'
import OverviewTab from '../components/OverViewTab'

const { Text } = Typography

type TrendingOption = 'Ngày' | 'Tuần' | 'Tháng' | 'Năm'

const Dashboard: React.FC = () => {
	const [selectedTrendingOption, setSelectedTrendingOption] =
		useState<TrendingOption>('Ngày')

	const options = ['Ngày', 'Tuần', 'Tháng', 'Năm'].map((value) => ({
		label: value,
		value,
	}))

	const calculateTimeRange = (option: TrendingOption) => {
		const currentDate = dayjs()

		switch (option) {
			case 'Ngày':
				return {
					start: currentDate.startOf('day').valueOf(),
					end: currentDate.endOf('day').valueOf(),
				}
			case 'Tuần':
				return {
					start: currentDate.startOf('week').valueOf(),
					end: currentDate.endOf('week').valueOf(),
				}
			case 'Tháng':
				return {
					start: currentDate.startOf('month').valueOf(),
					end: currentDate.endOf('month').valueOf(),
				}
			case 'Năm':
				return {
					start: currentDate.startOf('year').valueOf(),
					end: currentDate.endOf('year').valueOf(),
				}
			default:
				return {
					start: currentDate.valueOf(),
					end: currentDate.valueOf(),
				}
		}
	}

	const handleOptionChange = (value: SegmentedValue) => {
		const option: TrendingOption = value as TrendingOption
		setSelectedTrendingOption(option)
	}

	return (
		<PageLayout animated={true} wrapWithCard={false} breadcrumb={false}>
			<Row gutter={[16, 16]}>
				<Col md={24}>
					<Row gutter={[16, 16]}>
						<Col xl={10} lg={24} md={24} sm={24} xs={24}>
							<Card
								styles={{
									body: {
										padding: 10,
										paddingBottom: 0,
									},
								}}
								style={{
									background: '#081523',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'right',
									backgroundSize: 'cover',
								}}
							>
								<DailyRevenue />
							</Card>
						</Col>
						<Col xl={7} lg={12} md={24} sm={24} xs={24}>
							<Card
								styles={{
									body: {
										padding: 10,
										paddingBottom: 0,
									},
								}}
								style={{
									background: '#081523',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'right',
									backgroundSize: 'cover',
								}}
							>
								<DailyOrders />
							</Card>
						</Col>
						<Col xl={7} lg={12} md={24} sm={24} xs={24}>
							<Card
								styles={{
									body: {
										padding: 10,
										paddingBottom: 0,
									},
								}}
								style={{
									background: '#081523',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'right',
									backgroundSize: 'cover',
								}}
							>
								<NewCustomers />
							</Card>
						</Col>
					</Row>
				</Col>
				<Col xl={17} lg={16} md={24} sm={24} xs={24}>
					<Card
						styles={{
							body: {
								height: 550,
								paddingLeft: 0,
								paddingRight: 0,
							},
						}}
						title={<Text strong>Biểu đồ phân tích</Text>}
					>
						<OverviewTab />
					</Card>
				</Col>
				<Col xl={7} lg={8} md={24} sm={24} xs={24}>
					<Card
						styles={{
							body: {
								height: 550,
								overflowY: 'scroll',
							},
						}}
						title={
							<Text strong style={{ textTransform: 'capitalize' }}>
								Dòng thời gian đơn hàng
							</Text>
						}
					>
						<DashBoardOrderTimeline />
					</Card>
				</Col>
				<Col xl={17} lg={16} md={24} sm={24} xs={24}>
					<Card title={<Text strong>Đơn hàng gần đây</Text>}>
						<RecentOrders />
					</Card>
				</Col>
				<Col xl={7} lg={8} md={24} sm={24} xs={24}>
					<Card
						title={
							<Flex className="m-2" vertical align="center" gap="small">
								<Text strong>Sản phẩm nổi bật</Text>
								<Segmented
									size="middle"
									options={options}
									onChange={handleOptionChange}
								/>
							</Flex>
						}
					>
						<TrendingMenu range={calculateTimeRange(selectedTrendingOption)} />
					</Card>
				</Col>
			</Row>
		</PageLayout>
	)
}

export default Dashboard
