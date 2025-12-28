import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Star, 
  Calendar,
  Clock,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { FloatingOrbs, GridPattern } from '@/components/AnimatedBackground';
import { useMentors, useCreateBooking, Mentor } from '@/hooks/useMentors';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const categories = [
  'All',
  'Career',
  'Mental Health',
  'Finance',
  'Health',
  'Safety',
  'Relationships',
];

const sortOptions = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Available Now', value: 'available' },
  { label: 'Most Experience', value: 'experience' },
];

function MentorCardDB({ mentor, onBook }: { mentor: Mentor; onBook: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="glass" className="h-full overflow-hidden hover:border-primary/30 transition-all">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 ring-2 ring-primary/20">
              <AvatarImage src={mentor.avatar || ''} alt={mentor.name} />
              <AvatarFallback>{mentor.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{mentor.name}</h3>
                {mentor.available && (
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{mentor.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{mentor.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({mentor.sessions_completed} sessions)
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{mentor.bio}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {mentor.expertise.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground">
              <Clock className="w-4 h-4 inline mr-1" />
              {mentor.experience} exp.
            </span>
            <Button size="sm" onClick={onBook}>
              Book Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Mentors() {
  const { user } = useAuth();
  const { data: mentors, isLoading } = useMentors();
  const createBooking = useCreateBooking();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingTopic, setBookingTopic] = useState('');
  const [bookingType, setBookingType] = useState('Video Call');
  const [bookingNotes, setBookingNotes] = useState('');

  const filteredMentors = (mentors || []).filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
      mentor.expertise.some(e => e.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const handleBookSession = async () => {
    if (!user) {
      toast.error('Please sign in to book a session');
      return;
    }
    
    if (!bookingMentor || !bookingDate || !bookingTime || !bookingTopic) {
      toast.error('Please fill in all required fields');
      return;
    }

    const scheduledAt = new Date(`${bookingDate}T${bookingTime}`).toISOString();
    
    await createBooking.mutateAsync({
      mentor_id: bookingMentor.id,
      topic: bookingTopic,
      session_type: bookingType,
      scheduled_at: scheduledAt,
      notes: bookingNotes || undefined,
    });
    
    setBookingMentor(null);
    setBookingDate('');
    setBookingTime('');
    setBookingTopic('');
    setBookingNotes('');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <GridPattern opacity={10} />
      
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-display-md md:text-display-lg mb-4">
              Find Your Perfect{' '}
              <span className="text-gradient-primary">Mentor</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Connect with verified experts who are passionate about helping 
              women succeed in career, health, finance, and personal growth.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, expertise, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
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

          {/* Sort & Results count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredMentors.length}</span> mentors
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-muted border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mentors grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-[300px]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-16 w-full mt-4" />
                    <div className="flex gap-2 mt-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredMentors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <MentorCardDB 
                  key={mentor.id} 
                  mentor={mentor} 
                  onBook={() => setBookingMentor(mentor)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No mentors found matching your criteria
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

      {/* Booking Dialog */}
      <Dialog open={!!bookingMentor} onOpenChange={() => setBookingMentor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Session</DialogTitle>
            <DialogDescription>
              Schedule a session with {bookingMentor?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="What would you like to discuss?"
                value={bookingTopic}
                onChange={(e) => setBookingTopic(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="type">Session Type</Label>
              <Select value={bookingType} onValueChange={setBookingType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Video Call">Video Call</SelectItem>
                  <SelectItem value="Chat Session">Chat Session</SelectItem>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any specific concerns or goals..."
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setBookingMentor(null)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleBookSession}
                disabled={createBooking.isPending}
              >
                {createBooking.isPending ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <EmergencyAlertButton />
    </div>
  );
}
