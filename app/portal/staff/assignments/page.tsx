"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "@/components/ui/tabs";
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Filter, Loader2, ArrowRight, Link, Clock, Calendar } from "lucide-react";
import { staffService } from "@/services/staff.service";

const Assignment = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('graded');

    const { data: pendingAssignments, isLoading: isPendingLoading } = useQuery({
      queryKey: ['pendingAssignments'],
      queryFn: () => staffService.getPendingAssignments(),
      enabled: activeTab === 'pending',
    })

    const { data: gradedAssignments, isLoading: isGradedLoading } = useQuery({
        queryKey: ['assignments'],
        queryFn: () => staffService.getGradedAssignments(),
        enabled: activeTab === 'graded',
      })

  return (
    <div className='p-6 max-w-7xl mx-auto'>
        <div className="flex items-center justify-start md:justify-between flex-col md:flex-row my-5">
            <div className="">
                <h1 className='text-2xl font-semibold text-gray-900'>Assignments</h1>
                <p className='text-gray-600'>Check out your pending and graded assignments</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white hover:bg-gray-300 text-black flex items-center gap-x-5">
             <Plus/>
              Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Assignment</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
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

        <hr />


        <div className="">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between flex-wrap gap-4 my-5">
                <div className="bg-slate-50 px-2 py-1 rounded-md">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="graded">Graded</TabsTrigger>
                </TabsList>
                </div>
                    <div className="flex items-center gap-x-2">
                    <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 bg-slate-50" />
                    <Input
                    placeholder="Search..."
                    className="pl-10 w-64"
                  />
                    </div>
                    <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>By Name</DropdownMenuItem>
                    <DropdownMenuItem>By Department</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
                </div>

                <hr />

                <TabsContent value="pending">
                    {isPendingLoading ? (
                        <Loader2 className="animate-spin h-6 w-6 text-gray-400"/>
                    ) : (
                        pendingAssignments?.data.map((assignment) => (
                    <div key={assignment.id} className="border-e-2 border-b-2 border-gray-100 min-w-[350px] p-5">
                      <div className="flex flex-col space-y-3 my-2">
                        <div className="flex flex-col gap-y-2">
                          <h1 className='text-xl font-semibold'>{assignment.course_code}</h1>
                          <p>{assignment.course_name}</p>
                        </div>
                        <div className="flex justify-between">
                          <span>Mode of Submission</span>
                          <button className="flex gap-x-2 bg-slate-50 rounded-md"><Link/> Google Docs Link</button>
                        </div>
                      </div>
                      <hr />
                      
                      <div className="w-full flex justify-end items-center my-3">
                      {/* <p className='space-x-2 flex'> <Clock/> <span>{assignment.due_time}</span></p>
                      <p className='space-x-2 flex'><Calendar/> <span>{assignment.due_date}</span></p> */}
                      <a href={`/portal/staff/assignments/${assignment.id}`} className='space-x-2 flex font-medium'> <span>Details</span> <ArrowRight/></a>
                      </div> 
                  </div>
                           
                        ))
                    )}
                </TabsContent>
                <TabsContent value="graded">
                {isGradedLoading ? (
                        <Loader2 className="animate-spin h-6 w-6 text-gray-400"/>
                    ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {gradedAssignments?.data.map((assignment) => (

                    <div key={assignment.id} className="border-e-2 border-b-2 border-gray-100 p-5">
                      <div className="flex flex-col space-y-3 my-2">
                        <div className="flex flex-col gap-y-2 my-2">
                          <h1 className='text-xl font-semibold'>{assignment.course_code}</h1>
                          <p>{assignment.course_name}</p>
                        </div>
                        <div className="flex justify-between flex-col md:flex-row my-2">
                          <span>Submission Date:</span>
                          <button className="flex gap-x-2 bg-slate-50 rounded-md">{assignment.submission_date}</button>
                        </div>
                      </div>
                      <hr />
                      <div className="w-full flex justify-between items-center flex-wrap my-3">
                      {/* <p className='space-x-2 flex'> <Clock/> <span>{assignment.due_time}</span></p>
                      <p className='space-x-2 flex'><Calendar/> <span>{assignment.due_date}</span></p> */}
                      <a href={`/portal/staff/assignments/${assignment.id}`} className='space-x-2 flex font-medium'> <span>Details</span> <ArrowRight/></a>
                      </div> 
                  </div>    
                  ))}
                  </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default Assignment