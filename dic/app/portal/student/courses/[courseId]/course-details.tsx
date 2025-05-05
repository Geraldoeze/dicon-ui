"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, SlidersHorizontal, Slash } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import { studentService } from '@/services/student.service'
import { Video } from '@/services/types'
import ClassCard from '@/components/ui/ClassCard'
import VideoCard from '@/components/ui/VideoCard'
import { Avatar } from '@/components/ui/avatar'
// Types
interface CourseDetails {
  course_code: string
  name: string
  description: string
  lecturer_in_charge: string
  created_at: string
  updated_at: string
  program_id: number
}

interface CourseDetailsProps {
  courseId: string
}





// Component
function CourseDetails({ courseId }: CourseDetailsProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'videos'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')

  // Queries
  const { data: courseDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['course-details', courseId],
    queryFn: () => studentService.getCourseDetails(courseId)
  })

  const { data: classesData, isLoading: isLoadingClasses } = useQuery({
    queryKey: ['course-classes', courseId],
    queryFn: () => studentService.getClasses()
  })

  const { data: videosData, isLoading: isLoadingVideos } = useQuery({
    queryKey: ['course-videos', courseId],
    queryFn: () => studentService.getCourseVideos(courseId)
  })

  // Filtered Data
  const filteredClasses = classesData?.data?.filter(classItem => 
    classItem.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.course_code?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredVideos = videosData?.data?.filter((video: Video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.topic_name.toLowerCase().includes(searchQuery.toLowerCase())
  )




  // UI Components
  const CourseHeader = () => (
    <div className="flex items-center justify-between flex-col-reverse md:flex-row my-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">{courseDetails?.data.name}</h1>
        {/* <p className="text-muted-foreground">{courseDetails?.data.description}</p> */}
      </div>
      <Button className="hidden md:flex px-2 py-3 bg-gray-100 items-center space-x-1 rounded-full">
        <span className='text-black'>Lecturer : </span>
      {/* <Avatar className='w-20 h-20'>
              <AvatarImage src={courseDetails?.data.lecturer_in_charge || ""} alt={user?.first_name || ""} />
              <AvatarFallback className="text-black">{user?.first_name?.charAt(0) || "A"}</AvatarFallback>
      </Avatar> */}
        {/* <Image
          src="/male.png"
          alt={courseDetails?.data.lecturer_in_charge || 'Lecturer'}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        /> */}
        <span className='text-gray-700'>{courseDetails?.data.lecturer_in_charge}</span>
      </Button>
    </div>
  )

  

  
  if (isLoadingDetails) {
    return <div>Loading course details...</div>
  }

  return (
    <div className="space-y-10 min-h-screen relative">
      <div className="border-b-2 border-gray-300 p-5">
        <div className="flex items-center gap-4 max-w-[85vw] mx-auto">
          <Link href="/portal/student/courses" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2 text-black" />
            <span className='text-black font-medium text-[.75rem] md:text-[1.125]'>Back</span>
          </Link>
          <div className="text-muted-foreground border-s-2 border-gray-700 px-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/portal/student/courses" className='text-black text-[.75rem] md:text-[1.125] font-medium'>
                    Courses
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash/>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-lg font-medium text-gray-500'>
                    {courseDetails?.data?.course_code}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="md:max-w-[70vw] md:mx-auto">
    
          <Card className="my-5 shadow-none border-none bg-transparent">
          <CourseHeader />
            <h2 className="text-lg font-semibold my-2">Course description</h2>
            <p className="text-muted-foreground">{courseDetails?.data.description}</p>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between flex-col md:flex-row my-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming classes</TabsTrigger>
                <TabsTrigger value="videos">Video lessons</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-4 my-5">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search" 
                    className="pl-8 outline-none" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="upcoming" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {isLoadingClasses ? (
                <p>Loading classes...</p>
              ) : filteredClasses?.length == 0 ? <p className='text-center'>No upcoming classes found </p> : filteredClasses?.map(classItem => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </TabsContent>

            <TabsContent value="videos" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoadingVideos ? (
                <p>Loading videos...</p>
              ) : filteredVideos?.length == 0 ? <p className='text-center'> No listed videos </p> :
               filteredVideos?.map((video: Video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails