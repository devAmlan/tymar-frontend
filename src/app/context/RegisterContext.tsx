"use client";
import React, { createContext, useContext, useState } from "react";
import { UserRole, RegistrationState } from "@/types/register";

interface OnboardingContextType {
  state: RegistrationState;
  setRole: (role: UserRole) => void;
  setName: (name: string) => void;
  setOrganizationCode: (code: string) => void;
  setOrganizationName: (name: string) => void;
  setInviteCode: (code: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const RegisterContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RegistrationState>({
    currentStep: 1,
    role: null,
    name: "",
    organizationCode: "",
    organizationName: "",
    inviteCode: "",
  });

  const setRole = (role: UserRole) =>
    setState((prev: any) => ({ ...prev, role }));
  const setName = (name: string) =>
    setState((prev: any) => ({ ...prev, name }));
  const setOrganizationCode = (code: string) =>
    setState((prev: any) => ({ ...prev, organizationCode: code }));
  const setOrganizationName = (name: string) =>
    setState((prev: any) => ({ ...prev, organizationName: name }));
  const setInviteCode = (code: string) =>
    setState((prev: any) => ({ ...prev, inviteCode: code }));

  const nextStep = () =>
    setState((prev: any) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  const prevStep = () =>
    setState((prev: any) => ({ ...prev, currentStep: prev.currentStep - 1 }));

  return (
    <RegisterContext.Provider
      value={{
        state,
        setRole,
        setName,
        setOrganizationCode,
        setOrganizationName,
        setInviteCode,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within an RegisterProvider");
  }
  return context;
}
