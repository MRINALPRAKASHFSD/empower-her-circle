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
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Mentor {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  expertise: string[] | null;
  rating: number | null;
  available: boolean | null;
  sessions_completed: number | null;
}

export default function AdminMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Mentor | null>(null);
  const [form, setForm] = useState({ name: '', title: '', bio: '', expertise: '', available: true });

  const fetch = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('mentors').select('*').order('created_at', { ascending: false });
    if (error) toast.error('Failed to load');
    else setMentors(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!form.name) { toast.error('Name is required'); return; }
    const expertiseArr = form.expertise.split(',').map(s => s.trim()).filter(Boolean);

    if (editing) {
      const { error } = await supabase.from('mentors').update({
        name: form.name, title: form.title, bio: form.bio, expertise: expertiseArr, available: form.available,
      }).eq('id', editing.id);
      if (error) toast.error('Failed to update'); else toast.success('Mentor updated');
    } else {
      const { error } = await supabase.from('mentors').insert({
        name: form.name, title: form.title, bio: form.bio, expertise: expertiseArr, available: form.available,
      });
      if (error) toast.error('Failed to create'); else toast.success('Mentor created');
    }
    setDialogOpen(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('mentors').delete().eq('id', id);
    if (error) toast.error('Failed to delete'); else { toast.success('Deleted'); fetch(); }
  };

  const openEdit = (m: Mentor) => {
    setEditing(m);
    setForm({ name: m.name, title: m.title || '', bio: m.bio || '', expertise: (m.expertise || []).join(', '), available: m.available ?? true });
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', title: '', bio: '', expertise: '', available: true });
    setDialogOpen(true);
  };

  const filtered = mentors.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild><Link to="/admin"><ArrowLeft className="w-5 h-5" /></Link></Button>
          <h1 className="text-xl font-bold">Mentors</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle>All Mentors ({filtered.length})</CardTitle>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Add Mentor</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <p className="text-muted-foreground">Loading...</p> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(m => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.title || 'N/A'}</TableCell>
                      <TableCell>{m.rating ?? 'N/A'}</TableCell>
                      <TableCell><Badge variant={m.available ? 'default' : 'secondary'}>{m.available ? 'Yes' : 'No'}</Badge></TableCell>
                      <TableCell className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(m)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
            <DialogHeader><DialogTitle>{editing ? 'Edit Mentor' : 'New Mentor'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div><Label>Bio</Label><Input value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} /></div>
              <div><Label>Expertise (comma-separated)</Label><Input value={form.expertise} onChange={e => setForm({...form, expertise: e.target.value})} /></div>
              <div className="flex items-center gap-2">
                <Switch checked={form.available} onCheckedChange={v => setForm({...form, available: v})} />
                <Label>Available</Label>
              </div>
              <Button onClick={handleSave} className="w-full">{editing ? 'Update' : 'Create'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
