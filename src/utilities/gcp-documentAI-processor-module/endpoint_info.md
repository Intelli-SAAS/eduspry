# Document AI Processor Information

Based on the screenshot provided, here are the details of the NotesSummarizer processor:

## Processor Details

| Property | Value |
|----------|-------|
| Name | NotesSummarizer |
| ID | c0f3830de84c6d96 |
| Status | Enabled ✅ |
| Processor Type | Summarizer |
| Created | May 5, 2025, 2:02:49 AM |
| Encryption Type | Google-managed |
| Region | us |

## Prediction Endpoint

```
https://us-documentai.googleapis.com/v1/projects/866035409594/locations/us/processors/c0f3830de84c6d96:process
```

## Usage Notes

This processor is designed specifically for summarizing notes and documents. It's a Summarizer type processor that can extract key points from text documents.

When making API calls, ensure you're using the correct processor ID (`c0f3830de84c6d96`) and the appropriate project ID (`866035409594`).

## Direct API Call Example

You can directly call the API using curl (after setting up authentication):

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

Replace `BASE64_ENCODED_DOCUMENT_CONTENT` with the base64-encoded content of your document.