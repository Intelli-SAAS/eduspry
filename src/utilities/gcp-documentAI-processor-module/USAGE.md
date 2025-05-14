# NotesSummarizer Processor Usage Guide

This guide explains how to use the Document AI processor module with the NotesSummarizer processor.

## What We've Built

We've implemented a comprehensive solution for using Google Cloud's Document AI NotesSummarizer processor:

1. **Python Module** - A Python module for interacting with the Document AI API
2. **Node.js Integration** - JavaScript/TypeScript wrapper for use in the EduSpry application
3. **Command-line Tools** - Scripts for testing and using the processor directly
4. **Authentication Helpers** - Guides and utilities for setting up Google Cloud authentication

## Important Files

- **document_processor.py** - Core Python class for Document AI interaction
- **docai_launcher.py** - Python launcher script that handles imports and environment setup
- **node_integration.js** - Node.js wrapper for calling the Python module
- **index.ts** - TypeScript interface for integration with EduSpry
- **test_endpoint.sh** - Shell script for testing the API endpoint directly
- **AUTHENTICATION.md** - Guide for setting up Google Cloud authentication
- **endpoint_info.md** - Details about the NotesSummarizer processor from the screenshot

## Setup Steps

1. **Install Dependencies**:
   ```bash
   python docai_launcher.py
   ```
   This will set up a virtual environment and install all required packages.

2. **Authentication**:
   Set up authentication with Google Cloud (see AUTHENTICATION.md for details):
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-key.json"
   ```

3. **Test the Endpoint**:
   Run the test script to verify API access:
   ```bash
   ./test_endpoint.sh
   ```

## Usage Options

### 1. From Python

```python
from document_processor import DocumentAIProcessor

# Initialize the processor
processor = DocumentAIProcessor(
    project_id="866035409594",
    location="us",
    processor_id="c0f3830de84c6d96"  # NotesSummarizer processor
)

# Process a document
result = processor.process_document(
    file_path="/path/to/your/notes.txt",
    mime_type="text/plain"
)

# Access the summary
summary = result.get('summary')
print(f"Document Summary: {summary}")
```

### 2. From Node.js/TypeScript

```typescript
import { processDocument } from './utilities/gcp-documentAI-processor-module';

async function summarizeNotes() {
  try {
    const result = await processDocument(
      {
        projectId: '866035409594',
        location: 'us',
        processorId: 'c0f3830de84c6d96',
        debug: true
      },
      '/path/to/your/notes.txt',
      'text/plain'
    );
    
    console.log('Summary:', result.summary);
    return result;
  } catch (error) {
    console.error('Error summarizing notes:', error);
    throw error;
  }
}
```

### 3. Direct API Call

For direct API interaction, see the example in `test_endpoint.sh` or the following curl command:

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  https://us-documentai.googleapis.com/v1/projects/866035409594/locations/us/processors/c0f3830de84c6d96:process \
  -d '{
    "rawDocument": {
      "content": "BASE64_ENCODED_DOCUMENT_CONTENT",
      "mimeType": "text/plain"
    }
  }'
```

## Supported Document Types

The NotesSummarizer processor works best with text-based documents:
- Plain text (text/plain)
- PDF documents (application/pdf)
- Word documents (application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document)

## Troubleshooting

If you encounter issues:

1. Check authentication (see AUTHENTICATION.md)
2. Verify the document format is supported
3. Make sure the processor ID is correct (c0f3830de84c6d96)
4. Check API access and permissions
5. Look for error messages in the API response

For more detailed logs, set the `debug` option to true in Node.js integration or run with verbose logging in Python. 