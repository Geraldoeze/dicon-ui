'use client'

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { DataTable } from '@/components/ui/reusable-table-and-profile';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


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
];

const Staffs = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const { 
    data: staffs, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['staffs'],
    queryFn: () => adminService.getStaffs(),
  });

  // Set up mutation for registration
  const registerMutation = useMutation({
    mutationFn: (data: { email: string; password: string; account_type_id: number }) => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('account_type_id', data.account_type_id.toString());
      return adminService.register(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      setIsRegisterDialogOpen(false);
      setIsSuccessModalOpen(true);
      // Reset form
      setEmail('');
      setPassword('');
    },
    onError: () => {}
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      email,
      password,
      account_type_id: 2 // For staff
    });
  };

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
      <div className="max-w-[70vw] mx-auto mb-6 flex justify-end items-center">
        {/* <h1 className="text-xl md:text-2xl font-semibold">Staffs</h1> */}
        <Button
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700/50 text-white"
          onClick={() => setIsRegisterDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Register Staff
        </Button>
      </div>

      <DataTable 
        columns={staffColumns}
        data={staffs?.data || [] as Staff[]}
        type='staff'
        onRowClick={(staff) => router.push(`/portal/admin/staffs/${staff.id}`)}
      />

      {/* Registration Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register New Staff</DialogTitle>
            <DialogDescription>
              Create a new staff account by providing the email and password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsRegisterDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700/50 text-white"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Registering..." : "Register Staff"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registration Successful</DialogTitle>
            <DialogDescription>
              The staff member has been registered successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-indigo-600 hover:bg-indigo-700/50 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Staffs;