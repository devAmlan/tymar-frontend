import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {format,parse,differenceInMinutes,formatDuration} from "date-fns"
import _ from "lodash"
import { useDuration } from "@/hooks/useDuration";
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
  onUpdateShift: () => void;
  isBtnDisabled: boolean;
}

const ShiftModal: React.FC<ShiftModalProps> = (props) => {
  const { open, onOpenChange, shift, onUpdateShift, isBtnDisabled } = props;
  const { getDuration } = useDuration();

  // const getDuration = (startTime: string, endTime: string) => {
  //   if (_.isEmpty(startTime) || _.isEmpty(endTime)) {
  //     return "";
  //   }

  //   const parseStartTime = parse(shift.startTime, "HH:mm", new Date());
  //   const parseEndTime = parse(shift.endTime, "HH:mm", new Date());

  //   const diffInMinutes = differenceInMinutes(parseEndTime, parseStartTime);
  //   const hours = Math.floor(diffInMinutes / 60);
  //   const minutes = diffInMinutes % 60;

  //   if (hours === 0) {
  //     return `${minutes}min`;
  //   }

  //   if (minutes === 0) {
  //     return `${hours}h`;
  //   }

  //   return `${hours}h ${minutes}min`;
  // };


  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{shift?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
       <div className="flex gap-4">
           <div className="text-base text-black">
            {!_.isEmpty(shift.startTime) && format(parse(shift.startTime, "HH:mm", new Date()), "h:mm a")}-
            {!_.isEmpty(shift.endTime) && format(parse(shift.endTime, "HH:mm", new Date()), "h:mm a")}
         
          </div>
          <div className="text-base text-muted-foreground">
            Duration: {getDuration(shift.startTime, shift.endTime)}
          </div>
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
          <Button
            onClick={() => {
              if (!isBtnDisabled) {
                onUpdateShift();
              }
            }}
            disabled={isBtnDisabled}
          >
            Update Shift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftModal;
