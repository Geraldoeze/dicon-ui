"use client"
import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Search, Filter, Link } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function Classes() {
  const [activeTab, setActiveTab] = useState('videos')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('course')


  
  const upcomingClasses = [
    {
      id: '1',
      code: 'ELE 321',
      subject: 'Electricity & power',
      lecturer: 'Prof Aiyede',
      time: '13:00',
      date: 'Today',
      status: 'active'
    },
    {
      id: '2',
      code: 'CVE 499',
      subject: 'Electricity & power',
      lecturer: 'Prof Aiyede',
      time: '15:00',
      date: 'Today',
      status: '2 hrs left'
    },
    {
      id: '3',
      code: 'TME 761',
      subject: 'Electricity & power',
      lecturer: 'Prof Aiyede',
      time: '13:00',
      date: 'Tomorrow',
      status: 'upcoming'
    },
    {
      id: '4',
      code: 'TCE 425',
      subject: 'Electricity & power',
      lecturer: 'Prof Aiyede',
      time: '13:00',
      date: '5th Feb 2025',
      status: 'upcoming'
    }
  ]

  const videoLessons = [
    {
      id: '1',
      code: 'ELE 321',
      subject: 'Electricity & power',
      topic: 'Topic which was treated in the video',
      thumbnail: 'https://img.youtube.com/vi/40agWVHAENw?si=5pSQlaWNs_XVV-k0/hqdefault.jpg',
      uploadedTime: '3 hrs ago',
      time: '13:00'
    },
    {
      id: '2',
      code: 'CVE 781',
      subject: 'Construction',
      topic: 'Topic which was treated in the video',
      thumbnail: 'https://img.youtube.com/vi/40agWVHAENw?si=5pSQlaWNs_XVV-k0/hqdefault.jpg',
      uploadedTime: '4 hrs ago',
      time: '15:00'
    },
    {
      id: '3',
      code: 'TIE 552',
      subject: 'Industrial Eng',
      topic: 'Topic which was treated in the video',
      thumbnail: 'https://img.youtube.com/vi/40agWVHAENw?si=5pSQlaWNs_XVV-k0/hqdefault.jpg',
      uploadedTime: '3 days ago',
      time: '10:00'
    },
    {
      id: '4',
      code: 'PET 711',
      subject: 'Petroleum',
      topic: 'Topic which was treated in the video',
      thumbnail: 'https://img.youtube.com/vi/40agWVHAENw?si=5pSQlaWNs_XVV-k0/hqdefault.jpg',
      uploadedTime: '3 days ago',
      time: '14:00'
    }
  ]

  // Filtering logic
  const filteredUpcomingClasses = upcomingClasses.filter(lesson => {
    const matchesSearch = lesson.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  const filteredVideoLessons = videoLessons.filter(video => {
    const matchesSearch = video.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  // Sorting logic based on filter type
  const sortedUpcomingClasses = filterType === 'course'
    ? filteredUpcomingClasses
    : [...filteredUpcomingClasses].sort((a, b) => {
        // Convert time to 24-hour format for proper sorting
        const timeToMinutes = (time: string) => {
          const [hours, minutes] = time.split(':').map(Number)
          return hours * 60 + (minutes || 0)
        }
        return timeToMinutes(a.time) - timeToMinutes(b.time)
      })

  const sortedVideoLessons = filterType === 'course'
    ? filteredVideoLessons
    : [...filteredVideoLessons].sort((a, b) => {
        const timeToMinutes = (time: string) => {
          const [hours, minutes] = time.split(':').map(Number)
          return hours * 60 + (minutes || 0)
        }
        return timeToMinutes(a.time) - timeToMinutes(b.time)
      })

  // Dynamic header text
  const headerText = {
    'upcoming': 'Classes',
    'videos': 'Video Links',
    'uploads': 'New Uploads'
  }

  const headerSubtext = {
    'upcoming': 'This includes upcoming lectures scheduled to happen',
    'videos': 'Browse through recorded video lessons',
    'uploads': 'Recently uploaded video content'
  }

  return (
    <div className="min-h-screen max-w-[70vw] mx-auto mt-24 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {headerText[activeTab as keyof typeof headerText]}
        </h1>
        <p className="text-muted-foreground">
          {headerSubtext[activeTab as keyof typeof headerSubtext]}
        </p>
      </div>


      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming classes
              <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-sm">
                {upcomingClasses.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="videos">All video links</TabsTrigger>
            <TabsTrigger value="uploads">
              New uploads
              <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-sm">
                {videoLessons.length}
              </span>
            </TabsTrigger>
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
            
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-white text-gray-700 border-2 border-gray-100 shadow outline-none hover:bg-slate-100'>
              <Filter/>
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterType('course')}>
              By Course
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType('time')}>
              By Time
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      
            
          </div>
        </div>

        <TabsContent value="upcoming" className="grid grid-cols-2 gap-4 my-10">
          {sortedUpcomingClasses.map(lesson => (
            <Card key={lesson.id} className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">{lesson.code}</h3>
              <p className="text-muted-foreground my-4">{lesson.subject}</p>
              
              <div className="text-muted-foreground my-4">
                Lecturer in charge: <span className="text-foreground">{lesson.lecturer}</span>
              </div>
              <hr />
              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{lesson.time}</span>
                  <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
                  <span>{lesson.date}</span>
                </div>
                {lesson.status === 'active' ? (
                  <a href='https://meet.google.com/' className='text-black font-medium'>Join class →</a>
                ) : lesson.status === '2 hrs left' ? (
                  <Button className="bg-orange-100 rounded-full px-3 py-2 text-orange-500">{lesson.status}</Button>
                ) : (
                  <Button variant="outline" disabled className="text-muted-foreground">
                    Join class →
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="grid grid-cols-2 gap-6 my-10">
          {sortedVideoLessons.map(video => (
            <div key={video.id} className="space-y-4">
              <iframe
                src={video.thumbnail}
                className="w-full h-48 object-cover rounded-lg bg-muted"
              />
              <div className='flex justify-between flex-col md:flex-row'>
              <div  className='space-y-4'>
                <h3 className="font-semibold">{video.code}</h3>
                <p className="text-muted-foreground">{video.subject}</p>
                <p className="text-black font-medium text-base">
                <a href={`classes/${video.id}`} className='flex items-center gap-x-2'>
                <Link/>
                  {video.topic}
                </a>
                </p>
                
                </div>

                <Button className=' rounded-full p-2 bg-gray-100'>
            <p className="text-sm text-gray-900 text-muted-foreground">
              Uploaded {video.uploadedTime}
            </p>
            </Button>
             
            
               
              </div>

            </div>
            
          ))}
        </TabsContent>

        <TabsContent value="uploads" className="grid grid-cols-2 gap-6 my-10">
          {sortedVideoLessons.map(video => (
            <div key={video.id} className="space-y-2">
              <iframe
                src={video.thumbnail}
                className="w-full h-48 object-cover rounded-lg bg-muted"
              />
              <div className='flex justify-between mt-2'>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">{video.code}</h3>
                <p className="text-muted-foreground">{video.subject}</p>
                <p className="flex items-center gap-x-2 text-base font-medium text-black">
                  <Link/>
                  {video.topic}
                </p>
              </div>
              <Button className='rounded-full p-2 bg-gray-100'>
                <p className="text-sm text-gray-900 text-muted-foreground">
                  Uploaded {video.uploadedTime}
                </p>
                </Button>
                </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}