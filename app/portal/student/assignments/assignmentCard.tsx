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
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Due: {new Date(`${assignment.due_date}T${assignment.due_time}`).toLocaleString()}
          </div>
          <Link href={`/assignments/${assignment.id}`}>
            <Button variant="outline">
              {status === 'pending' ? 'Submit' : 'View Details'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
