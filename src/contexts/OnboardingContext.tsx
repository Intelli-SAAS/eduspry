import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingState, TenantType, MODULES } from '@/types/onboarding';

interface OnboardingContextType {
    state: OnboardingState;
    setTenantType: (type: TenantType) => void;
    setTenantInfo: (info: OnboardingState['tenantInfo']) => void;
    addModule: (moduleId: string) => void;
    removeModule: (moduleId: string) => void;
    setModules: (moduleIds: string[]) => void;
    resetOnboarding: () => void;
}

const defaultOnboardingState: OnboardingState = {
    tenantType: null,
    tenantInfo: null,
    selectedModules: [MODULES.courses], // Courses module is always included
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<OnboardingState>(defaultOnboardingState);

    const setTenantType = (type: TenantType) => {
        setState(prev => ({ ...prev, tenantType: type }));
    };

    const setTenantInfo = (info: OnboardingState['tenantInfo']) => {
        setState(prev => ({ ...prev, tenantInfo: info }));
    };

    const addModule = (moduleId: string) => {
        setState(prev => ({
            ...prev,
            selectedModules: [...prev.selectedModules, moduleId]
        }));
    };

    const removeModule = (moduleId: string) => {
        setState(prev => ({
            ...prev,
            selectedModules: prev.selectedModules.filter(id => id !== moduleId)
        }));
    };

    const setModules = (moduleIds: string[]) => {
        setState(prev => ({
            ...prev,
            selectedModules: moduleIds
        }));
    };

    const resetOnboarding = () => {
        setState(defaultOnboardingState);
    };

    return (
        <OnboardingContext.Provider
            value={{
                state,
                setTenantType,
                setTenantInfo,
                addModule,
                removeModule,
                setModules,
                resetOnboarding
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
}; 