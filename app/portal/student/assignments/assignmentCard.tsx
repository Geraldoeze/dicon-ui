import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Assignment, AssignmentStatus } from '@/services/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AssignmentCardProps {
  assignment: Assignment;
  status: AssignmentStatus;
}


export function AssignmentCard({ assignment, status }: AssignmentCardProps) {
  const isOverdue = new Date(`${assignment.due_date}T${assignment.due_time}`) < new Date();
  const getAssignmentUrl = (status: string, assignmentId: string) => {
    switch (status) {
      case 'pending':
        return `/portal/student/assignments/pending/${assignmentId}`;
      case 'submitted':
        return `/portal/student/assignments/submitted/${assignmentId}`;
      default:
        return `/portal/student/assignments/${assignmentId}`;
    }
  };
  
  const getButtonText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Submit';
      case 'submitted':
        return 'Edit Submission';
      default:
        return 'View Details';
    }
  };
  
  const url = getAssignmentUrl(status, assignment.id);
  const buttonText = getButtonText(status);
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{assignment.course_code}</h3>
            <p className="text-sm text-muted-foreground">{assignment.course_name}</p>
          </div>
          
          {status === 'graded' && (
            <div className={cn(
              'px-2 py-1 rounded-full text-sm',
              assignment.score >= assignment.pass_mark ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            )}>
              {assignment.score}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent >
        <div className="space-y-3">
          <div className="text-sm">
            Due: {new Date(`${assignment.due_date}T${assignment.due_time}`).toLocaleString()}
            {isOverdue && status === 'pending' && (
                 <span className="text-red-500 ml-2">(Overdue)</span>
              )}
          </div>
          
          <div>
           <a href={url}>
            <Button variant="outline">
              {buttonText}
            </Button>
          </a>
          </div>
          </div>
      </CardContent>
    </Card>
  );
}
