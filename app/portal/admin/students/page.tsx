'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { DataTable } from '@/components/ui/reusable-table-and-profile';


// Table configuration
const studentColumns = [
  { key: 'name', header: 'Name' },
  { key: 'department', header: 'Department' },
  { key: 'email', header: 'Email' },
  { key: 'phone_number', header: 'Phone Number' },
  {
    key: 'status',
    header: 'Status',
    render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-sm ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    ),
  },
  // {
  //   key: 'details',
  //   header: 'Details',
  //   render: () => (
  //     <span className="text-black hover:underline">
  //       View details →
  //     </span>
  //   ),
  // },
];

const Students = () => {
  const router = useRouter();
  
  // Set up the query correctly
  const { 
    data: students, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['students'],
    queryFn: () => adminService.getStudents(),
  });

  // Handle loading state
  if (isLoading) {
    return <div className="p-8">Loading students...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-8 text-red-500">
        Error loading students. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>
    
      </div>

      <DataTable 
        columns={studentColumns}
        data={students?.data || []}
        onRowClick={(student) => router.push(`/portal/admin/students/${student.id}`)}
      />
    </div>
  );
};

export default Students;