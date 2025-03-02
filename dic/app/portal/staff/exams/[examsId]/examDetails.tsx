"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffService } from '@/services/staff.service';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useUser } from '@/app/userContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { apiService } from '@/services/api.service';
import { STAFF_ENDPOINTS } from '@/services/config';

// Types
interface ExamData {
  exam_id: number;
  department: string;
  lecturer_in_charge: string;
  course_name: string;
  course_code: string;
  course_unit: number;
  course_description: string;
  exam_date: string;
  time_range: string;
  passing_percentage: number;
  total_attempts: number;
  scored_percentage: number;
  question_paper_url?: string;
}

interface StudentResult {
  result_id: number;
  student_name: string;
  lecturer_in_charge: string;
  student_id: number;
  course_id: number;
  course_name: string;
  course_code: string;
  units: number;
  exam_title: string;
  result_date: string;
  student_score: number;
  status: string;
  passing_mark: number;
  student_percentage: number;
  passing_percentage: number;
  question_paper_url?: string;
  student_response_url?: string;
}

// Helper function to normalize API responses
function normalizeResponse<T>(response: T | { data: T }): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response;
}

export default function ExamPage({ examId }: { examId: string }) {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [passMark, setPassMark] = useState('50');
  const [currentScoreUpdate, setCurrentScoreUpdate] = useState<{resultId: number, score: string}>({resultId: 0, score: ''});
  
  // Dialogs state
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPassMarkDialogOpen, setIsPassMarkDialogOpen] = useState(false);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Hooks
  const queryClient = useQueryClient();
  const { user } = useUser();
  const router = useRouter();
  
  const staffId = user?.id || 1;
  
  // Queries
  const { data: exam, isLoading: examLoading } = useQuery({
    queryKey: ['exam', examId, staffId],
    queryFn: async () => {
      const response = await staffService.getExam(examId, staffId);
      return normalizeResponse<ExamData>(response);
    }
  });

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['courseStudents', examId, staffId],
    queryFn: async () => {
      const response = await staffService.getExamResults(examId, staffId);
      return normalizeResponse<StudentResult[]>(response);
    } 
  });

  // Mutations
  const setScoreMutation = useMutation({
    mutationFn: async ({ resultId, score }: { resultId: number, score: number }) => {
      const formData = new FormData();
      formData.append('result_id', resultId.toString());
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
      setIsUploadDialogOpen(true);
    }
  });

  // Effects
  useEffect(() => {
    if (exam?.passing_percentage) {
      setPassMark(exam.passing_percentage.toString());
    }
  }, [exam]);

  // Handlers
  const handleScoreSubmit = (resultId: number, score: string) => {
    const numericScore = parseFloat(score);
    if (!isNaN(numericScore)) {
      setScoreMutation.mutate({ resultId, score: numericScore });
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

  // Filtered students
  const filteredStudents = students?.filter(student => 
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (examLoading || studentsLoading) {
    return <div>Loading...</div>;
  }

  if (!exam) {
    return <div>Exam not found</div>;
  }

  return (
    <div className="bg-slate-50 p-10">
      <Card>
        <div className="py-3 md:py-5 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        <CardHeader>
          <CardTitle>{exam.course_code}</CardTitle>
          <p className="text-gray-500">{exam.course_name}</p>
        </CardHeader>
        <CardContent>
          {/* Course Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Course description</h2>
            <p className="text-gray-600">{exam.course_description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <span className="text-sm text-gray-500">Exam Date</span>
                <p>{exam.exam_date}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Time</span>
                <p>{exam.time_range}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Course Units</span>
                <p>{exam.course_unit}</p>
              </div>
            </div>
          </div>

          {/* Upload & Pass Mark Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                <Button onClick={() => fileInputRef.current?.click()} className='bg-[#2D2F93]'>
                  Upload
                </Button>
              </div>
              
              {exam.question_paper_url && (
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <a href={exam.question_paper_url} target="_blank" rel="noopener noreferrer">
                      View Uploaded Question Paper
                    </a>
                  </Button>
                </div>
              )}
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
                <Button 
                onClick={handleSetPassMark}
                className='bg-[#2D2F93]'>Set</Button>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Current pass mark: <span className="font-semibold">{exam.passing_percentage}%</span>
                </p>
              </div>
            </div>
          </div>

          {/* Students Section */}
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
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 font-medium">Name</th>
                    <th className="text-left py-4 font-medium">Pass Mark</th>
                    <th className="text-left py-4 font-medium">Score</th>
                    <th className="text-left py-4 font-medium">Status</th>
                    {/* <th className="text-left py-4 font-medium">Actions</th> */}
                  </tr>
                </thead>
                <tbody> 
                  {filteredStudents?.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.result_id} className="border-b">
                        <td className="py-4">{student.student_name}</td>
                        <td className="py-4">{student.passing_mark}%</td>
                        <td className="py-4 flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder={student.student_score.toString()}
                            value={currentScoreUpdate.resultId === student.result_id ? currentScoreUpdate.score : ''}
                            onChange = {(e) => setCurrentScoreUpdate({
                              resultId: student.result_id,
                              score: e.target.value
                            })}
                            className="w-24"
                          />
                          <span className="ml-1">%</span>
                          <Button 
                            size="sm"
                            onClick={() => handleScoreSubmit(student.result_id, currentScoreUpdate.score)}
                            className='bg-[#2D2F93]'
                            // disabled={!currentScoreUpdate.score || currentScoreUpdate.resultId !== student.result_id}
                          >
                            Save
                          </Button>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            student.student_score >= student.passing_mark
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.student_score >= student.passing_mark ? 'Passed' : 'Failed'}
                          </span>
                     
                        </td>
                        {/* <td className="py-4">
                         
                          {student.student_response_url && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="ml-2" 
                              asChild
                            >
                              <a href={student.student_response_url} target="_blank" rel="noopener noreferrer">
                                View Submission
                              </a>
                            </Button>
                          )}
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center">
                        No student data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Success Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <Image src="/approve.svg" alt="Success" width={50} height={50} />
            <DialogTitle className="text-center flex justify-center">
              <p className="text-xl font-semibold text-center">Exam uploaded successfully</p>
            </DialogTitle>
            <p className="text-gray-600 text-center mt-2">
              The question paper has been uploaded.
            </p>
            <Button 
              onClick={() => setIsUploadDialogOpen(false)}
              className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pass Mark Dialog */}
      <Dialog open={isPassMarkDialogOpen} onOpenChange={setIsPassMarkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <Image src="/approve.svg" alt="Success" width={50} height={50} />
            <DialogTitle className="text-center">
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

      {/* Score Update Dialog */}
      <Dialog open={isScoreDialogOpen} onOpenChange={setIsScoreDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <Image src="/approve.svg" alt="Success" width={50} height={50} />
            <DialogTitle className="text-center">
              <p className="text-xl font-semibold text-center">Student Score has been set</p>
            </DialogTitle>
            <Button
              onClick={() => {
                setIsScoreDialogOpen(false);
                setCurrentScoreUpdate({resultId: 0, score: ''});
              }}
              className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}