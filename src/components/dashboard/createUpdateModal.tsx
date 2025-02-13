import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import MultiSelect from "@/components/dashboard/multiSelect";

import { nanoid } from "nanoid";

import { useShiftContext } from "@/app/context/ShiftContext";

import _ from "lodash";

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
  handleSubmit: (shift: Shift) => void;
  isUpdateModal: boolean;
}

interface Option {
  _id: string;
  name: string;
  email: string;
}

const MEMBERS = [
  {
    _id: "0340304ksllfnsdds0",
    name: "Amlan sahoo",
    email: "amlan@gmail.com",
  },
  {
    _id: "0340304ksllfnsdds1",
    name: "Rahul pradhan",
    email: "rahul@gmail.com",
  },
  {
    _id: "0340304ksllfnsdds2",
    name: "Ankit jha",
    email: "amlan@gmail.com",
  },
  {
    _id: "0340304ksllfnsdds3",
    name: "Bruce wane",
    email: "amlan@gmail.com",
  },
  {
    _id: "0340304ksllfnsdds4",
    name: "Spider man",
    email: "amlan@gmail.com",
  },
];

const CreateUpdateModal: React.FC<ShiftModalProps> = (props) => {
  const {
    open,
    onOpenChange,
    shift,
    handleSubmit,
    isUpdateModal = false,
  } = props;

  const [newShift, setNewShift] = useState<Shift>({
    title: "",
    employee: [],
    startTime: "",
    endTime: "",
    id: "",
    date: new Date(),
  });

  const { shiftDate } = useShiftContext();

  const handleCreateShift = () => {
    const shift: Shift = {
      id: isUpdateModal ? newShift.id : nanoid(),
      title: newShift.title,
      employee: newShift.employee,
      date: shiftDate,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
    };

    handleSubmit(shift);

    setNewShift({
      title: "",
      employee: [],
      startTime: "",
      endTime: "",
      id: "",
      date: new Date(),
    });
  };

  const onChangeInputField = (e: any) => {
    const { name, value } = e.target;

    setNewShift((prev: Shift) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleOptions = (option: Option) => {
    const newSelectedValue = newShift?.employee?.some(
      (member: Employee) => member._id === option._id
    )
      ? newShift?.employee?.filter(
          (value: Employee) => value?._id !== option._id
        )
      : [...newShift?.employee, option];

    setNewShift((prev: any) => ({
      ...prev,
      employee: newSelectedValue,
    }));
  };

  const removeOption = (option: Employee) => {
    setNewShift((prev: any) => {
      if (!prev) return prev;
      return {
        ...prev,
        employee: prev.employee.filter(
          (value: any) => value._id !== option._id
        ),
      };
    });
  };

  useEffect(() => {
    setNewShift(shift);
  }, [open]);

  const { title, employee, startTime, endTime } = newShift;

  const isActionBtnDisabled = _.some(
    [title, employee, startTime, endTime],
    (value) => _.isEmpty(value)
  );

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdateModal ? "Update" : "Create New"} Shift
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Shift Title</Label>
            <Input
              id="title"
              name={"title"}
              value={newShift.title}
              onChange={onChangeInputField}
              placeholder="Enter Shift Title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employee">Employee</Label>
            <MultiSelect
              options={MEMBERS}
              selectedOptions={newShift.employee}
              toggleOptions={toggleOptions}
              removeOption={removeOption}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name={"startTime"}
                type="time"
                value={newShift.startTime}
                onChange={onChangeInputField}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name={"endTime"}
                type="time"
                value={newShift.endTime}
                onChange={onChangeInputField}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant={"secondary"} onClick={onOpenChange}>
            Cancel
          </Button>
          <Button onClick={handleCreateShift} disabled={isActionBtnDisabled}>
            {isUpdateModal ? "Update" : "Create"} Shift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateModal;
