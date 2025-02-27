'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { ProfileView } from '@/components/ui/reusable-table-and-profile';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Key } from 'lucide-react';

type StaffDetailProps = {
  staffId: string;
};

const StaffDetail = ({ staffId }: StaffDetailProps) => {
  const router = useRouter();

  const { 
    data: staff, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['staff', staffId],
    queryFn: () => adminService.getStaff(staffId),
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2">Loading staff details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error Loading Staff</h3>
          <p className="text-red-600 mt-1">
            Unable to load staff details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Handle case where no data is available
  if (!staff?.data) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-yellow-800 font-medium">No Data Available</h3>
          <p className="text-yellow-600 mt-1">
            The requested staff member could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:min-w-[60vw] max-w-[80vw] mx-auto">
      
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          {/* <div className="flex gap-2">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push(`/staffs/${staffId}/edit`)}
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => console.log('Reset password')}
            >
              <Key className="w-4 h-4" />
              Reset Password
            </Button>
          </div> */}
        </div>

        <div className="">
          <ProfileView 
            data={staff?.data}
            type="staff"
          />

         
        

          {/* Additional staff-specific sections */}
          {/* <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Assigned Courses</h2> */}
            {/* Add courses list here */}
          {/* </div> */}

          {/* <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2> */}
            {/* Add activity list here */}
          {/* </div>  */}
        </div> 

    </div>
  );
};

export default StaffDetail;