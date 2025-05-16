export enum TenantType {
    STUDENT = 'student',
    COLLEGE = 'college',
    INSTITUTION = 'institution',
    EDTECH = 'edtech'
}

export interface OnboardingState {
    tenantType: TenantType | null;
    tenantInfo: {
        name: string;
        contactPerson?: string;
        domain?: string;
        phone?: string;
        email?: string;
        logo?: string;
        studentCount?: number;
        departments?: string[];
        goals?: string[];
    } | null;
    selectedModules: string[];
    planTier?: 'free' | 'basic' | 'pro' | 'enterprise';
}

export interface ModuleOption {
    id: string;
    name: string;
    description: string;
    included: boolean;
    default: boolean;
    icon?: React.ComponentType;
    requiredPlans?: ('free' | 'basic' | 'pro' | 'enterprise')[];
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
    tier: 'free' | 'basic' | 'pro' | 'enterprise';
}

export const MODULES = {
    // Core modules
    courses: 'courses',
    attendance: 'attendance',
    exams: 'exams',
    liveClasses: 'liveClasses',
    admissions: 'admissions',
    analytics: 'analytics',
    aiAssistant: 'aiAssistant',

    // New modules
    contentCreation: 'contentCreation',
    payments: 'payments',
    certificates: 'certificates',
    mobileApp: 'mobileApp',
    antiCheating: 'antiCheating',
    whiteLabel: 'whiteLabel',
    api: 'api',
    sso: 'sso',
    reporting: 'reporting',
    mockTests: 'mockTests',
    revisionPlans: 'revisionPlans',
    progressTracking: 'progressTracking'
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
    },
    [MODULES.contentCreation]: {
        id: MODULES.contentCreation,
        name: 'Content Creation',
        description: 'Advanced tools for creating engaging educational content',
        included: false,
        default: false
    },
    [MODULES.payments]: {
        id: MODULES.payments,
        name: 'Payments',
        description: 'Process payments and manage subscriptions',
        included: false,
        default: false
    },
    [MODULES.certificates]: {
        id: MODULES.certificates,
        name: 'Certificates',
        description: 'Create and issue digital certificates for course completion',
        included: false,
        default: false
    },
    [MODULES.mobileApp]: {
        id: MODULES.mobileApp,
        name: 'Mobile Access',
        description: 'Access content on mobile devices through dedicated apps',
        included: false,
        default: false
    },
    [MODULES.antiCheating]: {
        id: MODULES.antiCheating,
        name: 'Anti-Cheating',
        description: 'Advanced proctoring and anti-cheating tools for exams',
        included: false,
        default: false
    },
    [MODULES.whiteLabel]: {
        id: MODULES.whiteLabel,
        name: 'White Labeling',
        description: 'Customize the platform with your own branding',
        included: false,
        default: false
    },
    [MODULES.api]: {
        id: MODULES.api,
        name: 'API Access',
        description: 'Integrate with other systems through our API',
        included: false,
        default: false
    },
    [MODULES.sso]: {
        id: MODULES.sso,
        name: 'Single Sign-On',
        description: 'Enable single sign-on with existing authentication systems',
        included: false,
        default: false
    },
    [MODULES.reporting]: {
        id: MODULES.reporting,
        name: 'Advanced Reporting',
        description: 'Generate comprehensive reports on student performance',
        included: false,
        default: false
    },
    [MODULES.mockTests]: {
        id: MODULES.mockTests,
        name: 'Mock Tests',
        description: 'Create and take practice tests for exam preparation',
        included: false,
        default: false
    },
    [MODULES.revisionPlans]: {
        id: MODULES.revisionPlans,
        name: 'Revision Plans',
        description: 'Personalized revision plans for exam preparation',
        included: false,
        default: false
    },
    [MODULES.progressTracking]: {
        id: MODULES.progressTracking,
        name: 'Progress Tracking',
        description: 'Track and visualize learning progress over time',
        included: false,
        default: false
    }
};

// Student plans
const STUDENT_PLANS: SubscriptionPlan[] = [
    {
        id: 'student-free',
        name: 'Student Free',
        description: 'Basic access for individual students',
        price: 0,
        billingCycle: 'monthly',
        tier: 'free',
        features: [
            'Access 3 courses',
            'Basic analytics',
            'AI Q&A (10 uses/month)',
            'Mobile access'
        ],
        modules: [MODULES.courses, MODULES.progressTracking]
    },
    {
        id: 'student-pro',
        name: 'Student Pro',
        description: 'Enhanced learning experience for serious students',
        price: 499,
        billingCycle: 'monthly',
        tier: 'pro',
        features: [
            'Unlimited courses',
            'Advanced progress tracking',
            'AI tutor (unlimited)',
            'Mobile access',
            'Personalized recommendations'
        ],
        modules: [MODULES.courses, MODULES.progressTracking, MODULES.aiAssistant, MODULES.mobileApp]
    },
    {
        id: 'student-exam',
        name: 'Exam Prep',
        description: 'Specialized tools for competitive exam preparation',
        price: 699,
        billingCycle: 'monthly',
        tier: 'enterprise',
        features: [
            'All Pro features',
            'Competitive exam modules',
            'Mock tests',
            'Personalized revision plans',
            'Performance analytics'
        ],
        modules: [
            MODULES.courses,
            MODULES.progressTracking,
            MODULES.aiAssistant,
            MODULES.mobileApp,
            MODULES.mockTests,
            MODULES.revisionPlans,
            MODULES.analytics
        ]
    }
];

