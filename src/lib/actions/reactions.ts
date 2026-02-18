'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { ReactionType } from '@/types';

export async function setReaction(postId: string, type: ReactionType): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Upsert reaction
  await supabase
    .from('post_reactions')
    .upsert(
      { post_id: postId, user_id: user.id, type },
      { onConflict: 'post_id,user_id' }
    );
}

export async function removeReaction(postId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('post_reactions')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', user.id);
}
