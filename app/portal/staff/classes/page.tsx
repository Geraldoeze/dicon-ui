"use client"

import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Calendar, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { staffService } from "@/services/staff.service"
import { Class } from '@/services/types';
interface ScheduleClassForm {
  course_id: string;
  topic_id: string;
  class_link: string;
  start_date: string;
  start_time: string;
}

const ClassDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: () => staffService.getClasses()
  });

  const scheduleMutation = useMutation({
    mutationFn: (data: ScheduleClassForm) => 
      staffService.scheduleClass(data),
    onSuccess: () => {
      setIsDialogOpen(false);
    }
  });

  const handleScheduleClass = (formData: ScheduleClassForm) => {
    scheduleMutation.mutate(formData);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-start md:justify-between items-center flex-col md:flex-row my-7">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Classes</h1>
          <p className="text-gray-600">This includes upcoming lectures scheduled to happen</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-700 hover:bg-indigo-800 text-white justify-start">
              Schedule class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleScheduleClass({
                course_id: formData.get('course_id') as string,
                topic_id: formData.get('topic_id') as string,
                class_link: formData.get('class_link') as string,
                start_date: formData.get('start_date') as string,
                start_time: formData.get('start_time') as string
              });
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="class_link">Class Link</Label>
                <Input id="class_link" name="class_link" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Date</Label>
                  <Input id="start_date" name="start_date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_time">Time</Label>
                  <Input id="start_time" name="start_time" type="time" required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800 text-white">
                Schedule Class
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center flex-col lg:flex-row my-6">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-md px-3 py-1.5 border">
            <span className="font-medium">Upcoming classes</span>
            <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-sm">
              {classes?.data.length || 0}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 my-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes?.data.map((classItem) => (
          <Card key={classItem.id} className="border-2 border-gray-100">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className='mb-5'>
                  <h3 className="text-lg md:text-[1.5rem] font-semibold">{classItem.course_code}</h3>
                  <p className="text-gray-600">{classItem.course_name}</p>
                </div>

                <hr />
                
                <div className="flex items-center justify-start gap-y-2 md:gap-y-0 md:gap-x-5 flex-col lg:flex-row text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {classItem.start_time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Today
                  </div>
                </div>
                
                {classItem.time_left ? (
                  <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-md text-sm">
                    {classItem.time_left} left
                  </div>
                ) : (
                  <Button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700">
                    Join class →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassDashboard;