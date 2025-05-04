'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { DataTable } from "@/components/ui/reusable-table-and-profile";
import { useEffect, useState } from "react";
import { QueryStudentParams } from "@/interface/admin";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/ui/pagination";

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
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const [queryParams, setQueryParams] = useState<QueryStudentParams>({
      search: '',
      page: 1,
      page_size: 10,
      status: 'Pending'
    })
  
    const debouncedSearch = useDebounce(searchInput, 500)
  
  
  // Correctly set up the query
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['applications', queryParams],
    queryFn: () => adminService.getApplications(queryParams),
  });
   useEffect(() => {
      setQueryParams((prev) => ({
        ...prev,
        search: debouncedSearch,
        page: 1,
      }))
    }, [debouncedSearch])

      //
      const prefetchNextPage = (nextPage: number) => {
        queryClient.prefetchQuery({
          queryKey: ['courses', { ...queryParams, page: nextPage }],
          queryFn: () => adminService.getCourses({ ...queryParams, page: nextPage }),
        })
      }
       
        //
        const handlePageChange = (page: number) => {
          prefetchNextPage(page + 1)
          setQueryParams((prev) => ({
            ...prev,
            page,
          }))
        }
      
        const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchInput(event.target.value)
        }

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
          {!isLoading && applications?.meta && applications?.data?.length > 0 && (
        <Pagination
          currentPage={applications.meta.current_page}
          totalPages={applications.meta.total_pages}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default Applications;