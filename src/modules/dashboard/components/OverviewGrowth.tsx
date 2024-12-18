import { API_URL } from '@/shared/common/constants'
import { Datum } from '@ant-design/charts'
import { Line, LineConfig } from '@ant-design/plots'
import { useCustom } from '@refinedev/core'
import { Spin, Typography } from 'antd'
import dayjs from 'dayjs'
import { capitalize } from 'lodash'
import { useContext } from 'react'
import { DashboardContext } from '../context'
const { Text } = Typography

const OverviewGrowth = () => {
	const { dateRange } = useContext(DashboardContext)

	const [start, end] = dateRange

	const query = {
		start,
		end,
	}

	const url = `${API_URL}/statistic`

	const { data, isLoading } = useCustom<any>({
		url,
		method: 'get',
		config: {
			query,
		},
	})

	const growth = (data as any)?.response ?? ([] as any)

	const filteredGrowth = growth.filter((item: any) => item.name !== 'Customers')

	const config: LineConfig = {
		data: filteredGrowth.map((item: { name: string }) => ({
			...item,
			name:
				item.name === 'Revenue'
					? 'Doanh thu'
					: item.name === 'Order'
						? 'Đơn hàng'
						: item.name === 'Customers'
							? 'Khách hàng'
							: capitalize(item.name),
		})),
		xField: 'date',
		yField: 'dailyGrowth',
		xAxis: {
			label: {
				formatter: (v) =>
					`${dayjs(new Date(Number(v) * 1000)).format('DD/MM/YYYY')}`,
			},
		},
		tooltip: {
			formatter: (datum: Datum) => {
				return {
					name: datum.name,
					value: datum.dailyGrowth + '%',
				}
			},
			title(title) {
				return dayjs(new Date(Number(title) * 1000)).format('DD/MM/YYYY')
			},
		},
		seriesField: 'name',
		legend: {
			position: 'top',
		},
		smooth: true,
		animation: {
			appear: {
				animation: 'path-in',
				duration: 5000,
			},
		},
	}

	return (
		<Spin spinning={isLoading}>
			<div style={{ textAlign: 'center', padding: '5px' }}>
				<Text strong>Biểu đồ phân tích</Text>
			</div>
			<Line
				{...config}
				style={{ padding: '20px', height: '100%', minHeight: '400px' }}
			/>
		</Spin>
	)
}

export default OverviewGrowth
