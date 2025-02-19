
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { studentService } from '@/services/student.service';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AssignmentHeader from '../../assignmentHeader';
import { Calendar, Clock, Link } from 'lucide-react';
import { use } from'react';


const DUMMY_DESCRIPTION = `Complete a comprehensive analysis of international trade policies and their impact on developing economies. Your assignment should include:

1. Analysis of current trade barriers and their effects
2. Evaluation of free trade agreements
3. Case studies of successful economic policies
4. Recommendations for policy improvements

Please ensure to cite relevant sources and include statistical data to support your arguments.`;

const SubmittedAssignment = ({ params }: { params: Promise<{ assignmentId: string }> }) => {
  const { assignmentId } = use(params);
  const router = useRouter();

  const { data: assignment, isLoading } = useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: () => studentService.getAssignment(assignmentId),
  });

  const cancelSubmission = useMutation({
    mutationFn: () => studentService.cancelSubmission(assignmentId),
    onSuccess: () => {
      router.push(`/portal/student/assignments/${assignmentId}/pending`);
    },
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!assignment) return <div className="text-center py-8">Assignment not found</div>;

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
            <h3 className="text-lg font-semibold mb-3">Submitted Assignment</h3>
             <p className="text-gray-600 mb-4 max-w-md">
              If your lecturer insisted on a particular mode of submission, stick to that, otherwise, pick whichever is favourable to you
            </p>
            </div>
            <div className="flex-1 p-6 bg-white rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Submitted on: {new Date(assignment?.data.submission_date!).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Time: {new Date(assignment?.data.submission_date!).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <Badge 
                  variant={assignment.data.due_day_label === 'Past' ? "destructive" : "default"}
                  className="capitalize"
                >
                  {assignment.data.due_day_label}
                </Badge>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <a 
                  href={assignment.data.submission_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex gap-2 mb-4"
                >
                  <Link/>
                  View submitted assignment
                </a>
                <Button 
                  variant="destructive"
                  onClick={() => cancelSubmission.mutate()}
                  className="w-full"
                >
                  Cancel Submission & Resubmit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SubmittedAssignment;