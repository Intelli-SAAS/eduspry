import { TenantType } from '@/types/onboarding';
import { Tenant, User, UserRole } from '@/types';

// Mock implementation for demonstration purposes
// In a real app, this would make API calls to your backend

export const tenantService = {
    async createTenant(data: {
        name: string;
        type: TenantType;
        contactPerson?: string;
        domain?: string;
        phone?: string;
        email?: string;
    }): Promise<Tenant> {
        // Simulate API call
        console.log('Creating tenant with data:', data);

        // Return mock tenant
        return {
            id: `tenant-${Date.now()}`,
            name: data.name,
            domain: data.domain || data.name.toLowerCase().replace(/\s+/g, '-'),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            settings: {
                allowRegistration: true,
                features: {
                    analytics: data.type !== TenantType.STUDENT,
                    fileUploads: true,
                    questionBank: data.type !== TenantType.STUDENT,
                    antiCheating: data.type === TenantType.INSTITUTION
                }
            }
        };
    },

    async assignUserToTenant(userId: string, tenantId: string, role: UserRole): Promise<void> {
        // Simulate API call
        console.log(`Assigning user ${userId} to tenant ${tenantId} with role ${role}`);
        // In a real app, this would update the user record in the database
    },

    async configureTenantModules(tenantId: string, modules: string[]): Promise<void> {
        // Simulate API call
        console.log(`Configuring modules for tenant ${tenantId}:`, modules);
        // In a real app, this would create records in the tenant_modules table
    },

    async getTenantModules(tenantId: string): Promise<string[]> {
        // Simulate API call
        console.log(`Getting modules for tenant ${tenantId}`);
        // In a real app, this would fetch from the tenant_modules table
        return ['courses']; // Default modules
    }
}; 