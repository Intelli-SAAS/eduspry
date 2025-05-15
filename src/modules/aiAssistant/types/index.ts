export type AssistantMessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM';

export interface AssistantMessage {
    id: string;
    conversationId: string;
    role: AssistantMessageRole;
    content: string;
    timestamp: Date;
}

export interface AssistantConversation {
    id: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AssistantFeature {
    id: string;
    name: string;
    description: string;
    isEnabled: boolean;
} 