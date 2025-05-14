import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Downloads content as a file with appropriate formatting
 * @param content Content to download
 * @param filename Name of the file
 * @param contentType MIME type of the file
 */
export const downloadFile = (content: string, filename: string, contentType: string = 'text/plain') => {
  // Ensure filename has an extension
  if (!filename.includes('.')) {
    const extension = contentType === 'text/plain' ? '.txt' : 
                     contentType === 'text/markdown' ? '.md' :
                     contentType === 'application/pdf' ? '.pdf' : '.txt';
    filename = `${filename}${extension}`;
  }
  
  // Format content based on content type if needed
  let processedContent = content;
  
  // Create and trigger download
  const blob = new Blob([processedContent], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
