import {
	ColorPicker,
	hslToHex,
	randomColor,
} from '@/components/custom/color-picker'
import { FormLabel } from '@/components/custom/form'
import { FormInput } from '@/components/custom/form-input'
import RequiredDot from '@/components/custom/required-dot'
import { Button } from '@/components/ui/button'
import { CommonDialogProps } from '@/types'
import { uniq } from 'lodash'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const ColorForm = ({ mode }: Omit<CommonDialogProps, 'trigger'>) => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext()

	const [colorOptions, setColorOptions] = useState<string[]>([])

	useEffect(() => {
		if (!colorOptions.length) {
			const colors = Array.from({ length: 7 }, () => randomColor())
			if (mode === 'update' && watch('code')) {
				colors[0] = watch('code')
			}

			setColorOptions(colors)
		}
		setValue('code', colorOptions[0])
	}, [colorOptions, mode, setValue, watch])

	const buttons = colorOptions.map((color, index) => (
		<Button
			key={index}
			className="relative rounded-full"
			size="icon"
			type="button"
			style={{
				background: color,
			}}
			onClick={() => setValue('code', color)}
		>
			{color === watch('code') && <Check className="text-card" />}
		</Button>
	))

	console.log('errors', errors)

	return (
		<>
			<FormInput
				id="name"
				label="Tên"
				placeholder="Nhập tên màu sắc"
				required
			/>

			<div className="flex flex-col gap-1 space-y-2">
				<FormLabel className="space-x-1">
					<RequiredDot /> Bộ chọn màu
				</FormLabel>

				<div className="flex gap-2">
					<ColorPicker
						color={colorOptions[0]}
						onChange={(color) =>
							setColorOptions(
								uniq([hslToHex(color), ...colorOptions]).slice(0, 8),
							)
						}
						trigger={
							<Button
								className="rounded-full"
								size="icon"
								type="button"
								style={{
									background:
										'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
								}}
							/>
						}
					/>
					{buttons}
				</div>
			</div>
		</>
	)
}

export default ColorForm
