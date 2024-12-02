import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const PreventDefaultArea = ({ children }: Props) => (
	<div
		role="button"
		tabIndex={0}
		onClick={(e) => {
			e.preventDefault()
			e.stopPropagation()
		}}
		onKeyDown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				e.stopPropagation()
			}
		}}
	>
		{children}
	</div>
)

export default PreventDefaultArea
