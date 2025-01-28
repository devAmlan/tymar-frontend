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
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const createUpdateModal: React.FC<ShiftModalProps> = (props) => {
  const { open, onOpenChange, shift } = props;

  const onChangeInputField = (e: any) => {
    const { name, value } = e.target;

    setNewShift((prev:Shift)=>({
        ...prev
        [name]:value
    }))
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
