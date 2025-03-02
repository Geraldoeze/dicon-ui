import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LinkIcon } from "lucide-react";
import { staffService } from '@/services/staff.service';
import { studentService } from '@/services/student.service';
interface Submission {
  id: string;
  student_id: string;
  student_name: string;
  submission_date: string;
  status: 'submitted' | 'late' | 'missing';
  score: number | null;
  submission_url?: string;
}

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  course_performance: number;
  submissions_completed: number;
  total_submissions: number;
}

const SubmissionsTable = ({ assignmentId }: { assignmentId: string }) => {

  console.log(assignmentId);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['submissions', assignmentId],
    queryFn: () => staffService.getSubmissions(assignmentId)
  });

  const { data: studentProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['student'],
    queryFn: () => studentService.getProfile(),
    enabled: !!selectedSubmission
  });

  const filteredSubmissions = submissions?.data.filter(submission =>
    submission.student_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowProfile(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions?.map((submission) => (
                <TableRow
                  key={submission.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(submission)}
                >
                  <TableCell className="font-medium">{submission.student_name}</TableCell>
                  <TableCell>{submission.submission_date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </TableCell>
                  <TableCell>{submission.score ? `${submission.score}%` : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Student Profile & Submission</DialogTitle>
          </DialogHeader>
          
          {profileLoading ? (
            <div>Loading profile...</div>
          ) : studentProfile?.data && selectedSubmission ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Student Information</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {studentProfile.data.name}</p>
                    <p><span className="text-gray-600">Email:</span> {studentProfile.data.email}</p>
                    <p><span className="text-gray-600">Course Performance:</span> {studentProfile.data.course_performance}%</p>
                    <p><span className="text-gray-600">Submissions:</span> {studentProfile.data.submissions_completed}/{studentProfile.data.total_submissions}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Submission Details</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-sm ${getStatusColor(selectedSubmission.status)}`}>
                        {selectedSubmission.status}
                      </span>
                    </p>
                    <p><span className="text-gray-600">Submission Date:</span> {selectedSubmission.submission_date}</p>
                    <p><span className="text-gray-600">Score:</span> {selectedSubmission.score ? `${selectedSubmission.score}%` : 'Not graded'}</p>
                  </div>
                </div>
              </div>

              {selectedSubmission.submission_url && (
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href={selectedSubmission.submission_url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4" />
                    View Submission
                  </a>
                </Button>
              )}
            </div>
          ) : (
            <div>No profile data available</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionsTable;