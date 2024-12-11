import { DateField as BaseDateField } from '@refinedev/antd'
import dayjs from 'dayjs'

export const DateField = ({
	value,
	format,
}: {
	value: dayjs.ConfigType
	format: string
}) => <BaseDateField value={dayjs(value)} format={format} />
