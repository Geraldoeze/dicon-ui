'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { DataTable } from '@/components/ui/reusable-table-and-profile';
import { Button } from '@/components/ui/button';
import { Download, Upload, Plus } from 'lucide-react';

type Staff = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive';
};

const staffColumns = [
  { key: 'name', header: 'Name' },
  { key: 'department', header: 'Department' },
  { key: 'role', header: 'Role' },
  { key: 'email', header: 'Email' },
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
  {
    key: 'details',
    header: 'Details',
    render: () => (
      <span className="text-blue-600 hover:underline">
        View details →
      </span>
    ),
  },
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
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff Members</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push('/staffs/new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Staff
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log('Export')}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <DataTable 
        columns={staffColumns}
        data={staffs?.data || []}
        onRowClick={(staff) => router.push(`/staffs/${staff.id}`)}
        showCheckbox={true}
        actions={
          <div className="flex gap-4">
            <select 
              className="border rounded-md px-3 py-2"
              onChange={(e) => console.log('Bulk action:', e.target.value)}
            >
              <option value="">Bulk Actions</option>
              <option value="activate">Activate Selected</option>
              <option value="deactivate">Deactivate Selected</option>
            </select>
            <select 
              className="border rounded-md px-3 py-2"
              onChange={(e) => console.log('Filter by:', e.target.value)}
            >
              <option value="all">All Staff</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="admin">Administrators</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>
        }
      />
    </div>
  );
};

export default Staffs;