import { Column, Table as TableProps, flexRender } from '@tanstack/react-table'
import { CSSProperties, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { DefaultBaseDTO } from '@/shared/common/interfaces'
import GlobalSpinner from '../custom/global-spinner'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'

export type DataTableProps<T extends DefaultBaseDTO> =
	HTMLAttributes<HTMLTableElement> & {
		table: TableProps<T>
		loading?: boolean
		containerProps?: React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
	}

const getCommonPinningStyles = <T extends DefaultBaseDTO>(
	column: Column<T>,
): CSSProperties => {
	const isPinned = column.getIsPinned()
	return {
		left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
		right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
		position: isPinned ? 'sticky' : 'relative',
		zIndex: isPinned ? 1 : undefined,
	}
}

export default function DataTable<T extends DefaultBaseDTO>({
	table,
	loading,
	containerProps,
	...props
}: DataTableProps<T>) {
	return (
		<div
			{...containerProps}
			className={cn('mb-4 rounded-md border', containerProps?.className)}
		>
			<Table {...props}>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									colSpan={header.colSpan}
									className={cn(
										header.column.getIsPinned() && 'bg-background',
										header.column.getIsFirstColumn('left') && 'rounded-tl-md',
										header.column.getIsLastColumn('right') && 'rounded-tr-md',
										header.column.getIsLastColumn('left') && 'border-r',
										header.column.getIsFirstColumn('right') && 'border-l',

										// for nested columns header
										(header.subHeaders.length > 0 ||
											header.id ===
												[...(header.column.parent?.columns || [])].pop()?.id ||
											(header.column.depth < 1 &&
												headerGroup.headers.length !==
													table.getAllFlatColumns().length)) &&
											header.index + 1 !== headerGroup.headers.length &&
											'border-r',
									)}
									style={{
										minWidth: `${header.column.getSize()}px`,
										...getCommonPinningStyles(header.column),
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow key="loading">
							<GlobalSpinner />
						</TableRow>
					) : table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className={cn(
											cell.column.getIsPinned() && 'bg-background',
											cell.column.getIsLastColumn('left') && 'border-r',
											cell.column.getIsFirstColumn('right') && 'border-l',
											cell.column.getIsFirstColumn('left') &&
												row.index + 1 === table.getRowCount() &&
												'rounded-bl-md',
											cell.column.getIsLastColumn('right') &&
												row.index + 1 === table.getRowCount() &&
												'rounded-br-md',
										)}
										style={{
											...getCommonPinningStyles(cell.column),
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<RowEmpty length={table.getAllFlatColumns().length} />
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export const RowEmpty = ({ length }: { length: number }) => (
	<TableRow>
		<TableCell colSpan={length} className="text-start text-muted-foreground">
			Không có dữ liệu để hiển thị.
		</TableCell>
	</TableRow>
)
