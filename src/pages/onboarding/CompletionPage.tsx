import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { tenantService } from '@/services/tenantService';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CompletionPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, resetOnboarding } = useOnboarding();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect if tenant info is not provided
    React.useEffect(() => {
        if (!state.tenantType || !state.tenantInfo) {
            navigate('/onboarding/type');
        }
    }, [state.tenantType, state.tenantInfo, navigate]);

    const handleComplete = async () => {
        if (!state.tenantType || !state.tenantInfo) return;

        setIsProcessing(true);

        try {
            // Create tenant
            const tenant = await tenantService.createTenant({
                name: state.tenantInfo.name,
                type: state.tenantType,
                contactPerson: state.tenantInfo.contactPerson,
                domain: state.tenantInfo.domain,
                phone: state.tenantInfo.phone,
                email: state.tenantInfo.email,
            });

            // If user is already logged in, assign them to the new tenant
            if (user) {
                await tenantService.assignUserToTenant(
                    user.id,
                    tenant.id,
                    UserRole.ADMIN
                );
            }

            // Configure modules
            await tenantService.configureTenantModules(
                tenant.id,
                state.selectedModules
            );

            toast({
                title: 'Setup Complete',
                description: 'Your account has been successfully set up.',
            });

            // Reset onboarding state
            resetOnboarding();

            // Navigate based on user state
            if (user) {
                // If testing with an existing user, go back to their dashboard
                navigate(-1);
            } else {
                // For new users, go to the app entry point
                navigate('/app');
            }
        } catch (error) {
            console.error('Error during onboarding completion:', error);
            toast({
                title: 'Setup Failed',
                description: 'There was an error setting up your account. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        // For existing users testing the flow, just go back
        if (user) {
            resetOnboarding();
            navigate(-1);
        } else {
            // For new users, redirect to login
            resetOnboarding();
            navigate('/login');
        }
    };

    if (!state.tenantType || !state.tenantInfo) {
        return null;
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Complete Your Setup</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Review your information and complete your account setup
                </p>
                {user && (
                    <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 rounded-md">
                        <p className="text-sm">
                            You are testing the onboarding flow as an existing user.
                            This will create a new tenant configuration.
                        </p>
                    </div>
                )}
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Account Summary</CardTitle>
                    <CardDescription>
                        Please review your account information before proceeding
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">Account Type</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {state.tenantType.charAt(0).toUpperCase() + state.tenantType.slice(1)} Account
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">
                                {state.tenantType === 'student' ? 'Name' : 'Organization'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{state.tenantInfo.name}</p>
                        </div>

                        {state.tenantInfo.contactPerson && (
                            <div>
                                <h3 className="font-medium">Contact Person</h3>
                                <p className="text-gray-600 dark:text-gray-400">{state.tenantInfo.contactPerson}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-gray-600 dark:text-gray-400">{state.tenantInfo.email}</p>
                        </div>

                        {state.tenantInfo.phone && (
                            <div>
                                <h3 className="font-medium">Phone</h3>
                                <p className="text-gray-600 dark:text-gray-400">{state.tenantInfo.phone}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-medium">Selected Modules</h3>
                            <ul className="mt-2 space-y-1">
                                {state.selectedModules.map((moduleId) => (
                                    <li key={moduleId} className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        <span className="capitalize">{moduleId}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isProcessing}
                    >
                        {user ? 'Cancel' : 'Back'}
                    </Button>
                    <Button
                        onClick={handleComplete}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Setting up...
                            </>
                        ) : (
                            'Complete Setup'
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CompletionPage; 