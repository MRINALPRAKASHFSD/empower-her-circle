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
  Heart
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-display text-display-sm md:text-display-md mb-2">
                  Welcome back, <span className="text-gradient-primary">{userName}</span>
                </h1>
                <p className="text-muted-foreground">
                  Continue your journey towards empowerment and growth.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card variant="glass">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">Courses Active</p>
                </div>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Active Mentors</p>
                </div>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="elevated">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Continue Learning</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/library">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sampleCourses.slice(0, 2).map((course) => {
                      const progress = (course.completedLessons / course.lessons) * 100;
                      return (
                        <div
                          key={course.id}
                          className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
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
                        </div>
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
                <Card variant="elevated">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <Button variant="ghost" size="sm">
                      View Calendar <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                      >
                        <Avatar className="w-12 h-12">
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
                          <Badge variant="outline">{session.type}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {session.date}, {session.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
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
                <Card variant="elevated">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recommended Mentors</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/mentors">
                        Browse All <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {sampleMentors.slice(2, 4).map((mentor) => (
                        <div
                          key={mentor.id}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        >
                          <Avatar className="w-14 h-14">
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
                        </div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="gradient">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/20">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" />
                      <AvatarFallback>LK</AvatarFallback>
                    </Avatar>
                    <h3 className="font-display text-xl font-semibold mb-1">{userName} Kumar</h3>
                    <p className="text-muted-foreground text-sm mb-4">Member since Dec 2024</p>
                    <div className="flex justify-center gap-4 text-center">
                      <div>
                        <p className="font-bold text-lg">12</p>
                        <p className="text-xs text-muted-foreground">Sessions</p>
                      </div>
                      <div className="w-px bg-border" />
                      <div>
                        <p className="font-bold text-lg">5</p>
                        <p className="text-xs text-muted-foreground">Courses</p>
                      </div>
                      <div className="w-px bg-border" />
                      <div>
                        <p className="font-bold text-lg">3</p>
                        <p className="text-xs text-muted-foreground">Badges</p>
                      </div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">Messages</CardTitle>
                    <Badge variant="secondary">2 new</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
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
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        )}
                      </div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                            achievement.earned
                              ? 'bg-warning/20 hover:scale-110'
                              : 'bg-muted opacity-40'
                          }`}
                          title={`${achievement.title}: ${achievement.description}`}
                        >
                          {achievement.icon}
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-4">
                      <Award className="w-4 h-4 mr-2" />
                      View All Badges
                    </Button>
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
