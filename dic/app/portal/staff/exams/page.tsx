"use client"

import { useState } from 'react';
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { staffService } from '@/services/staff.service';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useUser } from '@/app/userContext';

const Exams = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { user} = useUser();
  const staffId = user?.id; 

 
  const { data: exams, isLoading, isError } = useQuery({
    queryKey: ['exams', staffId],
    queryFn: () => staffService.getExams(staffId)
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading exams</div>;
  }

  if (!exams?.data) {
    return <div>No exams found</div>;
  }

  // Filter exams based on search query
  const filteredExams = exams?.data.filter(exam => 
    exam.course_code?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exam.course_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-slate-50 p-10 xl:p-5'>
      <div className="bg-white rounded-md px-10 xl:px-5 py-5">
        <div className="flex items-center justify-between flex-col md:flex-row my-5">
          <div>
            <h1 className='text-lg lg:text-2xl font-semibold'>Exams</h1>
            <p>Upload students exam scores for each course you are taking</p>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <hr />
        
      

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-5">

          {filteredExams.map((exam) => (
            <Card key={`${exam.exam_id}_${exam.course_name}`} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start flex-col md:flex-r0w mb-6">
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold">{exam.course_code}</h2>
                      <p className="text-gray-600 text-sm md:text-base">{exam.course_name}</p>
                    </div>
                    <div>
                      <p>{exam.course_unit} units</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm md:text-base flex items-center justify-between flex-col md:flex-row w-full bg-gray-50 p-3 rounded">
                      <span>Passing Percentage</span>
                      <span>{exam.passing_percentage}</span>
                    </div>
                    <div className="text-sm md:text-base flex items-center justify-between flex-col md:flex-row w-full bg-gray-50 p-3 rounded">
                      <span>Exam Date</span>
                      <span>{exam.exam_date}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <Link href={`/portal/staff/exams/${exam.exam_id}`}>
                    <Button className="w-full rounded-none bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium">
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Fallback when no exams are available or filtered out */}
          {filteredExams.length === 0 && (
            <div className="col-span-2 text-center p-8 bg-gray-50 rounded-md">
              {exams?.data.length === 0 ? (
                <p>No exams available for this period.</p>
              ) : (
                <p>No exams match your search criteria.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exams;