"use client";
import React from "react";
import { useRegister } from "../context/RegisterContext";
import { UserRole } from "@/types/register";
import {
  Building2,
  User,
  ArrowRight,
  ArrowLeft,
  Briefcase,
} from "lucide-react";

function RoleSelection() {
  const { state, setRole, nextStep } = useRegister();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    nextStep();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome!</h2>
        <p className="mt-2 text-gray-600">
          Let's get started by choosing your role
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleRoleSelect("employee")}
          className={`group p-8 border-2 rounded-xl flex flex-col items-center space-y-4 transition-all duration-300 ${
            state.role === "employee"
              ? "border-text-primary bg-gradient-to-b from-blue-50 to-white shadow"
              : "border-gray-200 hover:border-text-primary hover:bg-gradient-to-b hover:from-gray-50 hover:to-white hover:shadow-md"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-text-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <User className="w-8 h-8 text-text-primary" />
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold text-gray-900">
              Employee
            </span>
            <span className="text-sm text-gray-500">
              Join your organization
            </span>
          </div>
        </button>
        <button
          onClick={() => handleRoleSelect("employer")}
          className={`group p-8 border-2 rounded-xl flex flex-col items-center space-y-4 transition-all duration-300 ${
            state.role === "employer"
              ? "border-text-primary bg-gradient-to-b from-blue-50 to-white shadow"
              : "border-gray-200 hover:border-text-primary hover:bg-gradient-to-b hover:from-gray-50 hover:to-white hover:shadow-md"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-text-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Building2 className="w-8 h-8 text-text-primary" />
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold text-gray-900">
              Employer
            </span>
            <span className="text-sm text-gray-500">
              Create an organization
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

function EmployeeDetails() {
  const { state, setName, setOrganizationCode, nextStep, prevStep } =
    useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Employee Details</h2>
        <p className="mt-2 text-gray-600">
          Enter your information to join your organization
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={state.name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="orgCode"
            className="block text-sm font-medium text-gray-700"
          >
            Organization Code
          </label>
          <input
            type="text"
            id="orgCode"
            required
            value={state.organizationCode}
            onChange={(e) => setOrganizationCode(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter the code provided by your employer"
          />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-3 bg-gradient-to-r from-[#0eb770] to-green-500 text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </form>
  );
}

function EmployerDetails() {
  const { state, setName, setOrganizationName, nextStep, prevStep } =
    useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Organization Setup</h2>
        <p className="mt-2 text-gray-600">Create your organization profile</p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={state.name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="orgName"
            className="block text-sm font-medium text-gray-700"
          >
            Organization Name
          </label>
          <input
            type="text"
            id="orgName"
            required
            value={state.organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Acme Inc."
          />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-3 bg-gradient-to-r from-[#0eb770] to-green-500 text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 shadow-md hover:shadow"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </form>
  );
}

function Success() {
  const { state } = useRegister();
  const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="text-center space-y-8">
      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <Briefcase className="w-10 h-10 text-green-500" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">All Set!</h2>
        <p className="mt-2 text-gray-600">Your registration is complete</p>
      </div>
      {state.role === "employer" && (
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-3">
            Your organization invite code
          </p>
          <p className="text-3xl font-mono font-bold text-blue-600 tracking-wider bg-blue-50 py-3 px-4 rounded-lg select-all">
            {inviteCode}
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Share this code with your employees to let them join your
            organization
          </p>
        </div>
      )}
      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
        {state.role === "employee"
          ? "You have successfully joined the organization!"
          : "Your organization has been created successfully!"}
      </p>
    </div>
  );
}

export default function Register() {
  const { state } = useRegister();

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <RoleSelection />;
      case 2:
        return state.role === "employee" ? (
          <EmployeeDetails />
        ) : (
          <EmployerDetails />
        );
      case 3:
        return <Success />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-3">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  state.currentStep >= step
                    ? "bg-text-primary shadow"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="transition-opacity duration-300">{renderStep()}</div>
      </div>
    </div>
  );
}
