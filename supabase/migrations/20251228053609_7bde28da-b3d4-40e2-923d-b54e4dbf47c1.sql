-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  thumbnail TEXT,
  duration TEXT,
  lessons INTEGER NOT NULL DEFAULT 0,
  level TEXT DEFAULT 'Beginner',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_courses (enrollment & progress tracking)
CREATE TABLE public.user_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed_lessons INTEGER NOT NULL DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Create mentors table
CREATE TABLE public.mentors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar TEXT,
  expertise TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 5.0,
  sessions_completed INTEGER DEFAULT 0,
  experience TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor_bookings table
CREATE TABLE public.mentor_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES public.mentors(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  session_type TEXT DEFAULT 'Video Call',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_emergency_contacts table
CREATE TABLE public.user_emergency_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  relationship TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  from_name TEXT NOT NULL,
  from_avatar TEXT,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_key TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_key)
);

-- Enable RLS on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Courses: Public read access
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- Mentors: Public read access
CREATE POLICY "Anyone can view mentors" ON public.mentors FOR SELECT USING (true);

-- User Courses: Users can manage their own enrollments
CREATE POLICY "Users can view own enrollments" ON public.user_courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in courses" ON public.user_courses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_courses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can unenroll" ON public.user_courses FOR DELETE USING (auth.uid() = user_id);

-- Mentor Bookings: Users can manage their own bookings
CREATE POLICY "Users can view own bookings" ON public.mentor_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.mentor_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON public.mentor_bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can cancel bookings" ON public.mentor_bookings FOR DELETE USING (auth.uid() = user_id);

-- Emergency Contacts: Users can manage their own contacts
CREATE POLICY "Users can view own emergency contacts" ON public.user_emergency_contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add emergency contacts" ON public.user_emergency_contacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own emergency contacts" ON public.user_emergency_contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own emergency contacts" ON public.user_emergency_contacts FOR DELETE USING (auth.uid() = user_id);

-- Messages: Users can manage their own messages
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can mark messages as read" ON public.messages FOR UPDATE USING (auth.uid() = user_id);

-- Achievements: Users can view their own achievements
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed default courses
INSERT INTO public.courses (title, description, category, thumbnail, duration, lessons, level) VALUES
('Building Confidence & Self-Esteem', 'Learn techniques to overcome self-doubt and build unshakeable confidence in personal and professional life.', 'Personal Growth', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop', '2h 30m', 12, 'Beginner'),
('Financial Independence Masterclass', 'Master budgeting, investing, and wealth-building strategies tailored for women financial journey.', 'Finance', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop', '4h 15m', 18, 'Intermediate'),
('Understanding Mental Health', 'Comprehensive guide to recognizing, managing, and improving mental wellness with practical exercises.', 'Health', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop', '3h 00m', 15, 'Beginner'),
('Assertive Communication Skills', 'Develop the ability to express yourself clearly and confidently while respecting others boundaries.', 'Career', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop', '1h 45m', 8, 'Beginner'),
('Self-Defense Basics for Women', 'Learn essential self-defense techniques and situational awareness to stay safe in any environment.', 'Safety', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop', '2h 15m', 10, 'Beginner'),
('Navigating Career Transitions', 'Strategic approaches to changing careers, industries, or roles while maintaining momentum.', 'Career', 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop', '3h 00m', 14, 'Intermediate'),
('Reproductive Health Essentials', 'Comprehensive guide to understanding your body, menstrual health, and reproductive wellness.', 'Health', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop', '2h 45m', 12, 'Beginner'),
('Setting Healthy Boundaries', 'Learn to establish and maintain boundaries in personal and professional relationships.', 'Relationships', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop', '1h 30m', 8, 'Beginner');

-- Seed default mentors
INSERT INTO public.mentors (name, title, bio, avatar, expertise, rating, sessions_completed, experience) VALUES
('Dr. Priya Sharma', 'Clinical Psychologist', 'Specializing in anxiety, depression, and workplace stress management for women.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face', ARRAY['Mental Health', 'Anxiety', 'Workplace Wellness'], 4.9, 250, '12 years'),
('Anjali Deshmukh', 'Career Coach', 'Former HR Director helping women navigate career transitions and leadership development.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face', ARRAY['Career', 'Leadership', 'Salary Negotiation'], 4.8, 180, '10 years'),
('Sneha Reddy', 'Financial Advisor', 'Certified financial planner focused on womens financial independence and investment strategies.', 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face', ARRAY['Finance', 'Investing', 'Budgeting'], 4.9, 320, '15 years'),
('Dr. Meera Patel', 'Gynecologist & Health Educator', 'Expert in womens reproductive health with a passion for health education.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face', ARRAY['Health', 'Reproductive Health', 'Wellness'], 4.9, 420, '18 years'),
('Kavitha Nair', 'Safety & Self-Defense Trainer', 'Former police officer teaching women practical safety skills and self-defense.', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face', ARRAY['Safety', 'Self-Defense', 'Awareness'], 4.7, 150, '8 years'),
('Divya Krishnan', 'Relationship Counselor', 'Marriage and family therapist helping women build healthier relationships.', 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face', ARRAY['Relationships', 'Family', 'Communication'], 4.8, 200, '11 years');