"use client"

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { ProfileView } from '@/components/ui/reusable-table-and-profile';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type ApplicationDetailsProps = {
  applicationId: string;
};

const ApplicationDetails = ({ applicationId }: ApplicationDetailsProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch application details
  const { 
    data: application, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => adminService.getApplication(applicationId),
  });

  // Approve application mutation
  const approveMutation = useMutation({
    mutationFn: (id: string) => adminService.approveApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application', applicationId] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      router.push('/portal/admin/applications');
    },
  
  });

  // Reject application mutation
  const rejectMutation = useMutation({
    mutationFn: (id: string) => adminService.rejectApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application', applicationId] });
      router.push('/portal/admin/applications');
    },
  });

  // Handle approve action
  const handleApprove = async () => {
    
    approveMutation.mutate(applicationId);
  };

  // Handle reject action
  const handleReject = async () => {
    rejectMutation.mutate(applicationId);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2">Loading application details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error Loading Application</h3>
          <p className="text-red-600 mt-1">
            Unable to load application details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Handle case where no data is available
  if (!application?.data) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-yellow-800 font-medium">No Data Available</h3>
          <p className="text-yellow-600 mt-1">
            The requested application could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-5 max-w-[85vw] mx-auto">

        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-black font-medium flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2"/> Back 
          </button>
        </div>
        
        <ProfileView 
          data={application?.data as Application}
          type="application"
          onApprove={handleApprove}
          onReject={handleReject}
        />
    </div>
  );
};

export default ApplicationDetails;