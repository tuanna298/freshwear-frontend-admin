import { Info } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface Props {
	title: string
	description?: string
	onConfirm: () => void
	onCancel?: () => void
	okText?: string
	cancelText?: string
	disabled?: boolean
	icon?: ReactNode
	children: ReactNode
	showCancel?: boolean
}

export default ({
	children,
	icon = <Info className="h-4 w-4" />,
	title,
	description,
	okText = 'OK',
	cancelText = 'Hủy',
	onCancel,
	onConfirm,
	showCancel = true,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleCancel = () => {
		if (onCancel) {
			onCancel()
		}
		setIsOpen(false)
	}

	const handleConfirm = () => {
		onConfirm()
		setIsOpen(false)
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div className="cursor-pointer" onClick={() => setIsOpen(true)}>
					{children}
				</div>
			</PopoverTrigger>
			<PopoverContent
				side="top"
				className="relative w-fit border-none p-0"
				align="end"
			>
				{/* pointed tip */}
				<div className="absolute -bottom-2 left-4 z-50 h-4 w-4 rotate-45 transform border-b border-r bg-popover"></div>
				<Alert className="relative z-10 bg-popover">
					{icon}
					<AlertTitle>{title}</AlertTitle>
					<AlertDescription>{description}</AlertDescription>
					<div className="mt-4 flex items-center justify-end gap-2">
						{showCancel && (
							<Button variant="outline" size="sm" onClick={handleCancel}>
								{cancelText}
							</Button>
						)}
						<Button size="sm" onClick={handleConfirm}>
							{okText}
						</Button>
					</div>
				</Alert>
			</PopoverContent>
		</Popover>
	)
}
