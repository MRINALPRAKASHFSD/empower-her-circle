import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type MoodType = 'amazing' | 'good' | 'okay' | 'low' | 'struggling';

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  mood: MoodType;
  mood_score: number;
  tags: string[];
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateJournalEntry {
  title?: string;
  content: string;
  mood: MoodType;
  mood_score: number;
  tags?: string[];
}

export const moodConfig: Record<MoodType, { emoji: string; label: string; color: string; score: number }> = {
  amazing: { emoji: '🌟', label: 'Amazing', color: 'text-yellow-500', score: 5 },
  good: { emoji: '😊', label: 'Good', color: 'text-green-500', score: 4 },
  okay: { emoji: '😐', label: 'Okay', color: 'text-blue-500', score: 3 },
  low: { emoji: '😔', label: 'Low', color: 'text-orange-500', score: 2 },
  struggling: { emoji: '💔', label: 'Struggling', color: 'text-red-500', score: 1 },
};

export const useJournalEntries = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['journal-entries', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as JournalEntry[];
    },
    enabled: !!user,
  });
};

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (entry: CreateJournalEntry) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          title: entry.title || null,
          content: entry.content,
          mood: entry.mood,
          mood_score: entry.mood_score,
          tags: entry.tags || [],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-entries'] });
    },
  });
};

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entryId: string) => {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-entries'] });
    },
  });
};

export const useMoodStats = () => {
  const { data: entries } = useJournalEntries();

  const stats = {
    totalEntries: entries?.length || 0,
    averageMood: 0,
    moodDistribution: {} as Record<MoodType, number>,
    streak: 0,
    weeklyMoods: [] as { day: string; score: number }[],
  };

  if (entries && entries.length > 0) {
    // Average mood
    const totalScore = entries.reduce((sum, entry) => sum + entry.mood_score, 0);
    stats.averageMood = Math.round((totalScore / entries.length) * 10) / 10;

    // Mood distribution
    entries.forEach(entry => {
      stats.moodDistribution[entry.mood] = (stats.moodDistribution[entry.mood] || 0) + 1;
    });

    // Calculate streak (consecutive days with entries)
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.created_at);
      entryDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else if (diffDays > streak) {
        break;
      }
    }
    stats.streak = streak;

    // Weekly moods (last 7 days)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData: { day: string; score: number; count: number }[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayEntries = entries.filter(entry => {
        const entryDate = new Date(entry.created_at);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === date.getTime();
      });

      const avgScore = dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + e.mood_score, 0) / dayEntries.length
        : 0;

      weeklyData.push({
        day: days[date.getDay()],
        score: Math.round(avgScore * 10) / 10,
        count: dayEntries.length,
      });
    }
    stats.weeklyMoods = weeklyData;
  }

  return stats;
};
