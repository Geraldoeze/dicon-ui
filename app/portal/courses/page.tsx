"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book, Clock, GraduationCap, Search, Filter, Loader2, ArrowRight, RotateCw } from "lucide-react"
import { api, Course } from '@/lib/mockapi'


const ActionButton = ({ status, onAction }: { 
  status: 'active' | 'pending' | 'carryover', 
  onAction: () => void 
}) => {
  switch (status) {
    case 'active':
      return (
        <Button 
          variant="ghost" 
          className="text-primary hover:text-primary/80"
          onClick={onAction}
        >
          View details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    case 'pending':
      return (
        <Button 
          variant="secondary"
          className="text-gray-600 hover:text-gray-700"
          onClick={onAction}
        >
          Register
        </Button>
      );
    case 'carryover':
      return (
        <Button 
          variant="secondary"
          className="text-red-600 hover:text-red-700"
          onClick={onAction}
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Retake
        </Button>
      );
  }
};



export default function Courses() {
  const [selectedTab, setSelectedTab] = useState<Course['status']>('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedSemester, setSelectedSemester] = useState<string>('')
  const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set())

  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['courses', selectedTab, searchQuery, selectedDepartment, selectedSemester],
    queryFn: () => api.getCourses({
      status: selectedTab,
      search: searchQuery,
      department: selectedDepartment || undefined,
      semester: selectedSemester || undefined,
    })
  })

  const statsCards = [
    {
      title: "Registered Courses",
      value: data?.courses.filter(c => c.status === 'active').length || '0',
      description: "Courses you are currently enrolled in",
      icon: Book
    },
    {
      title: "Pending Assignments",
      value: "2",
      description: "Assignments you have not turned in",
      icon: Clock
    },
    {
      title: "New Classes",
      value: "2",
      description: "Lessons you have not seen yet",
      icon: GraduationCap
    }
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked && data) {
      setSelectedCourses(new Set(data.courses.map(course => course.id)))
    } else {
      setSelectedCourses(new Set())
    }
  }

  const handleSelectCourse = (courseId: number, checked: boolean) => {
    const newSelected = new Set(selectedCourses)
    if (checked) {
      newSelected.add(courseId)
    } else {
      newSelected.delete(courseId)
    }
    setSelectedCourses(newSelected)
  }




  const router = useRouter();
  const handleAction = (courseId: number, status: 'active' | 'pending' | 'carryover') => {
    switch (status) {
      case 'active':
        console.log('Viewing details for course:', courseId);
         // Navigate to the course details page
         router.push(`courses/${courseId}`);
         
         break;
        break;
      case 'pending':
        console.log('Registering course:', courseId);
        // Implement registration logic
        break;
      case 'carryover':
        console.log('Retaking course:', courseId);
        // Implement retake logic
        break;
    }
  };


  return (
    <div className="max-w-[70vw] mx-auto">
    <div className="space-y-10 min-h-screen relative mt-24 ">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 md:border-b-2 py-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className='border-[1px] md:border-e-2 shadow-none md:border-s-0 md:border-y-0 rounded-none'>
            <CardHeader className="flex flex-row md:items-center gap-x-2 space-y-0 pb-2">
              <stat.icon className="h-6 w-6 text-muted-foreground" />
              <CardTitle className="text-[1rem] md:text-[1.2rem] font-medium">
                {stat.title}
              </CardTitle>
              
            </CardHeader>
            <CardContent className='space-y-6'>
              
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="text-[1.2rem] md:text-[1.75rem] font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Tabs and Tables */}
      <Card>
        <CardContent className="pt-6">
          <Tabs 
            value={selectedTab} 
            onValueChange={(value) => setSelectedTab(value as Course['status'])}
            className="w-full"
          >
            <div className="xl:flex flex-col xl:flex-row items-center justify-between">
            <TabsList className='bg-[#F7F9FC]'>
              <TabsTrigger value="active">My courses</TabsTrigger>
              <TabsTrigger value="pending">Register courses</TabsTrigger>
              <TabsTrigger value="carryover">Carry-over courses</TabsTrigger>
            </TabsList>

            {/* Search and Filter Bar */}
            <div className="my-4 flex items-center justify-around gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-8 bg-[#F7F9FC]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSelectedDepartment('')}>
                    All Departments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDepartment('Electrical Engineering')}>
                    Electrical Engineering
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedSemester('')}>
                    All Semesters
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedSemester('First')}>
                    First Semester
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            </div>

            {/* Table Content */}
            <div className="rounded-md border mt-4">
              <Table>
                <TableHeader className='bg-[#F7F9FC]'>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={data?.courses.length === selectedCourses.size}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Course Units</TableHead>
                    <TableHead>Lecturer</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-red-500">
                        Error loading courses. Please try again.
                      </TableCell>
                    </TableRow>
                  ) : data?.courses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No courses found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedCourses.has(course.id)}
                            onCheckedChange={(checked) => 
                              handleSelectCourse(course.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{course.code}</div>
                            <div className="text-sm text-muted-foreground">
                              {course.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.units} units</TableCell>
                        <TableCell>{course.lecturer}</TableCell>
                        <TableCell>
                        <ActionButton 
                            status={selectedTab} 
                            onAction={() => handleAction(course.id, selectedTab)}
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
  )
}