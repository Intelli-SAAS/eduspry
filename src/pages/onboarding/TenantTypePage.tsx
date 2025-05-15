import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { TenantType, SUBSCRIPTION_PLANS } from '@/types/onboarding';
import { GraduationCap, Building, Building2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TenantTypePage: React.FC = () => {
    const navigate = useNavigate();
    const { setTenantType, setModules } = useOnboarding();
    const { user } = useAuth();

    const handleSelectType = (type: TenantType) => {
        setTenantType(type);

        // Set default modules based on the selected plan
        const plan = SUBSCRIPTION_PLANS.find(plan => plan.id === type);
        if (plan) {
            setModules(plan.modules);
        }

        navigate('/onboarding/info');
    };

    const handleCancel = () => {
        // For existing users testing the flow, just go back to their dashboard
        navigate(-1);
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            {user && (
                <div className="mb-6">
                    <Button variant="ghost" onClick={handleCancel} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md">
                        <p>
                            You are testing the onboarding flow as an existing user.
                            This will allow you to create a new tenant configuration.
                        </p>
                    </div>
                </div>
            )}

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Welcome to EduSpry</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Let's get started by selecting the type of account you need
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                    <CardHeader className="text-center">
                        <GraduationCap className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle>Student</CardTitle>
                        <CardDescription>For individual learners</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Access to courses
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> AI learning assistant
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Progress tracking
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Mobile access
                            </li>
                        </ul>
                        <p className="font-bold text-xl text-center">₹499/month</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleSelectType(TenantType.STUDENT)}>
                            Select Student Plan
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary relative">
                    <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg text-xs font-medium">
                        Recommended
                    </div>
                    <CardHeader className="text-center">
                        <Building className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle>College</CardTitle>
                        <CardDescription>For educational institutions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> All Student Plan features
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Admissions management
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Attendance tracking
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Performance analytics
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Multiple user accounts
                            </li>
                        </ul>
                        <p className="font-bold text-xl text-center">₹9,999/month</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleSelectType(TenantType.COLLEGE)}>
                            Select College Plan
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                    <CardHeader className="text-center">
                        <Building2 className="w-12 h-12 mx-auto text-primary" />
                        <CardTitle>Institution</CardTitle>
                        <CardDescription>For large educational organizations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> All College Plan features
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Live virtual classrooms
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Advanced exam proctoring
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Custom integrations
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Priority support
                            </li>
                        </ul>
                        <p className="font-bold text-xl text-center">₹24,999/month</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleSelectType(TenantType.INSTITUTION)}>
                            Select Institution Plan
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default TenantTypePage; 