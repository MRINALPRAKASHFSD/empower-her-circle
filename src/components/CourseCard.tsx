import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, Play, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  completedLessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const progress = (course.completedLessons / course.lessons) * 100;
  const isCompleted = progress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="feature" className="h-full flex flex-col overflow-hidden group">
        {/* Thumbnail */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-primary fill-primary ml-1" />
            </div>
          </div>

          {/* Category badge */}
          <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground border-0">
            {course.category}
          </Badge>

          {/* Completed badge */}
          {isCompleted && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success-foreground" />
            </div>
          )}
        </div>

        <CardContent className="pt-4 flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            {/* Title */}
            <h3 className="font-display text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm line-clamp-2">
              {course.description}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {course.level}
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Action */}
          <Button 
            variant={isCompleted ? "outline" : "default"} 
            size="sm" 
            className="mt-4 w-full"
          >
            {isCompleted ? (
              <>
                <Award className="w-4 h-4 mr-1" />
                Review Course
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Continue Learning
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Building Self-Confidence: A Complete Guide',
    description: 'Learn practical techniques to boost your self-esteem and present yourself with confidence in any situation.',
    category: 'Personal Growth',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    duration: '2h 30m',
    lessons: 12,
    completedLessons: 8,
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Digital Safety & Online Privacy',
    description: 'Essential skills to protect yourself online, from social media security to recognizing cyber threats.',
    category: 'Safety',
    thumbnail: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop',
    duration: '1h 45m',
    lessons: 8,
    completedLessons: 8,
    level: 'Beginner',
  },
  {
    id: '3',
    title: 'Financial Independence for Women',
    description: 'Take control of your finances with budgeting, saving, and investment strategies designed for women.',
    category: 'Finance',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    duration: '3h 15m',
    lessons: 15,
    completedLessons: 5,
    level: 'Intermediate',
  },
  {
    id: '4',
    title: 'Effective Communication Skills',
    description: 'Master the art of assertive communication, active listening, and setting healthy boundaries.',
    category: 'Career',
    thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
    duration: '2h 00m',
    lessons: 10,
    completedLessons: 3,
    level: 'Intermediate',
  },
];
