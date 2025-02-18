interface SubmissionFormProps {
    onSubmit: () => void;
    isPending: boolean;
    submissionUrl: string;
    setSubmissionUrl: (url: string) => void;
    setFile: (file: File | null) => void;
  }
  import { Button} from '@/components/ui/button';
  import { Input } from './input';
  export function SubmissionForm({
    onSubmit,
    isPending,
    submissionUrl,
    setSubmissionUrl,
    setFile,
  }: SubmissionFormProps) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">Submit Assignment</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Google Docs Link</label>
            <Input
              type="url"
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              placeholder="Paste your Google Docs link"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Or Upload PDF</label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <Button
            onClick={onSubmit}
            disabled={(!submissionUrl && !isPending)}
            className="w-full md:w-auto"
          >
            {isPending ? 'Submitting...' : 'Submit Assignment'}
          </Button>
        </div>
      </div>
    );
  }