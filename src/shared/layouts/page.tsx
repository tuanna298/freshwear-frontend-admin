import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type Props = {
	children: React.ReactNode
	title?: string | React.ReactNode
	description?: string | React.ReactNode
	className?: string
	animated?: boolean
}

const pageTransition = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: { duration: 0.5 },
}

export default ({
	children,
	title = <Skeleton className="h-9 w-24 rounded-full bg-primary-muted" />,
	description = <Skeleton className="h-6 w-96 rounded-full bg-primary-muted" />,
	className,
	animated = false,
}: Props) => {
	const MotionComponent = animated ? motion.div : 'div'
	return (
		<MotionComponent
			{...(animated ? pageTransition : {})}
			className="flex h-full flex-col"
		>
			<div className="mb-3 flex flex-col gap-2">
				<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<div className={cn('flex h-full flex-col gap-3', className)}>
				{children}
			</div>
		</MotionComponent>
	)
}
