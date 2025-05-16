import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    showBackButton?: boolean;
    backButtonDestination?: string;
    customFooter?: ReactNode;
}

const ONBOARDING_STEPS = [
    { path: '/onboarding/type', label: 'Account Type' },
    { path: '/onboarding/info', label: 'Profile Setup' },
    { path: '/onboarding/modules', label: 'Features' },
    { path: '/onboarding/complete', label: 'Complete' },
];

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    children,
    title,
    description,
    showBackButton = true,
    backButtonDestination,
    customFooter,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = useOnboarding();
    const { user } = useAuth();

    // Calculate current step
    const currentStepIndex = ONBOARDING_STEPS.findIndex(step => step.path === location.pathname);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const handleBack = () => {
        if (backButtonDestination) {
            navigate(backButtonDestination);
        } else if (user) {
            navigate(-1);
        } else if (currentStepIndex > 0) {
            navigate(ONBOARDING_STEPS[currentStepIndex - 1].path);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background/0 py-10 px-4">
            <motion.div
                className="container mx-auto max-w-5xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Logo */}
                <motion.div
                    className="mb-8 flex justify-center"
                    variants={itemVariants}
                >
                    <img src="/logo-dark.svg" alt="EduSpry" className="h-10 dark:hidden" />
                    <img src="/logo-light.svg" alt="EduSpry" className="h-10 hidden dark:block" />
                </motion.div>

                {/* Progress Tracker */}
                <motion.div
                    className="mb-10 px-4"
                    variants={itemVariants}
                >
                    <div className="flex justify-between items-center relative">
                        <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted -z-10" />

                        {ONBOARDING_STEPS.map((step, index) => {
                            const isActive = index === currentStepIndex;
                            const isCompleted = index < currentStepIndex;

                            return (
                                <div key={step.path} className="flex flex-col items-center gap-2">
                                    <div
                                        className={cn(
                                            "h-8 w-8 rounded-full flex items-center justify-center bg-background shadow-sm border-2",
                                            isActive && "border-primary",
                                            isCompleted && "border-primary bg-primary text-primary-foreground",
                                            !isActive && !isCompleted && "border-muted"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : (
                                            <span className="text-xs font-medium">{index + 1}</span>
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-xs font-medium",
                                        isActive && "text-primary",
                                        isCompleted && "text-primary",
                                        !isActive && !isCompleted && "text-muted-foreground"
                                    )}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* User testing warning */}
                {user && (
                    <motion.div
                        className="mb-6"
                        variants={itemVariants}
                    >
                        <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md">
                            <p className="text-sm">
                                You are testing the onboarding flow as an existing user.
                                This will allow you to create a new tenant configuration.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    variants={itemVariants}
                >
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {description}
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div variants={itemVariants}>
                    {children}
                </motion.div>

                {/* Navigation */}
                {customFooter ? (
                    <motion.div variants={itemVariants} className="mt-8">
                        {customFooter}
                    </motion.div>
                ) : (
                    <motion.div
                        className="mt-8 flex justify-between"
                        variants={itemVariants}
                    >
                        {showBackButton && (
                            <button
                                onClick={handleBack}
                                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </button>
                        )}
                        <div className="flex-1" />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default OnboardingLayout; 