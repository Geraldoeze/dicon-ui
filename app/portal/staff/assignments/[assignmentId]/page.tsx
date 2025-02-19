"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, LinkIcon } from "lucide-react";
import { staffService } from "@/services/staff.service";
import { AssignmentDetailsDialog } from "./assignmentDetails";
import { AssignmentDetails } from "@/services/types";
import SubmissionsTable from "./submissions";

export default function AssignmentDetails({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const { data: assignment, isLoading } = useQuery<{ data: AssignmentDetails }>({
    queryKey: ['assignment'],
    queryFn: () => staffService.getAssignment()
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!assignment?.data) {
    return <div>Assignment not found</div>;
  }

  const { data: assignmentData } = assignment;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{assignmentData.course_code}</CardTitle>
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
            <div>
              <h3 className="font-semibold mb-2">Assignment Title</h3>
              <p className="text-gray-600">{assignmentData.title}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{assignmentData.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold mb-2">Pass Mark</h3>
                <p className="text-gray-600">{assignmentData.pass_mark}%</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Current Score</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  assignmentData.status === 'passed' ? 'bg-green-100 text-green-800' :
                  assignmentData.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {assignmentData.score}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowDetails(true)}
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
            </div>
          </div>
        </CardContent>
      </Card>



      <SubmissionsTable assignmentId={params.id} />

      {showDetails && (
        <AssignmentDetailsDialog
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          assignment={assignmentData}
        />
      )}
    </div>
  );
}