import AppSidebar from '@/components/custom/app-sidebar'
import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'

export default () => {
	return (
		<div
			className={cn(
				'mx-auto flex w-full flex-1 flex-col rounded-md md:flex-row',
				'h-full',
			)}
		>
			<AppSidebar />
			<div className="flex flex-1">
				<div className="flex h-full w-full flex-1 flex-col overflow-auto rounded-tl-2xl border-l bg-gray-100 p-2 dark:bg-neutral-800 md:p-5">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
