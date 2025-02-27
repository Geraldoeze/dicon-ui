"use client"
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffService } from '@/services/staff.service';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Upload, Check } from 'lucide-react';
import { apiService } from '@/services/api.service';
import { STAFF_ENDPOINTS } from '@/services/config';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';


function normalizeResponse<T>(response: T | { data: T }): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response;
}

const ExamDetails = ({ examId }: { examId: string }) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isPassMarkDialogOpen, setIsPassMarkDialogOpen] = React.useState(false);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = React.useState(false);
  const [passMark, setPassMark] = React.useState('50');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch exam details
  const { data: exam } = useQuery({
    queryKey: ['exam', examId],
    queryFn: async () => {
      const response = await staffService.getExam(examId);
      return normalizeResponse(response);
    }
  });

  // Fetch students
  const { data: students } = useQuery({
    queryKey: ['courseStudents', examId],
    queryFn: async () => {
      const response = await staffService.getCourseStudents(examId);
      return normalizeResponse(response);
    } 
  });

  // Modified mutations to use FormData with exact field names
  const setScoreMutation = useMutation({
    mutationFn: async ({ studentId, score }: { studentId: string, score: number }) => {
      const formData = new FormData();
      formData.append('course_id', examId);
      formData.append('student_id', studentId);
      formData.append('score', score.toString());
      
      return apiService.uploadFormData(STAFF_ENDPOINTS.EXAMS.SETSCORE, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseStudents', examId] });
      setIsScoreDialogOpen(true);
    }
  });

  const setPassMarkMutation = useMutation({
    mutationFn: async (mark: number) => {
      const formData = new FormData();
      formData.append('course_id', examId);
      formData.append('pass_mark', mark.toString());
      
      return apiService.uploadFormData(STAFF_ENDPOINTS.EXAMS.SETMARK, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam', examId] });
      queryClient.invalidateQueries({ queryKey: ['courseStudents', examId] });
      setIsPassMarkDialogOpen(true);
    }
  });

  const uploadQuestionMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('course_id', examId);
      formData.append('exam_question', file);
      
      return apiService.uploadFormData(STAFF_ENDPOINTS.EXAMS.UPLOAD, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam', examId] });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsDialogOpen(true);
    }
  });

  // Handlers
  const handleScoreChange = (studentId: string, score: string) => {
    const numericScore = parseFloat(score);
    if (!isNaN(numericScore)) {
      setScoreMutation.mutate({ studentId, score: numericScore });
    }
  };

  const handleSetPassMark = () => {
    const mark = parseFloat(passMark);
    if (!isNaN(mark)) {
      setPassMarkMutation.mutate(mark);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadQuestionMutation.mutate(file);
    }
  };

  const filteredStudents = students?.filter(student => 
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Set pass mark from exam data when it loads
  React.useEffect(() => {
    if (exam?.passing_percentage) {
      setPassMark(exam.passing_percentage.toString());
    }
  }, [exam]);

  const courseCode = exam?.course_code || '';
  const courseName = exam?.course_name || '';
  const courseDescription = exam?.course_description || '';

  return (
    <div className="bg-slate-50 p-10">
      <Card>
        <CardHeader>
          <CardTitle>{courseCode}</CardTitle>
          <p className="text-gray-500">{courseName}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Course description</h2>
            <p className="text-gray-600">
              {courseDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Upload your exam questions</h3>
              <p className="text-sm text-gray-500 mb-4">This is entirely voluntary but will benefit your students</p>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf"
                  className="hidden"
                />
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Upload className="w-5 h-5" />
                  <span>PDF format • Max. 5MB</span>
                </div>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Upload
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col items-center justify-center py-6">
                  <DialogTitle className="text-center">
                  <Check className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-xl font-semibold text-center">Exam uploaded successfully</p>
                  </DialogTitle>
                  <p className="text-gray-600 text-center mt-2">
                   The question paper has been uploaded.
                  </p>
                  <Button 
                    onClick={() => setIsDialogOpen(false)}
                    className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white"
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Set passing criteria</h3>
              <p className="text-sm text-gray-500 mb-4">This determines if your students pass or fail your course</p>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={passMark}
                  onChange={(e) => setPassMark(e.target.value)}
                  className="w-24"
                />
                <span className="text-gray-500">%</span>
                <Button onClick={handleSetPassMark}>Set</Button>
                
                <Dialog open={isPassMarkDialogOpen} onOpenChange={setIsPassMarkDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col items-center justify-center py-6">
                  <DialogTitle className="text-center">
                  <Check className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-xl font-semibold text-center">The Pass Mark is set!</p>
                  </DialogTitle>
                  <Button 
                    onClick={() => setIsPassMarkDialogOpen(false)}
                    className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white"
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            
                </Dialog>
              </div>

            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Students</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 font-medium">Name</th>
                    <th className="text-left py-4 font-medium">Email</th>
                    <th className="text-left py-4 font-medium">Score</th>
                    <th className="text-left py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents?.map((student) => (
                    <tr key={student.student_id} className="border-b">
                      <td className="py-4">{student.student_name}</td>
                      <td className="py-4">{student.student_email}</td>
                      <td className="py-4 flex items-center">
                        <Input
                          type="number"
                          value={student.score}
                          onChange={(e) => handleScoreChange(student.student_id, e.target.value)}
                          className="w-24"
                        />
                        <span>%</span>

                        <Dialog open={isScoreDialogOpen} onOpenChange={setIsScoreDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col items-center justify-center py-6">
                  <DialogTitle className="text-center">
                  <Check className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-xl font-semibold text-center">Student Score has been set.</p>
                  </DialogTitle>
 
                  <Button 
                    onClick={() => setIsScoreDialogOpen(false)}
                    className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white"
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          student.score >= parseInt(passMark)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.score >= parseInt(passMark) ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamDetails;