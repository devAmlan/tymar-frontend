import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreVertical, Delete } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Manager",
    department: "Operations",
    status: "Active",
    shifts: 23,
  },
  {
    id: 2,
    name: "Mike Smith",
    role: "Staff",
    department: "Sales",
    status: "Active",
    shifts: 18,
  },
  {
    id: 3,
    name: "David Lee",
    role: "Staff",
    department: "Support",
    status: "On Leave",
    shifts: 15,
  },
];

export default function EmployeeTable() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shifts This Month</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
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
                <TableCell>{employee.shifts}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="end">
                      <div className="flex flex-col gap-2 text-left">
                        <p className="text-sm px-2 py-1 hover:text-accent-foreground cursor-pointer">
                          Remove
                        </p>
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
  );
}
