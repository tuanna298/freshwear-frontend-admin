import { getStorageKey } from '@/lib/utils'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SidebarState = {
	lock: boolean
	toggleLock: () => void
}

const useSidebarStore = create<SidebarState>()(
	persist(
		(set) => ({
			lock: false,
			toggleLock: () =>
				set((state) => ({
					lock: !state.lock,
				})),
		}),
		{
			name: getStorageKey('sidebar-store'),
		},
	),
)

export default useSidebarStore
