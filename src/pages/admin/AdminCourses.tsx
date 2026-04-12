import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Course {
  id: string;
  title: string;
  category: string;
  level: string | null;
  lessons: number;
  duration: string | null;
  description: string | null;
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState({ title: '', category: '', level: 'Beginner', lessons: 0, duration: '', description: '' });

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    if (error) toast.error('Failed to load courses');
    else setCourses(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSave = async () => {
    if (!form.title || !form.category) { toast.error('Title and category are required'); return; }
    
    if (editingCourse) {
      const { error } = await supabase.from('courses').update({
        title: form.title, category: form.category, level: form.level,
        lessons: form.lessons, duration: form.duration, description: form.description,
      }).eq('id', editingCourse.id);
      if (error) toast.error('Failed to update'); else toast.success('Course updated');
    } else {
      const { error } = await supabase.from('courses').insert({
        title: form.title, category: form.category, level: form.level,
        lessons: form.lessons, duration: form.duration, description: form.description,
      });
      if (error) toast.error('Failed to create'); else toast.success('Course created');
    }
    setDialogOpen(false);
    setEditingCourse(null);
    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) toast.error('Failed to delete'); else { toast.success('Course deleted'); fetchCourses(); }
  };

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setForm({ title: course.title, category: course.category, level: course.level || 'Beginner', lessons: course.lessons, duration: course.duration || '', description: course.description || '' });
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditingCourse(null);
    setForm({ title: '', category: '', level: 'Beginner', lessons: 0, duration: '', description: '' });
    setDialogOpen(true);
  };

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild><Link to="/admin"><ArrowLeft className="w-5 h-5" /></Link></Button>
          <h1 className="text-xl font-bold">Courses</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle>All Courses ({filtered.length})</CardTitle>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Add Course</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <p className="text-muted-foreground">Loading...</p> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell><Badge variant="outline">{c.category}</Badge></TableCell>
                      <TableCell>{c.level}</TableCell>
                      <TableCell>{c.lessons}</TableCell>
                      <TableCell className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingCourse ? 'Edit Course' : 'New Course'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Level</Label><Input value={form.level} onChange={e => setForm({...form, level: e.target.value})} /></div>
                <div><Label>Lessons</Label><Input type="number" value={form.lessons} onChange={e => setForm({...form, lessons: parseInt(e.target.value) || 0})} /></div>
              </div>
              <div><Label>Duration</Label><Input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} /></div>
              <div><Label>Description</Label><Input value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <Button onClick={handleSave} className="w-full">{editingCourse ? 'Update' : 'Create'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
