import { cn } from '@/lib/utils'
import * as React from 'react'
import { Input } from '../ui/input'

const moneyFormatter = Intl.NumberFormat('vi-VN', {
	currency: 'VND',
	currencyDisplay: 'symbol',
	currencySign: 'standard',
	style: 'currency',
})

type CurrencyInputProps = {
	className?: string
	initialValue?: string
	onCallback?: Function
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
	CurrencyInputProps

const CurrencyInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, initialValue = '0', onCallback, ...props }, ref) => {
		const [value, setValue] = React.useReducer(
			(_: any, next: string) => {
				const digits = next.replace(/\D/g, '')
				return moneyFormatter.format(Number(digits))
			},
			moneyFormatter.format(Number(initialValue)),
		)

		function handleChange(formattedValue: string) {
			const digits = formattedValue.replace(/\D/g, '')
			const realValue = Number(digits)

			onCallback && onCallback(realValue)
		}

		return (
			<Input
				ref={ref}
				className={cn('w-full', className)}
				{...props}
				value={value}
				onChange={(ev) => {
					setValue(ev.target.value)
					handleChange(ev.target.value)
				}}
			/>
		)
	},
)

CurrencyInput.displayName = 'CurrencyInput'

export { CurrencyInput }
