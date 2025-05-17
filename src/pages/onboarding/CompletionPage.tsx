import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { tenantService } from '@/services/tenantService';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { CheckCircle, Loader2, ArrowRight, Building, GraduationCap, Globe, Sparkles, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import OnboardingLayout from '@/components/layout/OnboardingLayout';
import { motion } from 'framer-motion';
import { TenantType, MODULE_OPTIONS } from '@/types/onboarding';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';

const CompletionPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, resetOnboarding } = useOnboarding();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Redirect if tenant info is not provided
    React.useEffect(() => {
        if (!state.tenantType || !state.tenantInfo) {
            navigate('/onboarding/type');
        }
    }, [state.tenantType, state.tenantInfo, navigate]);

    // Trigger confetti when complete
    React.useEffect(() => {
        if (isComplete) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Since particles fall down, start a bit higher than random
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isComplete]);

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

            setIsComplete(true);

            // Wait a bit to show the success state before redirecting
            setTimeout(() => {
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
            }, 3000);
        } catch (error) {
            console.error('Error during onboarding completion:', error);
            toast({
                title: 'Setup Failed',
                description: 'There was an error setting up your account. Please try again.',
                variant: 'destructive',
            });
            setIsProcessing(false);
        }
    };

    if (!state.tenantType || !state.tenantInfo) {
        return null;
    }

    // Get icon based on tenant type
    const getTenantIcon = () => {
        switch (state.tenantType) {
            case TenantType.STUDENT:
                return <GraduationCap className="h-12 w-12 text-primary" />;
            case TenantType.EDTECH:
                return <Globe className="h-12 w-12 text-primary" />;
            default:
                return <Building className="h-12 w-12 text-primary" />;
        }
    };

    // Get description based on tenant type
    const getTenantDescription = () => {
        switch (state.tenantType) {
            case TenantType.STUDENT:
                return "Your student account is ready to be created. You'll have access to courses and learning materials tailored to your needs.";
            case TenantType.EDTECH:
                return "Your EdTech platform is ready to be launched. You'll be able to create and sell courses, manage students, and grow your online education business.";
            default:
                return "Your educational institution's platform is ready to be set up. You'll have access to all the tools you need to manage your organization.";
        }
    };

    return (
        <OnboardingLayout
            title={isComplete ? "Setup Complete!" : "Complete Your Setup"}
            description={isComplete
                ? "Your account has been successfully created"
                : "Review your information and complete your account setup"
            }
            showBackButton={!isProcessing && !isComplete}
            backButtonDestination="/onboarding/modules"
            customFooter={
                isComplete ? (
                    <div className="flex justify-center">
                        <Button
                            onClick={() => {
                                resetOnboarding();
                                if (user) {
                                    navigate(-1);
                                } else {
                                    navigate('/app');
                                }
                            }}
                            className="gap-2"
                        >
                            Go to Dashboard
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-between">
                        {!isProcessing && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/onboarding/modules')}
                                disabled={isProcessing}
                            >
                                Back
                            </Button>
                        )}
                        <div className="flex-1" />
                        <Button
                            onClick={handleComplete}
                            disabled={isProcessing}
                            className="gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Setting up your account...
                                </>
                            ) : (
                                <>
                                    Complete Setup
                                    <Zap className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                )
            }
        >
            {isComplete ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="bg-primary/20 rounded-full p-6"
                        >
                            <CheckCircle className="h-16 w-16 text-primary" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute -top-2 -right-2"
                        >
                            <Sparkles className="h-6 w-6 text-yellow-500" />
                        </motion.div>
                    </div>

                    <motion.h2
                        className="text-2xl font-bold mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome to EduSpry!
                    </motion.h2>

                    <motion.p
                        className="text-muted-foreground mb-8 max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Your account has been created successfully. You can now access all the features and start using the platform.
                    </motion.p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="border-2 shadow-lg">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        {getTenantIcon()}
                                        <div>
                                            <h3 className="text-lg font-semibold">{state.tenantInfo.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {state.tenantType === TenantType.STUDENT
                                                    ? 'Student Account'
                                                    : state.tenantType === TenantType.EDTECH
                                                        ? 'EdTech Platform'
                                                        : 'Educational Institution'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4">
                                        {getTenantDescription()}
                                    </p>

                                    <div className="space-y-3">
                                        {state.tenantInfo.email && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Email:</span>
                                                <span className="font-medium">{state.tenantInfo.email}</span>
                                            </div>
                                        )}

                                        {state.tenantInfo.phone && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Phone:</span>
                                                <span className="font-medium">{state.tenantInfo.phone}</span>
                                            </div>
                                        )}

                                        {state.tenantInfo.domain && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Domain:</span>
                                                <span className="font-medium">{state.tenantInfo.domain}.eduspry.com</span>
                                            </div>
                                        )}

                                        {state.tenantInfo.contactPerson && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Contact Person:</span>
                                                <span className="font-medium">{state.tenantInfo.contactPerson}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        Selected Modules
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {state.selectedModules.map((moduleId) => (
                                            <Badge key={moduleId} variant="outline" className="bg-primary/5">
                                                {MODULE_OPTIONS[moduleId]?.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="text-sm font-medium mb-2">Next steps after setup:</h4>
                                        <ul className="space-y-2 text-sm">
                                            {state.tenantType === TenantType.STUDENT ? (
                                                <>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                                                        <span>Browse available courses and start learning</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                                                        <span>Set up your profile and learning preferences</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                                                        <span>Explore AI learning tools to enhance your studies</span>
                                                    </li>
                                                </>
                                            ) : state.tenantType === TenantType.EDTECH ? (
                                                <>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                                                        <span>Create your first course and add content</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                                                        <span>Customize your platform branding and appearance</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                                                        <span>Set up payment methods to start selling courses</span>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                                                        <span>Invite teachers and staff to join your platform</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                                                        <span>Create departments and assign administrators</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="bg-primary/20 text-primary rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                                                        <span>Set up courses and invite students to enroll</span>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </OnboardingLayout>
    );
};

export default CompletionPage; 