import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Link as LinkIcon } from "lucide-react";
import { staffService } from "@/services/staff.service";

interface StudentSubmission {
  id: string;
  student_name: string;
  matric_no: string;
  score: number;
  submission_link?: string;
  submission_file?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submission: StudentSubmission;
  assignmentId: string;
}

export function StudentSubmissionDialog({ isOpen, onClose, submission, assignmentId }: Props) {
  const [score, setScore] = useState(submission.score?.toString() || "");
  const queryClient = useQueryClient();

  const scoreMutation = useMutation({
    mutationFn: (newScore: number) => 
      staffService.updateAssignmentScore(submission.id, newScore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignment', assignmentId] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericScore = parseFloat(score);
    if (numericScore >= 0 && numericScore <= 100) {
      scoreMutation.mutate(numericScore);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Student Submission</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Student Name</Label>
                <p className="text-gray-700 mt-1">{submission.student_name}</p>
              </div>
              <div>
                <Label>Matric Number</Label>
                <p className="text-gray-700 mt-1">{submission.matric_no}</p>
              </div>
            </div>

            <div>
              <Label>Submission</Label>
              <div className="mt-2">
                {submission.submission_file ? (
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download Submission
                  </Button>
                ) : submission.submission_link ? (
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a href={submission.submission_link} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-4 w-4" />
                      View Submission
                    </a>
                  </Button>
                ) : (
                  <p className="text-gray-500">No submission found</p>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
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
  );
}