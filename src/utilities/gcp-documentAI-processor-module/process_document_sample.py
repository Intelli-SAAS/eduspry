#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Sample script to process a document using Google Cloud Document AI.
"""

import os
import sys
import json

# Add the current directory to sys.path to ensure module can be found
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Try importing dependencies, handle gracefully if not installed
try:
    from document_processor import DocumentAIProcessor
except ImportError as e:
    print(f"\n❌ Error: Required dependencies not found: {e}")
    print("Please install the required dependencies first:")
    print("\n1. Using the Python launcher (recommended):")
    print("   python3 docai_launcher.py")
    print("\n2. Using the Python installer:")
    print("   python3 install_dependencies.py")
    print("\n3. Or manually:")
    print("   pip install google-cloud-documentai google-api-core google-auth google-cloud-core")
    print("\nFor more details, see the README.md file.")
    sys.exit(1)

def process_from_config(config_file):
    """Process a document using configuration from a JSON file."""
    try:
        with open(config_file, 'r') as f:
            config = json.load(f)
        
        # Extract configuration values
        project_id = config.get('project_id')
        location = config.get('location')
        processor_id = config.get('processor_id')
        file_path = config.get('file_path')
        mime_type = config.get('mime_type', 'application/pdf')
        credentials_path = config.get('credentials_path')
        
        # Validate required parameters
        if not all([project_id, location, processor_id, file_path]):
            missing = []
            if not project_id: missing.append('project_id')
            if not location: missing.append('location')
            if not processor_id: missing.append('processor_id')
            if not file_path: missing.append('file_path')
            print(f"❌ Error: Missing required configuration values: {', '.join(missing)}")
            sys.exit(1)
        
        # Check if the file exists
        if not os.path.exists(file_path):
            print(f"❌ Error: File not found: {file_path}")
            sys.exit(1)
            
        # Initialize the processor
        processor = DocumentAIProcessor(
            project_id=project_id,
            location=location,
            processor_id=processor_id,
            credentials_path=credentials_path
        )
        
        print(f"Processing document: {file_path}")
        print(f"Using processor ID: {processor_id}")
        
        # Process the document
        result = processor.process_document(
            file_path=file_path,
            mime_type=mime_type
        )
        
        # Print results
        print("\n🎉 Document Processing Results:")
        print(f"Number of pages: {result['pages']}")
        print(f"MIME type: {result['mime_type']}")
        
        # Print summary if available (for NotesSummarizer processor)
        if 'summary' in result:
            print("\n📝 Document Summary:")
            print(result['summary'])
        
        # Print extracted text (first 500 characters)
        print("\n📄 Extracted Text Sample:")
        if result['text']:
            print(f"{result['text'][:500]}...")
        else:
            print("No text extracted.")
        
        # Print entities if any
        if result['entities']:
            print("\n🔍 Extracted Entities:")
            for i, entity in enumerate(result['entities'][:10]):
                print(f"{i+1}. {entity['type']}: {entity['mention_text']} (confidence: {entity['confidence']:.2f})")
        else:
            print("\nNo entities extracted.")
            
        # Output JSON result for Node.js integration
        print("\nRESULT_JSON_START")
        print(json.dumps(result))
        print("RESULT_JSON_END")
        
        return result
        
    except Exception as e:
        print(f"\n❌ Error processing document: {e}")
        print("\nTroubleshooting tips:")
        print("1. Make sure you have the Google Cloud SDK installed and configured")
        print("2. Verify your GCP credentials and permissions")
        print("3. Check that the processor ID and project ID are correct")
        print("4. Ensure the Document AI API is enabled in your GCP project")
        print("5. Set up authentication with GOOGLE_APPLICATION_CREDENTIALS environment variable:")
        if os.name == 'nt':  # Windows
            print("   set GOOGLE_APPLICATION_CREDENTIALS=C:\\path\\to\\your\\service-account-key.json")
        else:  # macOS/Linux
            print("   export GOOGLE_APPLICATION_CREDENTIALS=\"/path/to/your/service-account-key.json\"")
        sys.exit(1)

def process_sample_document():
    """Process a sample document using the Document AI processor."""
    
    # Configuration values from the screenshot
    project_id = "866035409594"
    location = "us"
    processor_id = "c0f3830de84c6d96"  # NotesSummarizer processor
    
    # Path to the document file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "sample_docs", "sample_notes.txt")
    
    # Path to GCP service account credentials (if needed)
    credentials_path = None  # Update if you have a credentials file
    
    # Check if the file exists
    if not os.path.exists(file_path):
        print(f"Error: File not found: {file_path}")
        print("\nMake sure you have created the sample_docs directory and sample_notes.txt file:")
        print("mkdir -p ./sample_docs")
        print("echo 'Your notes text...' > ./sample_docs/sample_notes.txt")
        sys.exit(1)
    
    try:
        # Initialize the processor
        processor = DocumentAIProcessor(
            project_id=project_id,
            location=location,
            processor_id=processor_id,
            credentials_path=credentials_path
        )
        
        print(f"Processing document: {file_path}")
        print(f"Using NotesSummarizer processor (ID: {processor_id})")
        
        # Process the document
        result = processor.process_document(
            file_path=file_path,
            mime_type="text/plain"  # Using text/plain for our text file
        )
        
        # Print results
        print("\n🎉 Document Processing Results:")
        print(f"Number of pages: {result['pages']}")
        print(f"MIME type: {result['mime_type']}")
        
        # Print summary if available (for NotesSummarizer processor)
        if 'summary' in result:
            print("\n📝 Document Summary:")
            print(result['summary'])
        
        # Print extracted text (first 500 characters)
        print("\n📄 Extracted Text Sample:")
        if result['text']:
            print(f"{result['text'][:500]}...")
        else:
            print("No text extracted.")
        
        # Print entities if any
        if result['entities']:
            print("\n🔍 Extracted Entities:")
            for i, entity in enumerate(result['entities'][:10]):
                print(f"{i+1}. {entity['type']}: {entity['mention_text']} (confidence: {entity['confidence']:.2f})")
        else:
            print("\nNo entities extracted.")
            
    except Exception as e:
        print(f"\n❌ Error processing document: {e}")
        print("\nTroubleshooting tips:")
        print("1. Make sure you have the Google Cloud SDK installed and configured")
        print("2. Verify your GCP credentials and permissions")
        print("3. Check that the processor ID and project ID are correct")
        print("4. Ensure the Document AI API is enabled in your GCP project")
        print("5. Set up authentication with GOOGLE_APPLICATION_CREDENTIALS environment variable:")
        if os.name == 'nt':  # Windows
            print("   set GOOGLE_APPLICATION_CREDENTIALS=C:\\path\\to\\your\\service-account-key.json")
        else:  # macOS/Linux
            print("   export GOOGLE_APPLICATION_CREDENTIALS=\"/path/to/your/service-account-key.json\"")

if __name__ == "__main__":
    # Check if a config file was provided as argument
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        process_from_config(sys.argv[1])
    else:
        process_sample_document() 