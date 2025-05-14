# Document AI Module Troubleshooting Guide

## Common Issues and Solutions

### TypeScript Declaration File Missing

**Issue**: TypeScript error when importing from `./node_integration`:
```
Could not find a declaration file for module './node_integration'. '/path/to/node_integration.js' implicitly has an 'any' type.
```

**Solution**: 
- A TypeScript declaration file `node_integration.d.ts` has been created to provide type definitions
- This file defines the interface for the `DocumentAIProcessor` class and its methods

### Python Dependencies Missing

**Issue**: Import errors for Google Cloud libraries:
```
Import "google.cloud.documentai_v1" could not be resolved
Import "google.api_core.client_options" could not be resolved
```

**Solution**:
1. Run the installation script to set up a virtual environment with all required dependencies:
   ```bash
   ./install_dependencies.sh
   ```

2. Alternatively, install the dependencies manually:
   ```bash
   python3 -m venv docai-env
   source docai-env/bin/activate  # On Windows: docai-env\Scripts\activate
   pip install -r requirements.txt
   ```

### IDE Integration (VS Code Pylance/Pyright Errors)

**Issue**: Even after installing dependencies in the virtual environment, your IDE (like VS Code) still shows import errors.

**Solution**:

1. Install dependencies globally for development:
   ```bash
   ./install_dev_dependencies.sh
   ```

2. Configure VS Code to use the virtual environment:
   - We've added a `.vscode/settings.json` file that configures VS Code to use the virtual environment
   - We've also added a `pyrightconfig.json` file to configure Pylance/Pyright

3. Reload your VS Code window after running the installation script

4. If you're still seeing errors, try selecting the Python interpreter manually:
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Python: Select Interpreter"
   - Choose the interpreter from the docai-env virtual environment

### Virtual Environment Issues

If you're still experiencing issues with Python dependencies:

1. Make sure the virtual environment is activated before running any Python scripts
2. Verify the environment has all required packages:
   ```bash
   source docai-env/bin/activate
   python -c "import google.cloud.documentai_v1; import google.api_core.client_options; print('Imports successful')"
   ```

3. Try reinstalling the dependencies with:
   ```bash
   pip install --upgrade google-cloud-documentai google-api-core google-auth
   ```

## Using the Module

After fixing the issues:

1. For TypeScript/JavaScript usage:
   ```typescript
   import { DocumentAIProcessor } from './utilities/gcp-documentAI-processor-module';
   
   const processor = new DocumentAIProcessor({
     projectId: '866035409594',
     location: 'us',
     processorId: 'c0f3830de84c6d96'
   });
   
   const result = await processor.processDocument('/path/to/document.pdf');
   ```

2. For Python usage:
   ```python
   from document_processor import DocumentAIProcessor
   
   processor = DocumentAIProcessor(
       project_id="866035409594",
       location="us",
       processor_id="c0f3830de84c6d96"
   )
   
   result = processor.process_document("/path/to/document.pdf")
   ``` 