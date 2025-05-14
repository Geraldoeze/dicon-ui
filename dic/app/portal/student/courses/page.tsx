"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
//import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, Clock, GraduationCap, Loader2 } from "lucide-react";
import { studentService } from "@/services/student.service";
import { Course } from "@/services/types";
import { StatsCard, CourseFilters, ActionButton } from "./courseComponents";
import { TokenService } from "@/services/auth/tokenService";
// import { useGetCourses } from '@/app/state/store/courses.store';
// import { CustomFilter } from '@/proto/filter';

export default function Courses() {
  const [selectedTab, setSelectedTab] =
    useState<Course["status"]>("registered");
  const [searchQuery, setSearchQuery] = useState("");
  // const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  // const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set());
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
  //const router = useRouter();
  const queryClient = useQueryClient();
  const user = TokenService.getCachedUserData();

  // const [filter, setFilter] = useState<CustomFilter>({
  //   page: 1,
  //   course_type: 'unregistered',
  //   lecturer_id: '',
  //   student_id: '1',
  //   session: '',
  //   unit: '',
  //   search: searchQuery
  // });

  // const handleFilterChange = (newFilter: Partial<CustomFilter>) => {
  //   setFilter(prev => ({
  //     ...prev,
  //     ...newFilter
  //   }));
  // };

  // const handleTabChange = (value: string) => {
  //  setSelectedTab(value as Course['status']);
  //  handleFilterChange({ course_type: value });
  // };

  // const { data: coursesData, isLoading: isCoursesLoading, isError: isCoursesError } = useGetCourses(filter);

  // const {data: coursesData, isLoading: isCoursesLoading, isError: isCoursesError} = useGetCourses(
  //   {page: 1,
  //   course_type: selectedTab,
  //   lecturer_id: '',
  //   student_id: '1',
  //   session: '',
  //   unit: '',
  //   search: searchQuery})

  // Fetch courses based on status
  const {
    data: coursesData,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ["courses", selectedTab, searchQuery, user?.id],
    queryFn: () => {
      switch (selectedTab) {
        case "registered":
          return studentService.getRegisteredCourses({
            student_id: user?.id,
            page: 1,
            page_size: 20
          });
        // case "unregistered":
        //   return studentService.getUnregisteredCourses({
        //     student_id: user?.id,
        //     course_type: "unregistered",
        //   });
        // case "carryover":
        //   return studentService.getCourses({
        //     status: "carryover",
        //     student_id: user?.id,
        //   });
        default:
          return studentService.getCourses({ student_id: user?.id });
      }
    },
  });

  console.log(coursesData, user.id)

  // Fetch stats data
  const { data: dashboard } = useQuery({
    queryKey: ["studentDashboard"],
    queryFn: () => studentService.studentDashboard(),
  });

  // Register course mutation
  const registerCourseMutation = useMutation({
    mutationFn: (courseId: string) => studentService.registerCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["registeredCourses"] });
    },
    onError: (error) => {
      console.error("Failed to register course:", error);
    },
  });

  const retakeCourseMutation = useMutation({
    mutationFn: (courseId: string) => studentService.retakeCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["registeredCourses"] });
    },
    onError: (error) => {
      console.error("Failed to retake course:", error);
    },
  });
  console.log();
  const statsCards = [
    {
      title: "Registered Courses",
      value: dashboard?.data?.registered_courses || 0,
      description: "Courses you are currently enrolled in",
      icon: Book,
      className: "bg-green-100 text-black border-s-2 border-green-400"
    },
    {
      title: "Pending Assignments",
      value: dashboard?.data?.pending_assignments || 0,
      description: "Assignments you have not turned in",
      icon: Clock,
      className: "bg-yellow-100 text-black border-s-2 border-yellow-300",
    },
    {
      title: "New Classes",
      value: dashboard?.data?.new_classes || 0,
      description: "Lessons you have not seen yet",
      icon: GraduationCap,
      className: "bg-blue-100 text-black border-s-2 border-blue-300",
    },
  ];

  // Filter courses based on active filters and search
  const filteredCourses: Course[] | undefined = coursesData?.data?.filter(
    (course) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        Object.entries(course).some(
          ([, value]) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchLower)
        );

      // // Column filters
      // const matchesFilters = activeFilters.every(filter => {
      //   const value = course[filter.column as keyof Course];
      //   return !filter.value ||
      //     (typeof value === 'string' && value.toLowerCase().includes(filter.value.toLowerCase()));
      // });

      return matchesSearch;
      //&& matchesFilters;
    }
  );

  // const handleFilterChange = useCallback((filters: Filter[]) => {
  //   setActiveFilters(filters);
  // }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCourseAction = async (
    courseId: string,
    status: Course["status"]
  ) => {
    setLoadingCourseId(courseId);
    try {
      if (status === "carryover") {
        await retakeCourseMutation.mutateAsync(courseId);
      } else if (status === "unregistered") {
        await registerCourseMutation.mutateAsync(courseId);
      }
    } finally {
      setLoadingCourseId(null);
    }
  };
  // const handleSelectAll = (checked: boolean) => {
  //   if (checked && filteredCourses) {
  //     setSelectedCourses(new Set(filteredCourses.map(course => course.course_id)))
  //   } else {
  //     setSelectedCourses(new Set())
  //   }
  // }

  //  const handleSelectCourse = (courseId: number, checked: boolean) => {
  //   const newSelected = new Set(selectedCourses)
  //   if (checked) {
  //     newSelected.add(courseId)
  //   } else {
  //     newSelected.delete(courseId)
  //   }
  //   setSelectedCourses(newSelected)
  // }

  // const handleAction = async (courseId: number, status: string) => {
  //   switch (status) {
  //     case 'registered':
  //       router.push(`/portal/student/courses/${courseId}`)
  //       break
  //     case 'unregistered':
  //       registerCourseMutation.mutate(courseId.toString())
  //       break
  //     case 'carryover':
  //       registerCourseMutation.mutate(courseId.toString())
  //       break
  //   }
  // }

  return (
    <div className="md:max-w-[80vw] w-full md:mx-auto relative">
      <div className="space-y-10 min-h-screen relative">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 md:border-b-2 py-4">
          {statsCards.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <Card className="border-none rounded-none">
          <CardContent className="pt-6">
            <Tabs
              value={selectedTab}
              onValueChange={(value) =>
                setSelectedTab(value as Course["status"])
              }
              className="w-full border-none"
            >
              <div className="xl:flex flex-col lg:flex-row items-center justify-between space-y-5 md:space-y-5">
                <TabsList className="bg-[#F7F9FC] min-h-fit w-full max-w-fit flex items-center justify-around overflow-x-auto">
                  <TabsTrigger
                    value="registered"
                    className={`${
                      selectedTab === "registered" ? "bg-slate-500" : ""
                    }`}
                  >
                    My courses
                  </TabsTrigger>
                  {/* <TabsTrigger value="unregistered" className={`${selectedTab === 'unregistered' ? 'bg-slate-500' : ''}`}>
                    Register courses
                  </TabsTrigger>
                  <TabsTrigger value="carryover" className={`${selectedTab === 'carryover' ? 'bg-slate-500' : ''}`}>
                    Carry-over courses
                  </TabsTrigger> */}
                </TabsList>

                <CourseFilters
                  // onFilterChange={handleFilterChange}
                  // currentFilters={filter}
                  onSearchChange={handleSearchChange}
                  searchQuery={searchQuery}
                />
              </div>

              {/* Table Content */}
              <div className="rounded-md border mt-4">
                <Table>
                  <TableHeader className="bg-[#F7F9FC] text-[.8rem] lg:text-[1rem]">
                    <TableRow>
                      {/* 
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={filteredCourses?.length === selectedCourses.size}
                          onCheckedChange={handleSelectAll}
                        /> 
                      </TableHead> 
                      */}
                      <TableHead>Course Name</TableHead>
                      <TableHead>Course Units</TableHead>
                      <TableHead>Lecturer</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isCoursesLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : isCoursesError ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-24 text-center text-red-500"
                        >
                          Error loading courses. Please try again.
                        </TableCell>
                      </TableRow>
                    ) : !filteredCourses?.length ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No courses found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCourses.map((course) => (
                        <TableRow key={course.course_id}>
                          {/* <TableCell>
                            <Checkbox 
                              checked={selectedCourses.has(course.course_id)}
                              onCheckedChange={(checked) => 
                                handleSelectCourse(course.course_id, checked as boolean)
                              }
                            />
                          </TableCell> */}
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {course.course_code}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {course.course_name}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{course.units} units</TableCell>
                          <TableCell>{course.lecturer_in_charge}</TableCell>
                          <TableCell>
                            <ActionButton
                              status={selectedTab}
                              courseId={course.course_id}
                              loadingCourseId={loadingCourseId}
                              onAction={async () => {
                                await handleCourseAction(
                                  course.course_id,
                                  selectedTab
                                );
                              }}
                              disabled={
                                registerCourseMutation.isPending ||
                                retakeCourseMutation.isPending
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
