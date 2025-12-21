import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  Award,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { CourseCard, sampleCourses, Course } from '@/components/CourseCard';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  'All',
  'Personal Growth',
  'Safety',
  'Finance',
  'Career',
  'Health',
  'Relationships',
];

// Extended courses
const allCourses: Course[] = [
  ...sampleCourses,
  {
    id: '5',
    title: 'Self-Defense Basics for Women',
    description: 'Learn essential self-defense techniques and situational awareness to stay safe in any environment.',
    category: 'Safety',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    duration: '2h 15m',
    lessons: 10,
    completedLessons: 0,
    level: 'Beginner',
  },
  {
    id: '6',
    title: 'Navigating Career Transitions',
    description: 'Strategic approaches to changing careers, industries, or roles while maintaining momentum.',
    category: 'Career',
    thumbnail: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop',
    duration: '3h 00m',
    lessons: 14,
    completedLessons: 2,
    level: 'Intermediate',
  },
  {
    id: '7',
    title: 'Reproductive Health Essentials',
    description: 'Comprehensive guide to understanding your body, menstrual health, and reproductive wellness.',
    category: 'Health',
    thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop',
    duration: '2h 45m',
    lessons: 12,
    completedLessons: 12,
    level: 'Beginner',
  },
  {
    id: '8',
    title: 'Setting Healthy Boundaries',
    description: 'Learn to establish and maintain boundaries in personal and professional relationships.',
    category: 'Relationships',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
    duration: '1h 30m',
    lessons: 8,
    completedLessons: 4,
    level: 'Beginner',
  },
];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate overall progress
  const totalLessons = allCourses.reduce((acc, course) => acc + course.lessons, 0);
  const completedLessons = allCourses.reduce((acc, course) => acc + course.completedLessons, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);
  const completedCourses = allCourses.filter(c => c.completedLessons === c.lessons).length;

  return (
    <div className="min-h-screen bg-background">
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
                    <p className="text-2xl font-bold">{allCourses.length}</p>
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
                size="icon-sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon-sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Courses grid */}
          {filteredCourses.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
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
