import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound } from 'lucide-react';

interface ApiKeyDialogProps {
  modelName: string;
  onApiKeySave: (apiKey: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  modelName,
  onApiKeySave,
  open,
  onOpenChange,
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  
  const modelNameMap: Record<string, string> = {
    'gpt-4o': 'OpenAI GPT-4o',
    'gemini-2.0': 'Google Gemini 2.0',
    'claude': 'Anthropic Claude',
    'deepseek-r1': 'DeepSeek-R1',
    'deepseek-v3': 'DeepSeek-V3'
  };
  
  const modelInstructions: Record<string, string> = {
    'gpt-4o': 'Visit https://platform.openai.com/api-keys to get your OpenAI API key.',
    'gemini-2.0': 'Visit https://ai.google.dev/tutorials/api_key to get your Google AI API key.',
    'claude': 'Visit https://console.anthropic.com/settings/keys to get your Anthropic API key.',
    'deepseek-r1': 'Visit https://platform.deepseek.com to get your DeepSeek API key.',
    'deepseek-v3': 'Visit https://platform.deepseek.com to get your DeepSeek API key.'
  };
  
  const handleSave = () => {
    if (apiKey.trim()) {
      onApiKeySave(apiKey.trim());
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter API Key for {modelNameMap[modelName] || modelName}</DialogTitle>
          <DialogDescription>
            Your API key is required to use this model. Your key is stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              {modelInstructions[modelName] || `Please provide a valid API key for ${modelName}.`}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!apiKey.trim()}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 