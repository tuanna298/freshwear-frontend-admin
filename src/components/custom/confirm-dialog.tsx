import { ReactNode } from "react";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

export type ConfirmDialogProps = {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  okLabel?: ReactNode;
  okBtnClassName?: string;
};
export function ConfirmDialog(props: ConfirmDialogProps) {
  const { trigger, onConfirm, title, description, onCancel, okLabel = "Đồng ý", okBtnClassName } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Huỷ</AlertDialogCancel>
          <AlertDialogAction className={okBtnClassName} onClick={onConfirm}>
            {okLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
