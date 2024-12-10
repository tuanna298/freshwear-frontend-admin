import type { UploadedFile } from '@/types'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { EmptyCard } from './empty-card'

interface UploadedFilesCardProps {
	uploadedFiles: UploadedFile[]
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Tệp đã tải lên</CardTitle>
			</CardHeader>
			<CardContent>
				{uploadedFiles.length > 0 ? (
					<ScrollArea className="pb-4">
						<div className="flex w-max space-x-2.5">
							{uploadedFiles.map((file) => (
								<div key={file.key} className="relative aspect-video w-64">
									<img
										src={file.url || '/images/placeholder.jpg'}
										alt={file.name}
										sizes="(min-width: 640px) 640px, 100vw"
										loading="lazy"
										className="rounded-md object-cover"
									/>
								</div>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				) : (
					<EmptyCard
						title="No files uploaded"
						description="Upload some files to see them here"
						className="w-full"
					/>
				)}
			</CardContent>
		</Card>
	)
}
