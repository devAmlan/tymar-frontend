import CreateUpdateModal from "@/components/dashboard/CreateUpdateModal";
import { useState } from "react";
import useShiftStore from "@/app/store/shiftStore";
import { Button } from "@/components/ui/button";

interface Employee {
  _id: string;
  name: string;
  email: string;
}

type Shift = {
  id: string;
  title: string;
  employee: Employee[];
  date: Date;
  startTime: string;
  endTime: string;
};

type UpdateModalProps = {
  shift: Shift;
  open: boolean;
  onOpenChange: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

const UpdateShift: React.FC<UpdateModalProps> = (props) => {
  const { shift, onOpenChange, open } = props;

  const { updateShift } = useShiftStore();

  const handleSubmit = (shift: Shift) => {
    updateShift(shift?.id, shift);
    onOpenChange();
  };

  return (
    <CreateUpdateModal
      open={open}
      onOpenChange={onOpenChange}
      isUpdateModal={true}
      handleSubmit={handleSubmit}
      shift={shift}
    />
  );
};

export default UpdateShift;
