'use client';

import { use, useState } from 'react';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { studentService } from '@/services/student.service';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const queryClient = new QueryClient();

interface Assignment {
  id: number;
  course_id: number;
  title: string;
  assignment_url: string;
  description: string;
  due_date: string;
  due_time: string;
  pass_mark: number;
  lecturer_in_charge: string;
  course_name: string;
  course_code: string;
  submission_url?: string;
  status: 'pending' | 'submitted' | 'graded';
}

interface AssignmentDetailsProps {
  params: Promise<{ assignmentId: number }>;
}

function AssignmentDetails({ params }: AssignmentDetailsProps) {
  const { assignmentId } = use(params);
  const router = useRouter();
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { data: assignment, isLoading } = useQuery<{ data: Assignment }>({
    queryKey: ['assignment', assignmentId],
    queryFn: () => studentService.getAssignment(assignmentId),
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else if (submissionUrl) {
        formData.append('url', submissionUrl);
      }
      await studentService.submitAssignment(assignmentId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignment', assignmentId] });
      router.push('/assignments');
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setSubmissionUrl('');
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!assignment) return <div className="text-center py-8">Assignment not found</div>;

  const { data: assignmentData } = assignment;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-gray-50">
        <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-4">
          <div>
            <h2 className="text-xl font-bold">{assignmentData.course_code}</h2>
            <p className="text-gray-600">{assignmentData.course_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Passing grade:</span>
            <Badge variant="default" className="bg-green-100 text-green-800">
              {assignmentData.pass_mark} %
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Assignment description</h3>
            <p className="text-gray-700">{assignmentData.description}</p>
          </div>

          {assignmentData.status === 'pending' && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Submission</h3>
              <p className="text-gray-600 mb-4">
                If your lecturer insisted on a particular mode of submission, stick to that, otherwise, pick whichever is favourable to you
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Assignment link</p>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="Google docs link"
                      value={submissionUrl}
                      onChange={(e) => {
                        setSubmissionUrl(e.target.value);
                        setFile(null);
                      }}
                      className="flex-1"
                    />
                    {submissionUrl && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSubmissionUrl('')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Submitted: {assignmentData.due_time}</p>
                </div>

                <div className="text-center">Or</div>

                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <Button
                        variant="link"
                        className="text-primary hover:text-primary/90"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Click to upload
                      </Button>
                      <span className="text-gray-500"> or drag and drop</span>
                    </div>
                    <p className="text-sm text-gray-500">doc, pdf (max. 800×400px)</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".doc,.docx,.pdf"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="text-center">OR</div>

                <Button 
                  className="w-full"
                  variant="outline"
                >
                  Browse Files
                </Button>
              </div>
            </div>
          )}

          {assignmentData.status === 'submitted' && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Submission</h3>
              <div className="p-4 bg-white rounded-lg">
                <a 
                  href={assignmentData.submission_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View submitted assignment
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AssignmentDetails;