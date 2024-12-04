import { FileText, Upload, X } from 'lucide-react'
import * as React from 'react'
import Dropzone, {
	type DropzoneProps,
	type FileRejection,
} from 'react-dropzone'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatBytes } from '@/lib/utils'
import { useControllableState } from '@/shared/hooks/use-controllable-state'
import { AnimatePresence, motion } from 'framer-motion'

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Value of the uploader.
	 * @type File[]
	 * @default undefined
	 * @example value={files}
	 */
	value?: File[]

	/**
	 * Function to be called when the value changes.
	 * @type (files: File[]) => void
	 * @default undefined
	 * @example onValueChange={(files) => setFiles(files)}
	 */
	onValueChange?: (files: File[]) => void

	/**
	 * Function to be called when files are uploaded.
	 * @type (files: File[]) => Promise<void>
	 * @default undefined
	 * @example onUpload={(files) => uploadFiles(files)}
	 */
	onUpload?: (files: File[]) => Promise<void>

	/**
	 * Progress of the uploaded files.
	 * @type Record<string, number> | undefined
	 * @default undefined
	 * @example progresses={{ "file1.png": 50 }}
	 */
	progresses?: Record<string, number>

	/**
	 * Accepted file types for the uploader.
	 * @type { [key: string]: string[]}
	 * @default
	 * ```ts
	 * { "image/*": [] }
	 * ```
	 * @example accept={["image/png", "image/jpeg"]}
	 */
	accept?: DropzoneProps['accept']

	/**
	 * Maximum file size for the uploader.
	 * @type number | undefined
	 * @default 1024 * 1024 * 2 // 2MB
	 * @example maxSize={1024 * 1024 * 2} // 2MB
	 */
	maxSize?: DropzoneProps['maxSize']

	/**
	 * Maximum number of files for the uploader.
	 * @type number | undefined
	 * @default 1
	 * @example maxFileCount={4}
	 */
	maxFileCount?: DropzoneProps['maxFiles']

	/**
	 * Whether the uploader should accept multiple files.
	 * @type boolean
	 * @default false
	 * @example multiple
	 */
	multiple?: boolean

	/**
	 * Whether the uploader is disabled.
	 * @type boolean
	 * @default false
	 * @example disabled
	 */
	disabled?: boolean

	/**
	 * Placeholder image for the uploader.
	 * @type string
	 * @default undefined
	 */
	placeholder?: string

	/**
	 * Whether the uploader should only show the icon.
	 * @type boolean
	 * @default false
	 * @example iconOnly
	 */
	iconOnly?: boolean
}

