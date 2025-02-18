interface AssignmentStatusProps {
    score: number;
    passMark: number;
  }
  
  export function AssignmentStatus({ score, passMark }: AssignmentStatusProps) {
    return (
      <div 
        className={`px-3 py-1 rounded-full text-sm ${
          score >= passMark 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}
      >
        {score}%
      </div>
    );
  }