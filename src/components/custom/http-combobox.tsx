import { debounce } from 'lodash'
import { ReactNode, useCallback, useMemo, useRef, useState } from 'react'

import { useList } from '@refinedev/core'
import { Combobox, ComboboxProps } from './combobox'

type Value = string | number | boolean | object

export type HttpComboboxProps = Omit<ComboboxProps, 'options'> & {
	resource: string
	params?: object
	convertOption?: (doc: Record<string, any>) => {
		label: ReactNode
		value: Value
	}
}
export const DEBOUNCE_TIME = 300

const convertOptionDefault = (doc: Record<string, any>) => ({
	label: doc.name ?? doc.full_name ?? doc.code,
	value: doc.id ?? doc.code,
})

export default function HttpCombobox(props: HttpComboboxProps) {
	const [textSearch, setTextSearch] = useState<string>('')

	const {
		resource,
		params = {},
		convertOption = convertOptionDefault,
		...rest
	} = props

	const { data, refetch } = useList({
		resource: resource,
		pagination: {
			current: 1,
			pageSize: 20,
		},
		queryOptions: {
			queryKey: [resource, params, textSearch],
		},
	})

	const debouncedRefetch = useRef(
		debounce((newTextSearch: string) => {
			setTextSearch(newTextSearch)
		}, DEBOUNCE_TIME),
	).current

	const options = useMemo(() => {
		const docs: any[] = (data as unknown as any)?.data ?? []
		return docs.map((item) => convertOption(item))
	}, [data])

	const handleInputChange = useCallback(
		(value: string) => {
			debouncedRefetch(value)
		},
		[debouncedRefetch],
	)

	return (
		<Combobox
			{...rest}
			options={options}
			onInputChange={handleInputChange}
			refetch={refetch}
		/>
	)
}
