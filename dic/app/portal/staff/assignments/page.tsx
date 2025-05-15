"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { Plus, Search, Loader2, ArrowRight, Link, Check } from "lucide-react";
import { staffService } from "@/services/staff.service";
import { Assignment } from "@/services/types";
import Image from "next/image";
//import { useForm } from "react-hook-form";

// Define the assignment creation interface
interface CreateAssignmentData {
  course_id: number;
  assignment_url: string;
  description?: string;
  due_date?: string;
  due_time: string;
  pass_mark: number;
}

const Assignment = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("pending");
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [courseId, setCourseId] = useState<number | null>(null);
  const [assignmentUrl, setAssignmentUrl] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [passMark, setPassMark] = useState<number>(70);

  // Get available courses for dropdown
  const { data: courses, isLoading: isCoursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => staffService.getCourses(),
  });

  const {
    data: pendingAssignments,
    isLoading: isPendingLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingAssignments"],
    queryFn: () => staffService.getPendingAssignments(),
    enabled: activeTab === "pending",
  });

  const { data: gradedAssignments, isLoading: isGradedLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: () => staffService.getGradedAssignments(),
    enabled: activeTab === "graded",
  });

  // Create assignment mutation
  const createAssignmentMutation = useMutation({
    mutationFn: (data: CreateAssignmentData) =>
      staffService.createAssignment(data),
    onSuccess: () => {
      resetForm();
      setIsDialogOpen(false);
      setIsSuccessDialogOpen(true);

      // Refresh assignments data
      if (activeTab === "pending") {
        refetch();
      }
    },
    onError: (error: Error) => {
      setFormError(
        error.message || "Failed to create assignment. Please try again."
      );
    },
  });

  const resetForm = () => {
    setCourseId(null);
    setAssignmentUrl("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setPassMark(70);
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!courseId) {
      setFormError("Please select a course");
      return;
    }

    if (!assignmentUrl) {
      setFormError("Assignment URL is required");
      return;
    }

    if (!dueTime) {
      setFormError("Due time is required");
      return;
    }

    // Prepare data for submission
    const assignmentData: CreateAssignmentData = {
      course_id: courseId,
      assignment_url: assignmentUrl,
      due_time: dueTime,
      pass_mark: passMark,
    };

    // Add optional fields if they have values
    if (description.trim()) {
      assignmentData.description = description;
    }

    if (dueDate) {
      assignmentData.due_date = dueDate;
    }

    // Submit the form
    createAssignmentMutation.mutate(assignmentData);
  };

  const filteredAssignments =
    activeTab === "pending" ? pendingAssignments : gradedAssignments;
  // const filter = filteredAssignments?.data.filter((assignment: Assignment) =>
  //   assignment.course_code.toLowerCase().includes(searchQuery.toLowerCase()));
  const filter = pendingAssignments?.data;
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-start md:justify-between flex-col md:flex-row my-5">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-900">Assignments</h1>
          <p className="text-gray-600">
            Check out your pending and graded assignments
          </p>
        </div>

        {/* Create Assignment Dialog */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-indigo-700 hover:bg-indigo-800 text-white flex items-center gap-x-2">
              <Plus />
              Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Assignment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-50 text-red-700 p-2 rounded-md text-sm">
                  {formError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="course_id">Choose Course</Label>
                <Select
                  value={courseId?.toString() || ""}
                  onValueChange={(value) => setCourseId(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {isCoursesLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading courses...
                      </SelectItem>
                    ) : (
                      courses?.data.map((course) => (
                        <SelectItem
                          key={course.course_id}
                          value={course.course_id.toString()}
                        >
                          {course.course_code} - {course.course_name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignment_url">
                  Assignment URL (Google docs link)
                </Label>
                <Input
                  id="assignment_url"
                  name="assignment_url"
                  placeholder="https://docs.google.com/..."
                  value={assignmentUrl}
                  onChange={(e) => setAssignmentUrl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Assignment Description (optional)
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter assignment details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date (optional)</Label>
                <Input
                  id="due_date"
                  name="due_date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="due_time">Due Time</Label>
                <Input
                  id="due_time"
                  name="due_time"
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pass_mark">Passing Grade</Label>
                <Input
                  id="pass_mark"
                  name="pass_mark"
                  type="number"
                  min="0"
                  max="100"
                  value={passMark}
                  onChange={(e) => setPassMark(Number(e.target.value))}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white"
                // disabled={createAssignmentMutation.isLoading}
              >
                Add new assignment
                {/* {createAssignmentMutation.isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Add new assignment"
                    )} */}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog
          open={isSuccessDialogOpen}
          onOpenChange={setIsSuccessDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center py-6">
              <DialogTitle className="text-center">
                {/* <Image src="/approve.svg" alt="Success" width={50} height={50} /> */}
                <p className="text-xl font-semibold text-center">
                  Assignment Created Successfully!
                </p>
              </DialogTitle>
              <p className="text-gray-600 text-center mt-2">
                Your new assignment has been added and students can now view it.
              </p>
              <Button
                onClick={() => setIsSuccessDialogOpen(false)}
                className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <hr />

      <div className="">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between flex-wrap gap-4 my-5">
            <div className="bg-slate-50 px-2 py-1 rounded-md">
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                {/* <TabsTrigger value="graded">Graded</TabsTrigger> */}
              </TabsList>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 bg-slate-50" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr />

          <TabsContent value="pending">
            {isPendingLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
              </div>
            ) : filter && filter.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filter.map((assignment: Assignment) => (
                  <div
                    key={assignment.id}
                    className="border-e-2 border-b-2 border-gray-100 p-5"
                  >
                    <div className="flex flex-col space-y-3 my-2">
                      <div className="flex flex-col gap-y-2">
                        <h1 className="text-xl font-semibold">
                          {assignment.course_code}
                        </h1>
                        <p>{assignment.course_name}</p>
                      </div>
                      <div className="flex justify-between">
                        <span>Due Date</span>
                        <button className="flex gap-x-2 bg-slate-50 rounded-md px-2 py-1">
                          {" "}
                          {assignment.due_date}
                        </button>
                      </div>
                      {/* <div className="flex justify-between">
                                <span>Mode of Submission</span>
                                <button className="flex gap-x-2 bg-slate-50 rounded-md px-2 py-1">
                                  <Link className="h-4 w-4"/> 
                                  {assignment.submission_format}
                                </button>
                              </div> */}
                      <div className="my-3">
                        <a
                          href={`/portal/staff/assignments/${assignment.id}`}
                          className="space-x-2 flex font-medium"
                        >
                          <span>Details</span>
                          <ArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No pending assignments found
              </div>
            )}
          </TabsContent>

          <TabsContent value="graded">
            {isGradedLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
              </div>
            ) : filter && filter.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filter.map((assignment: Assignment) => (
                  <div
                    key={assignment.id}
                    className="border-e-2 border-b-2 border-gray-100 p-5"
                  >
                    <div className="flex flex-col space-y-3 my-2">
                      <div className="flex flex-col gap-y-2 my-2">
                        <h1 className="text-xl font-semibold">
                          {assignment.course_code}
                        </h1>
                        <p>{assignment.course_name}</p>
                      </div>
                      <div className="flex justify-between">
                        <span>Mode of Submission</span>
                        <button className="flex gap-x-2 bg-slate-50 rounded-md px-2 py-1">
                          <Link className="h-4 w-4" />
                          {assignment.submission_format}
                        </button>
                      </div>
                      <div className="flex justify-between flex-col md:flex-row my-2">
                        <span>Submission Date:</span>
                        <button className="flex gap-x-2 bg-slate-50 rounded-md px-2 py-1">
                          {assignment.due_date}
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="w-full flex justify-between items-center flex-wrap my-3">
                      <a
                        href={`/portal/staff/assignments/${assignment.id}`}
                        className="space-x-2 flex font-medium"
                      >
                        <span>Details</span>
                        <ArrowRight />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No graded assignments found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Assignment;
