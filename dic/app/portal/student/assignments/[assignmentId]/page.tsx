'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { studentService } from '@/services/student.service';
import { Badge } from '@/components/ui/badge';
import AssignmentHeader from '../assignmentHeader';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { use } from 'react';

const DUMMY_DESCRIPTION = `Complete a comprehensive analysis of international trade policies and their impact on developing economies. Your assignment should include:

1. Analysis of current trade barriers and their effects
2. Evaluation of free trade agreements
3. Case studies of successful economic policies
4. Recommendations for policy improvements

Please ensure to cite relevant sources and include statistical data to support your arguments.`;

const GradedAssignment = ({ params }: { params: Promise<{ assignmentId: string }> }) => {
  const { assignmentId } = use(params);

  const { data: assignment, isLoading } = useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: () => studentService.getAssignment(assignmentId),
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!assignment) return <div className="text-center py-8">Assignment not found</div>;

  const isPassed = assignment.data.score !== null && assignment.data.score >= assignment.data.pass_mark;

  return (
    <>
      <Card className="border-none max-w-[80vw] mx-auto">
        <CardHeader>
          <AssignmentHeader assignment={assignment.data} />
        </CardHeader>
        <CardContent className="space-y-10 max-w-[70vw] mx-auto">
          <div>
            <h3 className="text-lg font-semibold mb-3">Assignment description</h3>
            <p className="text-gray-700 whitespace-pre-line">{DUMMY_DESCRIPTION}</p>
          </div>

          <div className="flex gap-5 flex-col md:flex-row">
          <div className='flex-1'>
            <h3 className="text-lg font-semibold mb-3">Grade Details</h3>
             <p className="text-gray-600 mb-4 max-w-md">
              This is your assignment submission result.
            </p>
            </div>


            <div className="flex-1 p-6 bg-slate-50 rounded-lg space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Submitted on: {new Date(assignment.data.due_date).toLocaleDateString()}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Time: {new Date(assignment.data.due_time).toLocaleTimeString()}
                    </span>
                  </div> */}
                </div>
                <Badge 
                  variant={isPassed ? "default" : "destructive"}
                  className={`flex items-center gap-2 px-4 py-2 ${isPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <span className="text-lg font-medium">{assignment.data.score}%</span>
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Pass mark:</span>
                <span className="font-medium">{assignment.data.pass_mark}%</span>
              </div>
              
              <div className="pt-4 border-t">
                <a 
                  href={assignment.data.submission_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline block"
                >
                  View submitted assignment
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default GradedAssignment;