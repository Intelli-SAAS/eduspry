/**
 * Type declarations for Node.js Integration for Google Cloud Document AI
 */

export interface DocumentAIProcessorOptions {
  projectId: string;
  location: string;
  processorId: string;
  credentialsPath?: string;
  debug?: boolean;
}

export class DocumentAIProcessor {
  /**
   * Initialize the Document AI processor
   * @param options Configuration options
   */
  constructor(options: DocumentAIProcessorOptions);

  /**
   * Process a document using Document AI
   * @param filePath Path to the document file
   * @param mimeType MIME type of the document
   * @returns Processing results
   */
  processDocument(filePath: string, mimeType?: string): Promise<any>;
} 