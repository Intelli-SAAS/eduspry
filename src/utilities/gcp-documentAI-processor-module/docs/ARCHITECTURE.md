# Document AI Processor Module Architecture

## High-Level Architecture

The Document AI Processor Module is designed with a layered architecture that enables seamless integration between different programming languages and the Google Cloud Document AI service. The architecture follows a modular approach with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                          │
│                                                                 │
│  ┌─────────────────┐            ┌─────────────────────────┐     │
│  │   TypeScript/   │            │                         │     │
│  │  JavaScript App │            │     Python Scripts      │     │
│  └────────┬────────┘            └────────────┬────────────┘     │
│           │                                  │                  │
└───────────┼──────────────────────────────────┼──────────────────┘
            │                                  │
┌───────────┼──────────────────────────────────┼──────────────────┐
│           │                                  │                  │
│  ┌────────▼────────┐            ┌────────────▼────────────┐     │
│  │     Node.js     │            │                         │     │
│  │   Integration   │            │  Python Document AI     │     │
│  │                 │            │       Processor         │     │
│  └────────┬────────┘            └────────────┬────────────┘     │
│           │                                  │                  │
│           └──────────────┬─────────────────┐ │                  │
│                          │                 │ │                  │
│                    ┌─────▼─────┐     ┌─────▼─▼───────┐          │
│                    │ Process   │     │ Virtual Env   │          │
│                    │ Launcher  │     │ Management    │          │
│                    └─────┬─────┘     └───────────────┘          │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                          │                                      │
│                    ┌─────▼─────────────────────┐                │
│                    │                           │                │
│                    │  Google Cloud Document AI │                │
│                    │                           │                │
│                    └───────────────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Overview

### 1. Application Layer
- **TypeScript/JavaScript Applications**: Frontend or Node.js applications that need document processing capabilities.
- **Python Scripts**: Direct Python applications that use the Document AI processor.

### 2. Integration Layer
- **Node.js Integration (`node_integration.js`, `node_integration.d.ts`)**: Provides a JavaScript/TypeScript interface to the Python implementation.
- **TypeScript Interface (`index.ts`)**: Exports TypeScript types and functions for type-safe usage in TypeScript applications.
- **Python Document AI Processor (`document_processor.py`)**: Core implementation of the Document AI functionality in Python.

### 3. Process Management Layer
- **Process Launcher (`docai_launcher.py`)**: Handles Python environment setup, dependency management, and launches the document processing.
- **Virtual Environment Management**: Scripts for creating and managing Python virtual environments with required dependencies.

### 4. Service Layer
- **Google Cloud Document AI**: The cloud service that performs the actual document processing.

## Data Flow

1. **Request Initiation**:
   - From TypeScript/JavaScript: Application calls the `processDocument` function exported by `index.ts`.
   - From Python: Application directly uses the `DocumentAIProcessor` class from `document_processor.py`.

2. **Request Processing**:
   - TypeScript/JavaScript requests are passed to the Node.js integration layer.
   - The Node.js integration creates a temporary configuration file and spawns a Python process.
   - The Python launcher sets up the environment and loads dependencies.
   - The Document AI processor sends the document to Google Cloud for processing.

3. **Response Handling**:
   - Google Cloud processes the document and returns results.
   - The Python processor extracts relevant information (text, entities, summary).
   - For TypeScript/JavaScript requests, results are passed back through the Node.js integration.
   - The application receives structured data with the processing results.

## Component Interactions

- **TypeScript → Python**: Uses child process execution with JSON for data exchange.
- **Python → Google Cloud**: Uses the official Google Cloud Python SDK.
- **Environment Management**: Automatic virtual environment creation and dependency installation.
- **Error Handling**: Comprehensive error handling at each layer with meaningful error messages.

## Technology Stack

- **Languages**: TypeScript, JavaScript, Python
- **Runtime Environments**: Node.js, Python 3.8+
- **Cloud Services**: Google Cloud Document AI
- **Libraries**:
  - **Python**: google-cloud-documentai, google-api-core
  - **Node.js**: child_process, path, fs
  - **TypeScript**: Type definitions and interfaces

## Security Considerations

- **Authentication**: Uses Google Cloud authentication mechanisms.
- **Credentials Management**: Supports service account keys and application default credentials.
- **Data Handling**: Temporary files are cleaned up after processing. 