export function FileUploader(props: FileUploaderProps) {
	const {
		value: valueProp,
		onValueChange,
		onUpload,
		progresses,
		accept = {
			'image/*': [],
		},
		maxSize = 1024 * 1024 * 2,
		maxFileCount = 1,
		multiple = false,
		disabled = false,
		className,
		placeholder,
		iconOnly,
		...dropzoneProps
	} = props

	const [files, setFiles] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
	})

	const onDrop = React.useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
				toast.error('Không thể tải lên nhiều hơn 1 tệp cùng một lúc')
				return
			}

			if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
				toast.error(`Không thể tải lên nhiều hơn ${maxFileCount} tệp`)
				return
			}

			const newFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				}),
			)

			const updatedFiles = files ? [...files, ...newFiles] : newFiles

			setFiles(updatedFiles)

			if (rejectedFiles.length > 0) {
				rejectedFiles.forEach(({ file }) => {
					toast.error(`File '${file.name}' không hợp lệ`)
				})
			}

			if (
				onUpload &&
				updatedFiles.length > 0 &&
				updatedFiles.length <= maxFileCount
			) {
				const target =
					updatedFiles.length > 0 ? `${updatedFiles.length} tệp` : `tệp`

				toast.promise(onUpload(updatedFiles), {
					loading: `Đang tải lên ${target}`,
					success: () => {
						setFiles([])
						return `${target} đã được tải lên thành công`
					},
					error: `Đã xảy ra lỗi khi tải lên ${target}`,
				})
			}
		},

		[files, maxFileCount, multiple, onUpload, setFiles],
	)

	function onRemove(index: number) {
		if (!files) return
		const newFiles = files.filter((_, i) => i !== index)
		setFiles(newFiles)
		onValueChange?.(newFiles)
	}

	// Revoke preview url when component unmounts
	React.useEffect(() => {
		return () => {
			if (!files) return
			files.forEach((file) => {
				if (isFileWithPreview(file)) {
					URL.revokeObjectURL(file.preview)
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount

	return (
		<div className="relative flex flex-col gap-6 overflow-hidden">
			<Dropzone
				onDrop={onDrop}
				accept={accept}
				maxSize={maxSize}
				maxFiles={maxFileCount}
				multiple={maxFileCount > 1 || multiple}
				disabled={isDisabled}
			>
				{({ getRootProps, getInputProps, isDragActive }) => (
					<div
						{...getRootProps()}
						className={cn(
							'group relative grid h-[298px] w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
							'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
							isDragActive && 'border-muted-foreground/50',
							isDisabled && 'pointer-events-none opacity-60',
							className,
							placeholder && 'bg-cover bg-center bg-no-repeat',
						)}
						{...dropzoneProps}
						style={{
							backgroundImage: `url(${placeholder})`,
						}}
					>
						<input {...getInputProps()} />
						{!placeholder && (
							<>
								{isDragActive ? (
									<div className="flex flex-col items-center justify-center gap-4 sm:px-5">
										<div className="rounded-full border border-dashed p-3">
											<Upload
												className="size-7 text-muted-foreground"
												aria-hidden="true"
											/>
										</div>
										<p className="font-medium text-muted-foreground">
											Thả tệp vào đây
										</p>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center gap-4 sm:px-5">
										<div className="rounded-full border border-dashed p-3">
											<Upload
												className="size-7 text-muted-foreground"
												aria-hidden="true"
											/>
										</div>
										{!iconOnly && (
											<div className="flex flex-col gap-px">
												<p className="font-medium text-muted-foreground">
													Kéo và thả tệp vào đây, hoặc nhấn để chọn tệp
												</p>
												<p className="text-sm text-muted-foreground/70">
													Bạn có thể tải lên
													{maxFileCount > 1
														? ` ${maxFileCount === Infinity ? 'multiple' : maxFileCount}
                      tệp (lên tới ${formatBytes(maxSize)} cho mỗi tệp)`
														: ` 1 tệp với ${formatBytes(maxSize)}`}
												</p>
											</div>
										)}
									</div>
								)}
							</>
						)}
					</div>
				)}
			</Dropzone>
			{files?.length ? (
				<ScrollArea className="h-fit w-full px-3">
					<div className="flex max-h-48 flex-col gap-4">
						{files?.map((file, index) => (
							<FileCard
								key={index}
								file={file}
								onRemove={() => onRemove(index)}
								progress={progresses?.[file.name]}
							/>
						))}
					</div>
				</ScrollArea>
			) : null}
		</div>
	)
}

interface FileCardProps {
	file: File
	onRemove: () => void
	progress?: number
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
	return (
		<div className="relative flex items-center gap-2.5">
			<div className="flex flex-1 gap-2.5">
				{isFileWithPreview(file) ? <FilePreview file={file} /> : null}
				<div className="flex w-full flex-col gap-2">
					<div className="flex flex-col gap-px">
						<p className="line-clamp-1 text-sm font-medium text-foreground/80">
							{file.name}
						</p>
						<p className="text-xs text-muted-foreground">
							{formatBytes(file.size)}
						</p>
					</div>
					{progress ? <Progress value={progress} /> : null}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					size="icon"
					className="size-7"
					onClick={onRemove}
				>
					<X className="size-4" aria-hidden="true" />
					<span className="sr-only">Remove file</span>
				</Button>
			</div>
		</div>
	)
}

function isFileWithPreview(file: File): file is File & { preview: string } {
	return 'preview' in file && typeof file.preview === 'string'
}

interface FilePreviewProps {
	file: File & { preview: string }
}

function FilePreview({ file }: FilePreviewProps) {
	const [isLoaded, setIsLoaded] = React.useState(false)
	const [isImageReady, setIsImageReady] = React.useState(false)

	React.useEffect(() => {
		// Đảm bảo preview được tạo
		if (file.preview) {
			const img = new Image()
			img.src = file.preview

			// Thêm delay nhẹ để tạo hiệu ứng mượt mà
			const timer = setTimeout(() => {
				setIsLoaded(true)
			}, 300)

			img.onload = () => {
				// Delay thêm một chút để tạo trải nghiệm mượt mà
				setTimeout(() => {
					setIsImageReady(true)
				}, 100)
			}

			return () => {
				clearTimeout(timer)
				img.onload = null
			}
		}

		// Return a no-op cleanup function if file.preview is not set
		return () => {}
	}, [file.preview])

	if (!file.type.startsWith('image/')) {
		return (
			<FileText className="size-10 text-muted-foreground" aria-hidden="true" />
		)
	}

	return (
		<div className="relative h-12 w-12">
			{/* Skeleton Loading */}
			<AnimatePresence>
				{!isLoaded && (
					<motion.div
						className="absolute inset-0 animate-pulse rounded-md bg-gray-200"
						initial={{ opacity: 1 }}
						exit={{
							opacity: 0,
							transition: { duration: 0.3 },
						}}
					/>
				)}
			</AnimatePresence>

			{/* Image Preview */}
			<motion.img
				src={file.preview}
				alt={file.name}
				width={48}
				height={48}
				loading="lazy"
				initial={{
					opacity: 0,
					scale: 0.95,
				}}
				animate={{
					opacity: isImageReady ? 1 : 0,
					scale: isImageReady ? 1 : 0.95,
				}}
				transition={{
					duration: 0.3,
					type: 'spring',
					stiffness: 100,
				}}
				className={`
			absolute inset-0 h-full w-full rounded-md object-cover
			transition-all duration-300 ease-in-out
			${isImageReady ? 'opacity-100' : 'opacity-0'}
		  `}
			/>
		</div>
	)
}
