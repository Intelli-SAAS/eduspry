# Google Cloud Authentication Guide

This guide will help you set up authentication to use the Google Cloud Document AI API with the NotesSummarizer processor.

## Prerequisites

- A Google Cloud Platform (GCP) account
- A project with the Document AI API enabled
- The `gcloud` command-line tool installed (part of the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install))

## Authentication Methods

There are three main ways to authenticate with Google Cloud:

1. **Service Account Key (Recommended for development)**
2. **Application Default Credentials (ADC)**
3. **Workload Identity (for production deployments on GKE)**

## Method 1: Using a Service Account Key

This is the most straightforward method for development environments:

1. **Create a Service Account:**

   ```bash
   # Go to the Google Cloud Console: https://console.cloud.google.com/
   # Navigate to IAM & Admin > Service Accounts
   # Click "Create Service Account"
   # Give it a name like "document-ai-user"
   # Grant it the "Document AI Editor" role
   # Create the account
   ```

2. **Create and Download a Key:**

   ```bash
   # On the Service Account details page, go to the "Keys" tab
   # Click "Add Key" > "Create new key"
   # Choose JSON format and click "Create"
   # The key file will be automatically downloaded to your computer
   ```

3. **Set Environment Variable:**

   On macOS/Linux:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-key.json"
   ```

   On Windows (Command Prompt):
   ```cmd
   set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\your-service-account-key.json
   ```

   On Windows (PowerShell):
   ```powershell
   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your-service-account-key.json"
   ```

## Method 2: Using Application Default Credentials (ADC)

This is good for development on your local machine:

1. **Authenticate with your Google account:**

   ```bash
   gcloud auth application-default login
   ```

   This will open a browser window where you can log in with your Google account.

2. **Set the default project:**

   ```bash
   gcloud config set project 866035409594
   ```

## Method 3: Using a Temporary Key File (Quick Development)

For quick testing, you can create a temporary JSON key file:

1. Create a file named `key.json` in the project directory with the following content, replacing the placeholders with your actual values:

   ```json
   {
     "type": "service_account",
     "project_id": "866035409594",
     "private_key_id": "YOUR_PRIVATE_KEY_ID",
     "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
     "client_email": "your-service-account@866035409594.iam.gserviceaccount.com",
     "client_id": "YOUR_CLIENT_ID",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40866035409594.iam.gserviceaccount.com"
   }
   ```

2. Set the environment variable to point to this file:

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="./key.json"
   ```

## Testing Your Authentication

You can test your authentication by running:

```bash
python docai_launcher.py
```

If authentication is successful, you should see the Document AI processor running without credential errors.

## Troubleshooting

If you encounter authentication errors:

1. Ensure the service account has the necessary permissions (Document AI Editor role)
2. Verify that the GOOGLE_APPLICATION_CREDENTIALS environment variable is set correctly
3. Check that the Document AI API is enabled in your project
4. Ensure the processor ID is correct
5. If using ADC, make sure you're logged in with `gcloud auth application-default login`

For more detailed troubleshooting, see the [Google Cloud Authentication documentation](https://cloud.google.com/docs/authentication). 