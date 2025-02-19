"use client"

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { ProfileView } from '@/components/ui/reusable-table-and-profile';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/ui/toast';

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
    enabled: !!applicationId,
  });

  // Approve application mutation
  const approveMutation = useMutation({
    mutationFn: (id: string) => adminService.approveApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application', applicationId] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      Toast({
        title: "Application Approved",
        description: "The application has been successfully approved.",
      });
      router.push('/portal/admin/applications');
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: "Failed to approve application. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Reject application mutation
  const rejectMutation = useMutation({
    mutationFn: (id: string) => adminService.rejectApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application', applicationId] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Application Rejected",
        description: "The application has been rejected.",
      });
      router.push('/portal/admin/applications');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to reject application. Please try again.",
        variant: "destructive",
      });
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
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Applications
          </button>
        </div>
        
        <ProfileView 
          data={application.data}
          type="application"
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default ApplicationDetails;