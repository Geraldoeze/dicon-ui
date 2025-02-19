'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { studentService } from '@/services/student.service';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import AssignmentHeader from '../../assignmentHeader';


const DUMMY_DESCRIPTION = `Complete a comprehensive analysis of international trade policies and their impact on developing economies. Your assignment should include:

1. Analysis of current trade barriers and their effects
2. Evaluation of free trade agreements
3. Case studies of successful economic policies
4. Recommendations for policy improvements

Please ensure to cite relevant sources and include statistical data to support your arguments.`;

interface DetailsProp { 
  assignmentId: string 
}


const PendingAssignment = ( {assignmentId} : DetailsProp) => {
 
  const router = useRouter();
  
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { data: assignment, isLoading } = useQuery({
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
      router.push(`/portal/student/assignments/${assignmentId}/submitted`);
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
            <div className="flex-1">
            <h3 className="text-lg md:text-2xl font-semibold mb-3">Submission</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              If your lecturer insisted on a particular mode of submission, stick to that, otherwise, pick whichever is favourable to you
            </p>
            </div>
            <div className="space-y-4 p-4 flex-1 bg-slate-50">
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
              </div>

              <div className="text-center">Or</div>

              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".doc,.docx,.pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFile(e.target.files[0]);
                        setSubmissionUrl('');
                      }
                    }}
                  />
                  <Button
                    variant="link"
                    className="text-lg text-indigo-700 text-indigo-700/90"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload/>
                    Click to upload
                  </Button>
                  <p className="text-sm text-gray-500">doc, pdf (max. 800×400px)</p>
                </div>
              </div>
              <div className="flex justify-center">
              <Button 
                className="w-fit bg-indigo-900 text-white bg-indigo-700/50"
                onClick={() => submitMutation.mutate()}
                disabled={!submissionUrl && !file}
              >
                Submit Assignment
              </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};


export default PendingAssignment;