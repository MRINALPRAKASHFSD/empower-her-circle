import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Mentor {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatar: string | null;
  expertise: string[];
  rating: number | null;
  sessions_completed: number | null;
  experience: string | null;
  available: boolean | null;
  created_at: string;
}

export interface MentorBooking {
  id: string;
  user_id: string;
  mentor_id: string;
  topic: string;
  session_type: string | null;
  scheduled_at: string;
  status: string | null;
  notes: string | null;
  created_at: string;
  mentor?: Mentor;
}

export function useMentors() {
  return useQuery({
    queryKey: ['mentors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data as Mentor[];
    },
  });
}

export function useUserBookings() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['mentor-bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('mentor_bookings')
        .select(`
          *,
          mentor:mentors(*)
        `)
        .eq('user_id', user.id)
        .order('scheduled_at', { ascending: true });
      
      if (error) throw error;
      return data as (MentorBooking & { mentor: Mentor })[];
    },
    enabled: !!user,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (booking: {
      mentor_id: string;
      topic: string;
      session_type?: string;
      scheduled_at: string;
      notes?: string;
    }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('mentor_bookings')
        .insert({
          ...booking,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-bookings'] });
      toast.success('Session booked successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to book session');
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const { error } = await supabase
        .from('mentor_bookings')
        .delete()
        .eq('id', bookingId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-bookings'] });
      toast.success('Booking cancelled');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel booking');
    },
  });
}
