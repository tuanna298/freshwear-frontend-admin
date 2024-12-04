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

export function getContrastColor(hexColor: string) {
	// Remove the hash at the start if it's there
	hexColor = hexColor.replace('#', '')

	// Parse the color to RGB
	const r = parseInt(hexColor.substr(0, 2), 16)
	const g = parseInt(hexColor.substr(2, 2), 16)
	const b = parseInt(hexColor.substr(4, 2), 16)

	// Calculate the perceptive luminance (aka luma) - human eye favors green color
	const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255

	// Return black for bright colors, white for dark colors
	return luma > 0.5 ? '#000000' : '#FFFFFF'
}

export function formatBytes(
	bytes: number,
	opts: {
		decimals?: number
		sizeType?: 'accurate' | 'normal'
	} = {},
) {
	const { decimals = 0, sizeType = 'normal' } = opts

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
	if (bytes === 0) return '0 Byte'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
		sizeType === 'accurate'
			? (accurateSizes[i] ?? 'Bytes')
			: (sizes[i] ?? 'Bytes')
	}`
}

/**
 * Stole this from the @radix-ui/primitive
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
export function composeEventHandlers<E>(
	originalEventHandler?: (event: E) => void,
	ourEventHandler?: (event: E) => void,
	{ checkForDefaultPrevented = true } = {},
) {
	return function handleEvent(event: E) {
		originalEventHandler?.(event)

		if (
			checkForDefaultPrevented === false ||
			!(event as unknown as Event).defaultPrevented
		) {
			return ourEventHandler?.(event)
		}
	}
}
