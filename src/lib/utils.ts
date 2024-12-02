import { APP_NAME } from '@/shared/common/constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getStorageKey(key: string) {
	return `${APP_NAME.toLowerCase()}-${key}`
}

export function hashString(str: string) {
	let hash = 0
	if (str.length === 0) return hash

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Convert to 32bit integer
	}

	return hash
}

export function getFirstLetterOfLastWord(fullName: string | undefined) {
	if (!fullName) {
		return 'U'
	}

	const words = fullName.trim().split(/\s+/)
	if (words.length === 0) {
		return 'U'
	}

	const lastWord = words[words.length - 1]
	const firstLetter = lastWord.charAt(0)

	return firstLetter.toUpperCase()
}

export function getAvatarColor(fullName: string | undefined) {
	const hashedValue = hashString(fullName || 'User')
	let r = (hashedValue >> 16) & 0xff
	let g = (hashedValue >> 8) & 0xff
	let b = hashedValue & 0xff

	r = Math.max(r, 128)
	g = Math.max(g, 128)
	b = Math.max(b, 128)

	const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
	return color
}
