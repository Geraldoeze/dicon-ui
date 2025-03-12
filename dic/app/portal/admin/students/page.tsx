'use client'

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { DataTable } from '@/components/ui/reusable-table-and-profile';
import { Button } from '@/components/ui/button';
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
];

const Students = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Set up the query correctly
  const { 
    data: students, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['students'],
    queryFn: () => adminService.getStudents(),
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
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setIsRegisterDialogOpen(false);
      setIsSuccessModalOpen(true);
      // Reset form
      setEmail('');
      setPassword('');
    },
    onError: () => {
  
    }
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      email,
      password,
      account_type_id: 1 // For student
    });
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
      <div className="max-w-[70vw] mx-auto mb-6 flex justify-end items-center">
        {/* <h1 className="text-2xl font-semibold">Students</h1> */}
        <Button 
          className='bg-indigo-600 hover:bg-indigo-700/50 text-white'
          onClick={() => setIsRegisterDialogOpen(true)}
        >
          Register Student
        </Button>
      </div>

      <DataTable 
        columns={studentColumns}
        data={students?.data || []}
        type='student'
        onRowClick={(student) => router.push(`/portal/admin/students/${student.id}`)}
      />

      {/* Registration Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register New Student</DialogTitle>
            <DialogDescription>
              Create a new student account by providing the email and password.
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
                  placeholder="student@example.com"
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
                {registerMutation.isPending ? "Registering..." : "Register Student"}
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
              The student has been registered successfully.
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

export default Students;