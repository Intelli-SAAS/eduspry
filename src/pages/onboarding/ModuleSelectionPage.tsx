import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { TenantType, MODULE_OPTIONS, MODULES, SUBSCRIPTION_PLANS } from '@/types/onboarding';
import { Check, X, ArrowRight, Zap, Shield, BarChart, Calendar, BookOpen, Video, Users, Brain, PenTool, CreditCard, Award, Smartphone, ShieldAlert, Paintbrush, Code, Key, FileBarChart, ClipboardList, BookMarked } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingLayout from '@/components/layout/OnboardingLayout';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Map module IDs to icons
const moduleIcons: Record<string, React.ReactNode> = {
    [MODULES.courses]: <BookOpen className="h-5 w-5" />,
    [MODULES.attendance]: <Calendar className="h-5 w-5" />,
    [MODULES.exams]: <ClipboardList className="h-5 w-5" />,
    [MODULES.liveClasses]: <Video className="h-5 w-5" />,
    [MODULES.admissions]: <Users className="h-5 w-5" />,
    [MODULES.analytics]: <BarChart className="h-5 w-5" />,
    [MODULES.aiAssistant]: <Brain className="h-5 w-5" />,
    [MODULES.contentCreation]: <PenTool className="h-5 w-5" />,
    [MODULES.payments]: <CreditCard className="h-5 w-5" />,
    [MODULES.certificates]: <Award className="h-5 w-5" />,
    [MODULES.mobileApp]: <Smartphone className="h-5 w-5" />,
    [MODULES.antiCheating]: <ShieldAlert className="h-5 w-5" />,
    [MODULES.whiteLabel]: <Paintbrush className="h-5 w-5" />,
    [MODULES.api]: <Code className="h-5 w-5" />,
    [MODULES.sso]: <Key className="h-5 w-5" />,
    [MODULES.reporting]: <FileBarChart className="h-5 w-5" />,
    [MODULES.mockTests]: <ClipboardList className="h-5 w-5" />,
    [MODULES.revisionPlans]: <BookMarked className="h-5 w-5" />,
    [MODULES.progressTracking]: <BarChart className="h-5 w-5" />
};

const ModuleSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, addModule, removeModule, setModules } = useOnboarding();
    const { user } = useAuth();
    const [selectedPlanTier, setSelectedPlanTier] = React.useState<'free' | 'basic' | 'pro' | 'enterprise'>('basic');

    // Redirect if tenant info is not provided
    React.useEffect(() => {
        if (!state.tenantType || !state.tenantInfo) {
            navigate('/onboarding/info');
        }
    }, [state.tenantType, state.tenantInfo, navigate]);

    // For student plan, skip this page
    React.useEffect(() => {
        if (state.tenantType === TenantType.STUDENT) {
            navigate('/onboarding/complete');
        }
    }, [state.tenantType, navigate]);

    const handleModuleToggle = (moduleId: string, checked: boolean) => {
        if (checked) {
            addModule(moduleId);
        } else {
            removeModule(moduleId);
        }
    };

    const handleSelectPlan = (tier: 'free' | 'basic' | 'pro' | 'enterprise') => {
        setSelectedPlanTier(tier);

        // Find the plan that matches the selected tier
        const plans = state.tenantType ? SUBSCRIPTION_PLANS[state.tenantType] : [];
        const plan = plans.find(p => p.tier === tier);

        if (plan) {
            setModules(plan.modules);
        }
    };

    const handleContinue = () => {
        navigate('/onboarding/complete');
    };

    if (!state.tenantType || !state.tenantInfo) {
        return null;
    }

    // Get plans for the current tenant type
    const plans = SUBSCRIPTION_PLANS[state.tenantType];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <OnboardingLayout
            title="Choose Your Features"
            description="Select the modules and features that best suit your organization's needs"
            customFooter={
                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/onboarding/info')}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={handleContinue}
                        className="gap-2"
                    >
                        Continue to Summary
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            }
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Plan Selector */}
                <motion.div variants={itemVariants} className="mb-8">
                    <Card className="border-2 shadow-lg overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                Choose a Plan
                            </CardTitle>
                            <CardDescription>
                                Select a pre-configured plan or customize your modules below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                defaultValue={selectedPlanTier}
                                className="w-full"
                                onValueChange={(value) => handleSelectPlan(value as any)}
                            >
                                <TabsList className="grid w-full grid-cols-4">
                                    {plans.map((plan) => (
                                        <TabsTrigger
                                            key={plan.tier}
                                            value={plan.tier}
                                            disabled={plan.tier === 'free' && state.tenantType !== TenantType.EDTECH}
                                        >
                                            {plan.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {plans.map((plan) => (
                                    <TabsContent key={plan.tier} value={plan.tier} className="mt-4">
                                        <div className="rounded-lg bg-muted/50 p-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold">₹{plan.price.toLocaleString()}</div>
                                                    <div className="text-xs text-muted-foreground">per month</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                                {plan.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <Check className="h-4 w-4 text-primary" />
                                                        <span className="text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Module Selection */}
                <motion.div variants={itemVariants}>
                    <Card className="border-2 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Customize Your Modules
                            </CardTitle>
                            <CardDescription>
                                Fine-tune your selection by adding or removing specific modules
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.values(MODULE_OPTIONS).map((module) => {
                                    const isSelected = state.selectedModules.includes(module.id);
                                    const isMandatory = module.id === MODULES.courses; // Courses module is mandatory
                                    const icon = moduleIcons[module.id] || <BookOpen className="h-5 w-5" />;

                                    return (
                                        <motion.div
                                            key={module.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`p-4 border-2 rounded-lg ${isSelected
                                                ? 'bg-primary/5 border-primary'
                                                : 'border-border hover:border-primary/30'
                                                }`}
                                        >
                                            <div className="flex items-start">
                                                <div className={`p-2 rounded-md ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                    {icon}
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <label
                                                            htmlFor={`module-${module.id}`}
                                                            className="font-medium cursor-pointer"
                                                        >
                                                            {module.name}
                                                        </label>
                                                        <Checkbox
                                                            id={`module-${module.id}`}
                                                            checked={isSelected}
                                                            onCheckedChange={(checked) => {
                                                                if (!isMandatory) {
                                                                    handleModuleToggle(module.id, checked as boolean);
                                                                }
                                                            }}
                                                            disabled={isMandatory}
                                                        />
                                                    </div>
                                                    <p className="text-muted-foreground text-sm mt-1">
                                                        {module.description}
                                                    </p>
                                                    {isMandatory && (
                                                        <Badge variant="outline" className="mt-2">
                                                            Required
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Selected Modules Summary */}
                <motion.div variants={itemVariants} className="mt-8">
                    <Card className="border-2 border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                Your Selected Modules
                            </CardTitle>
                            <CardDescription>
                                You have selected {state.selectedModules.length} modules
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {state.selectedModules.map((moduleId) => (
                                    <Badge key={moduleId} className="bg-primary/20 text-primary hover:bg-primary/30">
                                        {MODULE_OPTIONS[moduleId]?.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </OnboardingLayout>
    );
};

export default ModuleSelectionPage; 