'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Assignment, AssignmentStatus } from '@/services/types';
import { studentService } from '@/services/student.service';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AssignmentCard } from './assignmentCard';

function AssignmentList({ status, searchQuery }: { status: AssignmentStatus; searchQuery: string }) {
  const { data: assignments, isLoading, error } = useQuery({
    queryKey: ['assignments', status],
    queryFn: () => studentService.getAssignments(),
  });

  if (isLoading) return <div className="text-center py-4">Loading assignments...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading assignments</div>;

  const filteredAssignments = assignments?.data.filter((assignment) => {
    const searchString = searchQuery.toLowerCase();
    return (
      assignment.course_code.toLowerCase().includes(searchString) ||
      assignment.course_name.toLowerCase().includes(searchString)
    );
  });

  if (!filteredAssignments?.length) {
    return (
      <div className="text-center py-4">
        {searchQuery ? 'No matching assignments found' : 'No assignments found'}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredAssignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          status={status}
        />
      ))}
    </div>
  );
}

function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<AssignmentStatus>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>
      <Tabs defaultValue="pending" onValueChange={(value) => setActiveTab(value as AssignmentStatus)}>
        <div className="flex justify-between items-center flex-col md:flex-row mb-6">
          <TabsList className="justify-start space-x-2">
            <TabsTrigger value="pending" className="flex items-center">
              Pending
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">5</span>
            </TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>

          <div className="relative w-72">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <TabsContent value="pending">
          <AssignmentList status="pending" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="submitted">
          <AssignmentList status="submitted" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="graded">
          <AssignmentList status="graded" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AssignmentsPage;