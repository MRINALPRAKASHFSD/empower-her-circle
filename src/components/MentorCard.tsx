import { motion } from 'framer-motion';
import { Star, Calendar, MessageCircle, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  expertise: string[];
  rating: number;
  reviews: number;
  experience: string;
  availability: string;
  bio: string;
}

interface MentorCardProps {
  mentor: Mentor;
  index?: number;
}

export function MentorCard({ mentor, index = 0 }: MentorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="mentor" className="h-full flex flex-col">
        {/* Header with gradient */}
        <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl border-4 border-card overflow-hidden shadow-lg">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <CardContent className="pt-14 flex-1">
          <div className="space-y-4">
            {/* Name and Title */}
            <div>
              <h3 className="font-display text-xl font-semibold">{mentor.name}</h3>
              <p className="text-muted-foreground text-sm">{mentor.title}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-semibold">{mentor.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({mentor.reviews} reviews)
              </span>
            </div>

            {/* Expertise */}
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Bio */}
            <p className="text-muted-foreground text-sm line-clamp-2">
              {mentor.bio}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{mentor.experience}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{mentor.availability}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            <Calendar className="w-4 h-4 mr-1" />
            Book
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Sample mentor data with Indian names
export const sampleMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    title: 'Clinical Psychologist',
    expertise: ['Mental Health', 'Anxiety', 'Self-Esteem'],
    rating: 4.9,
    reviews: 127,
    experience: '12 years',
    availability: 'Available today',
    bio: 'Specialized in helping young women navigate anxiety, build confidence, and develop healthy coping strategies.',
  },
  {
    id: '2',
    name: 'Anjali Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    title: 'Career Coach',
    expertise: ['Career Growth', 'Leadership', 'Tech Industry'],
    rating: 4.8,
    reviews: 89,
    experience: '8 years',
    availability: 'Next available: Tomorrow',
    bio: 'Former Tech Lead at Google, now helping women break into and excel in the technology sector.',
  },
  {
    id: '3',
    name: 'Kavitha Nair',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face',
    title: 'Women\'s Health Specialist',
    expertise: ['Reproductive Health', 'Nutrition', 'Wellness'],
    rating: 4.9,
    reviews: 156,
    experience: '15 years',
    availability: 'Available today',
    bio: 'Dedicated to empowering women with knowledge about their bodies and holistic health practices.',
  },
  {
    id: '4',
    name: 'Sunita Iyer',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
    title: 'Safety & Self-Defense Expert',
    expertise: ['Self-Defense', 'Personal Safety', 'Awareness'],
    rating: 4.7,
    reviews: 203,
    experience: '10 years',
    availability: 'Available this week',
    bio: 'Certified self-defense instructor focused on teaching practical safety skills and building confidence.',
  },
  {
    id: '5',
    name: 'Meera Krishnamurthy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    title: 'Financial Advisor',
    expertise: ['Financial Planning', 'Investments', 'Independence'],
    rating: 4.8,
    reviews: 98,
    experience: '9 years',
    availability: 'Available tomorrow',
    bio: 'Passionate about helping women achieve financial independence through smart planning and investing.',
  },
  {
    id: '6',
    name: 'Deepika Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    title: 'Relationship Counselor',
    expertise: ['Relationships', 'Communication', 'Boundaries'],
    rating: 4.9,
    reviews: 142,
    experience: '11 years',
    availability: 'Available today',
    bio: 'Helping women build healthy relationships, set boundaries, and communicate effectively in all aspects of life.',
  },
];
