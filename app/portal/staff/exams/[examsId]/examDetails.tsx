"use client"
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffService } from '@/services/staff.service';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Upload } from 'lucide-react';


function normalizeResponse<T>(response: T | { data: T }): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response;
}

const ExamDetails = ({ examId }: { examId: string }) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [passMark, setPassMark] = React.useState('50');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch students
  const { data: students } = useQuery({
    queryKey: ['courseStudents', examId],
    queryFn: async () => {
      const response = await staffService.getCourseStudents(examId);
      return normalizeResponse(response)
    } 
  });

  


  // Mutations
  const setScoreMutation = useMutation({
    mutationFn: staffService.setScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseStudents', examId] });
    }
  });

  const setPassMarkMutation = useMutation({
    mutationFn: staffService.setPassMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseStudents', examId] });
    }
  });

  const uploadQuestionMutation = useMutation({
    mutationFn: staffService.uploadQuestion
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

  return (
    <div className="bg-slate-50 p-10">
      <Card>
        <CardHeader>
          <CardTitle>ELE 321</CardTitle>
          <p className="text-gray-500">Electricity & power</p>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Course description</h2>
            <p className="text-gray-600">
              Assignment Descriptions The basic entry qualification for admission into the M.Sc. programme is a 
              Bachelor&#39;s Degree with at least a Second-Class Lower Division with not less than 3.00 GPA or its 
              equivalent.
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
                      <td className="py-4">
                        <Input
                          type="number"
                          value={student.score}
                          onChange={(e) => handleScoreChange(student.student_id, e.target.value)}
                          className="w-24"
                        />
                        %
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