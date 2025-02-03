import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface DeleteModalProps {
  open: boolean;
  onOpenChange: () => void;
  primaryBtnOnclick: () => void;
  isBtnDisabled: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { open, onOpenChange, primaryBtnOnclick, isBtnDisabled } = props;

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Shift</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <h3 className="text-base font-regular text-gray-500">
            Are you really want to cancel this shift?
          </h3>
        </div>
        <DialogFooter>
          <Button variant={"secondary"} onClick={onOpenChange}>
            Close
          </Button>
          <Button
            onClick={() => {
              if (!isBtnDisabled) {
                primaryBtnOnclick();
              }
            }}
            variant={"destructive"}
            disabled={isBtnDisabled}
          >
            Cancel Shift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
