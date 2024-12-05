import { FileUploader } from '@/components/custom/file-uploader'
import { FormLabel } from '@/components/custom/form'
import { FormInput } from '@/components/custom/form-input'
import { FormMultiSelect } from '@/components/custom/form-multi-select'
import FormSelect from '@/components/custom/form-select'
import { FormTextarea } from '@/components/custom/form-textarea'
import RequiredDot from '@/components/custom/required-dot'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useBase64Upload } from '@/shared/hooks/use-base64-upload'
import { useInfiniteQueryBase } from '@/shared/hooks/use-query-infinite'
import { useNavigation } from '@refinedev/core'
import { useFormContext } from 'react-hook-form'
import ProductDetailTable from './product-detail-table'

const ProductUpdateForm = () => {
	const { setValue, watch } = useFormContext()
	const { list } = useNavigation()

	const { onUpload, uploadedFiles, progresses, isUploading } = useBase64Upload({
		mode: 'single',
	})

	const sizeInfinteQuery = useInfiniteQueryBase({
		key: 'size',
	})

	const colorInfinteQuery = useInfiniteQueryBase({
		key: 'color',
	})

	return (
		<>
			<div className="flex gap-5">
				<Card className="w-1/3">
					<CardContent className="h-full space-y-2 p-6">
						<FormLabel className="space-x-1">
							<RequiredDot />
							<span>Ảnh đại diện</span>
						</FormLabel>
						<FileUploader
							className=""
							maxSize={5 * 1024 * 1024}
							progresses={progresses}
							onUpload={async (files) => {
								const result = await onUpload(files)
								if (!result?.length) return
								setValue('thumbnail', result[0].url!)
							}}
							disabled={isUploading}
							placeholder={uploadedFiles[0]?.url || watch('thumbnail')}
						/>
					</CardContent>
				</Card>

				{/* product info */}
				<Card className="flex-grow">
					<CardContent className="flex flex-col gap-2 p-6">
						<FormInput
							id="code"
							label="Mã"
							placeholder="Nhập mã sản phẩm"
							required
							className="h-[50px]"
						/>
						<FormInput
							id="name"
							label="Tiêu đề"
							placeholder="Nhập tiêu đề sản phẩm"
							required
							className="h-[50px]"
						/>
						<FormTextarea
							id="description"
							label="Mô tả"
							placeholder="Nhập mô tả sản phẩm"
						/>

						<div className="grid grid-cols-3 gap-2">
							<div className="flex flex-col gap-2">
								<FormSelect
									id="brand"
									label="Thương hiệu"
									resource="brand"
									convertOption={(item) => ({
										label: item.name ?? item.full_name ?? item.code,
										value: item,
									})}
									required
								/>
								<FormSelect
									id="material"
									label="Chất liệu"
									resource="material"
									convertOption={(item) => ({
										label: item.name ?? item.full_name ?? item.code,
										value: item,
									})}
									required
								/>
							</div>
							<div className="col-span-2 flex flex-col gap-2">
								<FormMultiSelect
									label="Kích cỡ"
									id="sizes"
									options={sizeInfinteQuery.allData.map((item) => ({
										label: item.name,
										value: item,
									}))}
									filterConfigs={{
										queryKey: sizeInfinteQuery.context,
										setSearch: sizeInfinteQuery.setSearch,
										isLoading: sizeInfinteQuery.fetchInfiniteQuery.isLoading,
									}}
									placeholder="Chọn kích cỡ"
									required
								/>

								<FormMultiSelect
									label="Màu sắc"
									id="colors"
									options={colorInfinteQuery.allData.map((item) => ({
										label: item.name,
										value: item,
									}))}
									itemID=""
									filterConfigs={{
										queryKey: colorInfinteQuery.context,
										setSearch: colorInfinteQuery.setSearch,
										isLoading: colorInfinteQuery.fetchInfiniteQuery.isLoading,
									}}
									placeholder="Chọn màu sắc"
									required
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* product details */}
			<Card>
				<CardContent className="h-fit space-y-2 p-6">
					<FormLabel className="space-x-1">
						<span>Biến thể sản phẩm</span>
					</FormLabel>
					{/* product details table */}
					<ProductDetailTable />
				</CardContent>
			</Card>
			<div className="flex gap-5">
				<Button size="lg" className="w-96">
					Lưu
				</Button>
				<Button
					type="button"
					variant="outline"
					size="lg"
					className="w-96"
					onClick={() => list('product')}
				>
					Huỷ
				</Button>
			</div>
		</>
	)
}

export default ProductUpdateForm
