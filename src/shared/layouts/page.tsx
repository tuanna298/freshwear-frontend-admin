import AppBreadcrumb from '@/components/custom/app-breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type Props = {
	children: React.ReactNode
	title?: string | React.ReactNode
	description?: string | React.ReactNode
	className?: string
	animated?: boolean
	wrapWithCard?: boolean
	extra?: React.ReactNode
}

const pageTransition = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: { duration: 0.5 },
}

const PageLayout = ({
	children,
	title = <Skeleton className="h-9 w-24 rounded-full bg-primary-muted" />,
	description = <Skeleton className="h-6 w-96 rounded-full bg-primary-muted" />,
	className,
	animated = false,
	wrapWithCard = true,
	extra,
}: Props) => {
	const MotionComponent = animated ? motion.div : 'div'
	return (
		<MotionComponent
			{...(animated ? pageTransition : {})}
			className="flex h-full flex-col"
		>
			<div className="flex justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
					<span className="text-sm text-muted-foreground">{description}</span>
				</div>
				{extra}
			</div>
			<div className={cn('flex h-full flex-col gap-3', className)}>
				<AppBreadcrumb />

				{wrapWithCard ? (
					<Card className="h-full">
						<CardContent className="h-full p-6">{children}</CardContent>
					</Card>
				) : (
					children
				)}
			</div>
		</MotionComponent>
	)
}

export default PageLayout
