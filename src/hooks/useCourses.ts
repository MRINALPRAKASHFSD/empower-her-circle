import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Course {
  id: string;
  title: string;
  description: string | null;
  category: string;
  thumbnail: string | null;
  duration: string | null;
  lessons: number;
  level: string | null;
  created_at: string;
}

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  completed_lessons: number;
  enrolled_at: string;
  completed_at: string | null;
  course?: Course;
}

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Course[];
    },
  });
}

export function useUserCourses() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-courses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_courses')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as (UserCourse & { course: Course })[];
    },
    enabled: !!user,
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('user_courses')
        .insert({
          user_id: user.id,
          course_id: courseId,
          completed_lessons: 0,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] });
      toast.success('Enrolled in course!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to enroll');
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userCourseId, completedLessons, totalLessons }: { 
      userCourseId: string; 
      completedLessons: number;
      totalLessons: number;
    }) => {
      const updateData: { completed_lessons: number; completed_at?: string } = {
        completed_lessons: completedLessons,
      };

      if (completedLessons >= totalLessons) {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('user_courses')
        .update(updateData)
        .eq('id', userCourseId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] });
    },
  });
}
