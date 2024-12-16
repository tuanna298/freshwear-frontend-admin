import { Order } from '@/schemas/order.schema'
import styled from '@emotion/styled'
import { NumberField } from '@refinedev/antd'
import { Timeline as AntdTimeline, DatePicker, Table, Typography } from 'antd'

export const DailyRevenueWrapper = styled.div`
	height: 232px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

export const TitleArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	h3,
	span {
		color: #ffffff !important;
		margin-bottom: 0 !important;
	}

	@media screen and (max-width: 576px) {
		span {
			font-size: 16px !important;
			line-height: 1.2;
		}
	}
`

export const TitleAreaAmount = styled.div`
	display: flex;
	flex-direction: column;

	h3,
	span {
		color: #ffffff !important;
		margin-bottom: 0 !important;
	}

	@media screen and (max-width: 576px) {
		span {
			font-size: 16px !important;
			line-height: 1.2;
		}
	}
`

export const TitleAreNumber = styled.div`
	display: flex;
	align-items: center;
	line-height: 1;

	img {
		margin-left: 5px;
	}

	@media screen and (max-width: 576px) {
		span {
			font-size: 30px !important;
			line-height: 0.9;
		}
	}
`

export const RangePicker = styled(DatePicker.RangePicker)`
	height: 35px;
	float: 'right';
	color: '#fffff !important';
	background: 'rgba(255, 255, 255, 0.3)';

	.ant-picker-input > input {
		color: #ffffff !important;
	}

	&.ant-picker-focused {
		.ant-picker-separator {
			color: #ffffff;
		}
	}

	.ant-picker-separator,
	.ant-picker-suffix {
		color: #ffffff;
	}
`

export const DailyOrderWrapper = styled.div`
	height: 232px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media screen and (max-width: 576px) {
		height: 192px;
	}
`
export const HeaderNumbers = styled.div`
	font-size: 28px;
	text-align: right;
	line-height: 1.2;

	div {
		font-size: 20px;
	}

	img {
		margin-left: 5px;
	}

	@media screen and (max-width: 576px) {
		font-size: 30px;

		div {
			font-size: 20px;
		}
	}
`
export const NewCustomersWrapper = styled.div`
	height: 232px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media screen and (max-width: 576px) {
		height: 212px;
	}
`
export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`

export const Timeline = styled(AntdTimeline)`
	.ant-timeline-item-head {
		background-color: transparent;
	}
`

export const TimelineItem = styled(AntdTimeline.Item)``

export const TimelineContent = styled.div<{ backgroundColor: string }>`
	display: flex;
	flex-direction: column;
	padding: 12px;
	border-radius: 6px;
	background-color: ${({ backgroundColor }) => backgroundColor};
`

export const CreatedAt = styled(Typography.Text)`
	font-size: 12px;
	cursor: default;
`
export const RecentOrdersColumn = styled(Table.Column<Order>)`
	vertical-align: top;
`

export const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

export const Title = styled(Typography.Text)`
	font-size: 16px;
	word-break: inherit;
`

export const OrderId = styled(Typography.Text)`
	cursor: pointer;
`

export const Price = styled(NumberField)`
	white-space: nowrap;
`

export const Container = styled.div`
	margin-bottom: 45px;

	@media screen and (max-width: 768px) {
		.menu-item {
			&__avatar {
				&-circle {
					width: 28px;
					height: 28px;
					font-size: 10px;
				}
			}

			&__text {
				span {
					font-size: 16px;
				}
			}
		}
	}
`

export const AvatarWrapper = styled.div`
	position: relative;
`

export const AvatarCircle = styled.div`
	background-color: #67be23;
	width: 44px;
	height: 44px;
	border-radius: 22px;
	position: absolute;
	transform: translate(-50%, -50%);
	top: 100%;
	left: 50%;
	border: 4px solid #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-weight: 800;

	@media screen and (max-width: 768px) {
		width: 28px;
		height: 28px;
		font-size: 10px;
	}
`

export const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;

	span {
		font-size: 16px;
	}

	@media screen and (max-width: 768px) {
		span {
			font-size: 16px;
		}
	}
`

export const Number = styled(Typography.Text)`
	cursor: pointer;
`
