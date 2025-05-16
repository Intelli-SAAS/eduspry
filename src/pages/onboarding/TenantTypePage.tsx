import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { TenantType, SUBSCRIPTION_PLANS } from '@/types/onboarding';
import { GraduationCap, Building, Building2, Globe, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingLayout from '@/components/layout/OnboardingLayout';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const TenantTypePage: React.FC = () => {
    const navigate = useNavigate();
    const { setTenantType, setModules } = useOnboarding();
    const { user } = useAuth();

    const handleSelectType = (type: TenantType) => {
        setTenantType(type);

        // Set default modules based on the selected plan
        const plans = SUBSCRIPTION_PLANS[type];
        if (plans && plans.length > 0) {
            // Use the 'recommended' plan if available, otherwise use the first one
            const recommendedPlan = plans.find(plan => plan.recommended) || plans[0];
            setModules(recommendedPlan.modules);
        }

        navigate('/onboarding/info');
    };

    const cardVariants = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        hover: {
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { type: "spring", stiffness: 300 }
        },
        tap: { y: 0, scale: 0.98 }
    };

    const featuredBadgeVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { delay: 0.3 } }
    };

    const checkmarkVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 }
    };

    return (
        <OnboardingLayout
            title="Welcome to EduSpry"
            description="Let's get started by selecting the type of account you need"
            showBackButton={!!user}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Student Card */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ duration: 0.2, delay: 0.1 }}
                >
                    <Card className="h-full border-2 hover:border-primary cursor-pointer overflow-hidden">
                        <CardHeader className="text-center pb-2 relative">
                            <div className="bg-primary/10 absolute -top-6 -right-6 -left-6 h-24 rounded-b-[50%] flex items-end justify-center pb-2">
                                <GraduationCap className="w-12 h-12 text-primary" />
                            </div>
                            <div className="mt-10"></div>
                            <CardTitle className="text-xl">Student</CardTitle>
                            <CardDescription>For individual learners</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                                ₹499
                                <span className="text-sm font-normal text-muted-foreground">/mo</span>
                            </div>
                            <ul className="text-left space-y-2 mt-6 mb-6">
                                {SUBSCRIPTION_PLANS[TenantType.STUDENT][1].features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start"
                                        variants={checkmarkVariants}
                                        initial="initial"
                                        animate="animate"
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                    >
                                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                                        <span className="text-sm">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleSelectType(TenantType.STUDENT)}>
                                Select Student Plan
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* College Card */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="md:col-span-2"
                >
                    <Card className="h-full border-2 hover:border-primary cursor-pointer overflow-hidden relative">
                        <motion.div
                            className="absolute top-4 right-4 z-10"
                            variants={featuredBadgeVariants}
                            initial="initial"
                            animate="animate"
                        >
                            <Badge className="bg-primary hover:bg-primary">Recommended</Badge>
                        </motion.div>
                        <CardHeader className="text-center pb-2 relative">
                            <div className="bg-primary/10 absolute -top-6 -right-6 -left-6 h-24 rounded-b-[50%] flex items-end justify-center pb-2">
                                <Building className="w-12 h-12 text-primary" />
                            </div>
                            <div className="mt-10"></div>
                            <CardTitle className="text-xl">College / Institution</CardTitle>
                            <CardDescription>For educational institutions of all sizes</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                                ₹9,999
                                <span className="text-sm font-normal text-muted-foreground">/mo</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <ul className="text-left space-y-2">
                                    {SUBSCRIPTION_PLANS[TenantType.COLLEGE][1].features.slice(0, 4).map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-start"
                                            variants={checkmarkVariants}
                                            initial="initial"
                                            animate="animate"
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                        >
                                            <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                                            <span className="text-sm">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <ul className="text-left space-y-2">
                                    {SUBSCRIPTION_PLANS[TenantType.COLLEGE][1].features.slice(4).map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-start"
                                            variants={checkmarkVariants}
                                            initial="initial"
                                            animate="animate"
                                            transition={{ delay: 0.2 + ((i + 4) * 0.1) }}
                                        >
                                            <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                                            <span className="text-sm">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleSelectType(TenantType.COLLEGE)}>
                                Select Institution Plan
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* EdTech Platform Card */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ duration: 0.2, delay: 0.3 }}
                >
                    <Card className="h-full border-2 hover:border-primary cursor-pointer overflow-hidden">
                        <CardHeader className="text-center pb-2 relative">
                            <div className="bg-primary/10 absolute -top-6 -right-6 -left-6 h-24 rounded-b-[50%] flex items-end justify-center pb-2">
                                <Globe className="w-12 h-12 text-primary" />
                            </div>
                            <div className="mt-10"></div>
                            <CardTitle className="text-xl">EdTech Platform</CardTitle>
                            <CardDescription>For course creators & content sellers</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                                ₹14,999
                                <span className="text-sm font-normal text-muted-foreground">/mo</span>
                            </div>
                            <ul className="text-left space-y-2 mt-6 mb-6">
                                {SUBSCRIPTION_PLANS[TenantType.EDTECH][1].features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start"
                                        variants={checkmarkVariants}
                                        initial="initial"
                                        animate="animate"
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                    >
                                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                                        <span className="text-sm">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleSelectType(TenantType.EDTECH)}>
                                Select EdTech Plan
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>

            <div className="flex justify-center mt-8">
                <div className="bg-primary/5 rounded-lg p-4 max-w-md">
                    <p className="text-sm text-center text-muted-foreground">
                        All plans include a 30-day free trial.
                        No credit card required to start.
                        <br />
                        Need help choosing? <a href="#" className="text-primary font-medium hover:underline">Contact our team</a>
                    </p>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default TenantTypePage; 