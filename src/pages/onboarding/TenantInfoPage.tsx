import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { TenantType } from '@/types/onboarding';
import { useAuth } from '@/contexts/AuthContext';

const TenantInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, setTenantInfo } = useOnboarding();
    const { user } = useAuth();

    // Redirect if tenant type is not selected
    React.useEffect(() => {
        if (!state.tenantType) {
            navigate('/onboarding/type');
        }
    }, [state.tenantType, navigate]);

    // Define schema based on tenant type
    const getSchema = () => {
        const baseSchema = {
            name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
        };

        if (state.tenantType === TenantType.STUDENT) {
            return z.object({
                ...baseSchema,
                email: z.string().email({ message: 'Please enter a valid email address' }),
                phone: z.string().optional(),
            });
        }

        return z.object({
            ...baseSchema,
            contactPerson: z.string().min(2, { message: 'Contact person name must be at least 2 characters' }),
            domain: z.string().min(2, { message: 'Domain must be at least 2 characters' }),
            email: z.string().email({ message: 'Please enter a valid email address' }),
            phone: z.string().min(10, { message: 'Phone number must be at least 10 characters' }),
        });
    };

    // Initialize form with dynamic schema
    const form = useForm<any>({
        resolver: zodResolver(getSchema()),
        defaultValues: {
            name: state.tenantInfo?.name || (user ? `${user.firstName} ${user.lastName}'s Organization` : ''),
            contactPerson: state.tenantInfo?.contactPerson || (user ? `${user.firstName} ${user.lastName}` : ''),
            domain: state.tenantInfo?.domain || '',
            email: state.tenantInfo?.email || (user ? user.email : ''),
            phone: state.tenantInfo?.phone || '',
        },
    });

    const onSubmit = (values: any) => {
        setTenantInfo(values);
        navigate('/onboarding/modules');
    };

    const handleCancel = () => {
        if (user) {
            // For existing users testing the flow, just go back to their dashboard
            navigate(-1);
        } else {
            // For new users, go back to the previous step
            navigate('/onboarding/type');
        }
    };

    if (!state.tenantType) {
        return null;
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Organization Information</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    {state.tenantType === TenantType.STUDENT
                        ? 'Tell us about yourself'
                        : 'Tell us about your organization'}
                </p>
                {user && (
                    <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 rounded-md">
                        <p className="text-sm">
                            You are testing the onboarding flow as an existing user.
                        </p>
                    </div>
                )}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {state.tenantType === TenantType.STUDENT ? 'Student Information' : 'Organization Details'}
                    </CardTitle>
                    <CardDescription>
                        {state.tenantType === TenantType.STUDENT
                            ? 'Please provide your personal details'
                            : 'Please provide your organization details'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {state.tenantType === TenantType.STUDENT ? 'Full Name' : 'Organization Name'}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    state.tenantType === TenantType.STUDENT
                                                        ? 'John Doe'
                                                        : 'ABC College'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {state.tenantType !== TenantType.STUDENT && (
                                <FormField
                                    control={form.control}
                                    name="contactPerson"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Person</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Jane Smith" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {state.tenantType !== TenantType.STUDENT && (
                                <FormField
                                    control={form.control}
                                    name="domain"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Domain Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="abccollege" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder={
                                                    state.tenantType === TenantType.STUDENT
                                                        ? 'johndoe@example.com'
                                                        : 'contact@abccollege.com'
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+91 9876543210" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-between pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                >
                                    {user ? 'Cancel' : 'Back'}
                                </Button>
                                <Button type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default TenantInfoPage; 