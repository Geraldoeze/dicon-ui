"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { DataTable } from "@/components/ui/reusable-table-and-profile";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import { RegisterStaffData, RegisterStaffDummyData } from "@/interface/staff";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import SelectDepartment from "@/components/ui/select-department";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/ui/pagination";
import { programsService } from "@/services/programs.service";
import { QueryParams } from "@/interface/admin";

type Staff = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive";
};

const staffColumns = [
  { key: "first_name", header: "First Name" },
  { key: "last_name", header: "Last Name" },
  { key: "department", header: "Department" },
  { key: "phone_number", header: "Phone Number" },
  { key: "email", header: "Email" },
];

const Staffs = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [formData, setFormData] = useState(RegisterStaffDummyData);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    search: "",
    page: 1,
    page_size: 10,
  });

  const debouncedSearch = useDebounce(searchInput, 500);

  const {
    data: staffs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["staffs", queryParams],
    queryFn: () => adminService.getStaffs(queryParams),
  });

  // Fetch programs for selection
  const { data: programs, isLoading: isLoadingPrograms } = useQuery({
    queryKey: ["programs"],
    queryFn: () => programsService.getPrograms(),
  });

  // Set up mutation for registration
  const registerMutation = useMutation({
    mutationFn: (data: RegisterStaffData) => {
      const formFeilds = new FormData();
      // formData.append("email", data.email);
      // formData.append("password", data.password);
      // formData.append("account_type_id", data.account_type_id.toString());

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formFeilds.append(key, value.toString());
        }
      });
      return adminService.register(formFeilds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      setIsRegisterDialogOpen(false);
      setIsSuccessModalOpen(true);
      // Reset form
      setFormData(RegisterStaffDummyData);
    },
    onError: () => {},
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    registerMutation.mutate(formData);
  };

  // Handle loading state
  if (isLoading) {
    return <div className="p-8">Loading staff members...</div>;
  }
  console.log(formData);

  // Handle error state
  if (error) {
    return (
      <div className="p-8 text-red-500">
        Error loading staff members. Please try again later.
      </div>
    );
  }
  const handleTitle = (value: string) => {
    setFormData((prev) => ({ ...prev, title: value }));
  };
  const handleRole = (value: string) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, role_id: Number(value) }));
  };
  const handleGender = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };
  const handleDepartment = (value: { id: string | number; name: string }) => {
    setFormData((prev) => ({ ...prev, department_id: Number(value.id) }));
  };
  //
  const prefetchNextPage = (nextPage: number) => {
    queryClient.prefetchQuery({
      queryKey: ["courses", { ...queryParams, page: nextPage }],
      queryFn: () =>
        adminService.getCourses({ ...queryParams, page: nextPage }),
    });
  };
  //
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
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };
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
        data={staffs?.data || ([] as Staff[])}
        type="staff"
        onRowClick={(staff) => router.push(`/portal/admin/staffs/${staff.id}`)}
      />
      {!isLoading && staffs?.meta && staffs?.data?.length > 0 && (
        <Pagination
          currentPage={staffs.meta.current_page}
          totalPages={staffs.meta.total_pages}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      )}

      {/* Registration Dialog */}
      <Dialog
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Register New Staff</DialogTitle>
            <DialogDescription>
              Create a new staff account by filling the form.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4 py-4">
              <div className="flex gap-5 justify-between">
                <div className="grid gap-2 w-[48%]">
                  <Label htmlFor="email">First name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    value={formData?.first_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        first_name: e.target.value,
                      }))
                    }
                    placeholder="Enter First name"
                    required
                  />
                </div>
                <div className="grid gap-2 w-[48%]">
                  <Label htmlFor="email">Last name</Label>
                  <Input
                    id="last"
                    type="text"
                    value={formData?.last_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        last_name: e.target.value,
                      }))
                    }
                    placeholder="Enter Last name"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="staff@example.com"
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="grid gap-2 w-[48%]">
                  <Label htmlFor="email">Title</Label>
                  <Select onValueChange={handleTitle} value={formData.title}>
                    <SelectTrigger className=" outline-none">
                      <SelectValue placeholder={"Select Title"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Miss">Miss</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                      <SelectItem value="Prof">Prof</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="grid gap-2 w-[48%]">
                  <Label htmlFor="email">Role</Label>
                  <Select
                    onValueChange={handleRole}
                    value={formData.role_id?.toString()}
                  >
                    <SelectTrigger className="outline-none">
                      <SelectValue placeholder={"Select Role"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"1"}>Teaching</SelectItem>
                      <SelectItem value={"2"}>Non Teaching</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Gender</Label>
                <Select onValueChange={handleGender} value={formData.gender}>
                  <SelectTrigger className=" outline-none">
                    <SelectValue placeholder={""} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Phone number</Label>
                <Input
                  id="phone_number"
                  type="text"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone_number: e.target.value,
                    }))
                  }
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <SelectDepartment onSelect={handleDepartment} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="program_id">Program</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "program_id")
                  }
                  value={formData.program_id.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Program" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingPrograms ? (
                      <SelectItem value="loading">
                        Loading programs...
                      </SelectItem>
                    ) : (
                      programs?.data?.map((program: any) => (
                        <SelectItem
                          key={program.id}
                          value={program.id.toString()}
                        >
                          {program.program}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
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
                {registerMutation.isPending
                  ? "Registering..."
                  : "Register Staff"}
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
