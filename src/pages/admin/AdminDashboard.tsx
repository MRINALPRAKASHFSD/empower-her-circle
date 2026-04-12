import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, UserCheck, MessageCircle, Phone, LayoutDashboard, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [stats, setStats] = useState({ profiles: 0, courses: 0, mentors: 0, messages: 0, contacts: 0, journals: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [profiles, courses, mentors, messages, contacts, journals] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('mentors').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('user_emergency_contacts').select('id', { count: 'exact', head: true }),
        supabase.from('journal_entries').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        profiles: profiles.count ?? 0,
        courses: courses.count ?? 0,
        mentors: mentors.count ?? 0,
        messages: messages.count ?? 0,
        contacts: contacts.count ?? 0,
        journals: journals.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Users & Profiles', count: stats.profiles, icon: Users, link: '/admin/users', color: 'text-blue-500' },
    { title: 'Courses', count: stats.courses, icon: BookOpen, link: '/admin/courses', color: 'text-green-500' },
    { title: 'Mentors', count: stats.mentors, icon: UserCheck, link: '/admin/mentors', color: 'text-purple-500' },
    { title: 'Messages', count: stats.messages, icon: MessageCircle, link: '/admin/messages', color: 'text-orange-500' },
    { title: 'Emergency Contacts', count: stats.contacts, icon: Phone, link: '/admin/contacts', color: 'text-red-500' },
    { title: 'Journal Entries', count: stats.journals, icon: BookOpen, link: '/admin/journals', color: 'text-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Back to App</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <Link key={card.title} to={card.link}>
                <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Card className="hover:border-primary/30 transition-all cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                      <card.icon className={`w-5 h-5 ${card.color}`} />
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{card.count}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
