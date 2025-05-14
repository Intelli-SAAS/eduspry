/**
 * Service for managing API keys in local storage
 */

export interface ModelAPIConfig {
  modelId: string;
  apiKey: string;
  lastUsed?: string;
}

const API_KEYS_STORAGE_KEY = 'eduspry_api_keys';

export const apiKeyService = {
  /**
   * Save an API key for a specific model
   */
  saveApiKey(modelId: string, apiKey: string): void {
    const existingKeysJson = localStorage.getItem(API_KEYS_STORAGE_KEY);
    const existingKeys: ModelAPIConfig[] = existingKeysJson ? JSON.parse(existingKeysJson) : [];
    
    // Check if model already has a key
    const modelIndex = existingKeys.findIndex(config => config.modelId === modelId);
    
    if (modelIndex >= 0) {
      // Update existing key
      existingKeys[modelIndex] = {
        ...existingKeys[modelIndex],
        apiKey,
        lastUsed: new Date().toISOString()
      };
    } else {
      // Add new key
      existingKeys.push({
        modelId,
        apiKey,
        lastUsed: new Date().toISOString()
      });
    }
    
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(existingKeys));
  },
  
  /**
   * Get API key for a specific model
   */
  getApiKey(modelId: string): string | null {
    const existingKeysJson = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (!existingKeysJson) return null;
    
    const existingKeys: ModelAPIConfig[] = JSON.parse(existingKeysJson);
    const modelConfig = existingKeys.find(config => config.modelId === modelId);
    
    return modelConfig?.apiKey || null;
  },
  
  /**
   * Check if a model has an API key
   */
  hasApiKey(modelId: string): boolean {
    return !!this.getApiKey(modelId);
  },
  
  /**
   * Delete API key for a specific model
   */
  deleteApiKey(modelId: string): void {
    const existingKeysJson = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (!existingKeysJson) return;
    
    const existingKeys: ModelAPIConfig[] = JSON.parse(existingKeysJson);
    const updatedKeys = existingKeys.filter(config => config.modelId !== modelId);
    
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(updatedKeys));
  },
  
  /**
   * Get all stored API keys
   */
  getAllApiKeys(): ModelAPIConfig[] {
    const existingKeysJson = localStorage.getItem(API_KEYS_STORAGE_KEY);
    return existingKeysJson ? JSON.parse(existingKeysJson) : [];
  }
}; 