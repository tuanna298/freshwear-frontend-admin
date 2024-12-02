import { cn } from '@/lib/utils'
import { APP_NAME } from '@/shared/common/constants'
import FingerprintAuthenticationIcon from '@/shared/icons/fingerprint-authentication'
import { Fingerprint, Shirt } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'

export default () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const areaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const updateAreaDimensions = () => {
			if (containerRef.current && areaRef.current) {
				const containerRect = containerRef.current.getBoundingClientRect()
				areaRef.current.style.width = `${containerRect.width}px`
				areaRef.current.style.height = `${Math.min(window.innerHeight, containerRect.height)}px`
				areaRef.current.style.top = `${containerRect.top}px`
				areaRef.current.style.left = `${containerRect.left}px`
			}
		}
		const resizeObserver = new ResizeObserver(updateAreaDimensions)
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current)
		}
		// Cleanup observer on unmount
		return () => {
			if (containerRef.current) {
				resizeObserver.unobserve(containerRef.current)
			}
		}
	}, [])

	return (
		<div className="min-w-screen min-h-screen xl:grid xl:grid-cols-2">
			<div className="flex min-h-screen w-full items-center justify-center pt-10 lg:pb-10">
				<div
					className={cn(
						'absolute top-0 z-[-2] h-screen w-screen',
						// light mode
						'bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary-light)),rgba(255,255,255,0))]',
						// dark mode
						'dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]',
					)}
				/>

				<div className="grid w-full gap-6 px-5 lg:px-0">
					<div className="fixed left-3 top-3 z-50 h-10 sm:static sm:grid sm:gap-2 sm:text-center">
						<div className="m-auto flex h-full items-center justify-center gap-2">
							<Shirt className="animate-pulse text-primary" size={32} />
							<h2 className="hidden scroll-m-20 font-sans text-lg font-extrabold tracking-tight text-primary xs:block xs:text-3xl lg:text-4xl">
								{APP_NAME}
							</h2>
							<div className="hidden sm:block">
								<p className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-primary pr-1 font-mono font-bold text-primary">
									/ Thời Trang Của Bạn
								</p>
							</div>
						</div>
					</div>
					<Outlet />
				</div>
			</div>
			<div
				ref={containerRef}
				className="hidden bg-primary xl:flex xl:items-center xl:justify-center"
			>
				{/* Start Background Animation Body */}
				<div ref={areaRef} className="absolute z-10">
					<ul className="circles font-bebas font-extrabold">
						<li>
							<span><Fingerprint size={48}/></span>
						</li>
						<li>
							<span><Fingerprint size={12}/></span>
						</li>
						<li>
							<span><Fingerprint size={12}/></span>
						</li>
						<li>
							<span><Fingerprint size={36}/></span>
						</li>
						<li>
							<span><Fingerprint size={12}/></span>
						</li>
						<li>
							<span><Fingerprint size={66}/></span>
						</li>
						<li>
							<span><Fingerprint size={90}/></span>
						</li>
						<li>
							<span><Fingerprint size={15}/></span>
						</li>
						<li>
							<span><Fingerprint size={9}/></span>
						</li>
						<li>
							<span><Fingerprint size={90}/></span>
						</li>
					</ul>
				</div>
				{/* End Background Animation Body */}
				<FingerprintAuthenticationIcon className="z-20 max-h-full max-w-full animate-bounce object-contain xl:max-h-[600px] xl:max-w-[600px]" />
			</div>
		</div>
	)
}