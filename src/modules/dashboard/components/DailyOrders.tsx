import { Column } from '@ant-design/charts'
import { ColumnConfig } from '@ant-design/plots/lib/components/column'
import { useCustom } from '@refinedev/core'
import { Typography } from 'antd'
import { useContext, useMemo } from 'react'

import { API_URL } from '@/shared/common/constants'
import { DecreaseIcon, IncreaseIcon } from '@/shared/icons'
import dayjs from 'dayjs'
import { DashboardContext } from '../context'
import { ISalesChart } from '../types'
import { DailyOrderWrapper, HeaderNumbers, TitleArea } from './styled'

export const DailyOrders: React.FC = () => {
	const { dateRange } = useContext(DashboardContext)

	const [start, end] = dateRange

	const query = {
		start,
		end,
	}

	const url = `${API_URL}/statistic/orders`

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

	const { Text, Title } = Typography

	const config = useMemo(() => {
		const config: ColumnConfig = {
			data: data?.data?.data || [],
			loading: isLoading,
			padding: 0,
			xField: 'date',
			yField: 'value',
			maxColumnWidth: 16,
			columnStyle: {
				radius: [4, 4, 0, 0],
			},
			color: 'rgba(255, 255, 255, 0.5)',
			tooltip: {
				customContent: (title, data) => {
					return `<div style="padding: 8px 4px; font-size:16px; font-weight:600">${dayjs(
						new Date(Number(title) * 1000),
					).format('LL')}: ${data[0]?.value} đơn</div>`
				},
			},

			xAxis: {
				label: null,
				line: null,
				tickLine: null,
			},
			yAxis: {
				label: null,
				grid: null,
				tickLine: null,
			},
			label: {
				// type: "outer",
				position: 'middle',
				style: {
					fill: '#FFFFFF',
					fontWeight: 700,
					opacity: 0.6,
				},
			},
		}

		return config
	}, [data?.data?.data, isLoading])

	return (
		<DailyOrderWrapper>
			<TitleArea>
				<Title level={3}>Đơn hàng</Title>
				<HeaderNumbers>
					<Text strong>{data?.data?.total ?? 0} </Text>

					<div>
						<Text strong>{data?.data?.trend ?? 0}%</Text>
						{(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />}
					</div>
				</HeaderNumbers>
			</TitleArea>
			<Column
				style={{ padding: 0, height: 135 }}
				appendPadding={10}
				{...config}
			/>
		</DailyOrderWrapper>
	)
}
