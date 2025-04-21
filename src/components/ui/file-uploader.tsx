import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
  acceptedFileTypes?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  children?: React.ReactNode;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesUploaded,
  acceptedFileTypes,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB default
  children,
  className,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles[0].errors;
      if (errors[0]?.code === 'file-too-large') {
        setError(`File is too large. Max size is ${(maxSize / (1024 * 1024)).toFixed(0)}MB.`);
      } else if (errors[0]?.code === 'file-invalid-type') {
        setError('File type not accepted.');
      } else {
        setError('Error uploading file.');
      }
      return;
    }

    // Handle case where too many files are uploaded
    if (acceptedFiles.length > maxFiles) {
      setError(`You can only upload ${maxFiles} file${maxFiles > 1 ? 's' : ''}.`);
      return;
    }

    setError(null);
    setFiles(acceptedFiles);
    onFilesUploaded(acceptedFiles);
  }, [maxFiles, maxSize, onFilesUploaded]);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
    maxSize,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer",
          isDragActive ? "border-blue-500 bg-blue-50" : "",
        )}
      >
        <input {...getInputProps()} />
        {children}
      </div>

      {error && (
        <div className="text-sm text-red-500 mt-2">{error}</div>
      )}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li 
              key={index} 
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm"
            >
              <div className="flex items-center space-x-2">
                <span className="truncate max-w-[200px]">{file.name}</span>
                <span className="text-gray-400 text-xs">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <button 
                type="button" 
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <XCircle className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 