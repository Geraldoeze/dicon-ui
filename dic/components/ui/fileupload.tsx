import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileWarning } from 'lucide-react';

interface FileUploadProps {
  title: string;
  description: string;
  accept: string;
  maxSize: number; // in MB
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  description,
  accept,
  maxSize,
  onFileSelect,
  error: internalError,
  // error,
}) => {
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const displayError = error || internalError;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');

    if (!file) {
      return;
    }

    // Check file size
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    if (fileSize > maxSize) {
      setError(`File size must be less than ${maxSize}MB`);
      setSelectedFile(null);
      onFileSelect(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Check file type for images
    if (accept === 'image/*') {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        setSelectedFile(null);
        onFileSelect(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
    }

    // Check file type for PDF
    if (accept === '.pdf') {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setSelectedFile(null);
        onFileSelect(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0 p-4">
        <div className="flex gap-x-10">
          <div>
            <Image src="/upload.svg" width={60} height={60} alt="Upload icon" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
            <p className="text-sm md:text-base text-gray-500">{description}</p>
            {selectedFile && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
        </div>
        <div>
          <Button
            onClick={handleClick}
            className="bg-[#2D2F93] text-white rounded-md hover:bg-[#2D2F93]/90"
          >
            {selectedFile ? 'Change File' : 'Upload'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileSelect}
          />
        </div>
      </div>
      
      {displayError && (
        <Alert variant="destructive" className='flex items-center gap-x-2'>
          <FileWarning className="h-4 w-4" />
          <AlertDescription>{displayError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};