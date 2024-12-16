import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Attribute } from '@/schemas/attribute.schema'
import { RESOURCE_MAP } from '@/shared/common/constants'
import PageLayout from '@/shared/layouts/page'
import {
	BaseKey,
	HttpError,
	useDelete,
	useDeleteMany,
	useResource,
	useUpdate,
} from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { AttributeColumns } from '../components/attribute-column'
import AttributeDialog from '../components/attribute-dialog'

const AttributeManagement = () => {
	const queryClient = useQueryClient()
	const { mutate } = useDeleteMany()

	const { resource } = useResource()

	if (!resource) {
		throw new Error('Resource not found')
	}

	const deleteMutation = useDelete()
	const update = useUpdate({
		resource: resource.name,
		successNotification() {
			return {
				message: 'Cập nhật thành công',
				type: 'success',
			}
		},
	})
	const onUpdate = (data: Attribute) =>
		update.mutate(
			{
				id: data.id,
				values: data,
			},
			{
				onSuccess() {
					queryClient.invalidateQueries([resource.name, 'list'])
				},
			},
		)
	const onDelete = (id: BaseKey) =>
		deleteMutation.mutate(
			{
				resource: resource.name,
				id,
				successNotification() {
					return {
						message: 'Xóa thành công',
						type: 'success',
					}
				},
			},
			{
				onSuccess() {
					queryClient.invalidateQueries([resource.name, 'list'])
				},
			},
		)

	const columns = useMemo(
		() =>
			AttributeColumns({
				onDelete,
				onSubmit: onUpdate,
				isSuccess: update.isSuccess,
			}),
		[resource, update.isSuccess],
	)

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Attribute, HttpError, Attribute>({
		columns,
		refineCoreProps: {
			resource: resource.name,
		},
	})

	const resourceLabel = RESOURCE_MAP[resource?.name as string].toLowerCase()

	return (
		<PageLayout title={`Quản lý ${resourceLabel}`} animated={true}>
			<DataTableHeader<Attribute>
				table={table}
				onSearch={(search) =>
					setFilters([
						{
							field: 'search',
							operator: 'eq',
							value: search,
						},
					])
				}
				reloadProps={{
					isLoading: tableQuery.isFetching,
					onClick: () => tableQuery.refetch(),
				}}
				left={<AttributeDialog />}
			/>
			<DataTable<Attribute> table={table} />
			<DataTablePagination<Attribute>
				table={table}
				handleDelete={(ids: string[]) =>
					mutate(
						{
							resource: resource.name,
							ids,
							successNotification: () => {
								return {
									message: 'Xóa thành công',
									type: 'success',
								}
							},
						},
						{
							onSuccess() {
								queryClient.refetchQueries([resource.name])
							},
						},
					)
				}
			/>
		</PageLayout>
	)
}

export default AttributeManagement
