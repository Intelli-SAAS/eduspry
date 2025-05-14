/**
 * Example of using the Document AI processor from TypeScript
 */

import { processDocument, DocumentAIOptions } from './index';

async function testDocumentAI() {
  try {
    // Configuration for the NotesSummarizer processor
    const options: DocumentAIOptions = {
      projectId: '866035409594',
      location: 'us',
      processorId: 'c0f3830de84c6d96', // NotesSummarizer processor
      credentialsPath: undefined, // Update with path to credentials if needed
      debug: true, // Set to true for detailed logs
    };

    // Path to your PDF file
    const filePath = '/path/to/your/document.pdf';
    
    console.log('Processing document:', filePath);
    console.log('Using NotesSummarizer processor for document summarization');
    
    // Process the document
    const result = await processDocument(options, filePath);
    
    // Output results
    console.log('Document Processing Results:');
    console.log('Number of pages:', result.pages);
    console.log('MIME type:', result.mime_type);
    
    // Show extracted text sample
    if (result.text) {
      console.log('\nExtracted Text Sample:');
      console.log(result.text.substring(0, 500) + '...');
    }
    
    // Show summary if available (for summarizer processor)
    if (result.summary) {
      console.log('\nDocument Summary:');
      console.log(result.summary);
    }
    
    // Show extracted entities
    if (result.entities && result.entities.length > 0) {
      console.log('\nExtracted Entities:');
      result.entities.slice(0, 10).forEach((entity, index) => {
        console.log(`${index + 1}. ${entity.type}: ${entity.mention_text} (confidence: ${entity.confidence.toFixed(2)})`);
      });
    } else {
      console.log('\nNo entities extracted.');
    }
    
    return result;
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}

// Only run the example if this file is executed directly
if (require.main === module) {
  testDocumentAI()
    .then(() => console.log('Document processing completed successfully'))
    .catch((error) => console.error('Document processing failed:', error));
}

// Export the test function for use in other modules
export { testDocumentAI }; 