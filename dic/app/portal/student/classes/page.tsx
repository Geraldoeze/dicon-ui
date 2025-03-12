"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { studentService } from '@/services/student.service';
import { Video } from '@/services/types';
import ClassCard from '@/components/ui/ClassCard';
import VideoCard from '@/components/ui/VideoCard';

function Classes() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'videos' | 'uploads'>('videos');
  const [searchQuery, setSearchQuery] = useState('');
  //const [filterType, setFilterType] = useState<'course' | 'time'>('course');

  const { data: classesData, isLoading: isClassesLoading } = useQuery({
    queryKey: ['classes', 'upcoming'],
    queryFn: () => studentService.getClasses(),
    enabled: activeTab === 'upcoming'
  });

  const { data: videosData, isLoading: isVideosLoading } = useQuery({
    queryKey: ['classes', 'videos'],
    queryFn: () => studentService.getAllVideos(),
    enabled: activeTab === 'videos'
  });

  const { data: uploadsData, isLoading: isUploadsLoading } = useQuery({
    queryKey: ['classes', 'uploads'],
    queryFn: () => studentService.getAllVideos(),
    enabled: activeTab === 'uploads'
  });

  const filteredClasses = classesData?.data?.filter(classItem => 
    classItem.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.course_code?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredVideos = videosData?.data?.filter((video: Video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.topic_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredUploads = uploadsData?.data?.filter((upload: Video) =>
    upload.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    upload.topic_name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  


  const headerText = {
    'upcoming': 'Classes',
    'videos': 'Video Links',
    'uploads': 'New Uploads'
  };

  const headerSubtext = {
    'upcoming': 'View your upcoming and ongoing classes',
    'videos': 'Browse through recorded video lessons',
    'uploads': 'Recently uploaded video content'
  };

  // Handle the data structure correctly
  // const classes = Array.isArray(classesData?.data) ? classesData.data : [];
  // const videos = Array.isArray(videosData?.data) ? videosData.data : [];
  // const uploads = Array.isArray(uploadsData?.data) ? uploadsData.data : [];

  // const filteredClasses = filterData(classes);
  // const filteredVideos = filterData(videos);
  // const filteredUploads = filterData(uploads);

  return (
    <div className="max-w-[85vw] md:max-w-[70vw] mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {headerText[activeTab]}
        </h1>
        <p className="text-gray-500">
          {headerSubtext[activeTab]}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 ">
        <div className="xl:flex flex-col lg:flex-row items-center justify-between space-y-5 md:space-y-5">
          <TabsList className='bg-[#F7F9FC] min-h-fit w-full max-w-fit flex items-center justify-around md:justify-start overflow-x-auto'>
            <TabsTrigger value="upcoming">
              Upcoming classes
              <span className="bg-gray-100 px-2 py-0.5 ml-2 rounded-full text-sm">
                {classesData?.data.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="videos">All video links</TabsTrigger>
            <TabsTrigger value="uploads">
              New uploads
              <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-sm">
                {uploadsData?.data.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="pl-9 w-56 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TabsContent value="upcoming" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {isClassesLoading ? (
            <div>Loading...</div>
          )  : filteredClasses?.length === 0 ? <p>No upcoming classes found</p> 
           :  (
            filteredClasses?.map((classItem) => (
              <ClassCard 
                key={`class-${classItem.id}`} 
                classItem={classItem} 
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="videos" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {isVideosLoading ? (
            <div>Loading...</div>
          ) :  filteredVideos?.length === 0 ? <p>No videos found</p> :
          (
            filteredVideos?.map((video, index) => (
              <VideoCard 
                key={`video-${video.course_id}-${video.topic_id}-${index}`} 
                video={video} 
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="uploads" className="grid grid-cols-2 gap-4">
          {isUploadsLoading ? (
            <div>Loading...</div>
          ) : filteredUploads?.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-gray-500">No uploads found</div>
          ) : (
            filteredUploads?.map((video, index) => (
              <VideoCard 
                key={`upload-${video.course_id}-${video.topic_id}-${index}`} 
                video={video}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Classes;