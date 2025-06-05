"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { DataTable } from "@/components/ui/reusable-table-and-profile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QueryParams, QueryStudentParams } from "@/interface/admin";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/ui/pagination";

// Student registration form interface
interface StudentRegistrationData {
  email: string;
  password: string;
  account_type_id: number;
  photo_url: string;
  title: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  state: string;
  local_government: string;
  address: string;
  gender: string;
  date_of_birth: string;
  next_of_kin_name: string;
  program_id: number;
  batch_id: number;
  enrollment_date: string;
}

// Table configuration
const studentColumns = [
  { key: "name", header: "Name" },
  { key: "department", header: "Department" },
  { key: "email", header: "Email" },
  { key: "phone_number", header: "Phone Number" },
  {
    key: "status",
    header: "Status",
    render: (value: string) => (
      <span
        className={`px-3 py-1 rounded-full text-sm ${
          value === "active"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    ),
  },
];

const Students = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<StudentRegistrationData>({
    email: "",
    password: "",
    account_type_id: 1, // 1 for student
    photo_url:
      "https://res.cloudinary.com/dsueaitln/image/upload/v1733239113/istockphoto-522855255-612x612_eyv1vf.jpg",
    title: "Mr.",
    first_name: "",
    last_name: "",
    phone_number: "",
    state: "",
    local_government: "",
    address: "",
    gender: "Male",
    date_of_birth: "",
    next_of_kin_name: "",
    program_id: 1,
    batch_id: 1,
    enrollment_date: "",
  });

  const [queryParams, setQueryParams] = useState<QueryStudentParams>({
    search: "",
    page: 1,
    page_size: 10,
    status: "Active",
  });

  const debouncedSearch = useDebounce(searchInput, 500);

  // Set up the query correctly
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students", queryParams],
    queryFn: () => adminService.getStudents(queryParams),
  });

  // Fetch programs and batches for dropdowns
  const { data: programs } = useQuery({
    queryKey: ["programs"],
    queryFn: () => adminService.getProgram(),
  });

  const { data: batches } = useQuery({
    queryKey: ["batches"],
    queryFn: () => adminService.getBatch(),
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch]);

  const prefetchNextPage = (nextPage: number) => {
    queryClient.prefetchQuery({
      queryKey: ["students", { ...queryParams, page: nextPage }],
      queryFn: () =>
        adminService.getStudents({ ...queryParams, page: nextPage }),
    });
  };

  // Set up mutation for registration with expanded data
  const registerMutation = useMutation({
    mutationFn: (data: StudentRegistrationData) => {
      return adminService.register(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setIsRegisterDialogOpen(false);
      setIsSuccessModalOpen(true);
      // Reset form
      setFormData({
        email: "",
        password: "",
        account_type_id: 1,
        photo_url:
          "https://res.cloudinary.com/dsueaitln/image/upload/v1733239113/istockphoto-522855255-612x612_eyv1vf.jpg",
        title: "Mr.",
        first_name: "",
        last_name: "",
        phone_number: "",
        state: "",
        local_government: "",
        address: "",
        gender: "Male",
        date_of_birth: "",
        next_of_kin_name: "",
        program_id: 2,
        batch_id: 1,
        enrollment_date: "",
      });
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "program_id" || name === "batch_id"
          ? parseInt(value, 10)
          : value,
    }));
  };
  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value, 10), // Convert to number
    }));
  };
  
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handlePageChange = (page: number) => {
    prefetchNextPage(page + 1);
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
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
        <div className="flex justify-end space-x-2">
          {/* <Input
            placeholder="Search students..."
            className="max-w-xs"
            value={searchInput}
            onChange={handleSearchChange}
          /> */}
          <Button
            className="bg-indigo-600 hover:bg-indigo-700/50 text-white"
            onClick={() => setIsRegisterDialogOpen(true)}
          >
            Register Student
          </Button>
        </div>
      </div>

      <DataTable
        columns={studentColumns}
        data={students?.data || []}
        type="student"
        onRowClick={(student) =>
          router.push(`/portal/admin/students/${student.id}`)
        }
      />

      {!isLoading && students?.meta && students?.data?.length > 0 && (
        <Pagination
          currentPage={students.meta.current_page}
          totalPages={students.meta.total_pages}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      )}

      {/* Enhanced Registration Dialog */}
      <Dialog
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register New Student</DialogTitle>
            <DialogDescription>
              Create a new student account by providing the required
              information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Information */}
              <div className="space-y-3 col-span-2">
                <h3 className="font-semibold text-lg">Account Information</h3>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="student@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password*</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="+1234567890"
                />
              </div>

              {/* Address Information
              <div className="col-span-2">
                <h3 className="font-semibold text-lg mt-4">Address Information</h3>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="local_government">Local Government</Label>
                <Input
                  id="local_government"
                  name="local_government"
                  value={formData.local_government}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
              
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
              */}

              {/* Emergency Contact 
              <div className="col-span-2">
                <h3 className="font-semibold text-lg mt-4">Emergency Contact</h3>
              </div>
              
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="next_of_kin_name">Next of Kin Name</Label>
                <Input
                  id="next_of_kin_name"
                  name="next_of_kin_name"
                  value={formData.next_of_kin_name}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                />
              </div>
              */}

              {/* Academic Information */}
              <div className="col-span-2">
                <h3 className="font-semibold text-lg mt-4">
                  Academic Information
                </h3>
              </div>

              {/* <div className="grid gap-2">
                <Label htmlFor="program_id">Program*</Label>
                <select
                  id="program_id"
                  name="program_id"
                  
                  value={formData.program_id}
                  onChange={handleProgramChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  {programs?.data ? (
                    programs?.data?.map((program: any, index: any) => (
                      <option key={index} value={program.id}>
                        {program.program}
                      </option>
                    ))
                  ) : (
                    <option value="7">Default Program</option>
                  )}
                </select>
              </div> */}
              <div className="grid gap-2">
                <Label htmlFor="program_id">Program*</Label>
                <select
                  id="program_id"
                  name="program_id"
                  value={formData.program_id}
                  onChange={handleProgramChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  {programs?.data && programs.data.length > 0 ? (
                    programs.data.map((program: any, index: number) => (
                      <option key={index} value={program.degree_id}>
                        {program.program}
                      </option>
                    ))
                  ) : (
                    <option value="7">Default Program</option>
                  )}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="batch_id">Batch*</Label>
                <select
                  id="batch_id"
                  name="batch_id"
                  value={formData.batch_id}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  {batches?.data ? (
                    batches.data.map((batch: any, index: any) => (
                      <option key={index} value={batch.id}>
                        {batch.name}
                      </option>
                    ))
                  ) : (
                    <option value="1">Default Batch</option>
                  )}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enrollment_date">Enrollment Date</Label>
                <Input
                  id="enrollment_date"
                  name="enrollment_date"
                  type="date"
                  value={formData.enrollment_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
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
                {registerMutation.isPending
                  ? "Registering..."
                  : "Register Student"}
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
