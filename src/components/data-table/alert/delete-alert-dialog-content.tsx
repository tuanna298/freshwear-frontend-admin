import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type Props = {
	onClick: () => void
	onCancel: () => void
}

const DeleteAlertDialogContent = ({ onClick, onCancel }: Props) => {
	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
				<AlertDialogDescription>
					Bản ghi bị xóa sẽ không thể sử dụng. Các dữ liệu liên quan có thể hoạt
					động không đúng!
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel type="button" onClick={onCancel}>
					Hủy
				</AlertDialogCancel>
				<AlertDialogAction
					type="button"
					onClick={onClick}
					className="bg-destructive/95 hover:bg-destructive"
				>
					Xác nhận xóa
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	)
}

export default DeleteAlertDialogContent
