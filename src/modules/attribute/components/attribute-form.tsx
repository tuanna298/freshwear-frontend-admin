import { FormInput } from '@/components/custom/form-input'

const AttributeForm = () => {
	return (
		<>
			<FormInput
				id="name"
				label="Tên"
				placeholder="Nhập tên thuộc tính"
				required
			/>
		</>
	)
}

export default AttributeForm
