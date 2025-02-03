import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Employee {
  _id: string;
  name: string;
  email: string;
}

type Shift = {
  id: string;
  title: string;
  employee: Employee[]; // Array of employee IDs or names
  date: Date;
  startTime: string;
  endTime: string;
};

interface ShiftModalProps {
  open: boolean;
  onOpenChange: () => void;
  shift: Shift;
}

const ShiftModal: React.FC<ShiftModalProps> = (props) => {
  const { open, onOpenChange, shift } = props;

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{shift?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-base text-black">
            {shift.startTime} - {shift.endTime}
          </div>
          <div className="flex justify-start items-center gap-2">
            {shift?.employee?.map((item: Employee) => (
              <p key={item?._id}>{item?.name}</p>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant={"secondary"} onClick={onOpenChange}>
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftModal;
