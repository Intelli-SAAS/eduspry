# Document AI Processor Module - Technical Design Document

## 1. Introduction

The Document AI Processor Module is a cross-language solution for integrating Google Cloud Document AI capabilities into the EduSpry application. It provides a bridge between TypeScript/JavaScript and Python, allowing the application to leverage Google's powerful document processing capabilities while maintaining a clean, type-safe interface.

## 2. System Components

### 2.1 Core Components

#### 2.1.1 Python Document Processor (`document_processor.py`)

This is the core implementation that interacts with the Google Cloud Document AI API.

**Key Classes and Methods:**
- `DocumentAIProcessor` class:
  - `__init__(project_id, location, processor_id, credentials_path)`: Initializes the processor with Google Cloud configuration.
  - `process_document(file_path, mime_type)`: Processes a document and returns structured results.
  - `extract_summary(document)`: Extracts summary from processed document (for NotesSummarizer processor).
  - `extract_entities(document)`: Extracts entities from processed document.

**Data Flow:**
1. Document is read from the file system.
2. Document is sent to Google Cloud Document AI for processing.
3. Response is parsed and relevant information is extracted.
4. Structured results are returned to the caller.

#### 2.1.2 Process Launcher (`docai_launcher.py`)

Handles Python environment setup and dependency management.

**Key Functions:**
- `check_imports()`: Verifies required Python modules are available.
- `try_install_dependencies()`: Attempts to install missing dependencies.
- `run_in_venv(config_path)`: Runs the processor in a virtual environment.
- `main()`: Entry point that orchestrates the environment setup and processing.

**Environment Management:**
- Detects if running in a virtual environment.
- Creates a virtual environment if needed.
- Installs dependencies in the virtual environment.
- Executes the processor in the appropriate environment.

#### 2.1.3 Node.js Integration (`node_integration.js`)

Provides a JavaScript interface to the Python implementation.

**Key Classes and Methods:**
- `DocumentAIProcessor` class:
  - `constructor(options)`: Initializes with configuration options.
  - `processDocument(filePath, mimeType)`: Processes a document by spawning a Python process.

**Interprocess Communication:**
- Creates a temporary JSON configuration file.
- Spawns a Python process to run the document processor.
- Captures stdout/stderr from the Python process.
- Parses JSON results from the Python output.

#### 2.1.4 TypeScript Interface (`index.ts`)

Provides type definitions and exports for TypeScript applications.

**Key Interfaces:**
- `DocumentAIOptions`: Configuration options for the processor.
- `DocumentAIEntity`: Represents an entity extracted from a document.
- `DocumentAIResult`: Results of document processing.

**Exported Functions:**
- `processDocument(options, filePath, mimeType)`: Main function for processing documents.

### 2.2 Support Components

#### 2.2.1 TypeScript Declaration File (`node_integration.d.ts`)

Provides type definitions for the Node.js integration module.

**Key Declarations:**
- `DocumentAIProcessorOptions` interface: Configuration options.
- `DocumentAIProcessor` class: Type declarations for the JavaScript class.

#### 2.2.2 Installation Scripts

- `install_dependencies.sh`: Sets up a virtual environment with required dependencies.
- `install_dev_dependencies.sh`: Installs dependencies for IDE integration.
- `fix_vscode_integration.sh`: Configures VS Code settings for proper Python integration.

#### 2.2.3 Configuration Files

- `pyrightconfig.json`: Configuration for Pylance/Pyright to recognize imports.
- `.vscode/settings.json`: VS Code settings for Python integration.

## 3. Detailed Design

### 3.1 Document Processing Flow

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│                  │     │                  │     │                  │
│  TypeScript App  │────▶│  Node.js Bridge  │────▶│  Python Launcher  │
│                  │     │                  │     │                  │
└──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                           │
                                                           ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│                  │     │                  │     │                  │
│   Structured     │◀────│ Python Document  │◀────│  Google Cloud    │
│    Results       │     │    Processor     │     │   Document AI    │
│                  │     │                  │     │                  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

1. **Request Initiation**:
   - Application calls `processDocument(options, filePath, mimeType)` from `index.ts`.
   - Options include Google Cloud project ID, location, and processor ID.

2. **Node.js Bridge**:
   - Creates a temporary configuration file with processing options.
   - Spawns a Python process to run `docai_launcher.py` with the config file path.
   - Listens for output from the Python process.

3. **Python Launcher**:
   - Sets up the Python environment (creates/activates virtual env if needed).
   - Verifies required dependencies are installed.
   - Imports and calls the document processor.

4. **Document Processing**:
   - Reads the document from the specified file path.
   - Creates a `RawDocument` object with the document content and MIME type.
   - Sends a `ProcessRequest` to the Google Cloud Document AI API.
   - Receives and parses the response.

5. **Result Extraction**:
   - Extracts text, entities, and summary (if available) from the response.
   - For the NotesSummarizer processor, looks for summary entities or content.
   - Creates a structured result object.

6. **Response Handling**:
   - Python outputs the result as a JSON string between markers.
   - Node.js captures the output and extracts the JSON result.
   - TypeScript receives the structured result object.

### 3.2 Authentication Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │
│  Credentials │────▶│  Environment │────▶│ Google Cloud │
│   Provider   │     │   Variables  │     │     SDK      │
│              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Credential Sources**:
   - Service account key file (specified via `credentialsPath`).
   - Application Default Credentials (ADC).
   - Environment variables (`GOOGLE_APPLICATION_CREDENTIALS`).

