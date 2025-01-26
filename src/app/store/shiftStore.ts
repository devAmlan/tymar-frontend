import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface ShiftStore {
  shifts: Shift[];
  addShift: (shift: Shift) => void;
  updateShift: (id: string, updatedShift: Partial<Shift>) => void;
  deleteShift: (id: string) => void;
}

// {
//     id: "1",
//     title: "Morning Shift",
//     employee: [],
//     date: new Date(),
//     startTime: "09:00",
//     endTime: "17:00",
//   },

// Create the store
const useShiftStore = create<ShiftStore>()(
  persist(
    (set) => ({
      shifts: [],
      addShift: (shift: any) =>
        set((state: any) => ({
          shifts: [...state.shifts, shift],
        })),
      updateShift: (id: any, updatedShift: any) =>
        set((state: any) => ({
          shifts: state.shifts.map((shift: any) =>
            shift.id === id ? { ...shift, ...updatedShift } : shift
          ),
        })),
      deleteShift: (id: any) =>
        set((state: any) => ({
          shifts: state.shifts.filter((shift: any) => shift.id !== id),
        })),
    }),
    {
      name: "shift-storage", // Key for localStorage
    }
  )
);

export default useShiftStore;
