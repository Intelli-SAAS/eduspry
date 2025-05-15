import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, Star } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface CourseListProps {
    courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
    const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
    const [levelFilter, setLevelFilter] = useState<string>('ALL');

    // Filter courses when the filters change
    React.useEffect(() => {
        let result = courses;

        if (categoryFilter !== 'ALL') {
            result = result.filter(course => course.category === categoryFilter);
        }

        if (levelFilter !== 'ALL') {
            result = result.filter(course => course.level === levelFilter);
        }

        setFilteredCourses(result);
    }, [courses, categoryFilter, levelFilter]);

    // Helper function to format price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(price);
    };

    // Get unique categories from courses
    const categories = ['ALL', ...new Set(courses.map(course => course.category))];
    const levels = ['ALL', ...new Set(courses.map(course => course.level))];

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    <span className="font-medium">Filters:</span>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(category => (
                                <SelectItem key={category} value={category}>
                                    {category === 'ALL' ? 'All Categories' : category.replace('_', ' ')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                            {levels.map(level => (
                                <SelectItem key={level} value={level}>
                                    {level === 'ALL' ? 'All Levels' : level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <Link
                        key={course.id}
                        to={`/courses/${course.id}`}
                        className="transition-transform hover:scale-[1.02]"
                    >
                        <Card className="overflow-hidden h-full flex flex-col">
                            <div
                                className="h-48 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${course.thumbnail})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div className="p-4 flex-grow flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        {course.category.replace('_', ' ')}
                                    </Badge>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                                        <span className="text-sm font-medium">{course.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                                    {course.description}
                                </p>

                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    <span className="mr-2">By {course.instructor.name}</span>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="font-bold text-lg">{formatPrice(course.price)}</div>
                                    <div className="text-sm">{course.duration} hours</div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-lg font-medium mb-2">No courses match your filters</p>
                    <p className="text-gray-500 mb-4">Try adjusting your filters to find more courses</p>
                    <Button
                        onClick={() => {
                            setCategoryFilter('ALL');
                            setLevelFilter('ALL');
                        }}
                    >
                        Reset Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CourseList; 