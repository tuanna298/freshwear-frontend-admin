import { BarChartOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import React from 'react'
import OverviewGrowth from './OverviewGrowth'

const OverviewTab: React.FC = () => {
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: (
				<span>
					<BarChartOutlined /> Tổng quan
				</span>
			),

			children: <OverviewGrowth />,
		},
	]

	return (
		<Tabs
			centered
			tabPosition="bottom"
			size="small"
			defaultActiveKey="1"
			items={items}
		/>
	)
}

export default OverviewTab
