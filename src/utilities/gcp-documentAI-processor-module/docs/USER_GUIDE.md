# Document AI Processor Module - User Guide

## Overview

The Document AI Processor Module enables EduSpry to leverage Google Cloud's Document AI capabilities for processing and analyzing documents. This guide explains how to set up, configure, and use the module in your application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage Examples](#usage-examples)
5. [Troubleshooting](#troubleshooting)
6. [Advanced Usage](#advanced-usage)
7. [API Reference](#api-reference)

## Prerequisites

Before using the Document AI Processor Module, ensure you have:

1. **Google Cloud Account**: An active Google Cloud account with the Document AI API enabled.
2. **Document AI Processor**: A configured Document AI processor in your Google Cloud project.
3. **Authentication**: Proper authentication credentials for Google Cloud.
4. **Environment**:
   - Node.js 14+ (for JavaScript/TypeScript usage)
   - Python 3.8+ (installed on the system)
   - pip (Python package manager)

## Installation

### Step 1: Install the Module

The Document AI Processor Module is included in the EduSpry utilities. No separate installation is required if you're working within the EduSpry application.

### Step 2: Set Up Dependencies

Run the installation script to set up the required Python dependencies:

```bash
cd eduspry/src/utilities/gcp-documentAI-processor-module
chmod +x install_dependencies.sh
./install_dependencies.sh
```

This script will:
- Create a Python virtual environment in the `docai-env` directory
- Install all required dependencies in the virtual environment
- Verify the installation

### Step 3: Configure IDE Integration (Optional)

If you're developing with VS Code and want to avoid import errors:

```bash
chmod +x fix_vscode_integration.sh
./fix_vscode_integration.sh
```

This will configure VS Code to recognize the Python imports correctly.

## Configuration

### Google Cloud Authentication

You have three options for authentication:

#### Option 1: Service Account Key (Recommended for Development)

1. Create a service account with Document AI permissions in the Google Cloud Console
2. Download the JSON key file
3. Provide the path to the key file in your code:

```typescript
const options = {
  projectId: '866035409594',
  location: 'us',
  processorId: 'c0f3830de84c6d96',
  credentialsPath: '/path/to/your-service-account-key.json'
};
```

#### Option 2: Environment Variable

Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable:

```bash
# macOS/Linux
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-key.json"

# Windows (Command Prompt)
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\your-service-account-key.json

# Windows (PowerShell)
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your-service-account-key.json"
```

#### Option 3: Application Default Credentials

Use Google Cloud SDK to log in:

```bash
gcloud auth application-default login
gcloud config set project 866035409594
```

### Processor Configuration

You need three key pieces of information:

1. **Project ID**: Your Google Cloud project ID
2. **Location**: Region where your processor is deployed (e.g., 'us')
3. **Processor ID**: ID of your Document AI processor

These values are available in the Google Cloud Console under Document AI → Processors.

## Usage Examples

### TypeScript/JavaScript Usage

```typescript
import { processDocument } from '../../utilities/gcp-documentAI-processor-module';

async function summarizeDocument() {
  try {
    // Configure the processor
    const options = {
      projectId: '866035409594',
      location: 'us',
      processorId: 'c0f3830de84c6d96', // NotesSummarizer processor
      debug: true // Enable detailed logging
    };
    
    // Process a document
    const result = await processDocument(
      options,
      '/path/to/your/document.pdf',
      'application/pdf'
    );
    
    // Use the results
    console.log('Document Summary:', result.summary);
    console.log('Extracted Text:', result.text.substring(0, 500) + '...');
    console.log('Number of Pages:', result.pages);
    
    // Process entities
    if (result.entities && result.entities.length > 0) {
      console.log('Extracted Entities:');
      result.entities.forEach((entity, index) => {
        console.log(`${index + 1}. ${entity.type}: ${entity.mention_text}`);
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}
```

### Python Usage

```python
from document_processor import DocumentAIProcessor

# Initialize the processor
processor = DocumentAIProcessor(
    project_id="866035409594",
    location="us",
    processor_id="c0f3830de84c6d96",  # NotesSummarizer processor
    credentials_path="/path/to/your-service-account-key.json"  # Optional
)

# Process a document
result = processor.process_document(
    file_path="/path/to/your/document.pdf",
    mime_type="application/pdf"
)

# Use the results
print(f"Document Summary: {result.get('summary')}")
print(f"Number of Pages: {result['pages']}")
print(f"Extracted Text Sample: {result['text'][:500]}...")

# Process entities
if result['entities']:
    print("Extracted Entities:")
    for i, entity in enumerate(result['entities']):
        print(f"{i+1}. {entity['type']}: {entity['mention_text']}")
```

### Command-Line Usage

You can also process documents directly from the command line:

```bash
# Activate the virtual environment
source docai-env/bin/activate  # On Windows: docai-env\Scripts\activate

# Process a document using the sample script
python process_document_sample.py

# Or with specific configuration
python document_processor.py --project-id 866035409594 --location us \
    --processor-id c0f3830de84c6d96 --file-path /path/to/document.pdf \
    --mime-type application/pdf
```

## Troubleshooting

### Common Issues and Solutions

#### Import Errors in Python

If you see errors like `Import "google.cloud.documentai_v1" could not be resolved`:

1. Make sure you've run the installation script:
   ```bash
   ./install_dependencies.sh
   ```

2. Activate the virtual environment:
   ```bash
   source docai-env/bin/activate  # On Windows: docai-env\Scripts\activate
   ```

3. Verify the imports work:
   ```bash
   python -c "import google.cloud.documentai_v1; import google.api_core.client_options; print('Success')"
   ```

#### TypeScript Import Errors

If you see errors like `Could not find a declaration file for module './node_integration'`:

1. Make sure the TypeScript declaration file exists:
   ```bash
   ls node_integration.d.ts
   ```

2. If it doesn't exist, create it using the provided script:
   ```bash
   ./fix_vscode_integration.sh
   ```

#### Authentication Errors

If you see `Permission denied` or `Unauthorized` errors:

1. Verify your credentials are set up correctly:
   ```bash
   echo $GOOGLE_APPLICATION_CREDENTIALS
   ```

2. Check that your service account has the necessary permissions:
   - Document AI Editor role
   - Document AI User role

3. Verify the processor ID and project ID are correct.

#### Python Environment Issues

If you encounter Python environment problems:

1. Run the VS Code integration script:
   ```bash
   ./fix_vscode_integration.sh
   ```

2. Select the correct Python interpreter in VS Code:
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Python: Select Interpreter"
   - Choose the interpreter from the docai-env virtual environment

## Advanced Usage

### Processing Different Document Types

The module supports various document types:

- PDF documents: `application/pdf`
- Images: `image/jpeg`, `image/png`, `image/tiff`
- Text files: `text/plain`
- Word documents: `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

Example:

```typescript
// Process a JPEG image
const result = await processDocument(
  options,
  '/path/to/document.jpg',
  'image/jpeg'
);

// Process a text file
const result = await processDocument(
  options,
  '/path/to/notes.txt',
  'text/plain'
);
```

### Debugging

Enable debug mode for detailed logging:

```typescript
const options = {
  projectId: '866035409594',
  location: 'us',
  processorId: 'c0f3830de84c6d96',
  debug: true  // Enable debug logging
};
```

### Direct API Testing

Test the API endpoint directly using the provided script:

```bash
./test_endpoint.sh
```

This will:
1. Create a sample document if it doesn't exist
2. Encode it as base64
3. Call the Document AI API directly
4. Save the response to `api_response.json`

## API Reference

### TypeScript/JavaScript API

#### `processDocument(options, filePath, mimeType)`

Processes a document using Google Cloud Document AI.

**Parameters:**
- `options` (DocumentAIOptions): Configuration options
  - `projectId` (string): Google Cloud project ID
  - `location` (string): Processor location (e.g., 'us')
  - `processorId` (string): Document AI processor ID
  - `credentialsPath` (string, optional): Path to service account key file
  - `debug` (boolean, optional): Enable debug logging
- `filePath` (string): Path to the document file
- `mimeType` (string, optional): MIME type of the document (default: 'application/pdf')

**Returns:**
- `Promise<DocumentAIResult>`: Promise resolving to the processing results
  - `text` (string): Extracted text
  - `pages` (number): Number of pages
  - `entities` (DocumentAIEntity[]): Extracted entities
  - `mime_type` (string): Document MIME type
  - `summary` (string, optional): Summary text (for NotesSummarizer processor)

### Python API

#### `DocumentAIProcessor(project_id, location, processor_id, credentials_path)`

Class for interacting with Google Cloud Document AI.

**Parameters:**
- `project_id` (str): Google Cloud project ID
- `location` (str): Processor location (e.g., 'us')
- `processor_id` (str): Document AI processor ID
- `credentials_path` (str, optional): Path to service account key file

**Methods:**
- `process_document(file_path, mime_type)`: Process a document
  - `file_path` (str): Path to the document file
  - `mime_type` (str, optional): MIME type of the document (default: 'application/pdf')
  - Returns: Dict containing processing results 