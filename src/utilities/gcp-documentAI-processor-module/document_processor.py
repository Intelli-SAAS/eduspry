#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Google Cloud Document AI Processor Module

This module provides functionality to interact with Google Cloud Document AI
for processing documents like PDFs, scanned images, and more.

Dependencies:
    Before using this module, install the required packages:
    pip install -r requirements.txt
    
    If you're still seeing import errors, try installing the specific dependency:
    pip install google-api-core google-cloud-documentai
"""

import os
import argparse
from typing import Optional, Dict, Any, List

from google.cloud import documentai_v1 as documentai
from google.api_core.client_options import ClientOptions

class DocumentAIProcessor:
    """Class for interacting with Google Cloud Document AI processor."""
    
    def __init__(
        self, 
        project_id: str,
        location: str,
        processor_id: str,
        credentials_path: Optional[str] = None
    ):
        """
        Initialize the Document AI processor client.
        
        Args:
            project_id: GCP project ID
            location: Location of the processor (e.g., 'us', 'eu')
            processor_id: Document AI processor ID
            credentials_path: Path to service account credentials JSON file
        """
        self.project_id = project_id
        self.location = location
        self.processor_id = processor_id
        
        # Set credentials if provided
        if credentials_path:
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path
        
        # Initialize Document AI client
        client_options = ClientOptions(
            api_endpoint=f"{location}-documentai.googleapis.com"
        )
        self.client = documentai.DocumentProcessorServiceClient(
            client_options=client_options
        )
        
        # Processor name (full resource path)
        self.processor_name = self.client.processor_path(
            project_id, location, processor_id
        )
    
    def extract_summary(self, document) -> Optional[str]:
        """
        Extract summary from document for NotesSummarizer processor.
        
        Args:
            document: DocumentAI document object
            
        Returns:
            String summary if found, None otherwise
        """
        # Check if document has document_type field which might contain summary
        if hasattr(document, 'document_type') and document.document_type == 'notes_summary':
            # Try to extract summary from entities or text segments
            for entity in document.entities:
                if entity.type_ == 'summary':
                    return entity.mention_text
        
        # Check for special entity types or custom fields
        summaries = []
        for entity in document.entities:
            if 'summary' in entity.type_.lower():
                summaries.append(entity.mention_text)
        
        if summaries:
            return "\n".join(summaries)
            
        # If no explicit summary entity, check page-level properties
        for page in document.pages:
            for block in page.blocks:
                if hasattr(block, 'block_type') and 'summary' in str(block.block_type).lower():
                    return block.layout.text_anchor.content
                    
        return None
    
    def extract_entities(self, document) -> List[Dict[str, Any]]:
        """
        Extract entities from document.
        
        Args:
            document: DocumentAI document object
            
        Returns:
            List of entity dictionaries
        """
        entities = []
        
        for entity in document.entities:
            # Skip summary entities as they're handled separately
            if 'summary' in entity.type_.lower():
                continue
                
            entities.append({
                "type": entity.type_,
                "mention_text": entity.mention_text,
                "confidence": entity.confidence
            })
            
        return entities
    
    def process_document(
        self, 
        file_path: str, 
        mime_type: str = "application/pdf"
    ) -> Dict[str, Any]:
        """
        Process a document using Document AI.
        
        Args:
            file_path: Path to the document file
            mime_type: MIME type of the document (default: 'application/pdf')
            
        Returns:
            Dict containing the processed document information
        """
        # Read the file
        with open(file_path, "rb") as f:
            document_content = f.read()
        
        # Create the document object
        raw_document = documentai.RawDocument(
            content=document_content, mime_type=mime_type
        )
        
        # Configure the process request
        request = documentai.ProcessRequest(
            name=self.processor_name,
            raw_document=raw_document
        )
        
        # Process the document
        response = self.client.process_document(request=request)
        document = response.document
        
        # Extract summary if available (for NotesSummarizer processor)
        summary = self.extract_summary(document)
        
        # Create base result
        result = {
            "text": document.text,
            "pages": len(document.pages),
            "entities": self.extract_entities(document),
            "mime_type": document.mime_type,
        }
        
        # Add summary if found
        if summary:
            result["summary"] = summary
            
        return result

def main():
    """Command-line interface for the Document AI processor."""
    parser = argparse.ArgumentParser(
        description="Process documents using Google Cloud Document AI"
    )
    parser.add_argument("--project-id", required=True, help="GCP Project ID")
    parser.add_argument("--location", required=True, help="Processor location (e.g., 'us')")
    parser.add_argument("--processor-id", required=True, help="Document AI processor ID")
    parser.add_argument("--file-path", required=True, help="Path to document file")
    parser.add_argument("--mime-type", default="application/pdf", help="Document MIME type")
    parser.add_argument("--credentials", help="Path to service account credentials JSON")
    
    args = parser.parse_args()
    
    processor = DocumentAIProcessor(
        project_id=args.project_id,
        location=args.location,
        processor_id=args.processor_id,
        credentials_path=args.credentials
    )
    
    result = processor.process_document(
        file_path=args.file_path,
        mime_type=args.mime_type
    )
    
    print("Document Processing Results:")
    print(f"Number of pages: {result['pages']}")
    print(f"MIME type: {result['mime_type']}")
    
    if 'summary' in result:
        print("\nDocument Summary:")
        print(result['summary'])
    
    print(f"\nExtracted text (first 500 chars): {result['text'][:500]}...")
    
    if result['entities']:
        print("\nExtracted Entities:")
        for entity in result['entities'][:10]:  # Show first 10 entities
            print(f"- {entity['type']}: {entity['mention_text']} (confidence: {entity['confidence']:.2f})")

if __name__ == "__main__":
    main() 