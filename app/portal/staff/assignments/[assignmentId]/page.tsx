"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Link as LinkIcon } from "lucide-react";
import { staffService } from "@/services/staff.service";
import { StudentSubmissionDialog } from "./assignmentDetails";
import { Submission } from "@/services/types";


export default function AssignmentDetails({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  console.log(params.id);
  const { data: assignment, isLoading } = useQuery({
    queryKey: ['assignment', params.id],
    queryFn: () => staffService.getAssignment(params.id)
  });

  const filteredSubmissions = assignment?.submissions.filter(submission =>
    submission.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.matric_no.includes(searchQuery)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{assignment?.course_code}</CardTitle>
              <p className="text-gray-600">{assignment?.course_name}</p>
            </div>
            <div className="text-right">
              <span className="text-gray-600">Units:</span>
              <span className="ml-2 font-semibold">{assignment?.units}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Assignment description</h3>
          <p className="text-gray-600">{assignment?.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-end items-center gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Matric no</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Submission</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions?.map((submission) => (
                  <tr 
                    key={submission.id} 
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <td className="py-3 px-4">{submission.student_name}</td>
                    <td className="py-3 px-4">{submission.matric_no}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        submission.score >= 70 ? 'bg-green-100 text-green-800' :
                        submission.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {submission.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {submission.submission_file ? (
                        <Button variant="ghost" className="gap-2">
                          <Download className="h-4 w-4" />
                          {submission.submission_file}
                        </Button>
                      ) : submission.submission_link ? (
                        <Button variant="ghost" className="gap-2">
                          <LinkIcon className="h-4 w-4" />
                          doc.link
                        </Button>
                      ) : null}
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubmission(submission);
                        }}
                      >
                        Grade
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedSubmission && (
        <StudentSubmissionDialog
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          submission={selectedSubmission}
          assignmentId={params.id}
        />
      )}
    </div>
  );
}