// College/Institution plans
const INSTITUTION_PLANS: SubscriptionPlan[] = [
    {
        id: 'college-core',
        name: 'Core Admin',
        description: 'Essential tools for educational institutions',
        price: 9999,
        billingCycle: 'monthly',
        tier: 'basic',
        features: [
            'Courses management',
            'Attendance tracking',
            'Assignments',
            'Live classes',
            'Basic reporting'
        ],
        modules: [
            MODULES.courses,
            MODULES.attendance,
            MODULES.exams,
            MODULES.liveClasses
        ]
    },
    {
        id: 'college-performance',
        name: 'Performance+',
        description: 'Advanced analytics and performance monitoring',
        price: 14999,
        billingCycle: 'monthly',
        tier: 'pro',
        recommended: true,
        features: [
            'All Core Admin features',
            'Analytics dashboard',
            'Risk detection',
            'Staff evaluation',
            'Advanced reporting'
        ],
        modules: [
            MODULES.courses,
            MODULES.attendance,
            MODULES.exams,
            MODULES.liveClasses,
            MODULES.analytics,
            MODULES.reporting
        ]
    },
    {
        id: 'college-ai',
        name: 'AI Suite',
        description: 'AI-powered tools for educational excellence',
        price: 19999,
        billingCycle: 'monthly',
        tier: 'enterprise',
        features: [
            'All Performance+ features',
            'AI grading',
            'AI teaching assistant',
            'Content generation',
            'Report summarization'
        ],
        modules: [
            MODULES.courses,
            MODULES.attendance,
            MODULES.exams,
            MODULES.liveClasses,
            MODULES.analytics,
            MODULES.reporting,
            MODULES.aiAssistant,
            MODULES.contentCreation
        ]
    },
    {
        id: 'institution-enterprise',
        name: 'Enterprise',
        description: 'Complete solution for large educational institutions',
        price: 24999,
        billingCycle: 'monthly',
        tier: 'enterprise',
        features: [
            'All AI Suite features',
            'Custom domains',
            'SSO integration',
            'White-labeling',
            'API access',
            'Priority support'
        ],
        modules: [
            MODULES.courses,
            MODULES.attendance,
            MODULES.exams,
            MODULES.liveClasses,
            MODULES.admissions,
            MODULES.analytics,
            MODULES.aiAssistant,
            MODULES.contentCreation,
            MODULES.whiteLabel,
            MODULES.api,
            MODULES.sso,
            MODULES.reporting
        ]
    }
];

// EdTech Platform plans
const EDTECH_PLANS: SubscriptionPlan[] = [
    {
        id: 'edtech-starter',
        name: 'Starter',
        description: 'Begin your online teaching journey',
        price: 0,
        billingCycle: 'monthly',
        tier: 'free',
        features: [
            '2 Courses',
            'EduSpry branding',
            'Basic analytics',
            'Up to 50 students'
        ],
        modules: [
            MODULES.courses,
            MODULES.analytics
        ]
    },
    {
        id: 'edtech-professional',
        name: 'Professional',
        description: 'Grow your online education business',
        price: 14999,
        billingCycle: 'monthly',
        tier: 'pro',
        recommended: true,
        features: [
            '10+ courses',
            'Certificates',
            'Coupon tools',
            'Payment integration',
            'Custom branding',
            'Up to 500 students'
        ],
        modules: [
            MODULES.courses,
            MODULES.analytics,
            MODULES.certificates,
            MODULES.payments,
            MODULES.whiteLabel
        ]
    },
    {
        id: 'edtech-enterprise',
        name: 'Enterprise',
        description: 'Full-featured platform for established educators',
        price: 29999,
        billingCycle: 'monthly',
        tier: 'enterprise',
        features: [
            'Unlimited courses',
            'Custom domain',
            'AI content tools',
            'Priority support',
            'API access',
            'White labeling',
            'Unlimited students'
        ],
        modules: [
            MODULES.courses,
            MODULES.analytics,
            MODULES.certificates,
            MODULES.payments,
            MODULES.whiteLabel,
            MODULES.api,
            MODULES.contentCreation,
            MODULES.aiAssistant,
            MODULES.sso
        ]
    }
];

export const SUBSCRIPTION_PLANS: Record<TenantType, SubscriptionPlan[]> = {
    [TenantType.STUDENT]: STUDENT_PLANS,
    [TenantType.COLLEGE]: INSTITUTION_PLANS,
    [TenantType.INSTITUTION]: INSTITUTION_PLANS,
    [TenantType.EDTECH]: EDTECH_PLANS
}; 