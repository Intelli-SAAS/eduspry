export type TimeRange = 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';

export interface PerformanceMetric {
    id: string;
    userId: string;
    courseId: string;
    metricType: string;
    value: number;
    timestamp: Date;
}

export interface AnalyticsReport {
    id: string;
    title: string;
    description: string;
    timeRange: TimeRange;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    data: Record<string, any>;
} 