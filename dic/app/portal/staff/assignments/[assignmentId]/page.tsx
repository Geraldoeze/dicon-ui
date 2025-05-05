"use client"

import { useState } from "react";
import { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, LinkIcon, ArrowLeft } from "lucide-react";
import { staffService } from "@/services/staff.service";
import { studentService } from "@/services/student.service";
import { AssignmentDetails } from "@/services/types";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  student_id: string;
  student_name: string;
  submission_date: string;
  status: 'submitted' | 'late' | 'missing';
  score: number | null;
  submission_url?: string;
}

interface Params {
  assignmentId: number
}
// interface StudentProfile {
//   id: string;
//   name: string;
//   email: string;
//   course_performance: number;
//   submissions_completed: number;
//   total_submissions: number;
// }

export default function AssignmentPage({ params }: Params) {
  const [searchQuery, setSearchQuery] = useState("");
  const [score, setScore] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  
  const queryClient = useQueryClient();
  const router = useRouter();

  const assignmentId = use<Params>(params).assignmentId;
  
  // Fetch assignment data
  const { data: assignment, isLoading: assignmentLoading } = useQuery<{ data: AssignmentDetails }>({
    queryKey: ['assignment', assignmentId],
    queryFn: () => staffService.getAssignment()
  });

  // Fetch submissions
  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ['submissions', assignmentId],
    queryFn: () => staffService.getSubmissions(assignmentId)
  });

  // Fetch student profile when a submission is selected
  const { data: studentProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['student', selectedSubmission?.student_id],
    queryFn: () => studentService.getProfile(),
    enabled: !!selectedSubmission
  });

  // Update score mutation
  const scoreMutation = useMutation({
    mutationFn: (newScore: number) => 
      staffService.updateAssignmentScore(assignment?.data.id.toString() || "", newScore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignment', params.assignmentId] });
      setShowAssignmentDetails(false);
    },
  });

  // Filter submissions based on search query
  const filteredSubmissions = submissions?.data?.filter(submission =>
    submission.student_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle score submission
  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericScore = parseFloat(score);
    if (numericScore >= 0 && numericScore <= 100 && assignment?.data) {
      scoreMutation.mutate(numericScore);
    }
  };

  // Handle row click to show student profile
  const handleRowClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowStudentProfile(true);
  };

  // Open assignment details dialog and set initial score
  const openAssignmentDetails = () => {
    if (assignment?.data) {
      setScore(assignment.data.score?.toString() || "");
      setShowAssignmentDetails(true);
    }
  };

  // Helper function to get status color
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

  if (assignmentLoading || submissionsLoading) {
    return <div>Loading...</div>;
  }

  if (!assignment?.data) {
    return <div>Assignment not found</div>;
  }

  const { data: assignmentData } = assignment;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Assignment Details Card */}
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
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{assignmentData.title}</CardTitle>
              <p className="text-gray-600">{assignmentData.course_name}</p>
            </div>
            <div className="text-right">
              <span className="text-gray-600">Due:</span>
              <span className="ml-2 font-semibold">{assignmentData.due_day_label}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* <div>
              <h3 className="font-semibold mb-2">Assignment Title</h3>
              <p className="text-gray-600">{assignmentData.title}</p>
            </div> 
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{assignmentData.description}</p>
            </div>
            */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold mb-2">Pass Mark</h3>
                <p className="text-gray-600">{assignmentData.pass_mark}%</p>
              </div>
              {/* <div>
                <h3 className="font-semibold mb-2">Current Score</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  assignmentData.status === 'passed' ? 'bg-green-100 text-green-800' :
                  assignmentData.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {assignmentData.score}%
                </span>
              </div> */}
            </div>
            {/* <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={openAssignmentDetails}
              >
                View Details
              </Button>
              {assignmentData.submission_url && (
                <Button variant="outline" className="gap-2" asChild>
                  <a href={assignmentData.submission_url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4" />
                    View Submission
                  </a>
                </Button>
              )}
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <div>
        <Card className="space-y-4">
          <CardHeader className="flex items-center justify-between flex-col md:flex-row">
            <CardTitle>Student Submissions</CardTitle>
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
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Submission</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions?.map((submission) => (
                  <TableRow
                    key={submission.student_id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(submission)}
                  >
                   
                    <TableCell className="font-medium">{submission.student_name}</TableCell>
                    <TableCell>{submission.department}</TableCell>
                    <TableCell><a href={assignmentData.submission_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2"> <LinkIcon className="h-4 w-4" /> View Submission </a> </TableCell>
                    {/* <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </TableCell> */}
                    <TableCell>{submission.score ? `${submission.score}%` : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Details Dialog */}
      <Dialog open={showAssignmentDetails} onOpenChange={setShowAssignmentDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assignment Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Course Code</Label>
                  <p className="text-gray-700 mt-1">{assignmentData.course_code}</p>
                </div>
                <div>
                  <Label>Course Name</Label>
                  <p className="text-gray-700 mt-1">{assignmentData.course_name}</p>
                </div>
              </div>

              <div>
                <Label>Submission</Label>
                <div className="mt-2">
                  {assignmentData.submission_url ? (
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <a href={assignmentData.submission_url} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-4 w-4" />
                        View Submission
                      </a>
                    </Button>
                  ) : (
                    <p className="text-gray-500">No submission found</p>
                  )}
                </div>
              </div>

              <form onSubmit={handleScoreSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="score">Score (%)</Label>
                  <Input
                    id="score"
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Enter score (0-100)"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-4 bg-indigo-700 hover:bg-indigo-800"
                  disabled={scoreMutation.isPending}
                >
                  {scoreMutation.isPending ? "Saving..." : "Save Score"}
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Student Profile Dialog */}
      {/* <Dialog open={showStudentProfile} onOpenChange={setShowStudentProfile}>
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
      </Dialog> */}
    </div>
  );
}