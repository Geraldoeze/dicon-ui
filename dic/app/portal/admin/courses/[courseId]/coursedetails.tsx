"use client";

import React, { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { ProfileView } from "@/components/ui/reusable-table-and-profile";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type courseDetailProps = {
  courseId: string;
};

const CourseDetails = ({ courseId }: courseDetailProps) => {
  // Move ALL hooks to the top of the component
  const router = useRouter();
  const queryClient = useQueryClient();

  // State hooks
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    lecturer_id: 0,
  });

  // Query hooks
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => adminService.getCourse(courseId),
    enabled: Boolean(courseId),
    staleTime: 5 * 60 * 1000,
  });

  const { data: lecturers, isLoading: isLoadingLecturers } = useQuery({
    queryKey: ["lecturers"],
    queryFn: () =>
      adminService.getStaffs({ page: 1, page_size: 20, search: "" }),
  });

  // Mutation hook - moved up before any conditional returns
  const editCourseMutation = useMutation({
    mutationFn: (data: { lecturer_id: number; program_id: number }) => {
      return adminService.editCourses({ ...data, id: courseId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      setIsEditDialogOpen(false);
      setIsSuccessModalOpen(true);
    },
    onError: (error) => {
      console.error("Failed to edit course:", error);
    },
  });

  // Handler functions - defined using useCallback to avoid recreation on each render
  const openEditDialog = useCallback(() => {
    if (course?.data) {
      setFormData({
        lecturer_id: course.data.lecturer_id || 0,
      });
    }
    setIsEditDialogOpen(true);
  }, [course?.data]);

  const handleSelectChange = useCallback((value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const form = {
        lecturer_id: formData.lecturer_id,
        program_id: Number(courseId),
      };
      editCourseMutation.mutate(form);
    },
    [formData.lecturer_id, courseId, editCourseMutation]
  );

  // Handle loading and error cases after all hooks are defined
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error Loading Course</h3>
          <p className="text-red-600 mt-1">
            Unable to load course details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!course?.data) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-yellow-800 font-medium">No Data Available</h3>
          <p className="text-yellow-600 mt-1">
            The requested course could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-end gap-5">
        <Button className="py-2 px-4 my-5 bg-blue-600" onClick={openEditDialog}>
          Edit Course
        </Button>
      </div>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update course details by modifying the form below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="lecturer_id">Lecturer</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "lecturer_id")
                  }
                  value={formData.lecturer_id.toString()}
                  defaultValue={formData.lecturer_id.toString()}
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
                      lecturers?.data?.map((lecturer: any) => (
                        <SelectItem
                          key={lecturer.id}
                          value={lecturer.id.toString()}
                        >
                          {lecturer.full_name ||
                            `${lecturer.first_name} ${lecturer.last_name}`}
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
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700/50 text-white"
                disabled={editCourseMutation.isPending}
              >
                {editCourseMutation.isPending ? "Updating..." : "Update Course"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Course Updated</DialogTitle>
            <DialogDescription>
              The course has been successfully updated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="md:max-w-[80vw] mx-auto md:p-7 py-5">
        <div className="flex justify-center flex-col">
          <div className="sm:flex-row items-start gap-4">
            <CardContent>
              <div className="flex-1 items-center">
                <h2 className="text-2xl font-semibold">
                  {course.data.course_code}
                </h2>
                {/* <p className="text-gray-500">{course.data.course_code}</p> */}
              </div>
            </CardContent>
          </div>
          <div className="p-5 md:min-w-[60vw] max-w-[80vw] mx-auto">
            <div className="">
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span>Course</span>
                    </div>
                    <h1 className="text-base md:text-lg font-semibold">
                      {course.data.name}
                    </h1>
                    <hr />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span>Program</span>
                    </div>
                    <h1 className="text-base md:text-lg font-semibold">
                      {course.data?.program}
                    </h1>
                    <hr />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span>Lecturer in Charge</span>
                    </div>
                    <h1 className="text-base md:text-lg font-semibold">
                      {course.data?.lecturer_in_charge?.length > 2
                        ? course.data?.lecturer_in_charge
                        : "None assigned, kindly edit course to assign"}
                    </h1>
                    <hr />
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseDetails;
