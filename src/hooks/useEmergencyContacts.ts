import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  relationship: string | null;
  is_primary: boolean | null;
  created_at: string;
}

export function useEmergencyContacts() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['emergency-contacts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_emergency_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('is_primary', { ascending: false });
      
      if (error) throw error;
      return data as EmergencyContact[];
    },
    enabled: !!user,
  });
}

export function useAddEmergencyContact() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (contact: {
      name: string;
      phone: string;
      relationship?: string;
      is_primary?: boolean;
    }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('user_emergency_contacts')
        .insert({
          ...contact,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergency-contacts'] });
      toast.success('Emergency contact added!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add contact');
    },
  });
}

export function useUpdateEmergencyContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...contact }: {
      id: string;
      name?: string;
      phone?: string;
      relationship?: string;
      is_primary?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('user_emergency_contacts')
        .update(contact)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergency-contacts'] });
      toast.success('Contact updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update contact');
    },
  });
}

export function useDeleteEmergencyContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('user_emergency_contacts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergency-contacts'] });
      toast.success('Contact removed');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove contact');
    },
  });
}
