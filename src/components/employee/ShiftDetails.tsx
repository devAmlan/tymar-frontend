import React from "react";
import { format, parseISO, differenceInHours } from "date-fns";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Member } from "@/types/member";
import { shifts } from "@/lib/dummyData";

interface ShiftDetailsProps {
  member: Member;
}

export default function ShiftDetails({ member }: ShiftDetailsProps) {
  const memberShifts = shifts.filter((shift) => shift.member_id === member.id);

  function calculateHoursWorked(shift: (typeof shifts)[0]) {
    if (!shift.clock_in || !shift.clock_out) return 0;
    return differenceInHours(
      parseISO(shift.clock_out),
      parseISO(shift.clock_in)
    );
  }

  function getScheduledHours(shift: (typeof shifts)[0]) {
    const [startHour] = shift.scheduled_start.split(":");
    const [endHour] = shift.scheduled_end.split(":");
    return parseInt(endHour) - parseInt(startHour);
  }

  function getShiftStatus(shift: (typeof shifts)[0]) {
    if (!shift.clock_in && !shift.clock_out) {
      return { text: "Not Started", color: "bg-gray-100 text-gray-600" };
    }
    if (shift.clock_in && !shift.clock_out) {
      return { text: "In Progress", color: "bg-yellow-100 text-yellow-800" };
    }

    const hoursWorked = calculateHoursWorked(shift);
    const scheduledHours = getScheduledHours(shift);

    if (hoursWorked >= scheduledHours) {
      return { text: "Completed", color: "bg-green-100 text-green-800" };
    }
    return { text: "Incomplete", color: "bg-red-100 text-red-800" };
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <Calendar className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Shifts for {member.name}
          </h1>
          <p className="text-gray-500">{member.email}</p>
        </div>
      </div>

      {memberShifts.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock In/Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours Worked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {memberShifts.map((shift) => {
                  const status = getShiftStatus(shift);
                  const hoursWorked = calculateHoursWorked(shift);
                  const scheduledHours = getScheduledHours(shift);
                  const isLate =
                    shift.clock_in &&
                    parseISO(shift.clock_in) >
                      parseISO(
                        `${shift.scheduled_date}T${shift.scheduled_start}:00Z`
                      );

                  return (
                    <tr
                      key={shift.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {format(
                            parseISO(shift.scheduled_date),
                            "MMM d, yyyy"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {shift.scheduled_start} - {shift.scheduled_end}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            In:{" "}
                            {shift.clock_in ? (
                              <span className={isLate ? "text-red-600" : ""}>
                                {format(parseISO(shift.clock_in), "h:mm a")}
                                {isLate && (
                                  <AlertCircle className="inline-block h-4 w-4 ml-1 text-red-600" />
                                )}
                              </span>
                            ) : (
                              "-"
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-900">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            Out:{" "}
                            {shift.clock_out
                              ? format(parseISO(shift.clock_out), "h:mm a")
                              : "-"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {shift.clock_in && shift.clock_out ? (
                            <div>
                              <span className="font-medium">{hoursWorked}</span>
                              <span className="text-gray-500">
                                {" "}
                                / {scheduledHours} hrs
                              </span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                        >
                          {status.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No shifts found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No shifts are scheduled for this team member yet.
          </p>
        </div>
      )}
    </div>
  );
}
