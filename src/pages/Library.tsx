import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  Award,
  Grid,
  List,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FloatingOrbs, GridPattern } from '@/components/AnimatedBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { useCourses, useUserCourses, useEnrollCourse, useUpdateProgress, Course } from '@/hooks/useCourses';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const categories = [
  'All',
  'Personal Growth',
  'Safety',
  'Finance',
  'Career',
  'Health',
  'Relationships',
];

function CourseCardDB({ 
  course, 
  enrollment,
  onEnroll,
  onContinue
}: { 
  course: Course; 
  enrollment?: { completed_lessons: number; id: string } | null;
  onEnroll: () => void;
  onContinue: () => void;
}) {
  const progress = enrollment ? (enrollment.completed_lessons / course.lessons) * 100 : 0;
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment && enrollment.completed_lessons >= course.lessons;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card variant="glass" className="h-full overflow-hidden hover:border-primary/30 transition-all">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail || ''}
            alt={course.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-3 left-3" variant="secondary">
            {course.category}
          </Badge>
          {isCompleted && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          {!isCompleted && (
            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              </div>
            </button>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {course.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span>{course.lessons} lessons</span>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
          
          {isEnrolled ? (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{enrollment.completed_lessons}/{course.lessons}</span>
              </div>
              <Progress value={progress} className="h-2 mb-3" />
              <Button 
                size="sm" 
                className="w-full"
                onClick={onContinue}
                variant={isCompleted ? 'outline' : 'default'}
              >
                {isCompleted ? 'Review Course' : 'Continue Learning'}
              </Button>
            </div>
          ) : (
            <Button size="sm" className="w-full" onClick={onEnroll}>
              <BookOpen className="w-4 h-4 mr-2" />
              Enroll Now
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Library() {
  const { user } = useAuth();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: userCourses, isLoading: enrollmentsLoading } = useUserCourses();
  const enrollCourse = useEnrollCourse();
  const updateProgress = useUpdateProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const isLoading = coursesLoading || enrollmentsLoading;

  const filteredCourses = (courses || []).filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Create enrollment map for quick lookup
  const enrollmentMap = new Map(
    (userCourses || []).map(uc => [uc.course_id, { completed_lessons: uc.completed_lessons, id: uc.id }])
  );

  // Calculate overall progress
  const totalLessons = (courses || []).reduce((acc, course) => acc + course.lessons, 0);
  const completedLessons = (userCourses || []).reduce((acc, uc) => acc + uc.completed_lessons, 0);
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const completedCourses = (userCourses || []).filter(uc => {
    const course = courses?.find(c => c.id === uc.course_id);
    return course && uc.completed_lessons >= course.lessons;
  }).length;

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast.error('Please sign in to enroll');
      return;
    }
    await enrollCourse.mutateAsync(courseId);
  };

  const handleContinue = async (enrollment: { id: string; completed_lessons: number }, course: Course) => {
    // Simulate progressing through a lesson
    if (enrollment.completed_lessons < course.lessons) {
      await updateProgress.mutateAsync({
        userCourseId: enrollment.id,
        completedLessons: enrollment.completed_lessons + 1,
        totalLessons: course.lessons,
      });
      toast.success('Lesson completed!');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <GridPattern opacity={10} />
      
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-display-md md:text-display-lg mb-4">
              Learning{' '}
              <span className="text-gradient-primary">Library</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Explore courses on safety, financial independence, health, career 
              growth, and personal development designed for women.
            </p>

            {/* Progress overview */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card variant="glass">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{courses?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Total Courses</p>
                  </div>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedCourses}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                    <p className="font-bold">{overallProgress}%</p>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-2 focus:border-primary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Courses grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="aspect-video" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-3" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {filteredCourses.map((course) => (
                <CourseCardDB 
                  key={course.id} 
                  course={course}
                  enrollment={enrollmentMap.get(course.id)}
                  onEnroll={() => handleEnroll(course.id)}
                  onContinue={() => {
                    const enrollment = enrollmentMap.get(course.id);
                    if (enrollment) {
                      handleContinue(enrollment, course);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No courses found matching your criteria
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <EmergencyAlertButton />
    </div>
  );
}
