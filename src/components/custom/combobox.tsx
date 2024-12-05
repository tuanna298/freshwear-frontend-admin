import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { isArray, isEmpty, isEqual } from 'lodash'
import { Search, XIcon } from 'lucide-react'
import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from './command'

export type ComboxboxOption<T = Value> = {
	value: T
	label: ReactNode
	disabled?: boolean
}

type Value = string | number | boolean | object

export type ComboboxProps<T = Value> = {
	options: ComboxboxOption<T>[]
	value?: T | T[] | null
	onChange?: (value?: T | T[] | null) => void
	mode?: 'multiple' | 'single'
	allowClear?: boolean
	showClearIcon?: boolean
	filterMode?: 'client' | 'server'
	onInputChange?: (value: string) => void
	onOpenChange?: (open: boolean) => void
	placeholder?: string
	className?: string
	refetch?: () => void
	popoverPosition?: 'top' | 'right' | 'bottom' | 'left'
	disabled?: boolean
	variant?: 'default' | 'filled'
	requiredSelection?: boolean
	compareKey?: keyof T
	compareValue?: (a: T, b: T) => boolean
}

export function Combobox<T = Value>(props: ComboboxProps<T>) {
	const {
		options,
		value: defaultValue,
		onChange,
		mode = 'single',
		filterMode = 'server',
		allowClear = false,
		showClearIcon = true,
		popoverPosition,
		onOpenChange,
		onInputChange,
		placeholder = 'Chọn',
		className,
		refetch,
		disabled,
		variant = 'default',
		requiredSelection = false,
		compareKey,
		compareValue,
	} = props

	const [open, setOpen] = useState(false)
	const [value, setValue] = useState<T | T[] | null>()
	const triggerRef = useRef<HTMLButtonElement>(null)
	const [triggerWidth, setTriggerWidth] = useState<number>(200)

	const isValueEqual = useCallback(
		(a: T, b: T) => {
			if (compareValue) return compareValue(a, b)
			if (compareKey) return a[compareKey] === b[compareKey]
			return isEqual(a, b)
		},
		[compareValue, compareKey],
	)

	const handleSelect = (currentValue: T) => {
		let newValue: any
		if (mode === 'multiple') {
			newValue = Array.isArray(value)
				? value.some((v) => isValueEqual(v, currentValue))
					? value.filter((v) => !isValueEqual(v, currentValue))
					: [...value, currentValue]
				: [currentValue]
		} else {
			newValue =
				value && isValueEqual(currentValue, value as T)
					? requiredSelection
						? value
						: null
					: currentValue
			setOpen(false)
		}
		setValue(newValue)
		onChange?.(newValue)
	}

	const clearAll = () => {
		setValue(mode === 'multiple' ? [] : null)
		onChange?.(mode === 'multiple' ? [] : null)
	}

	const displayOption = useMemo(() => {
		return options.find((option) => isValueEqual(option.value, value as T))
			?.label
	}, [options, value, isValueEqual])

	const getDisplayValue = useCallback(() => {
		if (mode === 'multiple' && Array.isArray(value)) {
			const displayItems = value.map((v) => (
				<div
					key={typeof v === 'object' ? JSON.stringify(v) : String(v)}
					className="mr-1 mt-0.5 flex h-full items-center rounded border border-solid !bg-white p-1 pr-1"
				>
					{options.find((option) => isValueEqual(option.value, v))?.label}
					<span
						onClick={(e) => {
							e.stopPropagation()
							handleSelect(v)
						}}
						className="ml-1 flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-all ease-linear hover:bg-gray-500 hover:text-white"
						title="Xoá"
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.stopPropagation()
								handleSelect(v)
							}
						}}
						role="button"
						tabIndex={0}
					>
						<XIcon className="h-3.5 w-3.5" />
					</span>
				</div>
			))
			if (isArray(displayItems) && !displayItems.length) {
				return (
					<span className="text-start font-normal text-muted-foreground">
						{placeholder}
					</span>
				)
			}
			return <>{displayItems}</>
		} else {
			return value ? (
				displayOption
			) : (
				<span className="text-start font-normal text-muted-foreground">
					{placeholder}
				</span>
			)
		}
	}, [mode, options, value, isValueEqual])

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			setOpen(newOpen)
			onOpenChange?.(newOpen)
			refetch?.()
		},
		[onOpenChange],
	)

	useEffect(() => {
		if (triggerRef.current) {
			setTriggerWidth(triggerRef.current.offsetWidth)
		}
		if (defaultValue) {
			if (mode === 'multiple') {
				if (Array.isArray(defaultValue)) {
					setValue(defaultValue)
				} else {
					setValue([defaultValue])
				}
			} else {
				setValue(defaultValue)
			}
		}
	}, [])

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					ref={triggerRef}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						'flex h-fit min-h-9 w-full min-w-[200px] flex-wrap justify-between',
						className,
						variant === 'filled' && 'bg-secondary',
						open && '!bg-inherit',
					)}
				>
					<div
						className={cn(
							'mb-0.5 flex flex-wrap items-center transition-all ease-linear',
							triggerWidth && `max-w-${triggerWidth}`,
						)}
					>
						{getDisplayValue()}
						{allowClear && Array.isArray(value) && value.length > 0 && (
							<Badge
								onClick={(e) => {
									e.stopPropagation()
									clearAll()
								}}
								key={'delete-all'}
								variant="destructive"
								className="flex items-center p-0"
							>
								<XIcon className="h-3.5 w-3.5" />
							</Badge>
						)}
					</div>
					{(!value || (isArray(value) && isEmpty(value))) && (
						<CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
					)}
					{!!value && !isArray(value) && showClearIcon && (
						<XIcon
							tabIndex={0}
							role="button"
							onClick={() => {
								setValue(null)
								onChange?.(null)
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setValue(null)
									onChange?.(null)
								}
							}}
							className="h-4 w-4 shrink-0 rounded-full opacity-50 transition-all hover:bg-gray-500 hover:text-white"
						/>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side={popoverPosition}
				className="p-0"
				style={{ width: `${triggerWidth}px` }}
			>
				<Command>
					{filterMode === 'server' ? (
						<span className="flex items-center px-3">
							<Search className="size-4 text-muted-foreground" />
							<Input
								placeholder={'Tìm kiếm'}
								onChange={(e) => onInputChange?.(e.target.value)}
								className="border-0 outline-0 focus-visible:ring-0"
							/>
						</span>
					) : (
						<CommandInput placeholder="Tìm kiếm..." />
					)}

					<CommandSeparator />
					<CommandList>
						<CommandEmpty>Không tìm thấy.</CommandEmpty>
						<CommandGroup>
							{options?.map((option) => (
								<CommandItem
									key={
										typeof option.value === 'object'
											? JSON.stringify(option.value)
											: String(option.value)
									}
									value={option.value as unknown as string}
									onSelect={() => handleSelect(option.value)}
									disabled={option.disabled}
								>
									{option.label}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											Array.isArray(value) && value.includes(option.value)
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
