"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, SlidersHorizontal, Clock, Calendar , Slash} from "lucide-react"
// import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

// Types for our data
interface VideoLesson {
  id: string;
  thumbnail: string;
  topic: string;
  uploadedAt: string;
}

interface UpcomingClass {
  id: string;
  title: string;
  subject: string;
  time: string;
  date: string;
  status: 'upcoming' | 'active' | 'completed';
}

interface CourseDetails {
  id: string;
  code: string;
  name: string;
  lecturer: {
    name: string;
    avatar: string;
  };
  description: string;
}

// NEW: Props interface added
interface CourseDetailsProps {
  courseId: string;
}

// CHANGED: Component now uses CourseDetailsProps

export default function CourseDetails({ courseId }: CourseDetailsProps) {
  const [activeTab, setActiveTab] = useState('upcoming')
  // NEW: Added search state
  const [searchQuery, setSearchQuery] = useState('')

  const { data: courseDetails } = useQuery<CourseDetails>({
    queryKey: ['course', courseId],
    queryFn: () => ({
      id: courseId,
      code: 'ELE 321',
      name: 'Electricity & power',
      lecturer: {
        name: 'Prof Aiyede',
        avatar: '/male.png'
      },
      description: 'A dummy course description is a description of a course that teaches how to create a dummy, which is a draft version of a book or other creative work. Dummy courses can teach students how to write and illustrate a book, or how to prepare a dummy for submission to editors or agents'
    })
  })

  const { data: upcomingClasses } = useQuery<UpcomingClass[]>({
    queryKey: ['upcoming-classes', courseId],
    queryFn: () => ([
      {
        id: '1',
        title: 'Voltages',
        subject: 'Electricity & power',
        time: '13:00',
        date: 'Today',
        status: 'active'
      },
      {
        id: '2',
        title: 'Capacitors',
        subject: 'Electricity & power',
        time: '15:00',
        date: 'Today',
        status: 'upcoming'
      },
      {
        id: '3',
        title: 'Inductors',
        subject: 'Electricity & power',
        time: '13:00',
        date: 'Tomorrow',
        status: 'later'
      },
      {
        id: '4',
        title: 'Resistors',
        subject: 'Electricity & power',
        time: '15:00',
        date: '15th Feb, 2025',
        status: 'later'
      }
    ])
  })

  const { data: videoLessons } = useQuery<VideoLesson[]>({
    queryKey: ['video-lessons', courseId],
    queryFn: () => ([
      {
        id: '1',
        thumbnail: 'https://youtu.be/40agWVHAENw?si=NNlhVc6BnSg-GLey',
        topic: 'Topic which was treated in the video',
        uploadedAt: '3 days ago'
      },
      {
        id: '2',
        thumbnail: 'https://youtu.be/40agWVHAENw?si=NNlhVc6BnSg-GLey',
        topic: 'Topic which was treated in the video',
        uploadedAt: '5 days ago'
      }
    ])
  })

  // NEW: Search filter functions
  const filteredUpcomingClasses = upcomingClasses?.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredVideoLessons = videoLessons?.filter(video =>
    video.topic.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-10 min-h-screen relative mt-24">
      <div className="border-b-2 border-gray-300 p-5">
        <div className="flex items-center gap-4 max-w-[85vw] mx-auto">
          <Link href="/portal/courses" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2 text-black" />
            <span className='text-black font-medium text-lg'>Back</span>
          </Link>
          <div className="text-muted-foreground border-s-2 border-gray-700 px-2">
          <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/portal/courses" className='text-black text-lg font-medium'>Courses</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
    <Slash/>
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage className='text-lg font-medium text-gray-500'>Description</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
</div>
          </div>
        </div>
        <div className="max-w-[70vw] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{courseDetails?.code}</h1>
            <p className="text-muted-foreground">{courseDetails?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="px-2 py-3 bg-gray-100 items-center space-x-1 rounded-full">
            <Image
              src={courseDetails?.lecturer.avatar}
              alt={courseDetails?.lecturer.name}
              width={8}
              height={8}
              className="w-8 h-8 rounded-full"
            />
            <span className='text-gray-700'>{courseDetails?.lecturer.name}</span>
            </Button>
          </div>
        </div>

        <Card className="my-5 shadow-none border-none">
          <h2 className="text-lg font-semibold mb-4">Course description</h2>
          <p className="text-muted-foreground">{courseDetails?.description}</p>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming classes</TabsTrigger>
              <TabsTrigger value="videos">Video links</TabsTrigger>
            </TabsList>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                
                <Input 
                  placeholder="Search" 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* CHANGED: Now using filtered results */}
          <TabsContent value="upcoming" className="grid grid-cols-2 gap-4">
            {filteredUpcomingClasses?.map(lesson => (
              <Card key={lesson.id} className="p-6">
                <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                <p className="text-muted-foreground mb-4">{lesson.subject}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{lesson.time}</span>
                    <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
                    <span>{lesson.date}</span>
                  </div>
                  {lesson.status === 'active' ? (
                    <button className='rounded-full py-2 px-3 bg-red-100'>
                    <span className="text-red-500">2 mins left</span>
                    </button>
                  ) : lesson.status === 'upcoming' ? (
                    <button className='rounded-full py-2 px-3 bg-orange-100'>
                    <span className="text-orange-500">2 hrs left</span>
                    </button>
                  ) : (
                    <Button variant="outline" disabled>Join class →</Button>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          
          <TabsContent value="videos" className="grid grid-cols-2 gap-6">
            {filteredVideoLessons?.map(video => (
              <div key={video.id} className="space-y-3">
                <iframe
                  src={video.thumbnail}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p>
                <a href={video.thumbnail} target='_blank' className="font-medium" >{video.topic}</a>
                </p>
                <Button className='rounded-full p-2 bg-gray-100'>
                <p className="text-sm text-gray-900 text-muted-foreground">
                  Uploaded {video.uploadedAt}
                </p>
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        </div>
      
    </div>
  )
}