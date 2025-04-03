export type UserRole = "employee" | "employer";

export interface RegistrationState {
  currentStep: number;
  role: UserRole | null;
  name: string;
  organizationCode?: string;
  organizationName?: string;
  inviteCode?: string;
}
