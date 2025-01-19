import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModalState } from "@/store/userModalStore";

export function Modal() {
  const { isOpen, onClose, data } = useModalState();
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agent AI Answer</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div>{data && data.message}</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
