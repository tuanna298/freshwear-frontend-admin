import { RESOURCE_MAP } from '@/shared/common/constants'
import React from 'react'
import { useLocation } from 'react-router-dom'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb'

const AppBreadcrumb = () => {
	let location = useLocation()

	// Split the pathname into segments
	const pathSegments = location.pathname.split('/').filter(Boolean)

	// Generate breadcrumb items
	const breadcrumbItems = [
		// Always start with Home
		{ label: 'Trang chủ', href: '/', isLast: false },
		...pathSegments.map((segment, index) => {
			// Construct path for each segment
			const href = `/${pathSegments.slice(0, index + 1).join('/')}`
			const label =
				RESOURCE_MAP[href.split('/').pop() as string] ||
				segment.charAt(0).toUpperCase() + segment.slice(1)

			return {
				label,
				href,
				isLast: index === pathSegments.length - 1,
			}
		}),
	]

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbItems.map((item, index) => (
					<React.Fragment key={`breadcrumb-fragment-${index}`}>
						{index > 0 && (
							<BreadcrumbSeparator key={`separator-${item.href}`} />
						)}
						<BreadcrumbItem key={item.href}>
							{item.isLast ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default AppBreadcrumb