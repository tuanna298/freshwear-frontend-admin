import React from 'react'
import { Label } from '../ui/label'

function toLocaleStringSupportsOptions() {
	return !!(
		typeof Intl === 'object' &&
		Intl &&
		typeof Intl.NumberFormat === 'function'
	)
}

export type NumberFieldProps = React.ComponentPropsWithoutRef<'label'> & {
	/**
	 * The value of the field.
	 */
	value: number | string
	/**
	 * Override the browser locale in the date formatting. Passed as first argument to [`Intl.NumberFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
	 */
	locale?: string | string[]
	/**
	 * Number formatting options. Passed as second argument to [`Intl.NumberFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
	 */
	options?: Intl.NumberFormatOptions
}

/**
 * This field is used to display a number formatted according to the browser locale, right aligned. and uses {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl `Intl`} to display date format.
 */
export const NumberField: React.FC<NumberFieldProps> = ({
	value,
	locale,
	options,
	...rest
}) => {
	const number = Number(value)

	return (
		<Label {...rest}>
			{toLocaleStringSupportsOptions()
				? number.toLocaleString(locale, options)
				: number}
		</Label>
	)
}
