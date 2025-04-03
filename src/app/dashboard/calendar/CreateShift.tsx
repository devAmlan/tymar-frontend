import CreateUpdateModal from "@/components/dashboard/createUpdateModal";
import { useState } from "react";
import useShiftStore from "@/app/store/shiftStore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  breakStartTime: string;
  breakEndTime: string;
};


const initialShiftState = {
  title: "",
  employee: [],
  startTime: "",
  endTime: "",
  id: "",
  date: new Date(),
  breakStartTime: "",
  breakEndTime: "",
};


const CreateShift = (props: any) => {
  const { isBtnDisabled } = props;

  const [isCreateShiftOpen, setIsCreateShiftOpen] = useState<boolean>(false);

  const { addShift } = useShiftStore();

  const handleSubmit = (shift: Shift) => {
    addShift(shift);
    setIsCreateShiftOpen(false);
  };

  const onToggleModal = () => {
    if (!isBtnDisabled) {
      setIsCreateShiftOpen((prev) => !prev);
    }
  };

  return (
    <>
      <Button onClick={onToggleModal} disabled={isBtnDisabled} className="bg-text-primary hover:bg-text-primary/90 text-white">
        <Plus className="mr-2 h-4 w-4" />
        Create Shift
      </Button>
      <CreateUpdateModal
        open={isCreateShiftOpen}
        onOpenChange={onToggleModal}
        isUpdateModal={false}
        handleSubmit={handleSubmit}
        shift={initialShiftState}
      />
    </>
  );
};

export default CreateShift;
