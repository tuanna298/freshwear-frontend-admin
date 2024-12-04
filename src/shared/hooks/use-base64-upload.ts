import type { UploadedFile } from '@/types'
import * as React from 'react'
import { toast } from 'sonner'

type UploadMode = 'single' | 'multiple'
type ImageProcessor = (file: File) => Promise<string>

interface UseBase64UploadOptions {
	maxSizeInMB?: number
	maxFileCount?: number
	allowedTypes?: string[]
	defaultUploadedFiles?: UploadedFile[]
	mode?: UploadMode
	imageProcessor?: ImageProcessor
}

export function useBase64Upload({
	maxSizeInMB = 5,
	maxFileCount = 5,
	allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
	defaultUploadedFiles = [],
	mode = 'multiple',
	imageProcessor,
}: UseBase64UploadOptions = {}) {
	const [uploadedFiles, setUploadedFiles] =
		React.useState<UploadedFile[]>(defaultUploadedFiles)
	const [progresses, setProgresses] = React.useState<Record<string, number>>({})
	const [isUploading, setIsUploading] = React.useState(false)

	// Default image processor if none provided
	const defaultImageProcessor: ImageProcessor = async (file: File) => {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = reject
			reader.readAsDataURL(file)
		})
	}

	async function onUpload(files: File[]) {
		// Check max file count for multiple mode
		if (
			mode === 'multiple' &&
			uploadedFiles.length + files.length > maxFileCount
		) {
			toast.error(`Maximum upload limit is ${maxFileCount} files`)
			return
		}

		setIsUploading(true)
		const validFiles: File[] = []

		// Validate files
		for (const file of files) {
			// Check file size
			if (file.size > maxSizeInMB * 1024 * 1024) {
				toast.error(
					`File ${file.name} exceeds maximum size of ${maxSizeInMB}MB`,
				)
				continue
			}

			// Check file type
			if (!allowedTypes.includes(file.type)) {
				toast.error(`File type ${file.name} is not supported`)
				continue
			}

			validFiles.push(file)
		}

		try {
			const base64Files: UploadedFile[] = await Promise.all(
				validFiles.map(async (file, index) => {
					// Add delay before processing each file
					await new Promise((resolve) => setTimeout(resolve, 500))

					// Update progress
					setProgresses((prev) => ({
						...prev,
						[file.name]: ((index + 1) / validFiles.length) * 100,
					}))

					// Use custom image processor or default
					const processorToUse = imageProcessor || defaultImageProcessor
					const processedUrl = await processorToUse(file)

					return {
						key: file.name,
						name: file.name,
						url: processedUrl,
						serverData: null,
						size: file.size,
						type: file.type,
						customId: '',
						lastModified: file.lastModified,
						appUrl: '',
						fileHash: '',
					}
				}),
			)

			// Update uploaded files list
			setUploadedFiles(
				(prev) =>
					mode === 'single'
						? base64Files // Override if in single mode
						: [...prev, ...base64Files], // Add if in multiple mode
			)

			return base64Files // Return processed files
		} catch (err) {
			toast.error('Error processing images')
			return []
		} finally {
			// Reset progress
			setProgresses({})
			setIsUploading(false)
		}
	}

	// Image processing example functions
	const processImageResize = async (
		file: File,
		maxWidth = 800,
		maxHeight = 600,
	): Promise<string> => {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.src = URL.createObjectURL(file)
			img.onload = () => {
				// Calculate new dimensions
				let width = img.width
				let height = img.height

				if (width > height) {
					if (width > maxWidth) {
						height *= maxWidth / width
						width = maxWidth
					}
				} else {
					if (height > maxHeight) {
						width *= maxHeight / height
						height = maxHeight
					}
				}

				// Create canvas and resize
				const canvas = document.createElement('canvas')
				canvas.width = width
				canvas.height = height
				const ctx = canvas.getContext('2d')
				ctx?.drawImage(img, 0, 0, width, height)

				// Convert to base64
				const resizedUrl = canvas.toDataURL(file.type)
				resolve(resizedUrl)
			}
			img.onerror = reject
		})
	}

	// Image processing example with filter
	const processImageWithFilter = async (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.src = URL.createObjectURL(file)
			img.onload = () => {
				const canvas = document.createElement('canvas')
				canvas.width = img.width
				canvas.height = img.height
				const ctx = canvas.getContext('2d')

				// Draw original image
				ctx?.drawImage(img, 0, 0)

				// Apply grayscale filter as an example
				if (ctx) {
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
					const data = imageData.data
					for (let i = 0; i < data.length; i += 4) {
						const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
						data[i] = avg // red
						data[i + 1] = avg // green
						data[i + 2] = avg // blue
					}
					ctx.putImageData(imageData, 0, 0)
				}

				// Convert to base64
				const filteredUrl = canvas.toDataURL(file.type)
				resolve(filteredUrl)
			}
			img.onerror = reject
		})
	}

	// Remove file
	const removeFile = (fileToRemove: UploadedFile) => {
		setUploadedFiles((prev) =>
			prev.filter((file) => file.key !== fileToRemove.key),
		)
	}

	return {
		onUpload,
		uploadedFiles,
		progresses,
		isUploading,
		removeFile,
		processImageResize,
		processImageWithFilter,
	}
}
