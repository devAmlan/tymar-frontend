"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { Plus, MoreVertical, Trash,Clock } from "lucide-react";


const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Manager",
    email: "sarah.johnson@example.com",
    status: "Active",
    shifts: 23,

  },
  {
    id: 2,
    name: "Mike Smith",
    role: "Staff",
    email: "mike.smith@example.com",
    status: "Active",
    shifts: 18,
  },
  {
    id: 3,
    name: "David Lee",
    role: "Staff",
    email: "david.lee@example.com",
    status: "On Leave",
    shifts: 15,
  },
];

export default function EmployeeTable() {
  const router = useRouter();
   
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shifts This Month
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </TableHead>
               </TableRow>
              </TableHeader>
              <TableBody>

            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell  className="px-6 py-2 whitespace-nowrap">{employee.name}</TableCell>
                <TableCell className="px-6 py-2 whitespace-nowrap">{employee.email}</TableCell>
                <TableCell className="px-6 py-2 whitespace-nowrap">{employee.role}</TableCell>
                <TableCell className="px-6 py-2 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      employee.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {employee.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-2 whitespace-nowrap">{employee.shifts}</TableCell>
                <TableCell className="px-6 py-2 whitespace-nowrap">
                  <Popover>

                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="end">
                      <div className="flex flex-col gap-2 text-left">
                          <div className="flex justify-start items-center gap-1 text-left hover:bg-accent px-2 py-1 rounded-md cursor-pointer">
                           <Clock className="h-4 w-4 mr-2" />
                          <p className="text-sm py-1 hover:text-accent-foreground cursor-pointer" onClick={() => router.push(`/dashboard/employees/${employee.id}`)}>
                            View Shifts
                          </p>
                        </div>
                           <Separator />
                        <div className="flex justify-start items-center gap-1 text-left hover:bg-accent px-2 py-1 rounded-md cursor-pointer">
                          <Trash className="h-4 w-4 mr-2" />
                           <p className="text-sm py-1 hover:text-accent-foreground cursor-pointer">
                          Remove
                        </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
              </Table>
              </div>
              </div>
    </div>
  );
}
