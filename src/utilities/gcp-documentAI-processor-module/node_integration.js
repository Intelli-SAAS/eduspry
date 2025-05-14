/**
 * Node.js Integration for Google Cloud Document AI
 * 
 * This module provides a JavaScript interface to the Python Document AI processor module.
 * It uses child_process to execute the Python scripts and communicate with them.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class DocumentAIProcessor {
  /**
   * Initialize the Document AI processor
   * @param {Object} options Configuration options
   * @param {string} options.projectId GCP project ID
   * @param {string} options.location Processor location (e.g., 'us')
   * @param {string} options.processorId Document AI processor ID
   * @param {string} [options.credentialsPath] Path to service account key file
   * @param {boolean} [options.debug] Enable debug logging
   */
  constructor(options = {}) {
    this.options = options;
    this.modulePath = __dirname;
    
    // Validate required options
    if (!options.projectId) throw new Error('projectId is required');
    if (!options.location) throw new Error('location is required');
    if (!options.processorId) throw new Error('processorId is required');
    
    this.debug = options.debug || false;
    if (this.debug) {
      console.log('Document AI Processor initialized with options:', options);
      console.log('Module path:', this.modulePath);
    }
  }

  /**
   * Process a document using Document AI
   * @param {string} filePath Path to the document file
   * @param {string} [mimeType='application/pdf'] MIME type of the document
   * @returns {Promise<Object>} Processing results
   */
  async processDocument(filePath, mimeType = 'application/pdf') {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    return new Promise((resolve, reject) => {
      // Create a temporary configuration file for the Python script
      const configPath = path.join(this.modulePath, 'temp_config.json');
      const config = {
        project_id: this.options.projectId,
        location: this.options.location,
        processor_id: this.options.processorId,
        file_path: filePath,
        mime_type: mimeType,
        credentials_path: this.options.credentialsPath || null
      };
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      
      // Get the Python executable path - use the launcher which handles env issues
      const pythonScript = path.join(this.modulePath, 'docai_launcher.py');
      
      if (this.debug) {
        console.log('Launching Python script:', pythonScript);
        console.log('With config:', config);
      }
      
      // Execute the Python script
      const pythonProcess = spawn('python3', [pythonScript, configPath]);
      
      let stdoutData = '';
      let stderrData = '';
      
      pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        stdoutData += output;
        if (this.debug) console.log('Python output:', output);
      });
      
      pythonProcess.stderr.on('data', (data) => {
        const error = data.toString();
        stderrData += error;
        if (this.debug) console.error('Python error:', error);
      });
      
      pythonProcess.on('close', (code) => {
        // Clean up the temporary config file
        try {
          fs.unlinkSync(configPath);
        } catch (err) {
          console.warn('Failed to clean up temporary config file:', err);
        }
        
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}: ${stderrData}`));
        } else {
          try {
            // Try to extract JSON result from stdout
            const resultMatch = stdoutData.match(/RESULT_JSON_START([\s\S]*?)RESULT_JSON_END/);
            if (resultMatch && resultMatch[1]) {
              const jsonResult = JSON.parse(resultMatch[1].trim());
              resolve(jsonResult);
            } else {
              // If no JSON found, just return the output
              resolve({ 
                raw_output: stdoutData,
                success: true
              });
            }
          } catch (err) {
            reject(new Error(`Failed to parse Python output: ${err.message}`));
          }
        }
      });
    });
  }
}

module.exports = { DocumentAIProcessor }; 