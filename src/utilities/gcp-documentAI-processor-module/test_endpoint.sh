#!/bin/bash
# Test script for directly calling the NotesSummarizer processor API endpoint

# Check if the sample document exists
if [ ! -f "./sample_docs/sample_notes.txt" ]; then
  echo "Creating sample document..."
  mkdir -p ./sample_docs
  echo "This is a test document with notes from a class. Today we learned about machine learning concepts including supervised and unsupervised learning. Key points included feature selection, model evaluation, and avoiding overfitting. The instructor emphasized the importance of cross-validation and testing on independent datasets." > ./sample_docs/sample_notes.txt
fi

# Encode the file content as base64
DOCUMENT_CONTENT=$(cat ./sample_docs/sample_notes.txt | base64)
echo "Encoded document content for API request"

# Get the access token (requires gcloud CLI and authentication)
ACCESS_TOKEN=$(gcloud auth application-default print-access-token)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "Failed to get access token. Please run 'gcloud auth application-default login' first."
  exit 1
fi

echo "Got access token for authentication"
echo "Calling NotesSummarizer API endpoint..."

# Make the API call
curl -s -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  https://us-documentai.googleapis.com/v1/projects/866035409594/locations/us/processors/c0f3830de84c6d96:process \
  -d '{
    "rawDocument": {
      "content": "'"${DOCUMENT_CONTENT}"'",
      "mimeType": "text/plain"
    }
  }' | tee api_response.json

echo -e "\n\nAPI response saved to api_response.json"
echo "========================================"
echo "Summary from the response (if available):"
# Try to extract the summary using jq if available, otherwise grep
if command -v jq &> /dev/null; then
  jq -r '.document.entities[] | select(.type_ | contains("summary")) | .mentionText' api_response.json 2>/dev/null || echo "No summary found in the response"
else
  grep -A 1 "\"type_\": \"summary\"" api_response.json 2>/dev/null || echo "No summary found in the response"
fi 