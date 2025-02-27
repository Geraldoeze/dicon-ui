'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ProfileView } from '@/components/ui/reusable-table-and-profile';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { adminService } from '@/services/admin.service';
import { Student } from '@/services/types';

type StudentDetailProps = {
  studentId: string;
};

const StudentDetail = ({ studentId }: StudentDetailProps) => {
  const router = useRouter();

  const { 
    data: studentData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => adminService.getStudent(studentId)
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2">Loading student details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error Loading Student</h3>
          <p className="text-red-600 mt-1">
            Unable to load student details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Handle case where no data is available
  if (!studentData?.data) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-yellow-800 font-medium">No Data Available</h3>
          <p className="text-yellow-600 mt-1">
            The requested student could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[80vw] mx-auto">
      <div className="">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        

        <div className="p-10 space-y-7">
         <h1 className='text-2xl font-semibold'>Student Profile</h1>
        {studentData?.data && (
         <ProfileView 
         data={studentData?.data[0]}
         type="student"
         />
        ) }
        </div>

     
      </div>
    </div>
  );
};

export default StudentDetail;