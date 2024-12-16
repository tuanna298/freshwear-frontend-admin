import { Line } from '@ant-design/charts'
import { LineConfig } from '@ant-design/plots/lib/components/line'
import { useCustom } from '@refinedev/core'
import { Typography } from 'antd'
import dayjs from 'dayjs'
import { useContext, useMemo } from 'react'

import { NumberField } from '@/components/custom/number-field'
import { formatCurrency } from '@/lib/utils'
import { API_URL } from '@/shared/common/constants'
import { DecreaseIcon, IncreaseIcon } from '@/shared/icons'
import { DashboardContext } from '../context'
import { ISalesChart } from '../types'
import {
	DailyRevenueWrapper,
	RangePicker,
	TitleAreNumber,
	TitleArea,
	TitleAreaAmount,
} from './styled'

const { Text } = Typography

export const DailyRevenue: React.FC = () => {
	const { dateRange, setDateRange } = useContext(DashboardContext)

	const [start, end] = dateRange

	const query = {
		start,
		end,
	}

	const url = `${API_URL}/statistic/revenue`
	const { data, isLoading } = useCustom<{
		data: ISalesChart[]
		total: number
		trend: number
	}>({
		url,
		method: 'get',
		config: {
			query,
		},
	})

	const config = useMemo(() => {
		const config: LineConfig = {
			data: data?.data?.data || [],
			loading: isLoading,
			padding: 'auto',
			xField: 'date',
			yField: 'value',
			color: 'rgba(255, 255, 255, 0.5)',
			tooltip: {
				customContent: (title, data) => {
					return `<div style="padding: 8px 4px; font-size:16px; font-weight:600">${dayjs(
						new Date(Number(title) * 1000),
					).format('LL')}:  ${formatCurrency(data[0]?.value)} </div>`
				},
			},

			xAxis: {
				label: null,
				line: null,
			},
			yAxis: {
				label: null,
				grid: null,
			},
			smooth: true,
			lineStyle: {
				lineWidth: 4,
			},
		}

		return config
	}, [data?.data?.data, isLoading])

	return (
		<DailyRevenueWrapper>
			<TitleArea>
				<TitleAreaAmount>
					<Typography.Title level={3}>Doanh số</Typography.Title>
					<TitleAreNumber>
						<NumberField value={data?.data?.total ?? 0} />
						<div style={{ marginLeft: '1rem' }}>
							<Text strong>{data?.data?.trend ?? 0}%</Text>
							{(data?.data?.trend ?? 0) > 0 ? (
								<IncreaseIcon />
							) : (
								<DecreaseIcon />
							)}
						</div>
					</TitleAreNumber>
				</TitleAreaAmount>

				<RangePicker
					size="small"
					value={[dayjs(new Date(dateRange[0])), dayjs(new Date(dateRange[1]))]}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onChange={(values: any) => {
						if (values && values[0] && values[1]) {
							setDateRange([
								values[0].startOf('day').valueOf(),
								values[1].endOf('day').valueOf(),
							])
						}
					}}
					style={{
						float: 'right',
						color: '#fffff !important',
						background: 'rgba(255, 255, 255, 0.3)',
					}}
					ranges={{
						'Tuần này': [dayjs().startOf('week'), dayjs().endOf('week')],
						'Tháng trước': [
							dayjs().startOf('month').subtract(1, 'month'),
							dayjs().endOf('month').subtract(1, 'month'),
						],
						'Tháng này': [dayjs().startOf('month'), dayjs().endOf('month')],
						'Năm nay': [dayjs().startOf('year'), dayjs().endOf('year')],
					}}
					format="YYYY/MM/DD"
				/>
			</TitleArea>
			<Line
				padding={0}
				appendPadding={10}
				height={115}
				style={{ maxHeight: '115px' }}
				{...config}
			/>
		</DailyRevenueWrapper>
	)
}
