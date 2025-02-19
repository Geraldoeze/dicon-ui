import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminService } from '@/services/admin.service';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';
import React from 'react'

const DepartmentDetails = ({ departmentId }: {departmentId: string}) => {


  // const [ data: department] = useQuery({
  //   queryKey: ['departments'],
  //   queryFn: () => adminService.getDepartments()
  // }


  return (
    <div className='bg-slate-50'>
        <div className="max-w-[80vw] mx-auto px-10 py-5 space-y-10">
            <div className="flex items-center justify-between flex-col md:flex-row">
                <div className="">
                    <h1></h1>
                    <p></p>
                </div>
                <div className="">
                    <h1>HOD</h1>
                    <p>Prof Jayelo</p>
                </div>
            </div>

            <div className="">
                <h1>Course Description</h1>
                <p></p>
            </div>

            <hr />

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
           {/* <Table>
                  <TableHeader className='bg-[#F7F9FC] text-[.8rem] lg:text-[1rem]'>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                   {applications ? (
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
                    ) : ( 

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
                */}
            </div>
        </div>  
    </div>
  )
}

export default DepartmentDetails;