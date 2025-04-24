import React from 'react';
import { FileUpload } from '@/components/ui/fileupload';
import { FileWarning } from 'lucide-react';

interface DocumentUploadProps {
  onPhotoUpload: (file: File | null) => void;
  onFormUpload: (file: File | null) => void;
  photoError?: boolean;
  formError?: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onPhotoUpload,
  onFormUpload,
  photoError,
  formError
}) => {
  return (
    <div className="max-w-lg m-auto md:text-center">
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Document Upload</h2>
      <p className='text-sm text-center'> Upload a copy of your passport and the documents you filed in the earlier stages.</p>
      <FileUpload
        title="Upload your Image"
        description="JPG format. Max 2MB"
        accept="image/*"
        maxSize={2}
        onFileSelect={onPhotoUpload}
        error={photoError ? "Photo upload is required" : ""}
      />

      <FileUpload
        title="Upload PG Form"
        description="PDF format. Max 5MB"
        accept=".pdf"
        maxSize={5}
        onFileSelect={onFormUpload}
        error={formError ? "PG Form upload is required" : ""}
      />
   
    <div className="text-start flex items-center gap-x-2">
    <FileWarning className="h-6 w-6" />
      <p className="text-sm text-gray-600">
        Academic Credentials should be forwarded to: 
        <a
          className="underline text-[#2D2F93] mx-2"
          target="_blank"
          href="mailto:dicunn.pgs@gmail.com"
          rel="noopener noreferrer"
        >
          dicunn.pgs@gmail.com
        </a>
      </p>
      </div>
    
    </div>
    </div>
  );
};