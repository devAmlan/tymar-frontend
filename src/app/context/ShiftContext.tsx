"use client";
import React, { createContext, useContext, useState } from "react";

type ShiftDateContextType = {
  shiftDate: Date;
  setShiftDate: (date: Date) => void;
  isUpdateShiftModalOpen: boolean;
  setIsUpdateShiftModalOpen: (isOpen: boolean) => void;
};

const ShiftContext = createContext<ShiftDateContextType>({
  shiftDate: new Date(),
  setShiftDate: () => {},
  isUpdateShiftModalOpen: false,
  setIsUpdateShiftModalOpen: () => {},
});

export const ShiftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shiftDate, setShiftDate] = useState<Date>(new Date());
  const [isUpdateShiftModalOpen, setIsUpdateShiftModalOpen] =
    useState<boolean>(false);

  return (
    <ShiftContext.Provider
      value={{
        shiftDate,
        setShiftDate,
        isUpdateShiftModalOpen,
        setIsUpdateShiftModalOpen,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
};

export const useShiftContext = () => useContext(ShiftContext);