2. **Authentication Process**:
   - If `credentialsPath` is provided, it's set as `GOOGLE_APPLICATION_CREDENTIALS`.
   - Otherwise, the Google Cloud SDK uses ADC or existing environment variables.
   - The Document AI client uses these credentials for API requests.

### 3.3 Error Handling

**Multi-layer Error Handling**:

1. **TypeScript Layer**:
   - Validates required options before calling Node.js integration.
   - Wraps Node.js calls in try/catch blocks.
   - Returns typed error responses.

2. **Node.js Layer**:
   - Validates file existence and options.
   - Captures and parses Python stderr output.
   - Provides detailed error messages with Python traceback.

3. **Python Layer**:
   - Comprehensive exception handling with informative error messages.
   - Environment setup errors (missing dependencies, environment issues).
   - API errors (authentication, quota, invalid requests).
   - File system errors (file not found, permission denied).

4. **User Guidance**:
   - Troubleshooting tips for common errors.
   - Clear instructions for fixing environment issues.

## 4. Design Decisions

### 4.1 Cross-Language Architecture

**Decision**: Use Python for Google Cloud interaction and provide a Node.js bridge.

**Rationale**:
- Google Cloud's Python SDK is more mature and feature-complete than JavaScript alternatives.
- Python has better support for document processing tasks.
- Node.js bridge allows seamless integration with the TypeScript/JavaScript application.

**Alternatives Considered**:
- Pure JavaScript implementation using Google Cloud JavaScript SDK.
- Direct REST API calls to Document AI.

### 4.2 Virtual Environment Management

**Decision**: Automatically create and manage Python virtual environments.

**Rationale**:
- Isolates dependencies from the system Python installation.
- Ensures consistent execution environment regardless of the host system.
- Prevents conflicts with other Python applications.

**Alternatives Considered**:
- System-wide Python installation.
- Docker containerization.

### 4.3 Configuration via JSON

**Decision**: Use JSON files for configuration passing between Node.js and Python.

**Rationale**:
- JSON is natively supported by both languages.
- Avoids command-line argument parsing complexity.
- Supports structured configuration data.

**Alternatives Considered**:
- Command-line arguments.
- Environment variables.
- Stdin/stdout streaming.

### 4.4 TypeScript Type Safety

**Decision**: Provide comprehensive TypeScript type definitions.

**Rationale**:
- Enables type checking at compile time.
- Improves developer experience with autocomplete and documentation.
- Reduces runtime errors through static analysis.

**Alternatives Considered**:
- Minimal typing with `any` types.
- Runtime type checking.

## 5. Performance Considerations

### 5.1 Process Spawning Overhead

The architecture involves spawning Python processes from Node.js, which introduces some overhead. This is acceptable for document processing tasks that are typically not high-frequency operations.

**Optimizations**:
- Process reuse is not implemented due to the complexity and potential for memory leaks.
- The virtual environment is created once and reused for subsequent calls.

### 5.2 Document Size Handling

Large documents can consume significant memory and processing time.

**Handling Strategies**:
- No streaming implementation currently exists; documents are processed as a whole.
- Google Cloud Document AI has its own limits on document size (20MB for synchronous processing).

### 5.3 Concurrent Processing

The current implementation does not specifically optimize for concurrent processing, but:
- Each process is isolated, allowing for natural parallelism.
- Google Cloud Document AI handles the heavy processing in the cloud.

## 6. Security Considerations

### 6.1 Credential Management

- Service account keys are never hardcoded.
- Keys can be provided via environment variables or file paths.
- Temporary configuration files are cleaned up after use.

### 6.2 Input Validation

- File paths and MIME types are validated before processing.
- Options are checked for required fields.

### 6.3 Dependency Security

- Uses specific version ranges for dependencies to avoid breaking changes.
- Virtual environment isolation prevents system-wide impact of vulnerabilities.

## 7. Testing Strategy

### 7.1 Unit Testing

- Individual components can be tested in isolation.
- Mock objects can be used for Google Cloud API responses.

### 7.2 Integration Testing

- End-to-end tests can verify the full processing pipeline.
- Sample documents can be processed and results verified.

### 7.3 Manual Testing

- `test_endpoint.sh` provides a direct way to test the API endpoint.
- Example scripts demonstrate usage patterns.

## 8. Deployment Considerations

### 8.1 Dependencies

- Python 3.8+ with pip.
- Node.js 14+ for JavaScript integration.
- Google Cloud SDK (optional, for authentication).

### 8.2 Environment Setup

- Virtual environment creation and dependency installation.
- Google Cloud authentication setup.
- IDE integration for development.

### 8.3 Monitoring and Logging

- Detailed logging at each layer.
- Error messages include troubleshooting guidance.
- Debug mode for verbose output.

## 9. Future Enhancements

### 9.1 Potential Improvements

- **Streaming Processing**: Support for processing large documents in chunks.
- **Batch Processing**: Process multiple documents in a single request.
- **Result Caching**: Cache results to avoid redundant processing.
- **Worker Pool**: Maintain a pool of Python processes for better performance.
- **Additional Processor Types**: Support for other Document AI processor types.

### 9.2 Extensibility Points

- **Processor Configuration**: Add support for more processor-specific options.
- **Output Formats**: Support additional output formats beyond JSON.
- **Pre/Post Processing**: Add hooks for document pre-processing and result post-processing.
- **Custom Entity Extraction**: Allow custom entity extraction logic. 