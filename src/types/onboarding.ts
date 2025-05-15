export enum TenantType {
    STUDENT = 'student',
    COLLEGE = 'college',
    INSTITUTION = 'institution'
}

export interface OnboardingState {
    tenantType: TenantType | null;
    tenantInfo: {
        name: string;
        contactPerson?: string;
        domain?: string;
        phone?: string;
        email?: string;
    } | null;
    selectedModules: string[];
}

export interface ModuleOption {
    id: string;
    name: string;
    description: string;
    included: boolean;
    default: boolean;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    billingCycle: 'monthly' | 'yearly';
    features: string[];
    modules: string[];
    recommended?: boolean;
}

export const MODULES = {
    courses: 'courses',
    attendance: 'attendance',
    exams: 'exams',
    liveClasses: 'liveClasses',
    admissions: 'admissions',
    analytics: 'analytics',
    aiAssistant: 'aiAssistant'
};

export const MODULE_OPTIONS: Record<string, ModuleOption> = {
    [MODULES.courses]: {
        id: MODULES.courses,
        name: 'Courses',
        description: 'Create and manage courses, lessons, and learning materials',
        included: true,
        default: true
    },
    [MODULES.attendance]: {
        id: MODULES.attendance,
        name: 'Attendance',
        description: 'Track student attendance for classes and events',
        included: false,
        default: false
    },
    [MODULES.exams]: {
        id: MODULES.exams,
        name: 'Exams',
        description: 'Create and administer exams and assessments',
        included: false,
        default: false
    },
    [MODULES.liveClasses]: {
        id: MODULES.liveClasses,
        name: 'Live Classes',
        description: 'Host and manage virtual classrooms and live sessions',
        included: false,
        default: false
    },
    [MODULES.admissions]: {
        id: MODULES.admissions,
        name: 'Admissions',
        description: 'Manage student applications and enrollment processes',
        included: false,
        default: false
    },
    [MODULES.analytics]: {
        id: MODULES.analytics,
        name: 'Analytics',
        description: 'Access detailed reports and insights on student performance',
        included: false,
        default: false
    },
    [MODULES.aiAssistant]: {
        id: MODULES.aiAssistant,
        name: 'AI Assistant',
        description: 'AI-powered learning tools and personalized assistance',
        included: false,
        default: false
    }
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        id: 'student',
        name: 'Student Plan',
        description: 'For individual students looking to enhance their learning experience',
        price: 499,
        billingCycle: 'monthly',
        features: [
            'Access to courses',
            'AI learning assistant',
            'Progress tracking',
            'Mobile access'
        ],
        modules: [MODULES.courses, MODULES.aiAssistant]
    },
    {
        id: 'college',
        name: 'College Plan',
        description: 'For colleges and educational institutions with multiple students',
        price: 9999,
        billingCycle: 'monthly',
        features: [
            'All Student Plan features',
            'Admissions management',
            'Attendance tracking',
            'Performance analytics',
            'Multiple user accounts'
        ],
        modules: [MODULES.courses, MODULES.attendance, MODULES.admissions, MODULES.analytics],
        recommended: true
    },
    {
        id: 'institution',
        name: 'Enterprise Plan',
        description: 'Complete solution for large educational institutions',
        price: 24999,
        billingCycle: 'monthly',
        features: [
            'All College Plan features',
            'Live virtual classrooms',
            'Advanced exam proctoring',
            'Custom integrations',
            'Priority support',
            'Unlimited storage'
        ],
        modules: [
            MODULES.courses,
            MODULES.attendance,
            MODULES.exams,
            MODULES.liveClasses,
            MODULES.admissions,
            MODULES.analytics,
            MODULES.aiAssistant
        ]
    }
]; 