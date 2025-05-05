"use client"
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Loader2, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { staffService } from "@/services/staff.service";
import VideoCard from "@/components/ui/VideoCard";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface CourseDetailsProps {
  courseId: string;
}

interface Student {
  student_id: string;
  student_name: string;
  department: string;
  student_email: string;
}

// Add Topic interface
interface Topic {
  id: number;
  name: string;
  description?: string;
}

interface CourseDetails {
  id: number,
  name: string,
  description: string,
  created_at: Date,
  updated_at: Date,
  program_id: number,
  lecturer_in_charge: string,
  topics: Topic
}

interface Video {
  course_id: string;
  topic_id: string;
  title: string;
  upload_date: string;
}

interface UploadVideoForm {
  title: string;
  topic: number;
  video_url: string;
}

function normalizeResponse<T>(response: T | { data: T }): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response;
}

const CourseDetails = ({ courseId }: CourseDetailsProps) => {
  const [activeTab, setActiveTab] = useState("student");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadVideoForm>();

  // Query hooks
  const { data: courseDetails } = useQuery({
    queryKey: ["course-details", courseId],
    queryFn: async () => {
      const response = await staffService.getCourseDetails(courseId);
      return normalizeResponse(response);
    },
  });

  const { data: students, isLoading: isStudentsLoading, isError: isStudentsError } = useQuery({
    queryKey: ["course-details", courseId, "students"],
    queryFn: async () => {
      const response = await staffService.getCourseStudents(courseId);
      return normalizeResponse(response);
    },
    enabled: activeTab === "student",
  });

  const { data: videos, isLoading: isVideosLoading } = useQuery({
    queryKey: ["course-details", courseId, "videos"],
    queryFn: async () => {
      const response = await staffService.getCourseVideos(courseId);
      return normalizeResponse(response);
    },
    enabled: activeTab === "videos",
  });

  // Mutation hook for video upload
  const uploadVideoMutation = useMutation({
    mutationFn: (data: UploadVideoForm) => {
      return staffService.uploadVideoLink({
        ...data,
        course_id: Number(courseId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-details", courseId, "videos"] });
      setIsDialogOpen(false);
      setIsSuccessOpen(true);
    },
  });

  const onSubmit = async (data: UploadVideoForm) => {
    uploadVideoMutation.mutate(data);
  };

  // Filter students based on search query
  const filteredStudents = students?.filter((student: Student) =>
    student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const router = useRouter();

  // const topicsObject = courseDetails?.topic;
  // const topicsArray = topicsObject ? Object.keys(topicsObject) : [];
  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="py-3 md:py-5 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      
      <div className="max-w-[90%] mx-auto bg-white rounded-lg shadow">
        <div className="p-8">
          {/* Header Section */}
          <div className="flex justify-between gap-y-3 md:gap-y-0 items-start flex-wrap mb-8">
            <div>
              <h1 className="text-2xl font-bold">{courseDetails?.name || "Loading..."}</h1>
              {/* <p className="text-gray-600">{courseDetails?.description}</p> */}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-700 text-white hover:bg-indigo-800 flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload video link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Video Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Video Title</Label>
              <Input
                id="title"
                placeholder="Enter the video title"
                {...register("title", { required: "Title is required" })}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
              id="topic"
              placeholder="Enter the Topic"
              {...register("topic", {required: "Topic is required"})}
              className={errors.topic ? "border-red-500" : ""}/>
              {/* <Select
                onValueChange={(value) => {
                  // Update the form with the selected value
                  register("topic").onChange({
                    target: { value, name: "topic" },
                  });
                }}
              >
                <SelectTrigger
                  className={errors.topic ? "border-red-500" : ""}
                  id="topic"
                >
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Security and Privacy">
                    Security and Privacy
                  </SelectItem>
                  <SelectItem value="Undertanding Terrorism">
                    Undertanding Terrorism
                  </SelectItem>
                  {/* {topicsArray.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic}
                    </SelectItem>
                  ))} 
                </SelectContent>
              </Select> */}
              {errors.topic && (
                <p className="text-red-500 text-sm">{errors.topic.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video Link</Label>
              <Input
                id="video_url"
                placeholder="Enter the video URL"
                {...register("video_url", {
                  required: "Video URL is required",
                  // pattern: {
                  //   value: /^https?:\/\/.+/,
                  //   message: "Please enter a valid URL",
                  // },
                })}
                className={errors.video_url ? "border-red-500" : ""}
              />
              {errors.video_url && (
                <p className="text-red-500 text-sm">{errors.video_url.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
          <Button
              type="submit"
              className="bg-indigo-700 w-full"
              disabled={uploadVideoMutation.isPending}
            >
              {uploadVideoMutation.isPending ? "Uploading..." : "Upload Video"}
            </Button>
            {/* <Button
              type="submit"
              className="bg-indigo-700 w-full"
              disabled={uploadVideoMutation.isPending}
            >
              {uploadVideoMutation.isPending ? "Uploading..." : "Upload Video"}
            </Button> */}

            <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Video</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              The video has been uploaded successfully
            </DialogDescription>
            <button onClick={() => setIsSuccessOpen(false)}>Close</button>
          </DialogContent>
        </Dialog>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
          </div>

          {/* Course Description
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Course Description</h2>
            <p className="text-gray-700">{courseDetails?.description || "A dummy course description..."}</p>
            <hr className="my-6" />
          </div>
           */}

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="student">Students</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>

              <div className="flex items-center flex-wrap gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>By Name</DropdownMenuItem>
                    <DropdownMenuItem>By Department</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
            </div>

            {/* Students Tab Content */}
            <TabsContent value="student">
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Matric No</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isStudentsLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : isStudentsError ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-red-500">
                          Error loading students
                        </TableCell>
                      </TableRow>
                    ) : filteredStudents?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                          No students found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents?.map((student: Student) => (
                        <TableRow key={student.student_id}>
                          <TableCell>{student.student_name}</TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.student_id}</TableCell>
                          <TableCell>{student.student_email}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Videos Tab Content */}
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isVideosLoading ? (
                  <div className="col-span-full flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : videos?.length === 0 ? (
                  <div className="col-span-full text-center text-gray-500">
                    No videos found
                  </div>
                ) : (
                  videos?.map((video: Video, index: number) => (
                    <VideoCard
                      key={`${video.course_id}-${video.topic_id}-${index}`}
                      video={video}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;