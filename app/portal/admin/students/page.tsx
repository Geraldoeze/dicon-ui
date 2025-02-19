'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { DataTable } from '@/components/ui/reusable-table-and-profile';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';

// Define the student type
type Student = {
  id: string;
  name: string;
  course: string;
  email: string;
  status: 'active' | 'inactive';
};

// Table configuration
const studentColumns = [
  { key: 'name', header: 'Name' },
  { key: 'course', header: 'Course' },
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

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    // Implementation for bulk actions
    console.log(`Bulk action: ${action}`);
  };

  // Handle export
  const handleExport = () => {
    // Implementation for exporting student data
    console.log('Exporting student data');
  };

  // Handle import
  const handleImport = () => {
    // Implementation for importing student data
    console.log('Importing student data');
  };

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
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={handleImport}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Import
          </Button>
        </div>
      </div>

      <DataTable 
        columns={studentColumns}
        data={students?.data || []}
        onRowClick={(student) => router.push(`/portal/admin/students/${student.id}`)}
        showCheckbox={true}
        actions={
          <div className="flex gap-4">
            <select 
              className="border rounded-md px-3 py-2"
              onChange={(e) => handleBulkAction(e.target.value)}
            >
              <option value="">Bulk Actions</option>
              <option value="activate">Activate Selected</option>
              <option value="deactivate">Deactivate Selected</option>
              <option value="delete">Delete Selected</option>
            </select>
            <select 
              className="border rounded-md px-3 py-2"
              onChange={(e) => console.log('Filter by:', e.target.value)}
            >
              <option value="all">All Students</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        }
      />
    </div>
  );
};

export default Students;