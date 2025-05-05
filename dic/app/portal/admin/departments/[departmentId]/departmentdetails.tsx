"use client"
import { Button } from '@/components/ui/button';
//import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adminService } from '@/services/admin.service';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Loader2, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const DepartmentDetails = ({ departmentId }: { departmentId: string }) => {
  const { data: departmentData } = useQuery({
    queryKey: ['department', departmentId],
    queryFn: () => adminService.getDepartment(departmentId),
  });

  const { data: applicationsData, isLoading, isError } = useQuery({
    queryKey: ['applications',departmentId],
    queryFn: () => adminService.getDepartmentStudents(departmentId),
  });

  const router = useRouter();

  return (
    <div className="bg-white md:px-10">

    <div className="py-3 md:py-5 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      <div className="max-w-[85vw] lg:max-w-[80vw] lg:mx-auto px-3 lg:px-7 py-5 space-y-10">
        {departmentData?.data.map((department) => (
          <div key={department.id}>
            <div className="flex items-center md:justify-between flex-col lg:flex-row space-y-5">
              <div>
                <h1 className="text-lg md:text-2xl font-medium">{department.name}</h1>
              </div>
              {/* <div className="flex items-center gap-x-2 border rounded-md p-1 md:p-2 bg-gray-100 text-black">
                <h1 className='font-semibold'>HOD:</h1>
                <p>{department.head_of_department_name}</p>
              </div> */}
            </div>

            {/* <div className="my-10">
              <h1 className="text-base md:text-lg font-semibold">About Department</h1>
              <p>{department.description}</p>
            </div> */}
          </div>
        ))}
        <hr />

        <div className="flex items-center justify-between flex-col lg:flex-row">
          <h1 className="text-[1.25rem] md:text-[1.5rem]">Students</h1>
          <div className="flex items-center">
            <div className="relative flex-1 items-center">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 bg-[#F7F9FC] placeholder:text-[.8rem] placeholder:lg:text-[1rem]"
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-[#F7F9FC] text-[.8rem] lg:text-[1rem] text-black/70">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-red-500">
                  Error loading applications. Please try again.
                </TableCell>
              </TableRow>
            ) : !applicationsData?.data.length ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              applicationsData?.data.map(({ id, name, course_name, email, phone_number }: any) => (
                <TableRow key={id}>
                  <TableCell><a href={`/portal/admin/students/${id.toString()}`}>{name}</a></TableCell>
                  <TableCell>{course_name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{phone_number}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentDetails;
