/**
 * TypeScript interface for Google Cloud Document AI Processor
 */

// Import the Node.js wrapper
import { DocumentAIProcessor } from './node_integration';

// Types
export interface DocumentAIOptions {
  projectId: string;
  location: string;
  processorId: string;
  credentialsPath?: string;
  debug?: boolean;
}

export interface DocumentAIEntity {
  type: string;
  mention_text: string;
  confidence: number;
}

export interface DocumentAIResult {
  text: string;
  pages: number;
  entities: DocumentAIEntity[];
  mime_type: string;
  summary?: string;  // Summary text for NotesSummarizer processor
  raw_output?: string;
  success?: boolean;
}

/**
 * Process a document using Google Cloud Document AI
 * 
 * @param options - Configuration options for Document AI
 * @param filePath - Path to the document file to process
 * @param mimeType - MIME type of the document (default: 'application/pdf')
 * @returns Promise resolving to the processing results
 */
export async function processDocument(
  options: DocumentAIOptions,
  filePath: string,
  mimeType: string = 'application/pdf'
): Promise<DocumentAIResult> {
  try {
    const processor = new DocumentAIProcessor(options);
    return await processor.processDocument(filePath, mimeType);
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}

// Export the DocumentAIProcessor class
export { DocumentAIProcessor };

// Default export for easier importing
export default {
  processDocument,
  DocumentAIProcessor
}; 