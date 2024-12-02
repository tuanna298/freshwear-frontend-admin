import { cn } from '@/lib/utils'
import {
    Children,
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
} from 'react'
import { AUTH_FORM_CONTAINER_CLASSNAME } from '../common/constants'

interface AuthFormLayoutProps {
	title?: string
	description?: string
	children: ReactNode
}

export default ({ title, description, children }: AuthFormLayoutProps) => {
	const enhancedChildren = Children.map(children, (child) => {
		if (isValidElement(child)) {
			const element = child as ReactElement
			return cloneElement(element, {
				className: cn(
					AUTH_FORM_CONTAINER_CLASSNAME,
					element.props.className || '',
				),
			})
		}
		return child
	})

	return (
		<div
			className={cn(
				AUTH_FORM_CONTAINER_CLASSNAME,
				'animate-fade lg:max-w-md lg:gap-6',
			)}
		>
			<div className="grid gap-2 text-center">
				<h1 className="text-xl font-bold text-primary xs:text-3xl">{title}</h1>
				<p className="text-pretty text-xs text-muted-foreground xs:text-base">
					{description}
				</p>
			</div>
			{enhancedChildren}
		</div>
	)
}