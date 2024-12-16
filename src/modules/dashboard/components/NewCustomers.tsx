import { Column } from '@ant-design/charts'
import { ColumnConfig } from '@ant-design/plots/lib/components/column'
import { useCustom } from '@refinedev/core'
import { ConfigProvider, Typography, theme } from 'antd'
import { useContext, useMemo } from 'react'

import { DecreaseIcon, IncreaseIcon } from '@/shared/icons'

import { API_URL } from '@/shared/common/constants'
import dayjs from 'dayjs'
import { DashboardContext } from '../context'
import { ISalesChart } from '../types'
import { Header, HeaderNumbers, NewCustomersWrapper } from './styled'

export const NewCustomers: React.FC = () => {
	const { dateRange } = useContext(DashboardContext)

	const [start, end] = dateRange

	const query = {
		start,
		end,
	}

	const url = `${API_URL}/statistic/users`

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
					).format('LL')}: ${data[0]?.value} New customer</div>`
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<NewCustomersWrapper>
				<Header>
					<Title level={3}>Khách hàng</Title>
					<HeaderNumbers>
						<Text strong>{data?.data?.total ?? 0}</Text>
						<div>
							<Text strong>{data?.data?.trend ?? 0}%</Text>
							{(data?.data?.trend ?? 0) > 0 ? (
								<IncreaseIcon />
							) : (
								<DecreaseIcon />
							)}
						</div>
					</HeaderNumbers>
				</Header>
				<Column
					style={{ padding: 0, height: 162 }}
					appendPadding={10}
					{...config}
				/>
			</NewCustomersWrapper>
		</ConfigProvider>
	)
}
