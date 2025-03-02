'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { DataTable } from '@/components/ui/reusable-table-and-profile';


type Staff = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive';
};

const staffColumns = [
  { key: 'first_name', header: 'First Name' },
  { key: 'last_name', header: 'Last Name'},
  { key: 'department', header: 'Department' },
  { key: 'phone_number', header: 'Phone Number' },
  { key: 'email', header: 'Email' },
  // {
  //   key: 'details',
  //   header: 'Details',
  //   render: () => (
  //     <span className="text-blue-600 hover:underline">
  //       View details →
  //     </span>
  //   ),
  // },
];

const Staffs = () => {
  const router = useRouter();
  
  const { 
    data: staffs, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['staffs'],
    queryFn: () => adminService.getStaffs(),
  });

  // Handle loading state
  if (isLoading) {
    return <div className="p-8">Loading staff members...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-8 text-red-500">
        Error loading staff members. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8">
           <h1 className="text-xl md:text-2xl font-semibold">Staffs</h1>
      {/* <div className="mb-6 flex justify-between items-center">
   
        <div className="flex gap-4">
          <Button
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Staff
          </Button>
        </div>
      </div> */}

      <DataTable 
        columns={staffColumns}
        data={staffs?.data || [] as Staff[]}
        onRowClick={(staff) => router.push(`/portal/admin/staffs/${staff.id}`)}
      />
    </div>
  );
};

export default Staffs;