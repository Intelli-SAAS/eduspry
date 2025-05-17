import { useState, useEffect } from 'react';
import { Course } from '../types';
import { courseService } from '../services/courseService';

export const useCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await courseService.getCourses();
                setCourses(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch courses'));
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return { courses, loading, error };
};

export const useCourseById = (courseId: string) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const data = await courseService.getCourseById(courseId);
                setCourse(data || null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch course'));
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    return { course, loading, error };
};

export const useEnrollment = (userId: string, courseId: string) => {
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEnrollment = async () => {
            try {
                setLoading(true);
                const data = await courseService.getUserEnrollment(userId, courseId);
                setEnrollment(data || null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch enrollment'));
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollment();
    }, [userId, courseId]);

    const enrollInCourse = async () => {
        try {
            const data = await courseService.enrollInCourse(userId, courseId);
            setEnrollment(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to enroll in course'));
            throw err;
        }
    };

    return { enrollment, loading, error, enrollInCourse };
};

export const useCourseProgress = (userId: string, courseId: string) => {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                setLoading(true);
                const data = await courseService.getCourseProgress(userId, courseId);
                setProgress(data || null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch course progress'));
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, [userId, courseId]);

    const markLessonAsCompleted = async (lessonId: string) => {
        try {
            await courseService.markLessonAsCompleted(userId, courseId, lessonId);
            // Update local state (in a real app, we would fetch the updated progress)
            if (progress) {
                setProgress({
                    ...progress,
                    completedLessons: [...progress.completedLessons, lessonId],
                });
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to mark lesson as completed'));
            throw err;
        }
    };

    return { progress, loading, error, markLessonAsCompleted };
}; 