-- ===== POST REACTIONS =====
CREATE TABLE public.post_reactions (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  post_id    UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type       reaction_type NOT NULL DEFAULT 'like',
  UNIQUE (post_id, user_id)
);

CREATE INDEX reactions_post_idx ON public.post_reactions(post_id);
CREATE INDEX reactions_user_idx ON public.post_reactions(user_id);
