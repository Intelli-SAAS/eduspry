import React, { useState } from 'react';
import { Check, ChevronDown, KeyRound, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ApiKeyDialog } from './api-key-dialog';
import { apiKeyService } from '@/services/apiKeyService';

export interface AIModel {
  id: string;
  name: string;
  description: string;
}

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onSelectModel,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [openApiKeyDialog, setOpenApiKeyDialog] = useState(false);
  const [currentModelForKey, setCurrentModelForKey] = useState<string>('');

  const selectedModelData = models.find(model => model.id === selectedModel);

  const handleModelSelect = (modelId: string) => {
    // If we don't have an API key for this model, prompt for one
    if (!apiKeyService.hasApiKey(modelId)) {
      setCurrentModelForKey(modelId);
      setOpenApiKeyDialog(true);
      return;
    }
    
    onSelectModel(modelId);
    setOpen(false);
  };

  const handleApiKeySave = (apiKey: string) => {
    apiKeyService.saveApiKey(currentModelForKey, apiKey);
    onSelectModel(currentModelForKey);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('w-[200px] justify-between', className)}
          >
            {selectedModelData?.name || 'Select model...'}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search model..." />
            <CommandList>
              <CommandEmpty>No model found.</CommandEmpty>
              <CommandGroup>
                {models.map(model => (
                  <CommandItem
                    key={model.id}
                    value={model.id}
                    onSelect={() => handleModelSelect(model.id)}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <span>{model.name}</span>
                    </div>
                    {selectedModel === model.id && <Check className="h-4 w-4" />}
                    {!apiKeyService.hasApiKey(model.id) && (
                      <KeyRound className="h-4 w-4 text-amber-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <ApiKeyDialog
        modelName={currentModelForKey}
        onApiKeySave={handleApiKeySave}
        open={openApiKeyDialog}
        onOpenChange={setOpenApiKeyDialog}
      />
    </>
  );
}; 