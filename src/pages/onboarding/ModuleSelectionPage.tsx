import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { TenantType, MODULE_OPTIONS, MODULES } from '@/types/onboarding';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ModuleSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, addModule, removeModule } = useOnboarding();
    const { user } = useAuth();

    // Redirect if tenant info is not provided
    React.useEffect(() => {
        if (!state.tenantType || !state.tenantInfo) {
            navigate('/onboarding/info');
        }
    }, [state.tenantType, state.tenantInfo, navigate]);

    const handleModuleToggle = (moduleId: string, checked: boolean) => {
        if (checked) {
            addModule(moduleId);
        } else {
            removeModule(moduleId);
        }
    };

    const handleContinue = () => {
        navigate('/onboarding/complete');
    };

    const handleCancel = () => {
        if (user) {
            // For existing users testing the flow, just go back to their dashboard
            navigate(-1);
        } else {
            // For new users, go back to the previous step
            navigate('/onboarding/info');
        }
    };

    if (!state.tenantType || !state.tenantInfo) {
        return null;
    }

    // For student plan, skip this page
    React.useEffect(() => {
        if (state.tenantType === TenantType.STUDENT) {
            navigate('/onboarding/complete');
        }
    }, [state.tenantType, navigate]);

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Customize Your Modules</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Select the modules you want to include in your subscription
                </p>
                {user && (
                    <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 rounded-md">
                        <p className="text-sm">
                            You are testing the onboarding flow as an existing user.
                        </p>
                    </div>
                )}
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Available Modules</CardTitle>
                    <CardDescription>
                        Choose the features that best suit your organization's needs
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.values(MODULE_OPTIONS).map((module) => {
                            const isSelected = state.selectedModules.includes(module.id);
                            const isMandatory = module.id === MODULES.courses; // Courses module is mandatory

                            return (
                                <div
                                    key={module.id}
                                    className={`p-4 border rounded-lg flex items-start ${isSelected ? 'bg-primary/5 border-primary/30' : ''
                                        }`}
                                >
                                    <Checkbox
                                        id={`module-${module.id}`}
                                        checked={isSelected}
                                        onCheckedChange={(checked) => {
                                            if (!isMandatory) {
                                                handleModuleToggle(module.id, checked as boolean);
                                            }
                                        }}
                                        disabled={isMandatory}
                                        className="mt-1"
                                    />
                                    <div className="ml-3">
                                        <label
                                            htmlFor={`module-${module.id}`}
                                            className="font-medium cursor-pointer"
                                        >
                                            {module.name}
                                            {isMandatory && (
                                                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                                    Required
                                                </span>
                                            )}
                                        </label>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                            {module.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Selected Modules</CardTitle>
                    <CardDescription>
                        Your subscription will include the following modules
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {state.selectedModules.map((moduleId) => (
                            <li key={moduleId} className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                <span>{MODULE_OPTIONS[moduleId]?.name}</span>
                            </li>
                        ))}
                        {Object.keys(MODULE_OPTIONS).map((moduleId) => {
                            if (!state.selectedModules.includes(moduleId)) {
                                return (
                                    <li key={moduleId} className="flex items-center text-gray-400">
                                        <X className="h-5 w-5 text-gray-300 mr-2" />
                                        <span>{MODULE_OPTIONS[moduleId]?.name}</span>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handleCancel}
                >
                    {user ? 'Cancel' : 'Back'}
                </Button>
                <Button onClick={handleContinue}>Continue</Button>
            </div>
        </div>
    );
};

export default ModuleSelectionPage; 