import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { TenantType } from '@/types/onboarding';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingLayout from '@/components/layout/OnboardingLayout';
import { ArrowRight, Building, GraduationCap, Globe, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
            email: z.string().email({ message: 'Please enter a valid email address' }),
            phone: z.string().optional(),
        };

        if (state.tenantType === TenantType.STUDENT) {
            return z.object({
                ...baseSchema,
                goals: z.array(z.string()).optional(),
            });
        }

        if (state.tenantType === TenantType.EDTECH) {
            return z.object({
                ...baseSchema,
                contactPerson: z.string().min(2, { message: 'Contact person name must be at least 2 characters' }),
                domain: z.string().min(2, { message: 'Domain must be at least 2 characters' }),
                logo: z.string().optional(),
                description: z.string().min(10, { message: 'Description must be at least 10 characters' }).max(500),
            });
        }

        return z.object({
            ...baseSchema,
            contactPerson: z.string().min(2, { message: 'Contact person name must be at least 2 characters' }),
            domain: z.string().min(2, { message: 'Domain must be at least 2 characters' }),
            studentCount: z.string().optional(),
            departments: z.array(z.string()).optional(),
        });
    };

    // Get title and description based on tenant type
    const getTitleAndDescription = () => {
        switch (state.tenantType) {
            case TenantType.STUDENT:
                return {
                    title: "Student Profile",
                    description: "Tell us about yourself to personalize your learning experience"
                };
            case TenantType.EDTECH:
                return {
                    title: "EdTech Platform Details",
                    description: "Set up your course platform and branding for your audience"
                };
            default:
                return {
                    title: "Organization Details",
                    description: "Tell us about your institution to customize your experience"
                };
        }
    };

    // Get icon based on tenant type
    const getTenantIcon = () => {
        switch (state.tenantType) {
            case TenantType.STUDENT:
                return <GraduationCap className="h-8 w-8 mb-2 text-primary" />;
            case TenantType.EDTECH:
                return <Globe className="h-8 w-8 mb-2 text-primary" />;
            default:
                return <Building className="h-8 w-8 mb-2 text-primary" />;
        }
    };

    // Initialize form with dynamic schema
    const form = useForm<any>({
        resolver: zodResolver(getSchema()),
        defaultValues: {
            name: state.tenantInfo?.name || (user ? `${user.firstName} ${user.lastName}${state.tenantType !== TenantType.STUDENT ? "'s Organization" : ""}` : ''),
            contactPerson: state.tenantInfo?.contactPerson || (user ? `${user.firstName} ${user.lastName}` : ''),
            domain: state.tenantInfo?.domain || '',
            email: state.tenantInfo?.email || (user ? user.email : ''),
            phone: state.tenantInfo?.phone || '',
            studentCount: state.tenantInfo?.studentCount || '',
            departments: state.tenantInfo?.departments || [],
            goals: state.tenantInfo?.goals || [],
            description: '',
            logo: '',
        },
    });

    const onSubmit = (values: any) => {
        setTenantInfo(values);
        navigate('/onboarding/modules');
    };

    const titleAndDescription = getTitleAndDescription();
    const tenantIcon = getTenantIcon();

    return (
        <OnboardingLayout
            title={titleAndDescription.title}
            description={titleAndDescription.description}
            customFooter={
                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/onboarding/type')}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        className="gap-2"
                    >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            }
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-2 shadow-lg">
                    <CardContent className="pt-6">
                        <div className="mx-auto flex justify-center mb-4">
                            {tenantIcon}
                        </div>

                        <Form {...form}>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Field */}
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
                                                                : state.tenantType === TenantType.EDTECH
                                                                    ? 'My Learning Academy'
                                                                    : 'ABC College'
                                                        }
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email Field */}
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
                                                                : 'contact@organization.com'
                                                        }
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Phone Field */}
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

                                    {/* Contact Person - For non-student */}
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

                                    {/* Domain - For non-student */}
                                    {state.tenantType !== TenantType.STUDENT && (
                                        <FormField
                                            control={form.control}
                                            name="domain"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Domain Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={state.tenantType === TenantType.EDTECH ? "myacademy" : "abccollege"} {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Your subdomain will be {field.value || 'yourdomain'}.eduspry.com
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {/* Student Count - For colleges/institutions */}
                                    {(state.tenantType === TenantType.COLLEGE || state.tenantType === TenantType.INSTITUTION) && (
                                        <FormField
                                            control={form.control}
                                            name="studentCount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Approximate Number of Students</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select student count" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="<100">Less than 100</SelectItem>
                                                            <SelectItem value="100-500">100 - 500</SelectItem>
                                                            <SelectItem value="500-1000">500 - 1,000</SelectItem>
                                                            <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                                                            <SelectItem value=">5000">More than 5,000</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>

                                {/* Description - For EdTech */}
                                {state.tenantType === TenantType.EDTECH && (
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Platform Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your educational platform to your potential students..."
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This will appear on your landing page.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {/* Logo upload - For EdTech */}
                                {state.tenantType === TenantType.EDTECH && (
                                    <FormField
                                        control={form.control}
                                        name="logo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Logo (Optional)</FormLabel>
                                                <FormControl>
                                                    <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                                                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                                        <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG (max. 2MB)</p>
                                                        <Input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                // In a real app, this would handle file upload
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    field.onChange(file.name); // Just store filename for now
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {/* Departments - For colleges/institutions */}
                                {(state.tenantType === TenantType.COLLEGE || state.tenantType === TenantType.INSTITUTION) && (
                                    <FormField
                                        control={form.control}
                                        name="departments"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Departments (Optional)</FormLabel>
                                                <div className="grid grid-cols-2 gap-4 mt-2">
                                                    {['Science', 'Arts', 'Commerce', 'Engineering', 'Medicine', 'Law', 'Management', 'Education'].map((dept) => (
                                                        <FormField
                                                            key={dept}
                                                            control={form.control}
                                                            name="departments"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={dept}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(dept)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, dept])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value: string) => value !== dept
                                                                                            )
                                                                                        )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {dept}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormDescription>
                                                    Select the departments you want to manage.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {/* Goals - For students */}
                                {state.tenantType === TenantType.STUDENT && (
                                    <FormField
                                        control={form.control}
                                        name="goals"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Learning Goals (Optional)</FormLabel>
                                                <div className="grid grid-cols-2 gap-4 mt-2">
                                                    {[
                                                        'Exam Preparation',
                                                        'University Admission',
                                                        'Skill Development',
                                                        'Career Advancement',
                                                        'Self-Improvement',
                                                        'Professional Certification',
                                                        'Higher Education',
                                                        'General Knowledge'
                                                    ].map((goal) => (
                                                        <FormField
                                                            key={goal}
                                                            control={form.control}
                                                            name="goals"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={goal}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(goal)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, goal])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value: string) => value !== goal
                                                                                            )
                                                                                        )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {goal}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormDescription>
                                                    Select your learning goals to help us personalize your experience.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </OnboardingLayout>
    );
};

export default TenantInfoPage; 