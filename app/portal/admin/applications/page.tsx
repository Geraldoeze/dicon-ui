'use client'

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { DataTable } from "@/components/ui/reusable-table-and-profile";

// Define the application type
type Application = {
  id: string;
  name: string;
  course: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
};

// Table configuration
const applicationColumns = [
  { key: 'name', header: 'Name' },
  { key: 'course', header: 'Course' },
  { key: 'email', header: 'Email' },
  {
    key: 'status',
    header: 'Status',
    render: (value: string) => (
      <span className={`px-3 py-1 rounded-full text-sm ${
        value === 'approved' ? 'bg-green-100 text-green-800' :
        value === 'rejected' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
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

const Applications = () => {
  const router = useRouter();
  
  // Correctly set up the query
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: () => adminService.getApplications(),
  });

  // Handle loading state
  if (isLoading) {
    return <div className="p-8">Loading applications...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="p-8 text-red-500">Error loading applications</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      <DataTable 
        columns={applicationColumns}
        data={applications.data || []}
        onRowClick={(application) => router.push(`/portal/admin/applications/${application.id}`)}
        showCheckbox={false}
        actions={
          <div className="flex gap-4">
            <select 
              className="border rounded-md px-3 py-2"
              onChange={(e) => console.log('Filter by:', e.target.value)}
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        }
      />
    </div>
  );
};

export default Applications;