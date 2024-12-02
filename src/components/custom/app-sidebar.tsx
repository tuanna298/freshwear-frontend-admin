import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAvatarColor, getFirstLetterOfLastWord } from '@/lib/utils'
import { useAuthStore } from '@/modules/auth/stores/use-auth-store'
import { APP_NAME, ROUTE_PATHS } from '@/shared/common/constants'
import { useLogout } from '@refinedev/core'

import useSidebarStore from '@/shared/hooks/use-sidebar-store'
import { motion } from 'framer-motion'
import { LayoutGrid, Lock, LockOpen, LogOut, Shirt } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollArea } from '../ui/scroll-area'
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from '../ui/sidebar'
import { Toggle } from '../ui/toggle'
import Popconfirm from './pop-confirm'
import PreventDefaultArea from './prevent-default-area'

const { ROOT } = ROUTE_PATHS

const linkIconClassName = 'h-6 w-6 flex-shrink-0'

const links = [
	{
		label: 'Trang chủ',
		href: ROOT,
		icon: <LayoutGrid className={linkIconClassName} />,
	},
]

const Logo = () => {
	const { open, animate } = useSidebar()
	return (
		<Link
			to="#"
			className="relative z-20 flex min-h-14 items-center space-x-2 rounded-lg p-2 text-sm"
		>
			<Shirt className="h-7 w-7 flex-shrink-0 text-primary" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{
					display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
					opacity: 1,
				}}
				className="whitespace-pre font-medium text-black dark:text-white"
			>
				<span className="scroll-m-20 font-sans text-3xl font-extrabold tracking-tight text-primary">
					{APP_NAME}
				</span>
			</motion.span>
		</Link>
	)
}

const AppSidebar = () => {
	const { profile } = useAuthStore()
	const [open, setOpen] = useState(false)
	const { lock, toggleLock } = useSidebarStore()
	const { mutate: logout } = useLogout()

	const username = profile?.name || 'Unknown User'

	return (
		<Sidebar open={open} setOpen={setOpen} animate={!lock}>
			<SidebarBody className="sticky top-0 h-screen justify-between">
				<div className="flex flex-1 flex-col overflow-hidden">
					<Logo />
					<div className="mt-5 flex flex-col gap-2">
						<motion.span
							animate={{
								visibility: !lock ? (open ? 'visible' : 'hidden') : 'visible',
							}}
							className="whitespace-nowrap p-2 text-xs uppercase opacity-70"
						>
							Chung
						</motion.span>

						<ScrollArea className="max-h-[45vh]">
							<div className="flex flex-col gap-2">
								{links.map((link, idx) => (
									<SidebarLink key={idx} link={link} />
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
				<div>
					<div className="mb-10 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
						<div className="p-2 text-sm uppercase tracking-widest opacity-70"></div>
						<motion.span
							animate={{
								visibility: !lock ? (open ? 'visible' : 'hidden') : 'visible',
							}}
							className="whitespace-nowrap p-2 text-xs uppercase opacity-70"
						>
							Hệ thống
						</motion.span>
						<Popconfirm
							title="Bạn có chắc chắn muốn đăng xuất không?"
							onConfirm={() => logout()}
							okText="Có"
							showCancel={false}
						>
							<SidebarLink
								link={{
									label: 'Đăng xuất',
									href: '#',
									icon: <LogOut className="h-6 w-6 flex-shrink-0" />,
								}}
							/>
						</Popconfirm>
					</div>

					<SidebarLink
						disableHoverEffect
						className="min-h-[40px]"
						link={{
							label: username,
							href: 'PROFILE',
							icon: (
								<Avatar className="h-6 w-6">
									<AvatarImage width={50} height={50} alt="Avatar" />
									<AvatarFallback
										style={{
											backgroundColor: getAvatarColor(profile?.name),
											color: 'hsl(var(--foreground))',
										}}
									>
										{getFirstLetterOfLastWord(username)}
									</AvatarFallback>
								</Avatar>
							),
						}}
						extra={
							<PreventDefaultArea>
								<Toggle
									aria-label="Toggle lock"
									pressed={lock}
									onPressedChange={toggleLock}
									className="hidden h-auto p-1 sm:relative sm:block"
								>
									<motion.div
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										{lock ? (
											<Lock className="h-4 w-4 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
										) : (
											<LockOpen className="h-4 w-4 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
										)}
									</motion.div>
								</Toggle>
							</PreventDefaultArea>
						}
					/>
				</div>
			</SidebarBody>
		</Sidebar>
	)
}

export default AppSidebar
