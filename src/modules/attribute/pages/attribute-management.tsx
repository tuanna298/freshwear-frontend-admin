import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Attribute } from '@/schemas/attribute.schema'
import { RESOURCE_MAP } from '@/shared/common/constants'
import PageLayout from '@/shared/layouts/page'
import { HttpError, useDeleteMany, useResource } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useMemo } from 'react'
import { AttributeColumns } from '../components/attribute-column'
import AttributeDialog from '../components/attribute-dialog'

const AttributeManagement = () => {
	const { mutate } = useDeleteMany()

	const { resource } = useResource()

	if (!resource) {
		throw new Error('Resource not found')
	}

	const columns = useMemo(
		() => AttributeColumns({ resource: resource.name }),
		[resource],
	)

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Attribute, HttpError, Attribute>({
		columns,
	})

	const resourceLabel = RESOURCE_MAP[resource?.name as string].toLowerCase()

	console.log('resourceLabel', resourceLabel)

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
					mutate({ resource: resource.name, ids })
				}
			/>
		</PageLayout>
	)
}

export default AttributeManagement
