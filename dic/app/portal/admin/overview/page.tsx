"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import Link from "next/link";
import {
  Menu,
  User,
  GroupIcon,
  ArrowRight,
  GraduationCap,
  Search,
} from "lucide-react";
import { StatsCard } from "../../student/courses/courseComponents";
//import { Dashboard, Department } from '@/services/types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
// import { Button } from '@/components/ui/button';
import { Application } from "@/services/types";
import { QueryStudentParams } from "@/interface/admin";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

function Overview() {
  // const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  // const [department, setDepartment] = useState<any[]>([]);
  //const [applications, setApplications] = useState<any[]>([]);

  const [queryParams, setQueryParams] = useState<QueryStudentParams>({
    search: "",
    page: 1,
    page_size: 20,
    status: "Pending",
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  // Correctly set up the query
  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications", queryParams],
    queryFn: () => adminService.getApplications(queryParams),
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => adminService.getDashboard(),
  });

  const { data: department } = useQuery({
    queryKey: ["department"],
    queryFn: () => adminService.getDepartments(),
  });

  // const { data: applications } = useQuery({
  //   queryKey: ["applications"],
  //   queryFn: () => adminService.getApplications(),
  // });

  const departmentData = department?.data || [];
  const applicationsData = applications?.data || [];

  const filteredApplications = applicationsData.filter(
    (application: Application) => {
      return (
        application.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.program?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  );

  const statsCards = [
    {
      title: "Pending Applications",
      value: dashboard?.data[0].pending_applications,
      description: "Applications you have not attended to",
      icon: Menu,
      className: "bg-green-100 text-black border-s-2 border-green-400",
    },
    {
      title: "Students",
      value: dashboard?.data[0].active_students,
      description: "Total number of students enrolled in",
      icon: User,
      className: "bg-yellow-100 text-black border-s-2 border-yellow-300",
    },
    {
      title: "Staffs",
      value: dashboard?.data[0].active_staffs,
      description: "All teaching staff currently active",
      icon: GroupIcon,
      className: "bg-blue-100 text-black border-s-2 border-blue-300",
    },
  ];

  //
  const prefetchNextPage = (nextPage: number) => {
    queryClient.prefetchQuery({
      queryKey: ["courses", { ...queryParams, page: nextPage }],
      queryFn: () =>
        adminService.getCourses({ ...queryParams, page: nextPage }),
    });
  };

  const handlePageChange = (page: number) => {
    prefetchNextPage(page + 1);
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="max-w-[90vw] md:max-w-[80vw] mx-auto p-10 space-y-10">
      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:border-b-2 py-4">
        {statsCards.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="my-5 space-y-5">
        <div className="flex items-center justify-between flex-col md:flex-row gap-y-3">
          <div className="flex items-center gap-x-2">
            <h1 className="text-[1.25rem] md:text-[1.5rem]">Departments</h1>
            <span className="p-2 bg-gray-200 rounded-md text-black">
              {department?.data.length}
            </span>
          </div>
          <div className="border-none">
            <Link href="/portal/admin/departments">
              <button className="flex items-center gap-x-2">
                View all <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {departmentData.map((dept) => (
            <Card key={dept.id} className="py-4 px-2">
              <CardContent className="space-y-3">
                <a href={`/portal/admin/departments/${dept.id}`}>
                  <h1 className="h-20 min-h-fit text-indigo-900 text-[1rem] md:text-[1.25rem] font-semibold">
                    {" "}
                    <GraduationCap width={30} height={30} /> {dept.name}
                  </h1>
                </a>
                <div className="flex items-center justify-between flex-col md:flex-row">
                  <b>Students: </b>
                  <span className="text-[1.25rem] md:text-[1.5rem] font-medium">
                    {dept.total_students}
                  </span>
                </div>
                {/* <p className='flex items-center justify-between flex-col lg:flex-row'><b>HOD:</b><span className='w-fit'>{dept.head_of_department}</span></p> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="my-5">
        <CardHeader className="flex items-center justify-between flex-col md:flex-row">
          <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium">
            Student Applications
          </h1>
          <div>
            <div className="relative flex items-center">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-8 bg-[#F7F9FC] placeholder:text-[.8rem] placeholder:lg:text-[1rem]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table className="">
            <TableHeader className="bg-[#F7F9FC] text-[.8rem] lg:text-[1rem]">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {applications ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : loadingError ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-red-500">
                          Error loading courses. Please try again.
                        </TableCell>
                      </TableRow>
                    ) : !applications?.length ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No courses found.
                        </TableCell>
                      </TableRow>
                    ) : ( */}

              {filteredApplications.map((application) => (
                <TableRow
                  key={application.id} className="cursor-pointer"
                  onClick={() =>
                    router.push(`/portal/admin/applications/${application.id}`)
                  }
                >
                  <TableCell>{application.name}</TableCell>
                  <TableCell>{application.program}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell> {application.phone_number} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredApplications?.length === 0 && <p className="my-8 text-center font-medium">No Applicants </p>}
          {!isLoading &&
            applications?.meta &&
            applications?.data?.length > 0 && (
              <Pagination
                currentPage={applications.meta.current_page}
                totalPages={applications.meta.total_pages}
                onPageChange={handlePageChange}
                disabled={isLoading}
              />
            )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Overview;
