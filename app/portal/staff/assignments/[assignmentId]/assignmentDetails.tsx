import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkIcon } from "lucide-react";
import { staffService } from "@/services/staff.service";
import { AssignmentDetails } from "@/services/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assignment: AssignmentDetails;
}

export function AssignmentDetailsDialog({ isOpen, onClose, assignment }: Props) {
  const [score, setScore] = useState(assignment.score?.toString() || "");
  const queryClient = useQueryClient();

  const scoreMutation = useMutation({
    mutationFn: (newScore: number) => 
      staffService.updateAssignmentScore(assignment.id.toString(), newScore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignment', assignment.id] });
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
          <DialogTitle>Assignment Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Course Code</Label>
                <p className="text-gray-700 mt-1">{assignment.course_code}</p>
              </div>
              <div>
                <Label>Course Name</Label>
                <p className="text-gray-700 mt-1">{assignment.course_name}</p>
              </div>
            </div>

            <div>
              <Label>Submission</Label>
              <div className="mt-2">
                {assignment.submission_url ? (
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a href={assignment.submission_url} target="_blank" rel="noopener noreferrer">
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