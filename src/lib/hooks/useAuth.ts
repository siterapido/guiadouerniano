'use client';

import { useEffect } from 'react';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useAuthStore } from '@/stores/auth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { Profile } from '@/types';

export function useAuth() {
  const { profile, isLoading, setProfile, reset } = useAuthStore();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    async function loadProfile(userId: string) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      setProfile(data as Profile | null);
    }

    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        await loadProfile(data.session.user.id);
      } else {
        reset();
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        reset();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    reset();
    window.location.href = '/';
  }

  return {
    profile,
    isLoading,
    isAuthenticated: !!profile,
    signOut,
    role: profile?.role ?? null,
    isMember: profile?.role && ['member', 'editor', 'admin'].includes(profile.role),
    isEditor: profile?.role && ['editor', 'admin'].includes(profile.role),
    isAdmin: profile?.role === 'admin',
  };
}
