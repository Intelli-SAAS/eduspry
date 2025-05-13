# GCP Document AI Processor Module

This module provides a Python interface for interacting with Google Cloud Platform's Document AI service, which allows for automated document processing and data extraction.

## Setup Instructions

1. **Install Dependencies**:
   
   **Using the Python launcher (RECOMMENDED):**
   ```bash
   python3 docai_launcher.py
   ```
   This new launcher script automatically handles Python path issues, virtual environment setup, and dependency installation.
   
   **Using the Python installer:**
   ```bash
   python3 install_dependencies.py
   ```
   
   **Using the shell script (macOS/Linux):**
   ```bash
   chmod +x install_dependencies.sh
   ./install_dependencies.sh
   ```
   
   **Manual installation:**
   ```bash
   pip install -r requirements.txt
   ```
   
   If you're still seeing import errors, install individual packages:
   ```bash
   pip install google-cloud-documentai google-api-core google-auth google-cloud-core
   ```

2. **Authentication**:
   - Create a service account in your GCP project with Document AI permissions
   - Download the service account key JSON file
   - Set the environment variable or provide the path to credentials:
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
     ```
   - On Windows, set environment variable using:
     ```
     set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\your\service-account-key.json
     ```

3. **GCP Setup**:
   - Make sure the Document AI API is enabled in your GCP project
   - Create a Document AI processor in the GCP Console if you haven't already

## Usage Examples

### Using the Sample Script

1. Update the `pdf_path` variable in `process_document_sample.py` to point to your PDF file
2. Run the sample script:
   ```bash
   python process_document_sample.py
   ```

### As a Command-Line Tool

Use the module directly as a command-line tool:

```bash
python document_processor.py \
  --project-id "866035409594" \
  --location "us" \
  --processor-id "c6f3830de84c6d96" \
  --file-path "/path/to/your/document.pdf" \
  --mime-type "application/pdf" \
  --credentials "/path/to/credentials.json"
```

### As a Library in Your Code

```python
from document_processor import DocumentAIProcessor

# Initialize the processor
processor = DocumentAIProcessor(
    project_id="866035409594",
    location="us",
    processor_id="c6f3830de84c6d96"
)

# Process a document
result = processor.process_document(
    file_path="/path/to/your/document.pdf"
)

# Access the extracted text and entities
text = result["text"]
entities = result["entities"]
```

## Supported Document Types

- PDF documents (`application/pdf`)
- TIFF images (`image/tiff`)
- GIF images (`image/gif`)
- JPEG images (`image/jpeg`)
- PNG images (`image/png`)
- BMP images (`image/bmp`)
- WEBP images (`image/webp`)
- HEIC images (`image/heic`)

## Troubleshooting

### Import Errors

If you see the error `Import "google.api_core.client_options" could not be resolved`:

1. **RECOMMENDED:** Use the new Python launcher which automatically resolves import and environment issues:
   ```bash
   python3 docai_launcher.py
   ```

2. Try using the Python installer which automatically handles various edge cases:
   ```bash
   python3 install_dependencies.py
   ```

3. Check if you're using a virtual environment and install packages there:
   ```bash
   python -m venv docai-env
   source docai-env/bin/activate  # On Windows: docai-env\Scripts\activate
   pip install -r requirements.txt
   ```

4. On some systems, you may need to use `pip3` instead of `pip`:
   ```bash
   pip3 install -r requirements.txt
   ```

5. If you're using VS Code, reload the window after installing packages to refresh the Pylance type checker.

### Virtual Environment Setup

Setting up a virtual environment is highly recommended to avoid conflicts:

```bash
# Create virtual environment
python -m venv docai-env

# Activate on macOS/Linux
source docai-env/bin/activate

# Activate on Windows
docai-env\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Other Issues

If you encounter other issues:

1. Verify your GCP credentials and permissions
2. Check that the Document AI API is enabled in your project
3. Ensure the processor ID and project ID are correct
4. Check the format of your document (should be one of the supported formats)
5. Check console output for detailed error messages

## Resources

- [Google Cloud Document AI Documentation](https://cloud.google.com/document-ai/docs)
- [Python Client for Document AI](https://cloud.google.com/python/docs/reference/documentai/latest) 