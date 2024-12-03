import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { AlertCircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DefaultBaseDTO } from '@/shared/common/interfaces'
import { ConfirmDialog } from '../custom/confirm-dialog'
import { Button } from '../ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
	pageSizes?: number[]
	total?: number
	displayOptions?: {
		total?: boolean
		select?: boolean
		state?: boolean
		navigator?: boolean
	}
	handleDelete?: (ids: string[]) => void
	actualTotal?: number
	className?: string
}

const DEFAULT_PAGE_SIZES: number[] = [5, 10, 20, 30, 40, 50]

/**
 * An example table footer
 */
export default function DataTablePagination<TData extends DefaultBaseDTO>({
	table,
	total = table.getPageCount(),
	pageSizes = DEFAULT_PAGE_SIZES,
	displayOptions = {
		total: true,
		select: true,
		state: true,
		navigator: true,
	},
	actualTotal,
	handleDelete,
	className,
}: DataTablePaginationProps<TData>) {
	const selectedRows = table.getFilteredSelectedRowModel().flatRows
	const selectedIds = selectedRows
		.map((item) => (item.original as unknown as TData).id)
		.filter((id): id is string => typeof id === 'string')
		.filter(Boolean)
	const canTriggerDelete = !!selectedIds.length && !!handleDelete
	const deleteButton = (
		<div
			className={cn(
				'flex-1 text-sm text-muted-foreground transition-all',
				canTriggerDelete && 'cursor-pointer font-medium text-red-500',
			)}
		>
			{canTriggerDelete && <span>Xoá</span>} {selectedRows.length}/
			{table.getFilteredRowModel().flatRows.length} hàng đã chọn
		</div>
	)

	return (
		<div className={cn('flex items-center justify-between', className)}>
			{displayOptions?.total && (
				<p className="p-[5px] text-sm font-medium">
					Tổng{' '}
					{actualTotal || total || table.getFilteredRowModel().flatRows.length}{' '}
					bản ghi
				</p>
			)}
			{displayOptions?.select &&
				(canTriggerDelete ? (
					<ConfirmDialog
						title={
							<span className="flex items-center">
								<AlertCircleIcon className="mr-1 h-5 w-5" /> Bạn có chắc chắn ?
							</span>
						}
						onConfirm={() => {
							handleDelete?.(selectedIds)
							table.resetRowSelection()
						}}
						trigger={deleteButton}
						description={
							<div>
								Bạn có chắc chắn muốn
								<span className="ml-1 font-bold text-black">
									xoá những bản ghi đã chọn?
								</span>
								<div className="text-red-500">
									Xoá xong không thể phục hồi lại được.
								</div>
							</div>
						}
						okLabel="Xác nhận muốn xoá bản ghi"
						okBtnClassName="bg-red-500 hover:bg-red-600"
					/>
				) : (
					deleteButton
				))}
			<div className="flex items-center space-x-6 lg:space-x-8">
				{displayOptions?.select && (
					<div className="flex items-center space-x-2">
						<p className="text-sm font-medium">Bản ghi</p>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value))
							}}
						>
							<SelectTrigger className="w-[70px]">
								<SelectValue
									placeholder={table.getState().pagination.pageSize}
								/>
							</SelectTrigger>
							<SelectContent side="top">
								{pageSizes.map((pageSize) => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
				{displayOptions?.state && (
					<div className="flex w-fit items-center justify-center text-sm font-medium">
						Trang {table.getState().pagination.pageIndex + 1} của{' '}
						{table.getPageCount()}
					</div>
				)}

				{displayOptions?.navigator && (
					<div className="flex items-center space-x-2">
						{/* FIRST */}
						<Button
							type="button"
							variant="outline"
							className="hidden w-8 p-0 lg:flex"
							onClick={() => table.firstPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<DoubleArrowLeftIcon className="h-4 w-4" />
						</Button>

						{/* PREV */}
						<Button
							type="button"
							variant="outline"
							className="w-8 p-0"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>

						{/* NEXT */}
						<Button
							type="button"
							variant="outline"
							className="w-8 p-0"
							onClick={() => {
								return table.nextPage()
							}}
							disabled={!table.getCanNextPage()}
						>
							<ChevronRightIcon className="h-4 w-4" />
						</Button>

						{/* LAST */}
						<Button
							type="button"
							variant="outline"
							className="hidden w-8 p-0 lg:flex"
							onClick={() => table.lastPage()}
							disabled={!table.getCanNextPage()}
						>
							<DoubleArrowRightIcon className="h-4 w-4" />
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
