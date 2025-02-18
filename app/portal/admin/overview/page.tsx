"use client"

import {useState, useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { Menu, User, GroupIcon, ArrowRight, GraduationCap, Search, Filter, Loader2} from 'lucide-react';
import { StatsCard } from '../../student/courses/courseComponents';
import { Dashboard, Department } from '@/services/types';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
function Overview() {
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
    const [department, setDepartment] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);

    // const { data: applications, isLoading: applicationsLoading, isError: loadingError } = useQuery({
    //     queryKey: ['department'],
    //     queryFn: () => adminService.getApplications()
    // })

    useEffect(() => {
        // Fetch data from the API
        Promise.all([
            fetch('https://dic.0ps.tech/api/dashboard').then(response => response.json()),
            fetch('https://dic.0ps.tech/api/department').then(response => response.json()),
            fetch('https://dic.0ps.tech/api/applications').then(response => response.json())
        ])
        .then(([dashboardData, departmentData, applicationsData]) => {
            setDashboard(dashboardData[0]);
            setDepartment(departmentData);
            setApplications(applicationsData);
           
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    // const { data: students } = useQuery({
    //     queryKey: ['students'],
    //     queryFn: () => adminService.getTotalStudents()
    // })

    // const { data: staffs } = useQuery({
    //     queryKey: ['staffs'],
    //     queryFn: () => adminService.getTotalStaffs()
    // })

    const statsCards = [
        {
          title: "Pending Applications",
          value: dashboard?.pending_applications,
          description: "Applications you have not attended to",
          icon: Menu,
          className: "bg-green-100 text-green-400 border-s-2 border-green-400"
        },
        {
          title: "Students",
          value: dashboard?.active_students,
          description: "Total number of students enrolled in",
          icon: User,
          className: "bg-yellow-100 text-yellow-300 border-s-2 border-yellow-300"
        },
        {
          title: "Staffs",
          value: dashboard?.active_staffs,
          description: "All teaching staff currently active",
          icon: GroupIcon,
          className: "bg-blue-100 text-blue-300 border-s-2 border-blue-300"
        }
      ];

      
      

return (
    <div className='max-w-[80vw] mx-auto p-10 space-y-10'>

                {/* Stats Cards */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:border-b-2 py-4">
                {statsCards.map((stat) => (
                    <StatsCard key={stat.title} {...stat} />
                ))}
                </div>

            <div className="my-5 space-y-5">
                    <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-2">
                                    <h1 className='text-[1.25rem] md:text-[1.5rem]'>Departments</h1>
                                    <span className='p-2 bg-gray-200 rounded-md text-black'>{department?.length}</span>
                            </div>
                            <div className="border-none">
                                    <a href="/portal/admin/departments"><button className='flex items-center gap-x-2'>View all <ArrowRight/></button></a>
                            </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {department?.map((dept) => (
                            <Card key={dept.id} className='py-4 px-2'>
                                    <CardContent className='space-y-3'>
                                     <p className='h-20 min-h-fit text-indigo-900 text-[1rem] md:text-[1.25rem] font-semibold'> <GraduationCap width={30} height={30}/> {dept.name}</p>
                                     <div className='flex items-center justify-between'>
                                        <b>Students: </b>
                                        <span className='text-[1.25rem] md:text-[1.5rem] font-medium'>{dept.total_students}</span> 
                                    </div>
                                     <p className='flex items-center justify-between'><b>HOD:</b><span>Prof Jayelo</span></p>
                                    </CardContent>
                            </Card>
                            ))}
                    </div>
            </div>

            <div className="flex items-center justify-between">
            <h1 className='text-[1.25rem] md:text-[1.5rem]'>Student Applications</h1>
                <div className="flex items-center">
                    <div className="">
                    <div className="relative flex-1 items-center">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-8 bg-[#F7F9FC] placeholder:text-[.8rem] placeholder:lg:text-[1rem]" /></div>
                    </div>
                    <div className="">
                    <Button variant="outline" className="gap-2">
                     <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    </div>
                </div>
            </div>

            <div className="">
            <Table>
                  <TableHeader className='bg-[#F7F9FC] text-[.8rem] lg:text-[1rem]'>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Details</TableHead>
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

                    {applications?.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div> {application.name}</div>
                          </TableCell>
                          <TableCell>{application.course}</TableCell>
                          <TableCell>{application.email}</TableCell>
                          <TableCell>
                              <button>View detials <ArrowRight/></button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
            </div>
    </div>
)
}

export default Overview;