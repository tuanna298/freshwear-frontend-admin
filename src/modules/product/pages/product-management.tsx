import CreateButton from '@/components/custom/create-button'
import DataTable from '@/components/data-table/data-table'
import DataTableHeader from '@/components/data-table/data-table-header'
import DataTablePagination from '@/components/data-table/data-table-paginator'
import { Product } from '@/schemas/product.schema'
import PageLayout from '@/shared/layouts/page'
import { BaseKey, HttpError, useDelete, useDeleteMany } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductColumns } from '../components/product-column'

const ProductManagement = () => {
	const queryClient = useQueryClient()
	const { mutate } = useDeleteMany()
	const navigate = useNavigate()
	const deleteMutation = useDelete<Product>()

	const onUpdate = (row: Product) =>
		navigate(`/product/edit/${row.id}`, {
			state: {
				productData: row,
			},
		})
	const onDelete = (id: BaseKey) =>
		deleteMutation.mutate(
			{
				resource: 'product',
				id,
				successNotification: () => {
					return {
						message: 'Xóa thành công',
						type: 'success',
					}
				},
			},
			{
				onSuccess() {
					queryClient.invalidateQueries(['product', 'list'])
				},
			},
		)

	const columns = useMemo(() => ProductColumns({ onUpdate, onDelete }), [])

	const {
		refineCore: { tableQuery, setFilters },
		...table
	} = useTable<Product, HttpError, Product>({
		columns,
		refineCoreProps: {
			queryOptions: {
				queryKey: ['product', 'list'],
			},
		},
	})

	return (
		<PageLayout title="Quản lý sản phẩm" animated={true}>
			<DataTableHeader<Product>
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
				left={<CreateButton />}
			/>
			<DataTable<Product> table={table} />
			<DataTablePagination<Product>
				table={table}
				handleDelete={(ids: string[]) =>
					mutate({
						resource: 'product',
						ids,
						successNotification: () => {
							return {
								message: 'Xóa thành công',
								type: 'success',
							}
						},
					})
				}
			/>
		</PageLayout>
	)
}

export default ProductManagement
