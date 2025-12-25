import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  sendOtp: (email: string, fullName?: string) => Promise<{ error: Error | null }>;
  verifyOtp: (email: string, otp: string) => Promise<{ error: Error | null; isNewUser?: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const sendOtp = async (email: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('otp-auth', {
        body: { email, fullName, action: 'send' },
      });

      if (error) {
        return { error: new Error(error.message || 'Failed to send OTP') };
      }

      if (data?.error) {
        return { error: new Error(data.error) };
      }

      return { error: null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Failed to send OTP') };
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('otp-auth', {
        body: { email, otp, action: 'verify' },
      });

      if (error) {
        return { error: new Error(error.message || 'Failed to verify OTP') };
      }

      if (data?.error) {
        return { error: new Error(data.error) };
      }

      // If verification successful, use the magic link token to sign in
      if (data?.token && data?.email) {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: data.token,
          type: 'magiclink',
        });

        if (verifyError) {
          console.error('Magic link verification error:', verifyError);
          // If magic link fails, try refreshing the session
          await supabase.auth.refreshSession();
        }
      }

      return { error: null, isNewUser: data?.isNewUser };
    } catch (err: any) {
      return { error: new Error(err.message || 'Failed to verify OTP') };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, sendOtp, verifyOtp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
