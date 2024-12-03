import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const { round } = Math

export const randomColor = () =>
	'#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export const hslToRgb = (hsl: string): number[] => {
	// eslint-disable-next-line prefer-const
	let [h, s, l] = hsl.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]
	h /= 360
	s /= 100
	l /= 100

	let r, g, b

	if (s === 0) {
		r = g = b = l // achromatic
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r = hueToRgb(p, q, h + 1 / 3)
		g = hueToRgb(p, q, h)
		b = hueToRgb(p, q, h - 1 / 3)
	}

	console.log('input', hsl)
	console.log('result', [round(r * 255), round(g * 255), round(b * 255)])

	return [round(r * 255), round(g * 255), round(b * 255)]
}

function hueToRgb(p: number, q: number, t: number) {
	if (t < 0) t += 1
	if (t > 1) t -= 1
	if (t < 1 / 6) return p + (q - p) * 6 * t
	if (t < 1 / 2) return q
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
	return p
}

// Helper functions for color conversion
export const hslToHex = (hsl: string) => {
	// eslint-disable-next-line prefer-const
	let [h, s, l] = hsl.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]
	l /= 100
	const a = (s * Math.min(l, 1 - l)) / 100
	const f = (n: number) => {
		const k = (n + h / 30) % 12
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0')
	}
	return `#${f(0)}${f(8)}${f(4)}`
}

export const hexToHsl = (hex: string): [number, number, number] => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	if (!result) return [0, 0, 0]

	const r = parseInt(result[1], 16) / 255
	const g = parseInt(result[2], 16) / 255
	const b = parseInt(result[3], 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0
	let s = 0
	const l = (max + min) / 2

	if (max !== min) {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h /= 6
	}

	return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

const normalizeColor = (color: string): string => {
	if (color.startsWith('#')) {
		return color.toUpperCase()
	} else if (color.startsWith('hsl')) {
		const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]
		return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
	}
	return color
}

const trimColorString = (color: string, maxLength: number = 20): string => {
	if (color.length <= maxLength) return color
	return `${color.slice(0, maxLength - 3)}...`
}

export function ColorPicker({
	color,
	onChange,
	trigger,
}: {
	color: string
	onChange: (color: string) => void
	trigger?: React.ReactNode
}) {
	const [hsl, setHsl] = useState<[number, number, number]>([0, 0, 0])
	const [colorInput, setColorInput] = useState(color)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (color) handleColorChange(color)
	}, [color])

	const handleColorChange = (newColor: string) => {
		const normalizedColor = normalizeColor(newColor)
		setColorInput(normalizedColor)

		let h, s, l
		if (normalizedColor.startsWith('#')) {
			;[h, s, l] = hexToHsl(normalizedColor)
		} else {
			;[h, s, l] = normalizedColor.match(/\d+(\.\d+)?/g)?.map(Number) || [
				0, 0, 0,
			]
		}

		setHsl([h, s, l])
		onChange(`hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`)
	}

	const handleHueChange = (hue: number) => {
		const newHsl: [number, number, number] = [hue, hsl[1], hsl[2]]
		setHsl(newHsl)
		handleColorChange(`hsl(${newHsl[0]}, ${newHsl[1]}%, ${newHsl[2]}%)`)
	}

	const handleSaturationLightnessChange = (
		event: React.MouseEvent<HTMLDivElement>,
	) => {
		const rect = event.currentTarget.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top
		const s = Math.round((x / rect.width) * 100)
		const l = Math.round(100 - (y / rect.height) * 100)
		const newHsl: [number, number, number] = [hsl[0], s, l]
		setHsl(newHsl)
		handleColorChange(`hsl(${newHsl[0]}, ${newHsl[1]}%, ${newHsl[2]}%)`)
	}

	const handleColorInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newColor = event.target.value
		setColorInput(newColor)
		if (
			/^#[0-9A-Fa-f]{6}$/.test(newColor) ||
			/^hsl$$\d+,\s*\d+%,\s*\d+%$$$/.test(newColor)
		) {
			handleColorChange(newColor)
		}
	}

	const colorPresets = [
		'#FF3B30',
		'#FF9500',
		'#FFCC00',
		'#4CD964',
		'#5AC8FA',
		'#007AFF',
		'#5856D6',
		'#FF2D55',
		'#8E8E93',
		'#EFEFF4',
		'#E5E5EA',
		'#D1D1D6',
	]

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				{trigger || (
					<Button
						type="button"
						variant="outline"
						className="w-[200px] justify-start text-left font-normal"
					>
						<div
							className="mr-2 h-4 w-4 rounded-full shadow-sm"
							style={{ backgroundColor: colorInput }}
						/>
						<span className="flex-grow">{trimColorString(colorInput)}</span>
						<ChevronDown className="h-4 w-4 opacity-50" />
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent className="w-[240px] p-3">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
					className="space-y-3"
				>
					<motion.div
						className="relative h-40 w-full cursor-crosshair overflow-hidden rounded-lg"
						style={{
							background: `
                linear-gradient(to top, rgba(0, 0, 0, 1), transparent),
                linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 0, 0, 0)),
                hsl(${hsl[0]}, 100%, 50%)
              `,
						}}
						onClick={handleSaturationLightnessChange}
					>
						<motion.div
							className="absolute h-4 w-4 rounded-full border-2 border-white shadow-md"
							style={{
								left: `${hsl[1]}%`,
								top: `${100 - hsl[2]}%`,
								backgroundColor: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
							}}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
						/>
					</motion.div>
					<motion.input
						type="range"
						min="0"
						max="360"
						value={hsl[0]}
						onChange={(e) => handleHueChange(Number(e.target.value))}
						className="h-3 w-full cursor-pointer appearance-none rounded-full"
						style={{
							background: `linear-gradient(to right,
                hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
                hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%)
              )`,
						}}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					/>
					<div className="flex items-center space-x-2">
						<Label htmlFor="color-input" className="sr-only">
							Color
						</Label>
						<Input
							id="color-input"
							type="text"
							value={colorInput}
							onChange={handleColorInputChange}
							className="h-8 flex-grow rounded-md border bg-background text-sm"
							placeholder="#RRGGBB or hsl(h, s%, l%)"
						/>
						<motion.div
							className="h-8 w-8 rounded-md shadow-sm"
							style={{ backgroundColor: colorInput }}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						/>
					</div>
					<div className="grid grid-cols-6 gap-2">
						<AnimatePresence>
							{colorPresets.map((preset) => (
								<motion.button
									key={preset}
									className="relative h-8 w-8 rounded-full"
									style={{ backgroundColor: preset }}
									onClick={() => handleColorChange(preset)}
									whileHover={{ scale: 1.2, zIndex: 1 }}
									whileTap={{ scale: 0.9 }}
									type="button"
								>
									{colorInput === preset && (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0 }}
											transition={{ duration: 0.2 }}
										>
											<Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
										</motion.div>
									)}
								</motion.button>
							))}
						</AnimatePresence>
					</div>
				</motion.div>
			</PopoverContent>
		</Popover>
	)
}