import { ProductDetail } from '@/schemas/product.schema'
import { NumberField, useSimpleList } from '@refinedev/antd'
import { List as AntdList, Avatar, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { AvatarCircle, AvatarWrapper, Container, TextWrapper } from './styled'

const { Text } = Typography

type TrendingMenuProps = {
	range: { start: number; end: number }
}
export const TrendingMenu: React.FC<TrendingMenuProps> = ({ range }) => {
	const {
		listProps,
		setFilters,
		query: { data },
	} = useSimpleList<ProductDetail>({
		resource: 'statistic/trending',
		pagination: { pageSize: 5 },
		filters: {
			initial: [
				{
					field: 'start',
					operator: 'eq',
					value: range.start,
				},
				{
					field: 'end',
					operator: 'eq',
					value: range.end,
				},
			],
		},
		queryOptions: {
			onSuccess(data) {
				console.log('data', data)
			},
		},
		syncWithLocation: false,
	})

	useEffect(() => {
		if (range) {
			setFilters([
				{
					field: 'start',
					operator: 'eq',
					value: range.start,
				},
				{
					field: 'end',
					operator: 'eq',
					value: range.end,
				},
			])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [range])

	return (
		<AntdList
			{...listProps}
			// dataSource={listProps.data}
			pagination={false}
			renderItem={(item, index) => <MenuItem item={item} index={index} />}
		/>
	)
}
const MenuItem: React.FC<{ item: ProductDetail; index: number }> = ({
	item,
	index,
}) => {
	return (
		<Container key={item.id}>
			<Space size="large">
				<AvatarWrapper className="menu-item__avatar">
					<Avatar
						size={{
							xs: 64,
							sm: 64,
							md: 64,
							lg: 108,
							xl: 132,
							xxl: 108,
						}}
						src={item?.image || item?.product?.thumbnail}
					/>
					<AvatarCircle>
						<span>#{index + 1}</span>
					</AvatarCircle>
				</AvatarWrapper>

				<TextWrapper>
					<Text strong>{item?.product?.name}</Text>
					<NumberField
						strong
						options={{
							currency: 'VND',
							style: 'currency',
							notation: 'standard',
						}}
						locale={'vi'}
						value={item?.price}
					/>
					<Text strong style={{ color: 'red' }}>
						{item?.sale_count} đã bán
					</Text>
				</TextWrapper>
			</Space>
		</Container>
	)
}
