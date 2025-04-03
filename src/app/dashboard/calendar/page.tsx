"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Trash, Clock, Utensils } from "lucide-react";
import { format, startOfDay, isBefore, parse } from "date-fns";
import useShiftStore from "@/app/store/shiftStore";
import ShiftModal from "@/components/dashboard/shiftModal";
import CreateShift from "./CreateShift";
import { useShiftContext } from "@/app/context/ShiftContext";
import UpdateShift from "./UpdateShift";
import DeleteModal from "@/components/dashboard/deleteModal";
import { useDuration } from "@/hooks/useDuration";

interface Shift {
  id: string;
  title: string;
  employee: Employee[];
  date: Date;
  startTime: string;
  endTime: string;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
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
export default function DashboardPage() {
  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState<boolean>(false);
  const [isUpdateShiftOpen, setIsUpdateShiftOpen] = useState<boolean>(false);
  const [isDeleteShiftOpen, setIsDeleteShiftOpen] = useState<boolean>(false);

  const [newShift, setNewShift] = useState<Shift>(initialShiftState);
  const [selectedShift, setSelectedShift] = useState<Shift>(initialShiftState);
  const [selectedShiftId, setSelectedShiftId] = useState<string>("");

  const { addShift, deleteShift, shifts } = useShiftStore();
  const { shiftDate, setShiftDate } = useShiftContext();

  const { getDuration } = useDuration();

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
      if (!prev) return prev;
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

  type ProfilePicture = {
    initials: string;
    backgroundColor: string;
  };

  function generateProfilePicture(name: string): ProfilePicture {
    const nameParts = name.trim().split(/\s+/);

    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";

    const lastNameInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase()
        : "";

    const initials = firstNameInitial + lastNameInitial;

    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    return {
      initials,
      backgroundColor: randomColor,
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Schedule
        </h1>
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
                  <Card
                    key={shift.id}
                    className="flex flex-col gap-5 rounded-lg border p-4"
                    onClick={() => {
                      setSelectedShift({
                        ...shift,
                        breakStartTime: shift.breakStartTime || "",
                        breakEndTime: shift.breakEndTime || "",
                      });
                      setIsShiftDialogOpen(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {shift.title}
                      </h3>
                      <div className="hover:bg-gray-200 rounded-full p-2">
                        <Trash
                          className="size-4 cursor-pointer text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedShiftId(shift?.id);
                            onToggleDeleteModal();
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <Clock className="size-4" />
                      <p className="text-sm text-muted-foreground">
                        {format(
                          parse(shift.startTime, "HH:mm", new Date()),
                          "h:mm a"
                        )}
                        -
                        {format(
                          parse(shift.endTime, "HH:mm", new Date()),
                          "h:mm a"
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        (<span className="mr-1">Duration:</span>
                        {getDuration(shift.startTime, shift.endTime)})
                      </p>
                    </div>

                    {shift.breakStartTime && shift.breakEndTime && (
                      <div className="flex items-center justify-start gap-2">
                        <Utensils className="size-4" />
                        <div className="text-sm text-muted-foreground">
                          {format(
                            parse(shift.breakStartTime, "HH:mm", new Date()),
                            "h:mm a"
                          )}
                          -
                          {format(
                            parse(shift.breakEndTime, "HH:mm", new Date()),
                            "h:mm a"
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex justify-start items-center gap-2">
                        {shift?.employee?.map((item: Employee) => (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: generateProfilePicture(
                                item?.name
                              ).backgroundColor,
                            }}
                            key={item?._id}
                          >
                            <p className="text-white text-center">
                              {generateProfilePicture(item?.name).initials}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
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
              breakStartTime: "",
              breakEndTime: "",
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
