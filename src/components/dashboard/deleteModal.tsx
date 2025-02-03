import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { open, onOpenChange } = props;

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader></DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
