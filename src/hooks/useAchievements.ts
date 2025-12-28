import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Achievement {
  id: string;
  user_id: string;
  achievement_key: string;
  earned_at: string;
}

export const ACHIEVEMENTS = {
  first_steps: { title: 'First Steps', description: 'Completed your first course', icon: '🎯' },
  mentor_match: { title: 'Mentor Match', description: 'Connected with a mentor', icon: '🤝' },
  week_warrior: { title: 'Week Warrior', description: '7-day learning streak', icon: '🔥' },
  knowledge_seeker: { title: 'Knowledge Seeker', description: 'Complete 5 courses', icon: '📚' },
  safety_first: { title: 'Safety First', description: 'Added emergency contacts', icon: '🛡️' },
};

export function useUserAchievements() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['achievements', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as Achievement[];
    },
    enabled: !!user,
  });
}

export function useEarnAchievement() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (achievementKey: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_key: achievementKey,
        })
        .select()
        .single();
      
      if (error) {
        if (error.code === '23505') {
          // Already earned
          return null;
        }
        throw error;
      }
      return data;
    },
    onSuccess: (data, achievementKey) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['achievements'] });
        const achievement = ACHIEVEMENTS[achievementKey as keyof typeof ACHIEVEMENTS];
        if (achievement) {
          toast.success(`Achievement unlocked: ${achievement.title}! ${achievement.icon}`);
        }
      }
    },
  });
}
