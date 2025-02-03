"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import { format, startOfDay, isBefore } from "date-fns";
import MultiSelect from "@/components/dashboard/multiSelect";
import useShiftStore from "@/app/store/shiftStore";
import ShiftModal from "@/components/dashboard/shiftModal";
import CreateShift from "./CreateShift";
import { useShiftContext } from "@/app/context/ShiftContext";
import UpdateShift from "./UpdateShift";
import DeleteModal from "@/components/dashboard/deleteModal";
interface Shift {
  id: string;
  title: string;
  employee: Employee[];
  date: Date;
  startTime: string;
  endTime: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
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
export default function DashboardPage() {
  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState<boolean>(false);
  const [isUpdateShiftOpen, setIsUpdateShiftOpen] = useState<boolean>(false);
  const [isDeleteShiftOpen, setIsDeleteShiftOpen] = useState<boolean>(false);
  const [newShift, setNewShift] = useState<Shift>(initialShiftState);
  const [selectedShift, setSelectedShift] = useState<Shift>(initialShiftState);
  const [selectedShiftId, setSelectedShiftId] = useState<string>("");

  const { addShift, deleteShift, shifts } = useShiftStore();
  const { shiftDate, setShiftDate } = useShiftContext();

  // const handleCreateShift = () => {
  //   const shift: Shift = {
  //     id: Math.random().toString(36).substr(2, 9),
  //     title: newShift.title,
  //     employee: newShift.employee,
  //     date: date,
  //     startTime: newShift.startTime,
  //     endTime: newShift.endTime,
  //   };

  //   addShift(shift);
  //   setIsDialogOpen(false);
  //   setNewShift({
  //     title: "",
  //     employee: [],
  //     startTime: "",
  //     endTime: "",
  //     id: "",
  //     date: new Date(),
  //   });
  // };

  const shiftsForSelectedDate = shifts.filter(
    (shift) =>
      format(shift.date, "yyyy-MM-dd") === format(shiftDate, "yyyy-MM-dd")
  );

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

  const onToggleUpdateModal = () => {
    setIsUpdateShiftOpen((prev) => !prev);
    setIsShiftDialogOpen(false);
  };

  const onToggleDeleteModal = () => setIsDeleteShiftOpen((prev) => !prev);

  const onDeleteShift = () => {
    deleteShift(selectedShiftId);
    onToggleDeleteModal();
  };

  const isPastDate = shiftDate
    ? isBefore(shiftDate, startOfDay(new Date()))
    : false;

  console.log(isPastDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <CreateShift isBtnDisabled={isPastDate} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={shiftDate}
            onSelect={(date) => date && setShiftDate(date)}
            className="rounded-md border"
          />
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <h2 className="font-semibold">
              Shifts for {format(shiftDate, "MMMM d, yyyy")}
            </h2>
            {shiftsForSelectedDate.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No shifts scheduled
              </p>
            ) : (
              <div className="space-y-4">
                {shiftsForSelectedDate.map((shift) => (
                  <div
                    key={shift.id}
                    className="flex flex-col gap-5 rounded-lg border p-4"
                    onClick={() => {
                      setSelectedShift(shift);
                      setIsShiftDialogOpen(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{shift.title}</h3>
                      <Trash
                        className="size-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          // onDeleteShift(shift.id);
                          setSelectedShiftId(shift?.id);
                          onToggleDeleteModal();
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex justify-start items-center gap-2">
                        {shift?.employee?.map((item: Employee) => (
                          <p key={item?._id}>{item?.name}</p>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {shift.startTime} - {shift.endTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
      <ShiftModal
        open={isShiftDialogOpen}
        onOpenChange={() => {
          setIsShiftDialogOpen((prev) => !prev);
          if (!isShiftDialogOpen) {
            setNewShift({
              title: "",
              employee: [],
              startTime: "",
              endTime: "",
              id: "",
              date: new Date(),
            });
          }
        }}
        shift={selectedShift}
        onUpdateShift={onToggleUpdateModal}
        isBtnDisabled={isPastDate}
      />
      <UpdateShift
        shift={selectedShift}
        open={isUpdateShiftOpen}
        onOpenChange={onToggleUpdateModal}
      />
      <DeleteModal
        open={isDeleteShiftOpen}
        onOpenChange={onToggleDeleteModal}
        primaryBtnOnclick={onDeleteShift}
        isBtnDisabled={isPastDate}
      />
    </div>
  );
}
