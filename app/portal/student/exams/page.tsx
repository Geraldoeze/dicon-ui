"use client"
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Download, Search, SlidersHorizontal } from 'lucide-react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { apiService } from '@/services/api.service';
import { STUDENT_ENDPOINTS } from '@/services/config';
import { Input } from '@/components/ui/input';

type Exam = {
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
};

const ExamResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [department, setDepartment] = useState('');
  const [dateRange, setDateRange] = useState('');

  const { data: exams, isLoading, refetch } = useQuery({
    queryKey: ['exams', department, dateRange],
    queryFn: async () => {
      const params = {
        ...(department && { department }),
        ...(dateRange && { date_range: dateRange }),
      };
      const response = await apiService.get<Exam[]>(STUDENT_ENDPOINTS.EXAMS.RESULTS, params);
      return response.data;
    }
  });

  const filteredExams = exams?.filter(exam => 
    exam.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.course_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (scored: number, passing: number) => {
    return scored >= passing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusText = (scored: number, passing: number) => {
    return scored >= passing ? 'Passed' : 'Failed';
  };

  return (
    <div className="p-6 bg-white">
      <div className="max-w-[70vw] mx-auto">
        <div className="my-6 space-y-6 flex justify-between items-center flex-col md:flex-row">
          <div>
            <h1 className="text-2xl font-semibold">Exams</h1>
            <p className="text-gray-600">View your exam scores here</p>
          </div>
          
          <div className="">
            <div className="relative flex-1 bg-slate-100 max-w-fit">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
              <Input
                type="text"
                placeholder="Search exams..."
                className="px-8 py-2 border rounded-lg focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            </div>
          </div>

      


        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExams?.map((exam) => (
              <div key={exam.exam_id} className="border rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div> 
                    <h1 className="text-lg md:text-xl font-semibold">{exam.course_code}</h1>
                    <h3 className="text-sm text-gray-500">{exam.course_name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-sm md:text-base text-gray-500">{exam.course_unit} units</span>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-col md:flex-row min-w-fit">
                  <span className="text-gray-600">Lecturer in charge:</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.jpg" alt={exam.lecturer_in_charge} />
                    </Avatar>
                    <span>{exam.lecturer_in_charge}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                      <p className="text-gray-600">Passing %</p>
                      <p className="font-medium">{exam.passing_percentage}%</p>
                  </div>
                  <div className="flex items-center justify-between">
                      <p className="text-gray-600">Scored %</p>
                      <p className="font-medium">{exam.scored_percentage}%</p>
                    </div>
                  <div className="flex items-center justify-between">
                      <p className="text-gray-600">Status</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(exam.scored_percentage, exam.passing_percentage)}`}>
                        {getStatusText(exam.scored_percentage, exam.passing_percentage)}
                      </span>
                    
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Download size={20} />
                  Question paper
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamResults;