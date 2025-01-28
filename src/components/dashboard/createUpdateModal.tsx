import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import MultiSelect from "@/components/dashboard/multiSelect";

import useShiftStore from "@/app/store/shiftStore";

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

const initialShiftState = {
  title: "",
  employee: [],
  startTime: "",
  endTime: "",
  id: "",
  date: new Date(),
};

const createUpdateModal: React.FC<ShiftModalProps> = (props) => {
  const { open, onOpenChange, shift } = props;

  const [date, setDate] = useState<Date>(new Date());
  const [newShift, setNewShift] = useState<Shift>(initialShiftState);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { addShift, deleteShift, shifts } = useShiftStore();

  const handleCreateShift = () => {
    const shift: Shift = {
      id: Math.random().toString(36).substr(2, 9),
      title: newShift.title,
      employee: newShift.employee,
      date: date,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
    };

    addShift(shift);
    setIsDialogOpen(false);
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

    // add newSelectedValue in the array

    setNewShift((prev: any) => ({
      ...prev,
      employee: newSelectedValue,
    }));
  };

  const removeOption = (option: Employee) => {
    setNewShift((prev: any) => {
      if (!prev) return prev; // Early return if prev is null
      return {
        ...prev,
        employee: prev.employee.filter(
          (value: any) => value._id !== option._id
        ),
      };
    });
  };

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Shift
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Shift</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Shift Title</Label>
            <Input
              id="title"
              value={newShift.title}
              onChange={(e) =>
                setNewShift({ ...newShift, title: e.target.value })
              }
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
                type="time"
                value={newShift.startTime}
                onChange={(e) =>
                  setNewShift({ ...newShift, startTime: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={newShift.endTime}
                onChange={(e) =>
                  setNewShift({ ...newShift, endTime: e.target.value })
                }
              />
            </div>
          </div>
          <Button className="w-full" onClick={handleCreateShift}>
            Create Shift
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default createUpdateModal;
