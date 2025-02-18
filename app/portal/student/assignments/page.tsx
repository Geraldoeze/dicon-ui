'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Assignment, AssignmentStatus } from '@/services/types';
import { studentService } from '@/services/student.service';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';




function AssignmentCard({ assignment, status }: { assignment: Assignment; status: AssignmentStatus }) {
  const isOverdue = new Date(`${assignment.due_date}T${assignment.due_time}`) < new Date();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{assignment.course_code}</h3>
            <p className="text-sm text-muted-foreground">{assignment.course_name}</p>
          </div>
          {status === 'graded' && (
            <div className={`px-2 py-1 rounded-full text-sm ${
              assignment.score >= assignment.pass_mark 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {assignment.score}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              Due: {new Date(`${assignment.due_date}T${assignment.due_time}`).toLocaleString()}
              {isOverdue && status === 'pending' && (
                <span className="text-red-500 ml-2">(Overdue)</span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Link href={`/portal/student/assignments/${assignment.id}`}>
              <Button variant="outline">
                {status === 'pending' ? 'Submit' : 'View Details'}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AssignmentList({ status }: { status: AssignmentStatus }) {
  const { data: assignments, isLoading, error } = useQuery({
    queryKey: ['assignments', status],
    queryFn: () => studentService.getAssignments(),
  });

  if (isLoading) return <div className="text-center py-4">Loading assignments...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading assignments</div>;
  if (!assignments?.data.length) return <div className="text-center py-4">No assignments found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {assignments?.data.map((assignment) => (
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

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>
      <Tabs defaultValue="pending" onValueChange={(value) => setActiveTab(value as AssignmentStatus)}>
        <TabsList className="w-full justify-start space-x-2 mb-6">
          <TabsTrigger value="pending" className="flex items-center">
            Pending
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">4</span>
          </TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <AssignmentList status="pending" />
        </TabsContent>
        <TabsContent value="submitted">
          <AssignmentList status="submitted" />
        </TabsContent>
        <TabsContent value="graded">
          <AssignmentList status="graded" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AssignmentsPage;
