import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { createContext, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Links {
	label?: string
	href: string
	icon: React.JSX.Element | React.ReactNode
}

interface SidebarContextProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider')
	}
	return context
}

export const SidebarProvider = ({
	children,
	open: openProp,
	setOpen: setOpenProp,
	animate = true,
}: {
	children: React.ReactNode
	open?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	animate?: boolean
}) => {
	const [openState, setOpenState] = useState(false)

	const open = openProp !== undefined ? openProp : openState
	const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

	return (
		<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
			{children}
		</SidebarContext.Provider>
	)
}

export const Sidebar = ({
	children,
	open,
	setOpen,
	animate,
}: {
	children: React.ReactNode
	open?: boolean
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	animate?: boolean
}) => {
	return (
		<SidebarProvider open={open} setOpen={setOpen} animate={animate}>
			{children}
		</SidebarProvider>
	)
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
	return (
		<>
			<DesktopSidebar {...props} />
			<MobileSidebar {...(props as React.ComponentProps<'div'>)} />
		</>
	)
}

export const DesktopSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { open, setOpen, animate } = useSidebar()
	return (
		<>
			<motion.div
				className={cn(
					'hidden h-full w-[300px] flex-shrink-0 px-4 py-4 md:flex md:flex-col',
					className,
				)}
				animate={{
					width: animate ? (open ? '300px' : '72px') : '300px',
				}}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...props}
			>
				{children}
			</motion.div>
		</>
	)
}

export const MobileSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) => {
	const { open, setOpen } = useSidebar()
	return (
		<>
			<div
				className={cn(
					'flex h-10 w-full flex-row items-center justify-between px-4 py-4 md:hidden',
				)}
				{...props}
			>
				<div className="z-20 flex w-full justify-end">
					<Menu
						className="text-neutral-800 dark:text-neutral-200"
						onClick={() => setOpen(!open)}
					/>
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: '-100%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: '-100%', opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: 'easeInOut',
							}}
							className={cn(
								'fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-white p-10 dark:bg-neutral-900',
								className,
							)}
						>
							<div
								className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
								onClick={() => setOpen(!open)}
							>
								<X />
							</div>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}

export type SidebarLinkProps = {
	link: Links
	className?: string
	extra?: React.ReactNode
	disableHoverEffect?: boolean
}

export const SidebarLink = ({
	link,
	className,
	extra,
	disableHoverEffect = false,
}: SidebarLinkProps) => {
	const { open, animate } = useSidebar()
	const location = useLocation()
	const isActive = location.pathname === link.href
	const navigate = useNavigate()

	return (
		<div
			className={cn(
				'flex cursor-pointer items-center justify-between gap-2 rounded-full p-2 transition duration-150',
				isActive
					? 'bg-primary-muted text-primary'
					: disableHoverEffect
						? ''
						: 'hover:bg-gray-100 dark:hover:bg-neutral-800',
				className,
			)}
			onClick={() => navigate(link.href)}
		>
			<div
				className={cn('group/sidebar flex items-center justify-start gap-2')}
			>
				{link.icon}

				<motion.span
					animate={{
						display: animate
							? open
								? 'inline-block'
								: 'none'
							: 'inline-block',
						opacity: animate ? (open ? 1 : 0) : 1,
					}}
					className={cn(
						'!m-0 inline-block whitespace-pre !p-0 transition duration-150 group-hover/sidebar:translate-x-1',
						isActive ? 'text-primary' : 'text-current',
					)}
				>
					{link.label}
				</motion.span>
			</div>

			{extra && (
				<motion.div
					animate={{
						display: animate
							? open
								? 'inline-block'
								: 'none'
							: 'inline-block',
						opacity: animate ? (open ? 1 : 0) : 1,
					}}
					className="ml-auto"
				>
					{extra}
				</motion.div>
			)}
		</div>
	)
}
