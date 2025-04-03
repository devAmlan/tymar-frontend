"use client";
import React, { useState } from "react";
import {useParams} from "next/navigation";
import { format, parseISO, differenceInHours } from 'date-fns';
import { CircleChevronLeft , AlertCircle } from 'lucide-react';
import { shifts } from '@/lib/dummyData';
import { Shift } from "@/types/member";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

function page() {
  const {id} = useParams();

  const [selectedShift, setSelectedShift] = useState<Shift>({
    id: '1',
    member_id: '1',
    scheduled_date: '2024-02-01',
    scheduled_start: '09:00',
    scheduled_end: '17:00',
    clock_in: '2024-02-01T09:05:00Z',
    clock_out: '2024-02-01T17:10:00Z',
    created_at: '2024-02-01T00:00:00Z'
  });

    function calculateHoursWorked(shift: typeof shifts[0]) {
    if (!shift.clock_in || !shift.clock_out) return 0;
    return differenceInHours(parseISO(shift.clock_out), parseISO(shift.clock_in));
  }

    function getScheduledHours(shift: typeof shifts[0]) {
    const [startHour] = shift.scheduled_start.split(':');
    const [endHour] = shift.scheduled_end.split(':');
    return parseInt(endHour) - parseInt(startHour);
  }

  
  function getShiftStatus(shift: typeof shifts[0]) {
    if (!shift.clock_in && !shift.clock_out) {
      return { text: 'Not Started', color: 'bg-gray-100 text-gray-600' };
    }
    if (shift.clock_in && !shift.clock_out) {
      return { text: 'In Progress', color: 'bg-yellow-100 text-yellow-800' };
    }
    
    const hoursWorked = calculateHoursWorked(shift);
    const scheduledHours = getScheduledHours(shift);
    
    if (hoursWorked >= scheduledHours) {
      return { text: 'Completed', color: 'bg-green-100 text-green-800' };
    }
    return { text: 'Incomplete', color: 'bg-red-100 text-red-800' };
  }



      const hoursWorked = calculateHoursWorked(selectedShift);
    const scheduledHours = getScheduledHours(selectedShift);
  
      const isLate = selectedShift.clock_in && parseISO(selectedShift.clock_in) > parseISO(`${selectedShift.scheduled_date}T${selectedShift.scheduled_start}:00Z`);
const status = getShiftStatus(selectedShift);

const router = useRouter();
  return (
    <div>
      <div className="flex gap-2 justify-start items-center mb-4">
        <CircleChevronLeft className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => router.back()}/>
        <h3 className="text-2xl font-bold">Sarah Johnson's Shifts</h3>
      </div>
  
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">

              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Time
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock In
                  </TableHead>
                   <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock Out
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours Worked
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
               {Array.from({length: 2}).map((_, index) => (
                <TableBody key={index} className="divide-y divide-gray-200">
                    <TableRow key={selectedShift?.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {format(parseISO(selectedShift?.scheduled_date || ''), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                            {format(parseISO(`${selectedShift?.scheduled_date}T${selectedShift?.scheduled_start}:00Z`), 'h:mm a')} - {format(parseISO(`${selectedShift?.scheduled_date}T${selectedShift?.scheduled_end}:00Z`), 'h:mm a')}
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                           {selectedShift?.clock_in
                              ? <span className={isLate ? 'text-red-600' : ''}>
                                  {format(parseISO(selectedShift?.clock_in || ''), 'h:mm a')}

                                  {isLate && <AlertCircle className="inline-block h-4 w-4 ml-1 text-red-600" />}
                                </span>
                              : '-'}
                          </div>
                       

                        </div>
                      </TableCell>
                       <TableCell className="px-6 py-4">
                        <div className="space-y-1">             
                          <div className="flex items-center text-sm text-gray-900">
                            
                             {selectedShift?.clock_out
                              ? format(parseISO(selectedShift?.clock_out || ''), 'h:mm a')
                              : '-'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {selectedShift?.clock_in && selectedShift?.clock_out ? (
                            <div>
                              <span className="font-medium text-gray-500">{hoursWorked}</span>
                              <span> / {scheduledHours} hrs</span>
                            </div>
                          ) : '-'}

                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </TableCell>
                    </TableRow>
                </TableBody>
               ))}
            </Table>
          </div>
        </div>
    </div>
  );
}



export default page;