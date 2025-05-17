import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { tenantService } from '@/services/tenantService';
import { MODULE_OPTIONS, MODULES } from '@/types/onboarding';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ModuleManagement: React.FC = () => {
    const { tenant } = useAuth();
    const [activeModules, setActiveModules] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Fetch active modules on component mount
    useEffect(() => {
        const fetchModules = async () => {
            if (!tenant) return;

            try {
                setIsLoading(true);
                const modules = await tenantService.getTenantModules(tenant.id);
                setActiveModules(modules);
            } catch (error) {
                console.error('Error fetching modules:', error);
                toast({
                    title: 'Failed to load modules',
                    description: 'There was an error loading your active modules.',
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchModules();
    }, [tenant]);

    // Handle module toggle
    const handleModuleToggle = (moduleId: string, enabled: boolean) => {
        if (enabled) {
            setActiveModules(prev => [...prev, moduleId]);
        } else {
            setActiveModules(prev => prev.filter(id => id !== moduleId));
        }
        setHasChanges(true);
    };

    // Save module configuration
    const handleSaveChanges = async () => {
        if (!tenant) return;

        setIsSaving(true);
        try {
            await tenantService.configureTenantModules(tenant.id, activeModules);
            toast({
                title: 'Modules updated',
                description: 'Your module configuration has been saved successfully.',
            });
            setHasChanges(false);
        } catch (error) {
            console.error('Error saving modules:', error);
            toast({
                title: 'Failed to update modules',
                description: 'There was an error saving your module configuration.',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading modules...</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Module Management</h1>
                    <p className="text-muted-foreground">
                        Manage the modules your organization has access to
                    </p>
                </div>
                <Button
                    onClick={handleSaveChanges}
                    disabled={!hasChanges || isSaving}
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Active Modules</CardTitle>
                    <CardDescription>
                        Toggle modules on or off to customize your experience
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {Object.values(MODULE_OPTIONS).map((module) => {
                            const isActive = activeModules.includes(module.id);
                            const isMandatory = module.id === MODULES.courses; // Courses module is mandatory

                            return (
                                <div key={module.id}>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="flex items-center">
                                                <Label
                                                    htmlFor={`module-${module.id}`}
                                                    className="text-base font-medium"
                                                >
                                                    {module.name}
                                                </Label>
                                                {isMandatory && (
                                                    <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                                        Required
                                                    </span>
                                                )}
                                                {isActive && !isMandatory && (
                                                    <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {module.description}
                                            </p>
                                        </div>
                                        <Switch
                                            id={`module-${module.id}`}
                                            checked={isActive}
                                            onCheckedChange={(checked) => {
                                                if (!isMandatory) {
                                                    handleModuleToggle(module.id, checked);
                                                }
                                            }}
                                            disabled={isMandatory}
                                        />
                                    </div>
                                    <Separator className="my-4" />
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Module Information</CardTitle>
                    <CardDescription>
                        Learn more about each module and its capabilities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-medium mb-2">Courses</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Create and manage courses, lessons, and learning materials for your students.
                                </p>
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Included in all plans</span>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                                <h3 className="font-medium mb-2">Attendance</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Track and manage student attendance for classes and events.
                                </p>
                                <div className="flex items-center text-amber-600 dark:text-amber-400">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    <span className="text-sm">College and Institution plans</span>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                                <h3 className="font-medium mb-2">Exams</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Create and administer exams, quizzes, and assessments.
                                </p>
                                <div className="flex items-center text-amber-600 dark:text-amber-400">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Institution plan only</span>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                                <h3 className="font-medium mb-2">Live Classes</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Host and manage virtual classrooms and live sessions.
                                </p>
                                <div className="flex items-center text-amber-600 dark:text-amber-400">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Institution plan only</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ModuleManagement; 