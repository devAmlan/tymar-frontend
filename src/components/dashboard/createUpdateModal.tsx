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

import { format } from "date-fns";

import { PlusIcon, MinusIcon, CircleCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  breakStartTime: string;
  breakEndTime: string;
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
    breakStartTime: "",
    breakEndTime: "",
  });
  const [showBreak, setShowBreak] = useState(false);
  const [isTemplateSelected, setIsTemplateSelected] = useState<number | null>(
    null
  );

  const { shiftDate } = useShiftContext();

  const handleCreateShift = () => {
    const shift: Shift = {
      id: isUpdateModal ? newShift.id : nanoid(),
      title: newShift.title,
      employee: newShift.employee,
      date: shiftDate,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
      breakStartTime: newShift.breakStartTime,
      breakEndTime: newShift.breakEndTime,
    };

    handleSubmit(shift);

    setNewShift({
      title: "",
      employee: [],
      startTime: "",
      endTime: "",
      id: "",
      date: new Date(),
      breakStartTime: "",
      breakEndTime: "",
    });
  };

  const onChangeInputField = (e: any) => {
    const { name, value } = e.target;

    setNewShift((prev: Shift) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isBreakTimeValid = () => {
    if (newShift.breakStartTime && newShift.breakEndTime) {
      return newShift.breakStartTime < newShift.breakEndTime;
    }
    return true;
  };

  const isBreakTimeOptionOpen = () => {
    if (
      isUpdateModal &&
      !_.isEmpty(shift?.breakEndTime) &&
      !_.isEmpty(shift?.breakStartTime)
    ) {
      return true;
    }
    return false;
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

  const getCurrentTimeString = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  };

  const getMinStartTime = () => {
    const selectedDate = new Date(shiftDate);
    const today = new Date();

    if (selectedDate.toDateString() === today.toDateString()) {
      return getCurrentTimeString();
    }
    return "00:00";
  };

  const getMinEndTime = () => {
    return newShift.startTime || "00:00";
  };

  const shiftTimeTemplates = [
    {
      startTime: "10:00",
      endTime: "18:00",
      bg: "#d7bde2",
    },
    {
      startTime: "09:00",
      endTime: "17:00",
      bg: "#f7dc6f",
    },

    {
      startTime: "18:00",
      endTime: "02:00",
      bg: "#f5b7b1",
    },
  ];

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdateModal
              ? `Update Shift of ${format(shiftDate, "MMMM d, yyyy")}`
              : format(shiftDate, "MMMM d, yyyy")}
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
            <Label htmlFor="employee">Assigned To</Label>
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
                min={getMinStartTime()}
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
                min={getMinEndTime()}
              />
            </div>
          </div>
          <Separator className="my-4" />
          {/* <p className="text-sm text-black font-semibold">
            Shift Time Templates
          </p>
          <div className="grid grid-cols-2 gap-2">
            {shiftTimeTemplates.map((template, index) => (
              <div
                className={`space-y-2 borde-0 py-2 px-4 rounded-md cursor-pointer flex justify-between items-center border-0 ${
                  isTemplateSelected === index
                    ? "border-2 border-black"
                    : "bg-white"
                }`}
                key={index}
                style={{ backgroundColor: template.bg }}
                onClick={() => {
                  setIsTemplateSelected(index);
                  setNewShift({
                    ...newShift,
                    startTime: template.startTime,
                    endTime: template.endTime,
                  });
                }}
              >
                <p className="text-sm text-black">
                  {template.startTime} - {template.endTime}
                </p>
                <div className="pb-1 w-5 h-5">
                  {isTemplateSelected === index && (
                    <CircleCheck className="size-5 text-black" />
                  )}
                </div>
              </div>
            ))}
          </div> */}
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setShowBreak(!showBreak)}
          >
            {showBreak ? (
              <MinusIcon className="w-5 h-5 text-text-primary" />
            ) : (
              <PlusIcon className="w-5 h-5 text-text-primary" />
            )}
            <p className="text-sm text-text-primary">
              {showBreak ? "Remove Break" : "Add Break"}
            </p>
          </div>
          {showBreak && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="breakStartTime">Break Start Time</Label>
                <Input
                  id="breakStartTime"
                  name={"breakStartTime"}
                  type="time"
                  value={newShift.breakStartTime}
                  onChange={onChangeInputField}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breakEndTime">Break End Time</Label>
                <Input
                  id="breakEndTime"
                  name={"breakEndTime"}
                  type="time"
                  value={newShift.breakEndTime}
                  onChange={onChangeInputField}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant={"secondary"} onClick={onOpenChange}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateShift}
            disabled={isActionBtnDisabled}
            className="bg-text-primary hover:bg-text-primary/90 text-white"
          >
            {isUpdateModal ? "Update" : "Create"} Shift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateModal;
