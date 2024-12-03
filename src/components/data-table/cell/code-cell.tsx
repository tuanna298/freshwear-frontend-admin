import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
	value: string
}

const CodeCell = ({ value, className, ...rest }: Props) => {
	return (
		<div className={cn('text-xs italic text-gray-400', className)} {...rest}>
			{value}
		</div>
	)
}

export default CodeCell
