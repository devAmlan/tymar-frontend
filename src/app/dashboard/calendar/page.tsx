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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import MultiSelect from "@/components/dashboard/multiSelect";
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

const employees = ["Sarah Johnson", "Mike Smith", "David Lee"];

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

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: "1",
      title: "Morning Shift",
      employee: [],
      date: new Date(),
      startTime: "09:00",
      endTime: "17:00",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newShift, setNewShift] = useState({
    title: "",
    employee: [],
    startTime: "",
    endTime: "",
  });

  const handleCreateShift = () => {
    const shift: Shift = {
      id: Math.random().toString(36).substr(2, 9),
      title: newShift.title,
      employee: newShift.employee,
      date: date,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
    };

    setShifts([...shifts, shift]);
    setIsDialogOpen(false);
    setNewShift({ title: "", employee: [], startTime: "", endTime: "" });
  };

  const shiftsForSelectedDate = shifts.filter(
    (shift) => format(shift.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                {/* <Select
                  value={newShift.employee}
                  onValueChange={(value) =>
                    setNewShift({ ...newShift, employee: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee} value={employee}>
                        {employee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
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
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border"
          />
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <h2 className="font-semibold">
              Shifts for {format(date, "MMMM d, yyyy")}
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
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-medium">{shift.title}</h3>
                      <div className="flex justify-start items-center gap-2">
                        {shift?.employee?.map((item: Employee) => (
                          <p key={item?._id}>{item?.name}</p>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {shift.startTime} - {shift.endTime}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
