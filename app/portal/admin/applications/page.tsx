'use client'

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { DataTable } from "@/components/ui/reusable-table-and-profile";
import { Application } from "@/services/types";

// Define the application type
// type Application = {
//   id: string;
//   name: string;
//   program: string;
//   email: string;
//   status: 'pending' | 'approved' | 'rejected';
// };

// Table configuration
const applicationColumns = [
  { key: 'name', header: 'Name' },
  { key: 'program', header: 'Program' },
  { key: 'email', header: 'Email' },
  {
    key: 'application_date',
    header: 'Application Date',
    // render: (value: string) => (
    //   <span className={`px-3 py-1 rounded-full text-sm ${
    //     value === 'approved' ? 'bg-green-100 text-green-800' :
    //     value === 'rejected' ? 'bg-red-100 text-red-800' :
    //     'bg-yellow-100 text-yellow-800'
    //   }`}>
    //     {value.charAt(0).toUpperCase() + value.slice(1)}
    //   </span>
    // ),
  },
  // {
  //   key: 'status',
  //   header: 'Status',
    // render: () => (
    //   <span className="text-gray-900 hover:underline">
    //     View details →
    //   </span>
    // ),
  //},
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
    <div className="p-10 bg-white border-border rounded-xl">
      <DataTable 
        columns={applicationColumns}
        data={applications.data || []}
        onRowClick={(application) => router.push(`/portal/admin/applications/${application.id}`)}
        type="application"
      />
    </div>
  );
};

export default Applications;