"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import {
  CourseDataTable,
  DataTable,
} from "@/components/ui/reusable-table-and-profile";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";
import { QueryParams } from "@/interface/admin";
import { useDebounce } from "@/hooks/useDebounce";
import { programsService } from "@/services/programs.service";

interface Course {
  id: number;
  course_id: number;
  course_name: string;
  course_code: string;
  units: number;
  total_videos: number;
  total_students: number;
  lecturer_in_charge: string;
}

type CoursesResponse = {
  data: Course[];
  meta: {
    current_page: number;
    total_pages: number;
  };
  message: string;
};

interface CreateCourseData {
  name: string;
  code: string;
  credit_unit: number;
  lecturer_id: number;
  degree_id: number;
  description: string;
  department_id: number;
}

// Table configuration for courses
const courseColumns = [
  { key: "course_name", header: "Course Name" },
  { key: "course_code", header: "Course Code" },
  { key: "units", header: "Units" },
  { key: "program", header: "Program" },
  { key: "total_students", header: "Total Students" },
  { key: "lecturer_in_charge", header: "Lecturer" },
];

const AdminCourses = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<CreateCourseData>({
    name: "",
    code: "",
    credit_unit: 3,
    lecturer_id: 0,
    degree_id: 0,
    department_id: 0,
    description: "",
  });

  const [searchInput, setSearchInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    search: "",
    page: 1,
    page_size: 10,
  });

  const debouncedSearch = useDebounce(searchInput, 500);

  // Fetch courses
  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses", queryParams],
    queryFn: () => adminService.getCourses(queryParams),
    staleTime: 5 * 60 * 1000,
  });

  // Fetch degree
  // const {
  //   data: degree,
  //   isLoading: isLoadingDegree,
  //   error: degreesError,
  // } = useQuery({
  //   queryKey: ["degrees"],
  //   queryFn: () => adminService.getDegree(),
  //   staleTime: 3 * 60 * 1000,
  // });

  const { data: degree, isLoading: isLoadingDegree } = useQuery({
    queryKey: ["degree"],
    queryFn: () => adminService.getDegree(),
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch]);

  // Fetch lecturers for selection
  const { data: lecturers, isLoading: isLoadingLecturers } = useQuery({
    queryKey: ["lecturers"],
    queryFn: () =>
      adminService.getStaffs({ page: 1, page_size: 20, search: "" }),
  });

  //
  const prefetchNextPage = (nextPage: number) => {
    queryClient.prefetchQuery({
      queryKey: ["courses", { ...queryParams, page: nextPage }],
      queryFn: () =>
        adminService.getCourses({ ...queryParams, page: nextPage }),
    });
  };

  // Add course mutation
  const addCourseMutation = useMutation({
    mutationFn: (data: CreateCourseData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("code", data.code);
      formData.append(
        "credit_unit",
        data.credit_unit ? data.credit_unit.toString() : ""
      );
      formData.append(
        "lecturer_id",
        data.lecturer_id ? data.lecturer_id?.toString() : ""
      );
      formData.append("description", data.description);
      formData.append("degree_id", data.degree_id.toString());
      formData.append("department_id", data.department_id.toString());
      return adminService.createCourses(formData);
    },
    onSuccess: (data) => {
      
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      setIsCreateDialogOpen(false);
      setIsSuccessModalOpen(true);
      // Reset form
      setFormData({
        name: "",
        code: "",
        credit_unit: 3,
        degree_id: 0,
        lecturer_id: 0,
        department_id: 0,
        description: "",
      });
    },
    onError: () => {},
  });

  const { data: department, isLoading: isLoadingDepartment } = useQuery({
    queryKey: ["department"],
    queryFn: () => adminService.getDepartments(),
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourseMutation.mutate(formData);
  };

  // Handle loading state
  if (isLoadingCourses) {
    return <div className="p-8">Loading courses...</div>;
  }

  // Handle error state
  if (coursesError) {
    return (
      <div className="p-8 text-red-500">
        Error loading courses. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-[70vw] mx-auto mb-6 flex justify-end items-center">
        {/* <h1 className="text-xl md:text-2xl font-semibold">Courses</h1> */}
        <Button
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700/50 text-white"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      <CourseDataTable
        columns={courseColumns}
        data={courses?.data || []}
        type="course"
        onRowClick={(course) =>
          router.push(`/portal/admin/courses/${course.course_id}`)
        }
      />
      {!isLoadingCourses && courses?.meta && courses?.data?.length > 0 && (
        <Pagination
          currentPage={courses.meta.current_page}
          totalPages={courses.meta.total_pages}
          onPageChange={handlePageChange}
          disabled={isLoadingCourses}
        />
      )}

      {/* Create Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Create a new course by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Computer Science 101"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="CS101"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="credit_unit">Credit Units</Label>
                <Input
                  id="credit_unit"
                  name="credit_unit"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.credit_unit}
                  onChange={handleNumberInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="degree_id">Degree</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "degree_id")
                  }
                  value={formData.degree_id.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingDegree ? (
                      <SelectItem value="loading">Loading degree...</SelectItem>
                    ) : (
                      degree?.data?.map((degree: any) => (
                        <SelectItem
                          key={degree?.id}
                          value={degree?.id.toString()}
                        >
                          {degree?.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lecturer_id">Lecturer</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "lecturer_id")
                  }
                  value={formData.lecturer_id.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lecturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingLecturers ? (
                      <SelectItem value="loading">
                        Loading lecturers...
                      </SelectItem>
                    ) : (
                      lecturers?.data?.map((lecturer: any, id: number) => (
                        <SelectItem key={id} value={lecturer.id.toString()}>
                          {lecturer.full_name ||
                            `${lecturer.first_name} ${lecturer.last_name}`}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department_id">Department</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "department_id")
                  }
                  value={formData.department_id.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingDepartment ? (
                      <SelectItem value="loading">
                        Loading department...
                      </SelectItem>
                    ) : (
                      department?.data?.map((department: any) => (
                        <SelectItem
                          key={department?.id}
                          value={department?.id.toString()}
                        >
                          {department?.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Course description..."
                  rows={3}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700/50 text-white"
                disabled={addCourseMutation.isPending}
              >
                {addCourseMutation.isPending ? "Creating..." : "Create Course"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Course Created Successfully</DialogTitle>
            <DialogDescription>
              The course has been created and added to the system.
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

export default AdminCourses;
