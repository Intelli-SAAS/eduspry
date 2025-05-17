export enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    PRINCIPAL = "PRINCIPAL",
    ADMIN = "ADMIN",
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    tenantId: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tenant {
    id: string;
    name: string;
    domain: string;
    plan: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TenantModule {
    id: string;
    tenantId: string;
    moduleName: string;
    isEnabled: boolean;
    subscriptionPlan?: string;
    createdAt: Date;
} 