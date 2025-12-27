import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  BookOpen,
  MessageCircle,
  Calendar,
  Award,
  Bell,
  Settings,
  ChevronRight,
  Clock,
  Star,
  TrendingUp,
  Target,
  Heart,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { sampleMentors } from '@/components/MentorCard';
import { sampleCourses } from '@/components/CourseCard';
import { 
  FloatingOrbs, 
  GridPattern,
  StaggerContainer,
  StaggerItem,
  TextReveal
} from '@/components/AnimatedBackground';

const upcomingSessions = [
  {
    id: '1',
    mentorName: 'Dr. Priya Sharma',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    topic: 'Managing Workplace Anxiety',
    date: 'Today',
    time: '4:00 PM',
    type: 'Video Call',
  },
  {
    id: '2',
    mentorName: 'Anjali Deshmukh',
    mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    topic: 'Career Transition Planning',
    date: 'Tomorrow',
    time: '11:00 AM',
    type: 'Chat Session',
  },
];

const recentMessages = [
  {
    id: '1',
    from: 'Dr. Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    message: 'Great progress on your mindfulness exercises! Keep it up...',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    from: 'EmpowerHer Community',
    avatar: '',
    message: 'New discussion: "Navigating Salary Negotiations"',
    time: '5h ago',
    unread: false,
  },
];

const achievements = [
  { id: '1', title: 'First Steps', description: 'Completed your first course', icon: '🎯', earned: true },
  { id: '2', title: 'Mentor Match', description: 'Connected with a mentor', icon: '🤝', earned: true },
  { id: '3', title: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: true },
  { id: '4', title: 'Knowledge Seeker', description: 'Complete 5 courses', icon: '📚', earned: false },
];

export default function Dashboard() {
  const userName = 'Lakshmi';
  const overallProgress = 68;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <FloatingOrbs variant="subtle" />
      <GridPattern opacity={10} />
      
      <Navbar />
      
      <main className="pt-20 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3"
                >
                  <Sparkles className="w-4 h-4" />
                  Welcome back!
                </motion.div>
                <h1 className="font-display text-display-sm md:text-display-md mb-2">
                  Hello, <span className="text-gradient-primary">{userName}</span>
                </h1>
                <p className="text-muted-foreground">
                  Continue your journey towards empowerment and growth.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2"
              >
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: TrendingUp, value: `${overallProgress}%`, label: 'Overall Progress', color: 'primary' },
              { icon: BookOpen, value: '4', label: 'Courses Active', color: 'secondary' },
              { icon: Heart, value: '2', label: 'Active Mentors', color: 'accent' },
              { icon: Award, value: '3', label: 'Badges Earned', color: 'warning' },
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card variant="glass" className="backdrop-blur-xl border-border/30 hover:border-primary/30 transition-all">
                    <CardContent className="p-4 flex items-center gap-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                      </motion.div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="elevated" className="backdrop-blur-sm border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Continue Learning
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild className="group">
                      <Link to="/library">
                        View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sampleCourses.slice(0, 2).map((course, index) => {
                      const progress = (course.completedLessons / course.lessons) * 100;
                      return (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.01, x: 4 }}
                          className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-primary/20"
                        >
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-24 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{course.title}</h4>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                              <span>•</span>
                              <span>{course.completedLessons}/{course.lessons} lessons</span>
                            </div>
                            <div className="mt-2">
                              <Progress value={progress} className="h-1.5" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Upcoming Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="elevated" className="backdrop-blur-sm border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-secondary" />
                      Upcoming Sessions
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="group">
                      View Calendar <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-all"
                      >
                        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                          <AvatarImage src={session.mentorAvatar} />
                          <AvatarFallback>{session.mentorName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold">{session.topic}</h4>
                          <p className="text-sm text-muted-foreground">
                            with {session.mentorName}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="backdrop-blur-sm">{session.type}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {session.date}, {session.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <Button variant="outline" className="w-full group">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule New Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommended Mentors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="elevated" className="backdrop-blur-sm border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-accent" />
                      Recommended Mentors
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild className="group">
                      <Link to="/mentors">
                        Browse All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {sampleMentors.slice(2, 4).map((mentor, index) => (
                        <motion.div
                          key={mentor.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ y: -4 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-primary/20"
                        >
                          <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                            <AvatarImage src={mentor.avatar} />
                            <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold">{mentor.name}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {mentor.title}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-warning text-warning" />
                              <span className="text-sm font-medium">{mentor.rating}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-xl border-border/30">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/20">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" />
                        <AvatarFallback>LK</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold mb-1">{userName} Kumar</h3>
                    <p className="text-muted-foreground text-sm mb-4">Member since Dec 2024</p>
                    <div className="flex justify-center gap-4 text-center">
                      {[
                        { value: '12', label: 'Sessions' },
                        { value: '5', label: 'Courses' },
                        { value: '3', label: 'Badges' },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <p className="font-bold text-lg">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Messages */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="backdrop-blur-sm border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      Messages
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">2 new</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          message.unread ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted'
                        }`}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback>{message.from[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{message.from}</p>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {message.message}
                          </p>
                        </div>
                        {message.unread && (
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View All Messages
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-4 h-4 text-warning" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                          whileHover={{ scale: achievement.earned ? 1.15 : 1 }}
                          className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all cursor-pointer ${
                            achievement.earned
                              ? 'bg-warning/20 hover:shadow-lg hover:shadow-warning/20'
                              : 'bg-muted opacity-40'
                          }`}
                          title={achievement.title}
                        >
                          {achievement.icon}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyAlertButton />
    </div>
  );
}
