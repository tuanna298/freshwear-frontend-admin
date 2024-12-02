import { getStorageKey } from '@/lib/utils'
import { Profile } from '@/schemas/auth/user.schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthState = {
	accessToken?: string
	setAccessToken: (value?: string) => void
	clear: () => void
	profile?: Profile
	setProfile: (value?: Profile) => void
}

export const defaultAuthStore = Object.freeze({
	accessToken: undefined,
	profile: undefined,
})

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			...defaultAuthStore,
			setAccessToken: (value?: string) => set({ accessToken: value }),
			setProfile: (value?: Profile) => set({ profile: value }),
			clear: () => set({ ...defaultAuthStore }),
		}),
		{ name: getStorageKey('auth-store') },
	),
)