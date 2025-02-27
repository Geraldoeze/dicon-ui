// components/AssignmentHeader.tsx
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Slash } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Assignment } from '@/services/types';

interface AssignmentHeaderProps {
  assignment: Assignment;
}

const AssignmentHeader = ({ assignment }: AssignmentHeaderProps) => (
  <>
  <div className="flex items-center justify-start gap-4">
  <Link href="/portal/student/assignments" className="flex items-center text-muted-foreground hover:text-foreground">
    <ArrowLeft className="h-4 w-4 mr-2 text-black" />
    <span className='text-black font-medium text-[.75rem] md:text-[1.125]'>Back</span>
  </Link>
  <div className="text-muted-foreground border-s-2 border-gray-700 px-2">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/portal/student/assignments" className='text-black text-[.75rem] md:text-[1.125] font-medium'>
            Assignment
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash/>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className='text-lg font-medium text-gray-500'>
            {assignment.course_code}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</div>
  <div className='pt-10 px-10'>
    <div className="flex justify-between items-center w-full space-y-0 pb-4">
      <div>
        <h2 className="text-xl font-bold">{assignment.title}</h2>
        <p className="text-gray-600">{assignment.description}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Passing grade:</span>
          <Badge variant="default" className="bg-green-100 text-green-800">
            {assignment.pass_mark}%
          </Badge>
        </div>
        <p className="text-sm text-gray-500">
          Due: {new Date(assignment.due_date).toLocaleDateString()} at {assignment.due_time}
        </p>
      </div>
    </div>
  </div>
  </>
);

export default AssignmentHeader;