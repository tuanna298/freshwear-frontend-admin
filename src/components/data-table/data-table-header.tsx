/* eslint-disable react-hooks/rules-of-hooks */
import { Table } from '@tanstack/react-table'
import { debounce } from 'lodash'
import { RefreshCw, SearchIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { DefaultBaseDTO } from '@/shared/common/interfaces'
import { Button, ButtonProps } from '../ui/button'
import { Input } from '../ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import DataTableViewOptions from './data-table-view-options'

export type DataTableHeaderProps<T extends DefaultBaseDTO> = {
	table: Table<T>
	/** reload props for reload button. You can set manual props of like isLoading, onClick,... */
	reloadProps?: ButtonProps & { isLoading?: boolean }
	/** add right component */
	right?: ReactNode
	/** add left component */
	left?: ReactNode
	onSearch?: (value: string) => void
}

const DataTableHeader = <T extends DefaultBaseDTO>({
	table,
	reloadProps,
	right,
	left,
	onSearch,
}: DataTableHeaderProps<T>) => {
	return (
		<div className="flex items-center pb-4 pt-2">
			<div className="flex w-full flex-row gap-2">
				{left}
				<Input
					onChange={debounce((e) => {
						onSearch?.(e.target.value)
					}, 300)}
					placeholder="Tìm kiếm"
					icon={<SearchIcon className="size-4" />}
					className="w-[249px]"
					style={{
						height: '100%',
					}}
				/>
			</div>

			<div className="flex h-full w-full flex-row gap-2">
				<DataTableViewOptions table={table} />
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							type="button"
							size="sm"
							variant={'outline'}
							onClick={reloadProps?.onClick}
							{...reloadProps}
						>
							<RefreshCw
								className={`h-4 w-4 ${reloadProps?.isLoading ? 'animate-spin delay-300' : ''}`}
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Tải lại trang</TooltipContent>
				</Tooltip>
				{right}
			</div>
		</div>
	)
}

export default DataTableHeader
